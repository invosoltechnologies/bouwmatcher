'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormProgress from './FormProgress';
import CategoryInfoStep from './CategoryInfoStep';
import SubcategoriesStep from './SubcategoriesStep';
import { useCategoryFullData } from '@/lib/hooks/admin/category-form';

interface CategoryMultiStepFormProps {
  categoryId?: number | null;
  locale: string;
}

export default function CategoryMultiStepForm({ categoryId, locale }: CategoryMultiStepFormProps) {
  const router = useRouter();
  const t = useTranslations('common.adminDashboard.categoryForm');
  const [currentStep, setCurrentStep] = useState(1);
  const [savedCategoryId, setSavedCategoryId] = useState<number | null>(categoryId || null);

  const isEditMode = !!categoryId;

  // Load existing data in edit mode
  const { data: existingData, isLoading } = useCategoryFullData(savedCategoryId, {
    enabled: isEditMode,
  });

  const handleStep1Complete = (newCategoryId: number) => {
    setSavedCategoryId(newCategoryId);
    setCurrentStep(2);
  };

  const handleFormComplete = () => {
    // Navigate back to categories list
    router.push(`/${locale}/admin-dashboard/service-categories`);
  };

  const handleCancel = () => {
    // Navigate back to categories list
    router.push(`/${locale}/admin-dashboard/service-categories`);
  };

  if (isEditMode && isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">{t('navigation.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FormProgress currentStep={currentStep} totalSteps={2} />

      <div className="mt-6">
        {currentStep === 1 && (
          <CategoryInfoStep
            existingData={existingData?.category}
            rootQuestionData={existingData?.rootQuestion ? {
              question_text_nl: existingData.rootQuestion.question_text_nl,
              question_text_en: existingData.rootQuestion.question_text_en,
            } : undefined}
            onComplete={handleStep1Complete}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 2 && savedCategoryId && (
          <SubcategoriesStep
            categoryId={savedCategoryId}
            existingData={existingData?.subcategories}
            onComplete={handleFormComplete}
            onBack={() => setCurrentStep(1)}
          />
        )}
      </div>
    </div>
  );
}

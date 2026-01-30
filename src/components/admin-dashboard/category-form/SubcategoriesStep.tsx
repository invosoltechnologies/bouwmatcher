'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormNavigation from './FormNavigation';
import SubcategoryCard from './SubcategoryCard';
import { SubcategoryFormData, SubcategoryWithQuestions } from '@/types/admin/category-form';
import { useCreateSubcategory } from '@/lib/hooks/admin/category-form';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

interface SubcategoriesStepProps {
  categoryId: number;
  existingData?: SubcategoryWithQuestions[];
  onComplete: () => void;
  onBack: () => void;
}

export default function SubcategoriesStep({
  categoryId,
  existingData,
  onComplete,
  onBack,
}: SubcategoriesStepProps) {
  const t = useTranslations('common.adminDashboard.categoryForm.step2');
  const [subcategories, setSubcategories] = useState<SubcategoryFormData[]>(() => {
    // Initialize from existing data if in edit mode
    if (existingData && existingData.length > 0) {
      return existingData.map((sub) => ({
        name_nl: sub.name_nl,
        name_en: sub.name_en,
        slug: sub.slug,
        description_nl: sub.description_nl || '',
        description_en: sub.description_en || '',
        price_particulier: sub.price_particulier,
        price_zakelijk: sub.price_zakelijk,
        questions: sub.questions.map((q) => ({
          question_text_nl: q.question_text_nl,
          question_text_en: q.question_text_en,
          question_type: q.question_type,
          is_required: q.is_required,
          placeholder_nl: q.placeholder_nl || '',
          placeholder_en: q.placeholder_en || '',
          help_text_nl: q.help_text_nl || '',
          help_text_en: q.help_text_en || '',
          options: q.options.map((opt) => ({
            option_label_nl: opt.option_label_nl,
            option_label_en: opt.option_label_en,
            option_value: opt.option_value,
          })),
        })),
      }));
    }

    // Default: one empty subcategory
    return [createEmptySubcategory()];
  });

  const createSubcategoryMutation = useCreateSubcategory();

  // Update state when existingData changes (e.g., when navigating back and forth)
  useEffect(() => {
    if (existingData && existingData.length > 0) {
      setSubcategories(existingData.map((sub) => ({
        name_nl: sub.name_nl,
        name_en: sub.name_en,
        slug: sub.slug,
        description_nl: sub.description_nl || '',
        description_en: sub.description_en || '',
        price_particulier: sub.price_particulier,
        price_zakelijk: sub.price_zakelijk,
        questions: sub.questions.map((q) => ({
          question_text_nl: q.question_text_nl,
          question_text_en: q.question_text_en,
          question_type: q.question_type,
          is_required: q.is_required,
          placeholder_nl: q.placeholder_nl || '',
          placeholder_en: q.placeholder_en || '',
          help_text_nl: q.help_text_nl || '',
          help_text_en: q.help_text_en || '',
          options: q.options.map((opt) => ({
            option_label_nl: opt.option_label_nl,
            option_label_en: opt.option_label_en,
            option_value: opt.option_value,
          })),
        })),
      })));
    }
  }, [existingData]);

  function createEmptySubcategory(): SubcategoryFormData {
    return {
      name_nl: '',
      name_en: '',
      slug: '',
      description_nl: '',
      description_en: '',
      price_particulier: 0,
      price_zakelijk: 0,
      questions: [
        {
          question_text_nl: '',
          question_text_en: '',
          question_type: 'radio',
          is_required: true,
          options: [
            { option_label_nl: '', option_label_en: '', option_value: '' },
            { option_label_nl: '', option_label_en: '', option_value: '' },
          ],
        },
      ],
    };
  }

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, createEmptySubcategory()]);
  };

  const handleRemoveSubcategory = (index: number) => {
    const updated = subcategories.filter((_, i) => i !== index);
    setSubcategories(updated);
  };

  const handleSubcategoryChange = (index: number, subcategory: SubcategoryFormData) => {
    const updated = [...subcategories];
    updated[index] = subcategory;
    setSubcategories(updated);
  };

  const validateSubcategories = (): boolean => {
    if (subcategories.length === 0) {
      toast.error(t('minOneSubcategory'));
      return false;
    }

    for (let i = 0; i < subcategories.length; i++) {
      const sub = subcategories[i];

      // Check required fields
      if (!sub.name_nl || !sub.name_en || !sub.slug) {
        toast.error(`Subcategorie ${i + 1}: ${t('fillAllRequired')}`);
        return false;
      }

      if (sub.price_particulier <= 0 || sub.price_zakelijk <= 0) {
        toast.error(`Subcategorie ${i + 1}: ${t('pricesGreaterThanZero')}`);
        return false;
      }

      // Check questions
      if (sub.questions.length === 0) {
        toast.error(`Subcategorie ${i + 1}: ${t('minOneQuestion')}`);
        return false;
      }

      for (let j = 0; j < sub.questions.length; j++) {
        const question = sub.questions[j];

        if (!question.question_text_nl || !question.question_text_en) {
          toast.error(`Subcategorie ${i + 1}, ${t('question')} ${j + 1}: ${t('fillAllRequired')}`);
          return false;
        }

        // Check options for radio, checkbox, select types
        if (['radio', 'checkbox', 'select'].includes(question.question_type)) {
          if (question.options.length < 2) {
            toast.error(`Subcategorie ${i + 1}, ${t('question')} ${j + 1}: ${t('minTwoOptions')}`);
            return false;
          }

          for (let k = 0; k < question.options.length; k++) {
            const option = question.options[k];
            if (!option.option_label_nl || !option.option_label_en) {
              toast.error(
                `Subcategorie ${i + 1}, ${t('question')} ${j + 1}, Optie ${k + 1}: ${t('fillBothLabels')}`
              );
              return false;
            }
          }
        }
      }
    }

    return true;
  };

  const handleComplete = async () => {
    // Validate all subcategories
    if (!validateSubcategories()) {
      return;
    }

    try {
      // Create all subcategories
      for (let i = 0; i < subcategories.length; i++) {
        const sub = subcategories[i];

        // Prepare questions with proper indices
        const questions = sub.questions.map((q, qIndex) => ({
          question_text_nl: q.question_text_nl,
          question_text_en: q.question_text_en,
          question_type: q.question_type,
          is_required: q.is_required,
          order_index: qIndex + 1,
          step_number: 1,
          placeholder_nl: q.placeholder_nl || undefined,
          placeholder_en: q.placeholder_en || undefined,
          help_text_nl: q.help_text_nl || undefined,
          help_text_en: q.help_text_en || undefined,
          options: q.options.map((opt, optIndex) => ({
            option_label_nl: opt.option_label_nl,
            option_label_en: opt.option_label_en,
            option_value: opt.option_value,
            order_index: optIndex + 1,
          })),
        }));

        await createSubcategoryMutation.mutateAsync({
          categoryId,
          data: {
            name_nl: sub.name_nl,
            name_en: sub.name_en,
            slug: sub.slug,
            description_nl: sub.description_nl || undefined,
            description_en: sub.description_en || undefined,
            price_particulier: sub.price_particulier,
            price_zakelijk: sub.price_zakelijk,
            sort_order: i,
            questions,
          },
        });
      }

      toast.success(t('allCreated'));
      onComplete();
    } catch (error: any) {
      console.error('Error creating subcategories:', error);

      if (error.message?.includes('slug already exists')) {
        toast.error(t('subcategoryExists'));
      } else {
        toast.error(t('savingError'));
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('title')}</h2>
        <p className="text-gray-600">
          {t('description')}
        </p>
      </div>

      <div className="space-y-6">
        {subcategories.map((subcategory, index) => (
          <SubcategoryCard
            key={index}
            subcategoryIndex={index}
            subcategory={subcategory}
            onChange={handleSubcategoryChange}
            onRemove={handleRemoveSubcategory}
            canRemove={subcategories.length > 1}
          />
        ))}

        {/* Add Subcategory Button */}
        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary hover:bg-primary/10 transition-colors">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddSubcategory}
            className='border-primary hover:border-primary'
          >
            <Plus className="h-5 w-5 -mt-1 mr-1" />
            {t('addSubcategory')}
          </Button>
        </div>
      </div>

      <FormNavigation
        currentStep={2}
        totalSteps={2}
        onBack={onBack}
        onNext={handleComplete}
        onCancel={onBack}
        isNextLoading={createSubcategoryMutation.isPending}
        nextLabel={t('saveCategory')}
      />
    </div>
  );
}

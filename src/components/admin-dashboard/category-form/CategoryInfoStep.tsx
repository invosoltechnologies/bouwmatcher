'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import FormNavigation from './FormNavigation';
import { CategoryInfoFormData, CategoryDraftResponse } from '@/types/admin/category-form';
import { useCreateCategoryDraft, useUpdateCategory, useUpdateRootQuestion, useUploadCategoryIcon } from '@/lib/hooks/admin/category-form';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

interface CategoryInfoStepProps {
  existingData?: CategoryDraftResponse;
  rootQuestionData?: {
    question_text_nl: string;
    question_text_en: string;
  };
  onComplete: (categoryId: number) => void;
  onCancel: () => void;
}

export default function CategoryInfoStep({
  existingData,
  rootQuestionData,
  onComplete,
  onCancel,
}: CategoryInfoStepProps) {
  const t = useTranslations('common.adminDashboard.categoryForm.step1');
  const [formData, setFormData] = useState<CategoryInfoFormData>({
    name_nl: existingData?.name_nl || '',
    name_en: existingData?.name_en || '',
    slug: existingData?.slug || '',
    root_question_text_nl: rootQuestionData?.question_text_nl || '',
    root_question_text_en: rootQuestionData?.question_text_en || '',
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(existingData?.icon_url || null);

  const createCategoryMutation = useCreateCategoryDraft();
  const updateCategoryMutation = useUpdateCategory();
  const updateRootQuestionMutation = useUpdateRootQuestion();
  const uploadIconMutation = useUploadCategoryIcon();

  // Auto-generate slug from name_nl
  useEffect(() => {
    if (formData.name_nl && !existingData) {
      const generatedSlug = formData.name_nl
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name_nl, existingData]);

  const handleFieldChange = (field: keyof CategoryInfoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        toast.error(t('fileTypeError'));
        return;
      }

      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(t('fileSizeError'));
        return;
      }

      setIconFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveIcon = () => {
    setIconFile(null);
    setIconPreview(null);
  };

  const handleNext = async () => {
    // Validate required fields
    if (!formData.name_nl || !formData.name_en || !formData.slug || !formData.root_question_text_nl || !formData.root_question_text_en) {
      toast.error(t('fillAllFields'));
      return;
    }

    try {
      let categoryId: number;

      // If editing existing category
      if (existingData) {
        categoryId = existingData.id;

        // Update category basic info if changed
        if (
          formData.name_nl !== existingData.name_nl ||
          formData.name_en !== existingData.name_en ||
          formData.slug !== existingData.slug
        ) {
          await updateCategoryMutation.mutateAsync({
            categoryId,
            name_nl: formData.name_nl,
            name_en: formData.name_en,
            slug: formData.slug,
          });
        }

        // Update root question if changed
        if (
          formData.root_question_text_nl !== rootQuestionData?.question_text_nl ||
          formData.root_question_text_en !== rootQuestionData?.question_text_en
        ) {
          await updateRootQuestionMutation.mutateAsync({
            categoryId,
            question_text_nl: formData.root_question_text_nl,
            question_text_en: formData.root_question_text_en,
          });
        }

        // Upload icon if changed
        if (iconFile) {
          const formDataObj = new FormData();
          formDataObj.append('file', iconFile);
          await uploadIconMutation.mutateAsync({
            categoryId,
            formData: formDataObj,
          });
        }

        toast.success(t('categoryUpdated'));
        onComplete(categoryId);
        return;
      }

      // Create new category
      const category = await createCategoryMutation.mutateAsync({
        name_nl: formData.name_nl,
        name_en: formData.name_en,
        slug: formData.slug,
        root_question_text_nl: formData.root_question_text_nl,
        root_question_text_en: formData.root_question_text_en,
      });

      categoryId = category.id;

      // Upload icon if provided
      if (iconFile) {
        const formDataObj = new FormData();
        formDataObj.append('file', iconFile);
        await uploadIconMutation.mutateAsync({
          categoryId,
          formData: formDataObj,
        });
      }

      toast.success(t('categoryCreated'));
      onComplete(categoryId);
    } catch (error: any) {
      console.error('Error in CategoryInfoStep:', error);

      // Handle specific errors
      if (error.message?.includes('slug already exists')) {
        toast.error(t('slugExists'));
      } else {
        toast.error(t('error'));
      }
    }
  };

  const isLoading = createCategoryMutation.isPending || updateCategoryMutation.isPending || updateRootQuestionMutation.isPending || uploadIconMutation.isPending;

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('title')}</h2>
        <p className="text-gray-600">{t('description')}</p>
      </div>

      <div className="space-y-6">
        {/* Category Name NL */}
        <div>
          <Label htmlFor="name-nl">
            {t('categoryNameNl')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name-nl"
            value={formData.name_nl}
            onChange={(e) => handleFieldChange('name_nl', e.target.value)}
            placeholder={t('categoryNameNlPlaceholder')}
            required
          />
        </div>

        {/* Category Name EN */}
        <div>
          <Label htmlFor="name-en">
            {t('categoryNameEn')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name-en"
            value={formData.name_en}
            onChange={(e) => handleFieldChange('name_en', e.target.value)}
            placeholder={t('categoryNameEnPlaceholder')}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <Label htmlFor="slug">
            {t('slug')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => handleFieldChange('slug', e.target.value)}
            placeholder={t('slugPlaceholder')}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('slugHelp')}
          </p>
        </div>

        {/* Root Question Section */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-2">{t('rootQuestionTitle')}</h3>
          <p className="text-sm text-gray-500 mb-4">{t('rootQuestionDescription')}</p>

          {/* Root Question Text NL */}
          <div className="mb-4">
            <Label htmlFor="root-question-nl">
              {t('rootQuestionNl')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="root-question-nl"
              value={formData.root_question_text_nl}
              onChange={(e) => handleFieldChange('root_question_text_nl', e.target.value)}
              placeholder={t('rootQuestionNlPlaceholder')}
              required
            />
          </div>

          {/* Root Question Text EN */}
          <div>
            <Label htmlFor="root-question-en">
              {t('rootQuestionEn')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="root-question-en"
              value={formData.root_question_text_en}
              onChange={(e) => handleFieldChange('root_question_text_en', e.target.value)}
              placeholder={t('rootQuestionEnPlaceholder')}
              required
            />
          </div>
        </div>

        {/* Icon Upload */}
        <div>
          <Label htmlFor="icon">{t('icon')}</Label>
          <div className="mt-2">
            {iconPreview ? (
              <div className="flex items-start gap-4">
                <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={iconPreview}
                    alt="Icon preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    {iconFile?.name || t('iconCurrent')}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveIcon}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-1" />
                    {t('iconRemove')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <label
                  htmlFor="icon"
                  className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Upload className="h-4 w-4" />
                  {t('iconUpload')}
                </label>
                <input
                  id="icon"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleIconChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {t('iconFormats')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FormNavigation
        currentStep={1}
        totalSteps={2}
        onNext={handleNext}
        onCancel={onCancel}
        isNextLoading={isLoading}
      />
    </div>
  );
}

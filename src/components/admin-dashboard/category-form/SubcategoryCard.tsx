'use client';

import { useState, useEffect } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import QuestionFieldset from './QuestionFieldset';
import { SubcategoryFormData, QuestionFormData } from '@/types/admin/category-form';
import { useTranslations } from 'next-intl';

interface SubcategoryCardProps {
  subcategoryIndex: number;
  subcategory: SubcategoryFormData;
  onChange: (index: number, subcategory: SubcategoryFormData) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function SubcategoryCard({
  subcategoryIndex,
  subcategory,
  onChange,
  onRemove,
  canRemove,
}: SubcategoryCardProps) {
  const t = useTranslations('common.adminDashboard.categoryForm.step2.subcategoryCard');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFieldChange = (field: keyof SubcategoryFormData, value: any) => {
    onChange(subcategoryIndex, { ...subcategory, [field]: value });
  };

  // Auto-generate slug from name_nl (only during initial creation, not when editing)
  useEffect(() => {
    if (subcategory.name_nl) {
      const generatedSlug = subcategory.name_nl
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      // Only update if slug is empty or would be the same as generated
      if (!subcategory.slug || subcategory.slug === '') {
        handleFieldChange('slug', generatedSlug);
      }
    }
  }, [subcategory.name_nl]);

  const handleQuestionChange = (index: number, question: QuestionFormData) => {
    const updatedQuestions = [...subcategory.questions];
    updatedQuestions[index] = question;
    handleFieldChange('questions', updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion: QuestionFormData = {
      question_text_nl: '',
      question_text_en: '',
      question_type: 'radio',
      is_required: true,
      options: [
        { option_label_nl: '', option_label_en: '', option_value: '' },
        { option_label_nl: '', option_label_en: '', option_value: '' },
      ],
    };
    handleFieldChange('questions', [...subcategory.questions, newQuestion]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = subcategory.questions.filter((_, i) => i !== index);
    handleFieldChange('questions', updatedQuestions);
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 flex-1 text-left"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
            {subcategoryIndex + 1}
          </span>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">
              {subcategory.name_nl || t('newSubcategory')}
            </h3>
            <p className="text-sm text-gray-500">
              {subcategory.questions.length} {subcategory.questions.length === 1 ? t('question') : t('questions')}
            </p>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(subcategoryIndex)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`sub-${subcategoryIndex}-name-nl`}>
                {t('nameNl')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`sub-${subcategoryIndex}-name-nl`}
                value={subcategory.name_nl}
                onChange={(e) => handleFieldChange('name_nl', e.target.value)}
                placeholder={t('nameNlPlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor={`sub-${subcategoryIndex}-name-en`}>
                {t('nameEn')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`sub-${subcategoryIndex}-name-en`}
                value={subcategory.name_en}
                onChange={(e) => handleFieldChange('name_en', e.target.value)}
                placeholder={t('nameEnPlaceholder')}
                required
              />
            </div>
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor={`sub-${subcategoryIndex}-slug`}>
              {t('slug')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`sub-${subcategoryIndex}-slug`}
              value={subcategory.slug}
              onChange={(e) => handleFieldChange('slug', e.target.value)}
              placeholder={t('slugPlaceholder')}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('slugHelp')}
            </p>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`sub-${subcategoryIndex}-price-b2c`}>
                {t('priceB2C')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                <Input
                  id={`sub-${subcategoryIndex}-price-b2c`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={subcategory.price_particulier || ''}
                  onChange={(e) => handleFieldChange('price_particulier', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                  className="pl-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`sub-${subcategoryIndex}-price-b2b`}>
                {t('priceB2B')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                <Input
                  id={`sub-${subcategoryIndex}-price-b2b`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={subcategory.price_zakelijk || ''}
                  onChange={(e) => handleFieldChange('price_zakelijk', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label className="text-base font-semibold">
                  {t('questionsTitle')} <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  {t('questionsDescription')}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddQuestion}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t('addQuestion')}
              </Button>
            </div>

            <div className="space-y-4">
              {subcategory.questions.map((question, qIndex) => (
                <QuestionFieldset
                  key={qIndex}
                  questionIndex={qIndex}
                  question={question}
                  onChange={handleQuestionChange}
                  onRemove={handleRemoveQuestion}
                  canRemove={subcategory.questions.length > 1}
                />
              ))}
            </div>

            {subcategory.questions.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <p className="text-gray-500 mb-3">{t('noQuestions')}</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddQuestion}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {t('addFirstQuestion')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { QuestionFormData } from '@/types/admin/category-form';
import { useTranslations } from 'next-intl';

interface QuestionFieldsetProps {
  questionIndex: number;
  question: QuestionFormData;
  onChange: (index: number, question: QuestionFormData) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function QuestionFieldset({
  questionIndex,
  question,
  onChange,
  onRemove,
  canRemove,
}: QuestionFieldsetProps) {
  const t = useTranslations('common.adminDashboard.categoryForm.step2.questionFieldset');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleQuestionChange = (field: keyof QuestionFormData, value: any) => {
    onChange(questionIndex, { ...question, [field]: value });
  };

  const handleOptionChange = (optionIndex: number, field: string, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], [field]: value };
    handleQuestionChange('options', updatedOptions);
  };

  const handleAddOption = () => {
    const newOption = {
      option_label_nl: '',
      option_label_en: '',
      option_value: '',
    };
    handleQuestionChange('options', [...question.options, newOption]);
  };

  const handleRemoveOption = (optionIndex: number) => {
    const updatedOptions = question.options.filter((_, i) => i !== optionIndex);
    handleQuestionChange('options', updatedOptions);
  };

  // Auto-generate option value from label
  const handleOptionLabelNlChange = (optionIndex: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      option_label_nl: value,
      option_value: value.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
    };
    handleQuestionChange('options', updatedOptions);
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
        >
          <span className="text-gray-500">{t('question')} {questionIndex + 1}</span>
          <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
        </button>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onRemove(questionIndex)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Question Text NL */}
          <div>
            <Label htmlFor={`question-${questionIndex}-text-nl`}>
              {t('questionTextNl')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`question-${questionIndex}-text-nl`}
              value={question.question_text_nl}
              onChange={(e) => handleQuestionChange('question_text_nl', e.target.value)}
              placeholder={t('questionTextNlPlaceholder')}
              required
            />
          </div>

          {/* Question Text EN */}
          <div>
            <Label htmlFor={`question-${questionIndex}-text-en`}>
              {t('questionTextEn')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`question-${questionIndex}-text-en`}
              value={question.question_text_en}
              onChange={(e) => handleQuestionChange('question_text_en', e.target.value)}
              placeholder={t('questionTextEnPlaceholder')}
              required
            />
          </div>

          {/* Required Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`question-${questionIndex}-required`}
              checked={question.is_required}
              onChange={(e) => handleQuestionChange('is_required', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor={`question-${questionIndex}-required`} className="mb-0">
              {t('required')}
            </Label>
          </div>

          {/* Answer Options Section - All questions are radio type */}
          <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">
                  {t('optionsTitle')} <span className="text-red-500">*</span>
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddOption}
                  className="text-amber-600 border-amber-500 hover:bg-amber-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {t('addOption')}
                </Button>
              </div>

              <div className="space-y-3">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className="flex items-start gap-2 p-3 border rounded-md bg-gray-50"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <Input
                          value={option.option_label_nl}
                          onChange={(e) => handleOptionLabelNlChange(optIndex, e.target.value)}
                          placeholder={t('labelNl')}
                          required
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <Input
                          value={option.option_label_en}
                          onChange={(e) => handleOptionChange(optIndex, 'option_label_en', e.target.value)}
                          placeholder={t('labelEn')}
                          required
                          className="bg-white"
                        />
                      </div>
                    </div>
                    {question.options.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        
                        onClick={() => handleRemoveOption(optIndex)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-0.5"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {question.options.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  {t('noOptions')}
                </p>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

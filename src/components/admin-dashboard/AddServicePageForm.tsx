'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, Check } from 'lucide-react';
import { ServiceCategory } from '@/types/categories';
import { ServicePageDTO } from '@/lib/api/admin/service-pages.api';
import { cn } from '@/lib/utils';

interface AddServicePageFormProps {
  categories: ServiceCategory[];
  existingPages: ServicePageDTO[];
  onSubmit: (data: { categoryId: number; metaTitle: string; metaDescription: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function AddServicePageForm({
  categories,
  existingPages,
  onSubmit,
  onCancel,
  isLoading = false,
}: AddServicePageFormProps) {
  const locale = useLocale();
  const t = useTranslations('common.adminDashboard');
  const [step, setStep] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get categories that don't have service pages yet
  const existingCategoryIds = new Set(existingPages.map((p) => p.service_category_id));
  const availableCategories = categories.filter(
    (cat) => !cat.is_deleted && !existingCategoryIds.has(cat.id.toString())
  );

  const selectedCategory = categories.find((cat) => cat.id.toString() === selectedCategoryId);
  const categoryUrl = selectedCategory
    ? `${locale === 'nl' ? 'nl' : 'en'}/services/${selectedCategory.slug}`
    : '';

  const handleNext = () => {
    if (!selectedCategoryId) {
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!selectedCategoryId || !metaTitle || !metaDescription) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        categoryId: parseInt(selectedCategoryId),
        metaTitle,
        metaDescription,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex gap-2">
        <div
          className={cn(
            'h-2 flex-1 rounded-full transition-colors',
            step >= 1 ? 'bg-primary' : 'bg-slate-200'
          )}
        />
        <div
          className={cn(
            'h-2 flex-1 rounded-full transition-colors',
            step >= 2 ? 'bg-primary' : 'bg-slate-200'
          )}
        />
      </div>

      {/* Step 1: Select Category */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {locale === 'nl' ? 'Stap 1: Selecteer Categorie' : 'Step 1: Select Category'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {locale === 'nl'
                ? 'Kies de categorie voor deze servicepagina'
                : 'Choose the category for this service page'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              {locale === 'nl' ? 'Categorie' : 'Category'}
            </label>
            <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
              <SelectTrigger className="bg-slate-50 border-slate-300">
                <SelectValue
                  placeholder={
                    locale === 'nl' ? 'Selecteer een categorie...' : 'Select a category...'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-600">
                    {locale === 'nl'
                      ? 'Alle categorieën hebben al servicepagina\'s'
                      : 'All categories already have service pages'}
                  </div>
                ) : (
                  availableCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {locale === 'nl' ? category.name_nl : category.name_en || category.name_nl}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory && (
            <div className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <label className="block text-sm font-medium text-slate-900">
                {locale === 'nl' ? 'URL' : 'URL'}
              </label>
              <div className="text-sm text-slate-600 font-mono bg-white p-3 rounded border border-slate-200">
                {categoryUrl}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onCancel}>
              {locale === 'nl' ? 'Annuleren' : 'Cancel'}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedCategoryId}
              className="gap-2"
            >
              {locale === 'nl' ? 'Volgende' : 'Next'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Enter Meta Information */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {locale === 'nl' ? 'Stap 2: Voer Meta Informatie In' : 'Step 2: Enter Meta Information'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {locale === 'nl'
                ? 'Vul de SEO meta informatie in voor deze pagina'
                : 'Fill in the SEO meta information for this page'}
            </p>
          </div>

          {selectedCategory && (
            <div className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm font-medium text-slate-900">
                {locale === 'nl' ? 'Geselecteerde Categorie' : 'Selected Category'}
              </p>
              <p className="text-sm text-slate-600">
                {locale === 'nl' ? selectedCategory.name_nl : selectedCategory.name_en || selectedCategory.name_nl}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-2">{categoryUrl}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              {locale === 'nl' ? 'Meta Titel' : 'Meta Title'} *
            </label>
            <Input
              placeholder={locale === 'nl' ? 'Voer meta titel in...' : 'Enter meta title...'}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              maxLength={70}
              className="bg-slate-50 border-slate-300"
            />
            <p className="text-xs text-slate-500">
              {metaTitle.length}/70 {locale === 'nl' ? 'karakters' : 'characters'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              {locale === 'nl' ? 'Meta Beschrijving' : 'Meta Description'} *
            </label>
            <Textarea
              placeholder={
                locale === 'nl'
                  ? 'Voer meta beschrijving in...'
                  : 'Enter meta description...'
              }
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              maxLength={160}
              rows={4}
              className="bg-slate-50 border-slate-300"
            />
            <p className="text-xs text-slate-500">
              {metaDescription.length}/160 {locale === 'nl' ? 'karakters' : 'characters'}
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'nl' ? 'Terug' : 'Back'}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!metaTitle || !metaDescription || isSubmitting}
              className="gap-2"
            >
              <Check className="w-4 h-4" />
              {isSubmitting
                ? locale === 'nl'
                  ? 'Bezig...'
                  : 'Loading...'
                : locale === 'nl'
                ? 'Pagina Maken'
                : 'Create Page'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocale, useTranslations } from 'next-intl';
import { ServiceCategory, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/categories';
import toast from 'react-hot-toast';

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ServiceCategory | null;
  onSubmit: (data: CreateCategoryDTO | UpdateCategoryDTO) => Promise<void>;
  isLoading?: boolean;
}

export default function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  onSubmit,
  isLoading = false,
}: CategoryFormDialogProps) {
  const t = useTranslations('common.adminDashboard');
  const locale = useLocale();
  const isEditMode = !!category;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name_nl: category?.name_nl || '',
      name_en: category?.name_en || '',
      slug: category?.slug || '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name_nl: category?.name_nl || '',
        name_en: category?.name_en || '',
        slug: category?.slug || '',
      });
    }
  }, [open, category, reset]);

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      reset();
      onOpenChange(false);
      toast.success(
        isEditMode
          ? locale === 'nl'
            ? 'Categorie bijgewerkt'
            : 'Category updated'
          : locale === 'nl'
          ? 'Categorie aangemaakt'
          : 'Category created'
      );
    } catch (error: any) {
      toast.error(error?.message || 'An error occurred');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? locale === 'nl'
                ? 'Categorie bewerken'
                : 'Edit Category'
              : locale === 'nl'
              ? 'Nieuwe categorie'
              : 'New Category'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? locale === 'nl'
                ? 'Bewerk de categoriegegevens'
                : 'Update the category information'
              : locale === 'nl'
              ? 'Vul de categoriegegevens in'
              : 'Fill in the category details'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Dutch Name */}
          <div className="space-y-2">
            <Label htmlFor="name_nl" className="text-sm font-medium">
              {locale === 'nl' ? 'Naam (Nederlands)' : 'Name (Dutch)'}
            </Label>
            <Input
              id="name_nl"
              placeholder={locale === 'nl' ? 'Bijv. Elektriciteitswerk' : 'E.g. Electrical Work'}
              {...register('name_nl', {
                required: locale === 'nl' ? 'Naam is verplicht' : 'Name is required',
              })}
              disabled={isLoading}
            />
            {errors.name_nl && (
              <p className="text-xs text-red-500">{errors.name_nl.message}</p>
            )}
          </div>

          {/* English Name */}
          <div className="space-y-2">
            <Label htmlFor="name_en" className="text-sm font-medium">
              {locale === 'nl' ? 'Naam (Engels)' : 'Name (English)'}
            </Label>
            <Input
              id="name_en"
              placeholder={locale === 'nl' ? 'Bijv. Electrical Work' : 'E.g. Electrical Work'}
              {...register('name_en', {
                required: locale === 'nl' ? 'Naam is verplicht' : 'Name is required',
              })}
              disabled={isLoading}
            />
            {errors.name_en && (
              <p className="text-xs text-red-500">{errors.name_en.message}</p>
            )}
          </div>

          {/* Slug - Only in Create Mode */}
          {!isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium">
                {locale === 'nl' ? 'Slug' : 'Slug'}
              </Label>
              <Input
                id="slug"
                placeholder={locale === 'nl' ? 'Bijv. electrical-work' : 'E.g. electrical-work'}
                {...register('slug', {
                  required: locale === 'nl' ? 'Slug is verplicht' : 'Slug is required',
                })}
                disabled={isLoading}
              />
              {errors.slug && (
                <p className="text-xs text-red-500">{errors.slug.message}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {locale === 'nl' ? 'Annuleren' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? locale === 'nl'
                  ? 'Opslaan...'
                  : 'Saving...'
                : locale === 'nl'
                ? 'Opslaan'
                : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

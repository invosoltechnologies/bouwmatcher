'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';
import { ServiceCategory } from '@/types/categories';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface CategoryDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ServiceCategory | null;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export default function CategoryDeleteDialog({
  open,
  onOpenChange,
  category,
  onConfirm,
  isLoading = false,
}: CategoryDeleteDialogProps) {
  const locale = useLocale();

  const isInactive = !category?.is_active;

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onOpenChange(false);
      toast.success(
        locale === 'nl' ? 'Categorie verwijderd' : 'Category deleted'
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
    }
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {locale === 'nl' ? 'Categorie verwijderen' : 'Delete Category'}
          </DialogTitle>
          <DialogDescription>
            {locale === 'nl'
              ? 'Deze actie kan niet ongedaan worden gemaakt'
              : 'This action cannot be undone'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning if category is still active */}
          {!isInactive && (
            <div className="flex gap-3 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
              <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                {locale === 'nl'
                  ? 'Deze categorie is nog actief. Maak deze eerst inactief voordat u deze verwijdert.'
                  : 'This category is still active. Please deactivate it first before deleting.'}
              </div>
            </div>
          )}

          {/* Category Info */}
          <div className="space-y-2 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              {locale === 'nl' ? 'Categorie' : 'Category'}
            </p>
            <p className="text-sm font-medium text-slate-900">
              {locale === 'nl' ? category.name_nl : category.name_en || category.name_nl}
            </p>
            <p className="text-xs text-slate-500">
              {category.professional_count || 0}{' '}
              {locale === 'nl' ? 'professionals' : 'professionals'}
            </p>
          </div>

          {/* Warning about cascading effects */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-900">
              {locale === 'nl'
                ? 'Dit zal het volgende veroorzaken:'
                : 'This will cause the following:'}
            </p>
            <ul className="space-y-1 text-sm text-slate-600 list-disc list-inside">
              <li>
                {locale === 'nl'
                  ? 'Professionals kunnen deze categorie niet meer selecteren'
                  : 'Professionals will not be able to select this category'}
              </li>
              <li>
                {locale === 'nl'
                  ? 'Bestaande projecten in deze categorie blijven behouden'
                  : 'Existing projects in this category will remain'}
              </li>
              <li>
                {locale === 'nl'
                  ? 'Deze categorie is niet meer zichtbaar voor publiek'
                  : 'This category will no longer be visible to the public'}
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || !isInactive}
          >
            {locale === 'nl' ? 'Annuleren' : 'Cancel'}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading || !isInactive}
          >
            {isLoading
              ? locale === 'nl'
                ? 'Verwijderen...'
                : 'Deleting...'
              : locale === 'nl'
              ? 'Verwijderen'
              : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

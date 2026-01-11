'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLocale } from 'next-intl';
import AddServicePageForm from './AddServicePageForm';
import { ServiceCategory } from '@/types/categories';
import { ServicePageDTO } from '@/lib/api/admin/service-pages.api';

interface AddServicePageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ServiceCategory[];
  existingPages: ServicePageDTO[];
  onSubmit: (data: {
    categoryId: number;
    metaTitleNl: string;
    metaTitleEn: string;
    metaDescriptionNl: string;
    metaDescriptionEn: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function AddServicePageDialog({
  open,
  onOpenChange,
  categories,
  existingPages,
  onSubmit,
  isLoading = false,
}: AddServicePageDialogProps) {
  const locale = useLocale();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {locale === 'nl' ? 'Nieuwe Servicepagina Toevoegen' : 'Add New Service Page'}
          </DialogTitle>
        </DialogHeader>
        <AddServicePageForm
          categories={categories}
          existingPages={existingPages}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

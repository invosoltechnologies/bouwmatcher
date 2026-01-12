'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SectionCardProps {
  sectionName: string;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
  children: React.ReactNode;
}

export default function SectionCard({
  sectionName,
  onDelete,
  isDeleting,
  children,
}: SectionCardProps) {
  const locale = useLocale();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    await onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <Card className='py-0 border border-slate-200 rounded-lg overflow-hidden relative'>
        {/* Delete Button */}
        <div className='absolute top-6 right-14 z-10'>
          <Button
            variant='ghost'
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            className='text-red-600 hover:text-red-700 hover:bg-red-50'
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>

        {/* Content */}
        {children}
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {locale === 'nl' ? 'Sectie verwijderen?' : 'Delete section?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {locale === 'nl'
                ? `Weet je zeker dat je de "${sectionName}" sectie wilt verwijderen? Dit zal alle gegevens van deze sectie verwijderen en kan niet ongedaan gemaakt worden.`
                : `Are you sure you want to delete the "${sectionName}" section? This will delete all data in this section and cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {locale === 'nl' ? 'Annuleren' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className='bg-red-600 hover:bg-red-700'
            >
              {isDeleting
                ? locale === 'nl'
                  ? 'Verwijderen...'
                  : 'Deleting...'
                : locale === 'nl'
                ? 'Verwijderen'
                : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

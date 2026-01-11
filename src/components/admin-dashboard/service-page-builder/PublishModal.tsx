'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: (status: 'draft' | 'pending' | 'active') => Promise<void>;
  isPublishing: boolean;
}

export default function PublishModal({
  open,
  onOpenChange,
  onPublish,
  isPublishing,
}: PublishModalProps) {
  const locale = useLocale();
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'active'>('pending');

  const handlePublish = async () => {
    await onPublish(selectedStatus);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {locale === 'nl' ? 'Pagina Opslaan' : 'Save Page'}
          </DialogTitle>
          <DialogDescription>
            {locale === 'nl'
              ? 'Kies hoe je deze pagina wilt opslaan'
              : 'Choose how you want to save this page'}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          {/* Pending Option */}
          <label className='flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors' style={{borderColor: selectedStatus === 'pending' ? 'rgb(59, 130, 246)' : 'rgb(226, 232, 240)'}}>
            <input
              type='radio'
              name='status'
              value='pending'
              checked={selectedStatus === 'pending'}
              onChange={(e) => setSelectedStatus(e.target.value as 'pending')}
              className='w-4 h-4'
            />
            <div>
              <p className='font-semibold text-slate-900'>
                {locale === 'nl' ? 'Opslaan als Concept' : 'Save as Draft'}
              </p>
              <p className='text-sm text-slate-600'>
                {locale === 'nl'
                  ? 'Pagina is niet zichtbaar voor publiek'
                  : 'Page is not visible to public'}
              </p>
            </div>
          </label>

          {/* Published Option */}
          <label className='flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors' style={{borderColor: selectedStatus === 'active' ? 'rgb(59, 130, 246)' : 'rgb(226, 232, 240)'}}>
            <input
              type='radio'
              name='status'
              value='active'
              checked={selectedStatus === 'active'}
              onChange={(e) => setSelectedStatus(e.target.value as 'active')}
              className='w-4 h-4'
            />
            <div>
              <p className='font-semibold text-slate-900'>
                {locale === 'nl' ? 'Publiceren' : 'Publish'}
              </p>
              <p className='text-sm text-slate-600'>
                {locale === 'nl'
                  ? 'Pagina is zichtbaar voor publiek'
                  : 'Page is visible to public'}
              </p>
            </div>
          </label>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isPublishing}
          >
            {locale === 'nl' ? 'Annuleren' : 'Cancel'}
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPublishing}
            className='gap-2'
          >
            {isPublishing
              ? locale === 'nl'
                ? 'Opslaan...'
                : 'Saving...'
              : locale === 'nl'
              ? 'Opslaan'
              : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

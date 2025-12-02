'use client';

import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import GlassyModal from '@/components/ui/glassy-modal';
import { Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
  useUpdateCompanyLogo,
  useDeleteCompanyLogo,
} from '@/lib/hooks/professional/account';

interface CompanyLogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogoUrl: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

export default function CompanyLogoUploadModal({
  isOpen,
  onClose,
  currentLogoUrl,
}: CompanyLogoUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateLogoMutation = useUpdateCompanyLogo({
    onSuccess: () => {
      toast.success('Logo succesvol bijgewerkt');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon logo niet uploaden');
    },
  });

  const deleteLogoMutation = useDeleteCompanyLogo({
    onSuccess: () => {
      toast.success('Logo succesvol verwijderd');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon logo niet verwijderen');
    },
  });

  const handlePlaceholderClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error('Alleen PNG, JPG en SVG bestanden zijn toegestaan');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Bestand mag maximaal 2MB groot zijn');
      return;
    }

    // If there's a current logo, delete it first, then upload new one
    if (currentLogoUrl && currentLogoUrl !== '') {
      deleteLogoMutation.mutate(undefined, {
        onSuccess: () => {
          // After deletion, upload new logo
          updateLogoMutation.mutate(file);
        },
        onError: () => {
          // If deletion fails, still try to upload (will replace)
          updateLogoMutation.mutate(file);
        },
      });
    } else {
      // No existing logo, just upload
      updateLogoMutation.mutate(file);
    }

    // Reset input
    event.target.value = '';
  };

  const isLoading = updateLogoMutation.isPending || deleteLogoMutation.isPending;

  return (
    <GlassyModal
      isOpen={isOpen}
      onClose={onClose}
      title='Bedrijfslogo bijwerken'
      className='lg:max-w-2xl'
    >
      <div className='space-y-6'>
        {/* Preview Section - Clickable */}
        <div className='flex flex-col items-center gap-4'>
          <div
            onClick={!isLoading ? handlePlaceholderClick : undefined}
            className={`relative w-48 h-48 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 ${
              !isLoading ? 'cursor-pointer hover:border-primary hover:bg-slate-50 transition-all' : 'opacity-50'
            }`}
          >
            {isLoading ? (
              <div className='text-center'>
                <Loader2 className='w-12 h-12 text-primary mx-auto mb-2 animate-spin' />
                <p className='text-sm text-gray-500'>
                  {deleteLogoMutation.isPending ? 'Verwijderen...' : 'Uploaden...'}
                </p>
              </div>
            ) : currentLogoUrl ? (
              <>
                <Image
                  src={currentLogoUrl}
                  alt='Company logo'
                  width={192}
                  height={192}
                  className='object-contain'
                />
                <div className='absolute inset-0 bg-black/0 hover:bg-blue-600/80 flex items-center justify-center transition-all opacity-0 hover:opacity-100'>
                  <Upload className='w-8 h-8 text-white' />
                </div>
              </>
            ) : (
              <div className='text-center p-4'>
                <Upload className='w-12 h-12 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-500'>Klik om logo te uploaden</p>
              </div>
            )}
          </div>

          <p className='text-sm text-muted-foreground text-center'>
            {currentLogoUrl
              ? 'Klik op het logo om een nieuw te uploaden'
              : 'Klik op de placeholder om een logo te uploaden'}
          </p>
        </div>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type='file'
          accept='.png,.jpg,.jpeg,.svg'
          onChange={handleFileSelect}
          className='hidden'
          disabled={isLoading}
        />

        {/* Instructions */}
        <div className='bg-slate-50 p-4 rounded-lg'>
          <p className='text-sm text-muted-foreground'>
            <strong>Vereisten:</strong>
          </p>
          <ul className='text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1'>
            <li>Maximale bestandsgrootte: 2MB</li>
            <li>Toegestane formaten: PNG, JPG, SVG</li>
            <li>Aanbevolen afmetingen: 500x500 pixels</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={isLoading}
            className='border-gray-200 rounded-xl'
          >
            Sluiten
          </Button>
        </div>
      </div>
    </GlassyModal>
  );
}

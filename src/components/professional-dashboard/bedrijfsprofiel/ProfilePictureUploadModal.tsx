'use client';

import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import GlassyModal from '@/components/ui/glassy-modal';
import { Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
  useUpdateProfilePicture,
  useDeleteProfilePicture,
} from '@/lib/hooks/professional/account/useProfilePicture';

interface ProfilePictureUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPictureUrl?: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export default function ProfilePictureUploadModal({
  isOpen,
  onClose,
  currentPictureUrl,
}: ProfilePictureUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePictureMutation = useUpdateProfilePicture({
    onSuccess: () => {
      toast.success('Profielfoto succesvol bijgewerkt');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon profielfoto niet uploaden');
    },
  });

  const deletePictureMutation = useDeleteProfilePicture({
    onSuccess: () => {
      toast.success('Profielfoto succesvol verwijderd');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon profielfoto niet verwijderen');
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
      toast.error('Alleen PNG en JPG bestanden zijn toegestaan');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Bestand mag maximaal 2MB groot zijn');
      return;
    }

    // If there's a current picture, delete it first, then upload new one
    if (currentPictureUrl && currentPictureUrl !== '') {
      deletePictureMutation.mutate(undefined, {
        onSuccess: () => {
          // After deletion, upload new picture
          updatePictureMutation.mutate(file);
        },
        onError: () => {
          // If deletion fails, still try to upload (will replace)
          updatePictureMutation.mutate(file);
        },
      });
    } else {
      // No existing picture, just upload
      updatePictureMutation.mutate(file);
    }

    // Reset input
    event.target.value = '';
  };

  const isLoading = updatePictureMutation.isPending || deletePictureMutation.isPending;

  return (
    <GlassyModal
      isOpen={isOpen}
      onClose={onClose}
      title='Profielfoto bijwerken'
      className='lg:max-w-2xl'
    >
      <div className='space-y-6'>
        {/* Preview Section - Clickable */}
        <div className='flex flex-col items-center gap-4'>
          <div
            onClick={!isLoading ? handlePlaceholderClick : undefined}
            className={`relative w-48 h-48 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 ${
              !isLoading ? 'cursor-pointer hover:border-primary hover:bg-slate-50 transition-all' : 'opacity-50'
            }`}
          >
            {isLoading ? (
              <div className='text-center'>
                <Loader2 className='w-12 h-12 text-primary mx-auto mb-2 animate-spin' />
                <p className='text-sm text-gray-500'>
                  {deletePictureMutation.isPending ? 'Verwijderen...' : 'Uploaden...'}
                </p>
              </div>
            ) : currentPictureUrl ? (
              <>
                <Image
                  src={currentPictureUrl}
                  alt='Profile picture'
                  width={192}
                  height={192}
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-black/0 hover:bg-blue-600/80 flex items-center justify-center transition-all opacity-0 hover:opacity-100'>
                  <Upload className='w-8 h-8 text-white' />
                </div>
              </>
            ) : (
              <div className='text-center p-4'>
                <Upload className='w-12 h-12 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-500'>Klik om foto te uploaden</p>
              </div>
            )}
          </div>

          <p className='text-sm text-muted-foreground text-center'>
            {currentPictureUrl
              ? 'Klik op de foto om een nieuwe te uploaden'
              : 'Klik op de placeholder om een foto te uploaden'}
          </p>
        </div>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type='file'
          accept='.png,.jpg,.jpeg'
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
            <li>Toegestane formaten: PNG, JPG</li>
            <li>Aanbevolen afmetingen: 400x400 pixels</li>
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

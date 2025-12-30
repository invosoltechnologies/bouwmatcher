'use client';

import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.modals.uploadProfilePicture');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePictureMutation = useUpdateProfilePicture({
    onSuccess: () => {
      toast.success(t('uploadSuccess'));
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t('uploadError'));
    },
  });

  const deletePictureMutation = useDeleteProfilePicture({
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t('deleteError'));
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
      toast.error(t('fileTypeError'));
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(t('fileSizeError'));
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
      title={t('title')}
      className='max-w-sm sm:max-w-md lg:max-w-2xl'
    >
      <div className='space-y-4 sm:space-y-6 p-4 sm:p-6'>
        {/* Preview Section - Clickable */}
        <div className='flex flex-col items-center gap-3 sm:gap-4'>
          <div
            onClick={!isLoading ? handlePlaceholderClick : undefined}
            className={`relative w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 ${
              !isLoading ? 'cursor-pointer hover:border-primary hover:bg-slate-50 transition-all' : 'opacity-50'
            }`}
          >
            {isLoading ? (
              <div className='text-center'>
                <Loader2 className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary mx-auto mb-2 animate-spin' />
                <p className='text-xs sm:text-sm text-gray-500'>
                  {deletePictureMutation.isPending ? t('deleting') : t('uploading')}
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
                  <Upload className='w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white' />
                </div>
              </>
            ) : (
              <div className='text-center p-2 sm:p-4'>
                <Upload className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-1 sm:mb-2' />
                <p className='text-xs sm:text-sm text-gray-500'>{t('uploadPrompt')}</p>
              </div>
            )}
          </div>

          <p className='text-xs sm:text-sm text-muted-foreground text-center px-4'>
            {currentPictureUrl
              ? t('instructionWithPhoto')
              : t('instructionNoPhoto')}
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
        <div className='bg-slate-50 p-3 sm:p-4 rounded-lg'>
          <p className='text-xs sm:text-sm text-muted-foreground'>
            <strong>{t('requirementsTitle')}</strong>
          </p>
          <ul className='text-xs sm:text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1'>
            <li>{t('maxSize')}</li>
            <li>{t('formats')}</li>
            <li>{t('dimensions')}</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={isLoading}
            className='w-full sm:w-auto border-gray-200 rounded-xl py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base'
          >
            {t('close')}
          </Button>
        </div>
      </div>
    </GlassyModal>
  );
}

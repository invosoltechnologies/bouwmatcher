'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import GlassyModal from '@/components/ui/glassy-modal';
import { Upload, X, Loader2 } from 'lucide-react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentLogoUrl);
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
      setPreviewUrl('');
      setSelectedFile(null);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon logo niet verwijderen');
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Selecteer eerst een bestand');
      return;
    }

    updateLogoMutation.mutate(selectedFile);
  };

  const handleRemove = () => {
    if (!currentLogoUrl) {
      toast.error('Geen logo om te verwijderen');
      return;
    }

    deleteLogoMutation.mutate();
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
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
        {/* Preview Section */}
        <div className='flex flex-col items-center gap-4'>
          <div className='relative w-48 h-48 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300'>
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt='Logo preview'
                width={192}
                height={192}
                className='object-contain'
              />
            ) : (
              <div className='text-center p-4'>
                <Upload className='w-12 h-12 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-500'>Geen logo</p>
              </div>
            )}
          </div>

          {previewUrl && (
            <button
              onClick={() => {
                setPreviewUrl('');
                setSelectedFile(null);
              }}
              className='text-sm text-muted-foreground hover:text-destructive flex items-center gap-1'
            >
              <X className='w-4 h-4' />
              Selectie wissen
            </button>
          )}
        </div>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type='file'
          accept='.png,.jpg,.jpeg,.svg'
          onChange={handleFileSelect}
          className='hidden'
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
        <div className='flex justify-between gap-3 pt-2'>
          <div className='flex gap-3'>
            <Button
              type='button'
              variant='outline'
              onClick={handleBrowseClick}
              disabled={isLoading}
              className='border-gray-200 rounded-xl'
            >
              {selectedFile ? 'Ander bestand kiezen' : 'Bestand kiezen'}
            </Button>

            {currentLogoUrl && (
              <Button
                type='button'
                variant='destructive'
                onClick={handleRemove}
                disabled={isLoading}
                className='rounded-xl'
              >
                {deleteLogoMutation.isPending ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Verwijderen...
                  </>
                ) : (
                  'Logo verwijderen'
                )}
              </Button>
            )}
          </div>

          <div className='flex gap-3'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isLoading}
              className='border-gray-200 rounded-xl'
            >
              Annuleren
            </Button>
            <Button
              type='button'
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className='rounded-xl'
            >
              {updateLogoMutation.isPending ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Uploaden...
                </>
              ) : (
                'Logo uploaden'
              )}
            </Button>
          </div>
        </div>
      </div>
    </GlassyModal>
  );
}

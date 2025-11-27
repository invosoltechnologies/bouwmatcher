'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  useUploadPortfolioPhoto,
  useDeletePortfolioPhoto,
} from '@/lib/hooks/professional/portfolio';

const MAX_PHOTOS = 6;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

interface ProjectPhotosCardProps {
  photos?: string[];
}

export default function ProjectPhotosCard({
  photos = [],
}: ProjectPhotosCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const uploadMutation = useUploadPortfolioPhoto({
    onSuccess: () => {
      toast.success('Foto succesvol toegevoegd');
    },
    onError: (error) => {
      toast.error(error.message || 'Kon foto niet uploaden');
    },
  });

  const deleteMutation = useDeletePortfolioPhoto({
    onSuccess: () => {
      toast.success('Foto succesvol verwijderd');
    },
    onError: (error) => {
      toast.error(error.message || 'Kon foto niet verwijderen');
    },
  });

  const isLoading = uploadMutation.isPending || deleteMutation.isPending;

  const handleAddPhoto = () => {
    if (photos.length >= MAX_PHOTOS || isLoading) return;
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error('Alleen PNG en JPG bestanden zijn toegestaan');
      event.target.value = '';
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Bestand mag maximaal 5MB groot zijn');
      event.target.value = '';
      return;
    }

    // Upload photo
    uploadMutation.mutate(file);

    // Reset input
    event.target.value = '';
  };

  const handleRemovePhoto = (photoUrl: string) => {
    deleteMutation.mutate({ photoUrl });
  };

  const showUploadButton = photos.length < MAX_PHOTOS;

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>Projectfoto&apos;s</CardTitle>
          <span className='text-sm text-muted-foreground'>
            {photos.length}/{MAX_PHOTOS}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-4'>
          {/* Upload Button - Show only if less than 6 photos */}
          {showUploadButton && (
            <button
              onClick={handleAddPhoto}
              disabled={isLoading}
              className='aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Plus className='w-8 h-8' />
              <span className='text-sm'>Foto toevoegen</span>
            </button>
          )}

          {/* Uploaded Photos */}
          {photos.map((photoUrl, index) => (
            <div
              key={index}
              className='relative aspect-square rounded-xl overflow-hidden group'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={photoUrl}
                alt={`Project photo ${index + 1}`}
                fill
                className='object-cover'
              />
              {/* Remove overlay on hover */}
              {hoveredIndex === index && (
                <div className='absolute inset-0 bg-black/50 flex items-center justify-center transition-all'>
                  <button
                    onClick={() => handleRemovePhoto(photoUrl)}
                    className='bg-white rounded-full p-2 hover:bg-red-50 transition-colors'
                  >
                    <X className='w-5 h-5 text-red-600' />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Empty Placeholder Slots - Show remaining slots up to 6 total */}
          {Array.from({ length: MAX_PHOTOS - photos.length - (showUploadButton ? 1 : 0) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className='aspect-square rounded-xl bg-slate-100 flex items-center justify-center'
            >
              <ImageIcon className='w-12 h-12 text-slate-300' />
            </div>
          ))}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/png,image/jpeg,image/jpg'
          onChange={handleFileSelect}
          className='hidden'
          disabled={isLoading}
        />
      </CardContent>
    </Card>
  );
}

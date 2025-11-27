'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Image as ImageIcon, Download, Trash2 } from 'lucide-react';
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

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
      setDeleteDialogOpen(false);
      setPhotoToDelete(null);
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

  const handleDeleteClick = (photoUrl: string) => {
    setPhotoToDelete(photoUrl);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (photoToDelete) {
      deleteMutation.mutate({ photoUrl: photoToDelete });
    }
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
            >
              <Image
                src={photoUrl}
                alt={`Project photo ${index + 1}`}
                fill
                className='object-cover'
              />

              {/* Blue Download Overlay */}
              <a
                href={photoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='absolute inset-0 flex items-center justify-center bg-blue-600/0 hover:bg-blue-600/80 transition-all opacity-0 hover:opacity-100'
              >
                <div className='text-white text-center'>
                  <Download className='w-6 h-6 mx-auto mb-1' />
                  <span className='text-sm font-medium'>Download</span>
                </div>
              </a>

              {/* Delete Button Overlay */}
              <button
                onClick={() => handleDeleteClick(photoUrl)}
                disabled={deleteMutation.isPending}
                className='absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 disabled:opacity-50 z-10'
                title='Verwijder foto'
              >
                <Trash2 className='w-4 h-4 text-red-600' />
              </button>
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

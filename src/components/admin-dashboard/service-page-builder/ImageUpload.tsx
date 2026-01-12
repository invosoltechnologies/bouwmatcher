'use client';

import { useState, useRef } from 'react';
import { Upload, Edit, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPublicStorageUrl } from '@/lib/utils/storage-url';

interface ImageUploadProps {
  imageUrl: string | null;
  onImageChange: (url: string) => void;
  bucket?: string;
  label?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'banner' | 'banner-small';
  disabled?: boolean;
  compact?: boolean;
}

export default function ImageUpload({
  imageUrl,
  onImageChange,
  bucket = 'service-pages',
  label,
  className,
  aspectRatio = 'square',
  disabled = false,
  compact = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    banner: 'aspect-[21/9]',
    'banner-small': 'aspect-[612/408]',
  };

  const compactSizeClasses = compact ? 'w-96 h-48' : '';

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onImageChange(data.url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className='block text-sm font-medium text-slate-900 mb-2'>
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative overflow-hidden rounded-lg border-2 border-dashed transition-all',
          compact ? compactSizeClasses : aspectRatioClasses[aspectRatio],
          !compact && 'w-full',
          imageUrl
            ? 'border-transparent'
            : 'border-slate-300 hover:border-slate-400',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && !isUploading && 'cursor-pointer'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Loading State */}
        {isUploading && (
          <div className='absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80'>
            <Loader2 className='w-8 h-8 text-white animate-spin mb-2' />
            <span className='text-sm text-white font-medium'>
              Uploading...
            </span>
          </div>
        )}

        {/* Image Preview */}
        {imageUrl ? (
          <>
            <img
              src={getPublicStorageUrl(imageUrl, bucket) || ''}
              alt='Upload preview'
              className='w-full h-full object-cover'
            />

            {/* Hover Overlay */}
            {isHovered && !isUploading && !disabled && (
              <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-primary/90 transition-opacity'>
                <Edit className='w-8 h-8 text-white mb-2' />
                <span className='text-sm text-white font-medium'>
                  Click to change image
                </span>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-slate-50'>
            <Upload className='w-10 h-10 text-slate-400 mb-2' />
            <span className='text-sm text-slate-600 font-medium'>
              Click to upload
            </span>
            <span className='text-xs text-slate-500 mt-1'>
              PNG, JPG, WebP
            </span>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          disabled={disabled || isUploading}
          className='hidden'
        />
      </div>
    </div>
  );
}

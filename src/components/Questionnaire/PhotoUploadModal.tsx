'use client';
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Trash2, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
// import { cn } from "@/lib/utils";

interface PhotoUploadModalProps {
  draftId: string;
  onClose: () => void;
  onComplete: (hasPhotos: boolean) => void;
}

interface UploadedPhoto {
  id: string;
  url: string;
  file_name: string;
  file_size: number;
  is_primary: boolean;
  width?: number;
  height?: number;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
  photoData?: UploadedPhoto;
}

export default function PhotoUploadModal({ draftId, onClose, onComplete }: PhotoUploadModalProps) {
  const [step, setStep] = useState<'initial' | 'upload'>('initial');
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing photos
  useEffect(() => {
    if (step === 'upload') {
      loadPhotos();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const loadPhotos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/project-draft/photos?draftId=${draftId}`);
      const data = await response.json();

      if (response.ok) {
        setPhotos(data.photos || []);
      }
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    const newUploads: UploadingFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading',
    }));

    setUploadingFiles(prev => [...prev, ...newUploads]);

    // Upload files one by one
    for (const upload of newUploads) {
      try {
        const formData = new FormData();
        formData.append('file', upload.file);
        formData.append('draftId', draftId);

        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadingFiles(prev =>
            prev.map(u =>
              u.id === upload.id && u.progress < 90
                ? { ...u, progress: u.progress + 10 }
                : u
            )
          );
        }, 200);

        const response = await fetch('/api/project-draft/upload-photo', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);

        const data = await response.json();

        if (response.ok) {
          setUploadingFiles(prev =>
            prev.map(u =>
              u.id === upload.id
                ? { ...u, progress: 100, status: 'success', photoData: data.photo }
                : u
            )
          );

          // Add to photos list
          setPhotos(prev => [...prev, data.photo]);

          // Remove from uploading list after 2 seconds
          setTimeout(() => {
            setUploadingFiles(prev => prev.filter(u => u.id !== upload.id));
          }, 2000);
        } else {
          setUploadingFiles(prev =>
            prev.map(u =>
              u.id === upload.id
                ? { ...u, status: 'error', error: data.error || 'Upload failed' }
                : u
            )
          );
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUploadingFiles(prev =>
          prev.map(u =>
            u.id === upload.id
              ? { ...u, status: 'error', error: 'Network error' }
              : u
          )
        );
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (photoId: string) => {
    try {
      const response = await fetch('/api/project-draft/delete-photo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoId, draftId }),
      });

      if (response.ok) {
        setPhotos(prev => prev.filter(p => p.id !== photoId));
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleComplete = () => {
    onComplete(photos.length > 0);
    onClose();
  };

  const handleSkip = () => {
    onComplete(false);
    onClose();
  };

  if (step === 'initial') {
    return (
      <div className='fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4'>
        <div className='bg-white/95 backdrop-blur-md rounded-2xl max-w-md w-full p-8 relative shadow-xl border border-white/20'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
          >
            <X className='w-6 h-6' />
          </button>

          <h2 className='text-xl md:text-2xl font-semibold text-center mb-5 md:mb-8'>
            Upload hier jouw foto&apos;s
          </h2>

          <div className='space-y-4'>
            <Button
              onClick={() => setStep('upload')}
              className='w-full h-14 bg-primary hover:bg-primary/90 text-white text-base font-medium'
            >
              <Upload className='w-5 h-5 mr-2' />
              Klik om een foto te selecteren
            </Button>

            <Button
              onClick={handleSkip}
              variant='outline'
              className='w-full h-14 text-base font-medium'
            >
              Ik wil geen foto&apos;s uploaden
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4'>
      <div className='bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto shadow-xl border border-white/20'>
        <button
          onClick={handleComplete}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
        >
          <X className='w-6 h-6' />
        </button>

        <h2 className='text-xl md:text-2xl font-semibold mb-6'>Voeg je foto&apos;s toe</h2>

        {/* Photo Grid */}
        <div className='grid grid-cols-3 gap-4 mb-6'>
          {/* Add Photo Button */}
          <label className='aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors'>
            <Upload className='w-8 h-8 text-gray-400 mb-2' />
            <span className='text-sm text-gray-600'>Foto toevoegen</span>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              multiple
              onChange={handleFileSelect}
              className='hidden'
            />
          </label>

          {/* Uploaded Photo */}
          {photos.map((photo) => (
            <div key={photo.id} className='relative aspect-square group'>
              <Image
                src={photo.url}
                alt={photo.file_name}
                width={photo.width || 400}
                height={photo.height || 400}
                className='w-full h-full object-cover rounded-lg'
                unoptimized
              />
              <button
                onClick={() => handleDelete(photo.id)}
                className='absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
              >
                <Trash2 className='w-4 h-4' />
              </button>
              {photo.is_primary && (
                <div className='absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded'>
                  Hoofd
                </div>
              )}
            </div>
          ))}

          {/* Uploading Files */}
          {uploadingFiles.map((upload) => (
            <div
              key={upload.id}
              className='relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden'
            >
              {upload.status === 'uploading' && (
                <div className='absolute inset-0 bg-gray-100 flex flex-col items-center justify-center'>
                  <Loader2 className='w-8 h-8 text-primary animate-spin mb-2' />
                  <span className='text-sm text-gray-600'>
                    {upload.progress}%
                  </span>
                  <div className='absolute bottom-0 left-0 right-0 h-1 bg-gray-200'>
                    <div
                      className='h-full bg-primary transition-all duration-300'
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {upload.status === 'success' && upload.photoData && (
                <div className='absolute inset-0 bg-green-50 flex items-center justify-center'>
                  <CheckCircle className='w-8 h-8 text-green-500' />
                </div>
              )}

              {upload.status === 'error' && (
                <div className='absolute inset-0 bg-red-50 flex flex-col items-center justify-center p-2'>
                  <AlertCircle className='w-8 h-8 text-red-500 mb-2' />
                  <span className='text-xs text-red-600 text-center'>
                    {upload.error}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className='flex justify-between items-center pt-4 border-t'>
          <Button
            variant='ghost'
            onClick={() => setStep('initial')}
            className='text-primary'
          >
            ← Vorige
          </Button>

          <Button
            onClick={handleComplete}
            className='bg-primary hover:bg-primary/90 text-white px-8'
          >
            Volgende →
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * useUploadPortfolioPhoto Hook
 * Uploads a portfolio photo
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountKeys } from '../account/useAccount';

interface UploadPhotoResponse {
  success: boolean;
  photoUrl: string;
  photos: string[];
}

async function uploadPortfolioPhoto(file: File): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/account/portfolio', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload photo');
  }

  return response.json();
}

interface UseUploadPortfolioPhotoOptions {
  onSuccess?: (data: UploadPhotoResponse) => void;
  onError?: (error: Error) => void;
}

export function useUploadPortfolioPhoto(
  options?: UseUploadPortfolioPhotoOptions
) {
  const queryClient = useQueryClient();

  return useMutation<UploadPhotoResponse, Error, File>({
    mutationFn: uploadPortfolioPhoto,
    onSuccess: (data) => {
      // Invalidate account data to refresh portfolio photos
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

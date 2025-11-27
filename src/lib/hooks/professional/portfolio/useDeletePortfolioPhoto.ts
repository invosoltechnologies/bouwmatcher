/**
 * useDeletePortfolioPhoto Hook
 * Deletes a portfolio photo
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountKeys } from '../account/useAccount';

interface DeletePhotoRequest {
  photoUrl: string;
}

interface DeletePhotoResponse {
  success: boolean;
  photos: string[];
}

async function deletePortfolioPhoto(
  data: DeletePhotoRequest
): Promise<DeletePhotoResponse> {
  const response = await fetch(
    `/api/account/portfolio?photoUrl=${encodeURIComponent(data.photoUrl)}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete photo');
  }

  return response.json();
}

interface UseDeletePortfolioPhotoOptions {
  onSuccess?: (data: DeletePhotoResponse) => void;
  onError?: (error: Error) => void;
}

export function useDeletePortfolioPhoto(
  options?: UseDeletePortfolioPhotoOptions
) {
  const queryClient = useQueryClient();

  return useMutation<DeletePhotoResponse, Error, DeletePhotoRequest>({
    mutationFn: deletePortfolioPhoto,
    onSuccess: (data) => {
      // Invalidate account data to refresh portfolio photos
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * Profile Picture Management Hooks
 * React Query hooks for uploading and deleting profile pictures
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountKeys } from './useAccount';

interface UpdateProfilePictureResponse {
  profilePictureUrl: string;
  message: string;
}

interface DeleteProfilePictureResponse {
  message: string;
}

interface UseUpdateProfilePictureOptions {
  onSuccess?: (data: UpdateProfilePictureResponse) => void;
  onError?: (error: Error) => void;
}

interface UseDeleteProfilePictureOptions {
  onSuccess?: (data: DeleteProfilePictureResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Upload a profile picture
 */
async function updateProfilePicture(
  file: File
): Promise<UpdateProfilePictureResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/account/profile-picture', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to upload profile picture');
  }

  return result;
}

/**
 * Delete a profile picture
 */
async function deleteProfilePicture(): Promise<DeleteProfilePictureResponse> {
  const response = await fetch('/api/account/profile-picture', {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to delete profile picture');
  }

  return result;
}

/**
 * Hook to update a profile picture
 */
export function useUpdateProfilePicture(
  options?: UseUpdateProfilePictureOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: (data) => {
      // Invalidate account query to refresh account data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

/**
 * Hook to delete a profile picture
 */
export function useDeleteProfilePicture(
  options?: UseDeleteProfilePictureOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfilePicture,
    onSuccess: (data) => {
      // Invalidate account query to refresh account data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

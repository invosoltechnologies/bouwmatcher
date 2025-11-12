/**
 * useUpdateProfile Hook
 * Handles profile updates with React Query mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/lib/api/professional/account.api';
import type {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/types/dto/professional/account/profile.dto';
import { accountKeys } from './useAccount';

interface UseUpdateProfileOptions {
  onSuccess?: (data: UpdateProfileResponse) => void;
  onError?: (error: Error) => void;
}

export function useUpdateProfile(options?: UseUpdateProfileOptions) {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // Invalidate account query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * useUpdateCompanyDescription Hook
 * Handles company description updates with React Query mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompanyDescription } from '@/lib/api/professional/account.api';
import type {
  UpdateCompanyDescriptionRequest,
  UpdateCompanyDescriptionResponse,
} from '@/types/dto/professional/account/company.dto';
import { accountKeys } from './useAccount';

interface UseUpdateCompanyDescriptionOptions {
  onSuccess?: (data: UpdateCompanyDescriptionResponse) => void;
  onError?: (error: Error) => void;
}

export function useUpdateCompanyDescription(
  options?: UseUpdateCompanyDescriptionOptions
) {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateCompanyDescriptionResponse,
    Error,
    UpdateCompanyDescriptionRequest
  >({
    mutationFn: updateCompanyDescription,
    onSuccess: (data) => {
      // Invalidate account query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * useUpdateCompanyLogo Hook
 * Handles company logo upload/delete with React Query mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateCompanyLogo,
  deleteCompanyLogo,
} from '@/lib/api/professional/account.api';
import type {
  UpdateCompanyLogoResponse,
  DeleteCompanyLogoResponse,
} from '@/types/dto/professional/account/company.dto';
import { accountKeys } from './useAccount';

interface UseUpdateCompanyLogoOptions {
  onSuccess?: (data: UpdateCompanyLogoResponse) => void;
  onError?: (error: Error) => void;
}

interface UseDeleteCompanyLogoOptions {
  onSuccess?: (data: DeleteCompanyLogoResponse) => void;
  onError?: (error: Error) => void;
}

export function useUpdateCompanyLogo(options?: UseUpdateCompanyLogoOptions) {
  const queryClient = useQueryClient();

  return useMutation<UpdateCompanyLogoResponse, Error, File>({
    mutationFn: updateCompanyLogo,
    onSuccess: (data) => {
      // Invalidate account query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

export function useDeleteCompanyLogo(options?: UseDeleteCompanyLogoOptions) {
  const queryClient = useQueryClient();

  return useMutation<DeleteCompanyLogoResponse, Error, void>({
    mutationFn: deleteCompanyLogo,
    onSuccess: (data) => {
      // Invalidate account query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

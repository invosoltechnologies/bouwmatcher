/**
 * useUpdateCompany Hook
 * Handles company updates with React Query mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompany } from '@/lib/api/professional/account.api';
import type {
  UpdateCompanyRequest,
  UpdateCompanyResponse,
} from '@/types/dto/professional/account/company.dto';
import { accountKeys } from './useAccount';

interface UseUpdateCompanyOptions {
  onSuccess?: (data: UpdateCompanyResponse) => void;
  onError?: (error: Error) => void;
}

export function useUpdateCompany(options?: UseUpdateCompanyOptions) {
  const queryClient = useQueryClient();

  return useMutation<UpdateCompanyResponse, Error, UpdateCompanyRequest>({
    mutationFn: updateCompany,
    onSuccess: (data) => {
      // Invalidate account query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

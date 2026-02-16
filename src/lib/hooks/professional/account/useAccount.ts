/**
 * useAccount Hook
 * Fetches professional account data with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@/lib/api/professional/account.api';
import type { GetAccountResponse } from '@/types/dto/professional/account/account.dto';

export const accountKeys = {
  all: ['account'] as const,
  detail: () => [...accountKeys.all, 'detail'] as const,
};

interface UseAccountOptions {
  enabled?: boolean;
}

export function useAccount(options: UseAccountOptions = {}) {
  return useQuery<GetAccountResponse>({
    queryKey: accountKeys.detail(),
    queryFn: getAccount,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    ...options,
  });
}

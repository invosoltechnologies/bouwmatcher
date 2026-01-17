import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { LeadPurchasesResponse } from '@/types/models/admin-lead-purchase.model';

export interface UseLeadPurchasesOptions {
  paymentStatus?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

/**
 * Hook to fetch lead purchases list with filtering, sorting, and pagination
 */
export function useLeadPurchases(options: UseLeadPurchasesOptions = {}) {
  const {
    paymentStatus,
    search,
    limit = 20,
    offset = 0,
    sortBy = 'purchased_at',
    sortOrder = 'desc',
    enabled = true,
  } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  if (paymentStatus) queryParams.append('paymentStatus', paymentStatus);
  if (search) queryParams.append('search', search);
  queryParams.append('limit', limit.toString());
  queryParams.append('offset', offset.toString());
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);

  const queryString = queryParams.toString();

  return useQuery<LeadPurchasesResponse, Error>({
    queryKey: ['admin', 'lead-purchases', { paymentStatus, search, limit, offset, sortBy, sortOrder }],
    queryFn: async () => {
      const response = await apiClient.get<LeadPurchasesResponse>(
        `/api/admin/lead-purchases?${queryString}`
      );
      return response;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    placeholderData: (previousData) => previousData,
  });
}

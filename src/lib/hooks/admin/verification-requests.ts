import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { VerificationRequest } from '@/app/api/admin/verification-requests/route';

export interface CreateVerificationRequestData {
  professional_id: string;
  company_id?: string;
  notes?: string;
}

export interface VerificationRequestsResponse {
  requests: VerificationRequest[];
  total: number;
}

/**
 * Hook to create a verification request
 * Called by professionals to request verification
 */
export function useCreateVerificationRequest() {
  const queryClient = useQueryClient();

  return useMutation<
    VerificationRequest,
    Error,
    CreateVerificationRequestData
  >({
    mutationFn: async (data) => {
      return apiClient.post<VerificationRequest>(
        '/api/admin/verification-requests',
        data
      );
    },
    onSuccess: () => {
      // Invalidate verification requests list
      queryClient.invalidateQueries({
        queryKey: ['admin', 'verification-requests'],
      });
    },
  });
}

/**
 * Hook to fetch verification requests (admin only)
 */
export function useVerificationRequests(options: {
  status?: string;
  limit?: number;
  offset?: number;
  enabled?: boolean;
} = {}) {
  const { status, limit = 20, offset = 0, enabled = true } = options;

  const queryParams = new URLSearchParams();
  if (status) queryParams.append('status', status);
  queryParams.append('limit', limit.toString());
  queryParams.append('offset', offset.toString());

  return useQuery<VerificationRequestsResponse, Error>({
    queryKey: ['admin', 'verification-requests', { status, limit, offset }],
    queryFn: async () => {
      return apiClient.get<VerificationRequestsResponse>(
        `/api/admin/verification-requests?${queryParams}`
      );
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}

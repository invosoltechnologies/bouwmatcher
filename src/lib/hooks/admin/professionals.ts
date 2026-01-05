import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { ProfessionalWithStatus } from '@/app/api/admin/professionals/route';

export interface ProfessionalsResponse {
  professionals: ProfessionalWithStatus[];
  total: number;
}

export interface UseProfessionalsOptions {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

/**
 * Hook to fetch professionals for admin dashboard
 *
 * @param options - Query options (status, search, pagination, sorting)
 * @returns Query result with professionals data
 */
export function useProfessionals(options: UseProfessionalsOptions = {}) {
  const {
    status,
    search,
    limit = 20,
    offset = 0,
    sortBy = 'created_at',
    sortOrder = 'desc',
    enabled = true,
  } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  if (status) queryParams.append('status', status);
  if (search) queryParams.append('search', search);
  queryParams.append('limit', limit.toString());
  queryParams.append('offset', offset.toString());
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);

  const queryString = queryParams.toString();

  return useQuery<ProfessionalsResponse, Error>({
    queryKey: ['admin', 'professionals', { status, search, limit, offset, sortBy, sortOrder }],
    queryFn: async () => {
      const response = await apiClient.get<ProfessionalsResponse>(
        `/api/admin/professionals?${queryString}`
      );
      return response;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

/**
 * Hook to fetch a single professional by ID
 *
 * @param professionalId - Professional ID
 * @param enabled - Whether query is enabled (default: true)
 * @returns Query result with professional data
 */
export function useProfessional(professionalId: string, enabled = true) {
  return useQuery<ProfessionalWithStatus, Error>({
    queryKey: ['admin', 'professionals', professionalId],
    queryFn: async () => {
      // For now, fetch all and find - in future can create dedicated endpoint
      const response = await apiClient.get<ProfessionalsResponse>('/api/admin/professionals?limit=1000');
      const professional = response.professionals.find((p) => p.id === professionalId);
      if (!professional) {
        throw new Error('Professional not found');
      }
      return professional;
    },
    enabled: !!professionalId && enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

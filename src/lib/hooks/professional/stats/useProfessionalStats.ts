import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export interface ProfessionalStatsResponse {
  quoteRequests: number;
  newLeads: number;
  conversionRate: number;
}

export const PROFESSIONAL_STATS_QUERY_KEY = ['professional', 'stats', 'monthly'];

/**
 * Hook to fetch monthly statistics for the professional
 * - Quote requests (matched leads)
 * - New leads (purchased leads)
 * - Conversion rate
 */
export function useProfessionalStats() {
  return useQuery<ProfessionalStatsResponse>({
    queryKey: PROFESSIONAL_STATS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<ProfessionalStatsResponse>('/api/professional/stats');
      return response;
    },
    // Refetch every 5 minutes
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });
}

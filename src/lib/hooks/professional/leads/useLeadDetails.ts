import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { LeadDetailsResponse } from '@/types/models/lead.model';

export const LEAD_DETAILS_QUERY_KEY = (leadId: string) => ['professional', 'leads', leadId];

/**
 * Hook to fetch detailed information about a specific lead
 * Contact information will be masked unless the professional has paid
 */
export function useLeadDetails(leadId: string | null) {
  return useQuery<LeadDetailsResponse>({
    queryKey: LEAD_DETAILS_QUERY_KEY(leadId || ''),
    queryFn: async () => {
      if (!leadId) {
        throw new Error('Lead ID is required');
      }
      const response = await apiClient.get<LeadDetailsResponse>(
        `/api/professional/leads/${leadId}`
      );
      return response;
    },
    enabled: !!leadId,
  });
}

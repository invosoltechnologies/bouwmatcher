import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { apiClient } from '@/lib/api/client';
import { LeadsResponse } from '@/types/models/lead.model';

export const LEADS_QUERY_KEY = ['professional', 'leads'];

/**
 * Hook to fetch and subscribe to real-time lead updates for professionals
 * - Fetches matched leads based on subcategories and geolocation
 * - Automatically updates when new projects are created
 * - Refetches every 60 seconds to ensure data freshness
 */
export function useLeads() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  // Fetch leads using React Query
  const query = useQuery<LeadsResponse>({
    queryKey: LEADS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<LeadsResponse>('/api/professional/leads');
      return response;
    },
    // Refetch every 60 seconds as a fallback
    refetchInterval: 60000,
    // Keep previous data while fetching new data
    placeholderData: (previousData) => previousData,
  });

  // Set up Supabase real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'projects',
        },
        (payload) => {
          console.log('Project change detected:', payload);

          // Invalidate and refetch leads when a project changes
          queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEY });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to real-time project updates');
        }
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('Unsubscribing from real-time project updates');
      supabase.removeChannel(channel);
    };
  }, [queryClient, supabase]);

  return query;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
} from '@/types/models/payment.model';
import { LEADS_QUERY_KEY } from './useLeads';

/**
 * Hook to purchase a lead by creating a Stripe checkout session
 * Redirects to Stripe checkout page on success
 */
export function usePurchaseLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadId: string) => {
      const response = await apiClient.post<
        CreateCheckoutSessionRequest,
        CreateCheckoutSessionResponse
      >('/api/payments/create-checkout-session', { leadId });
      return response;
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from Stripe');
      }
    },
    onError: (error) => {
      console.error('Failed to create checkout session:', error);
    },
    onSettled: () => {
      // Invalidate leads query to refresh purchase status
      queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEY });
    },
  });
}

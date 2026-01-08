import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

/**
 * Hook to block a professional
 */
export function useBlockProfessional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (professionalId: string) => {
      const response = await apiClient.post(
        `/api/admin/professionals/${professionalId}/block`,
        {}
      );
      return response;
    },
    onSuccess: () => {
      // Invalidate professionals list to refetch
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });
}

/**
 * Hook to unblock a professional
 */
export function useUnblockProfessional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (professionalId: string) => {
      const response = await apiClient.post(
        `/api/admin/professionals/${professionalId}/unblock`,
        {}
      );
      return response;
    },
    onSuccess: () => {
      // Invalidate professionals list to refetch
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });
}

/**
 * Hook to verify a professional
 */
export function useVerifyProfessional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (professionalId: string) => {
      const response = await apiClient.post(
        `/api/admin/professionals/${professionalId}/verify`,
        {}
      );
      return response;
    },
    onSuccess: () => {
      // Invalidate professionals list to refetch
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });
}

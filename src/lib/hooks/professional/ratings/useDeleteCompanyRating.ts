/**
 * useDeleteCompanyRating Hook
 * Deletes a company rating
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingKeys } from './useCompanyRatings';
import { accountKeys } from '../account/useAccount';

interface DeleteRatingRequest {
  companyId: string;
  ratingId: string;
}

interface DeleteRatingResponse {
  success: boolean;
}

async function deleteCompanyRating(
  data: DeleteRatingRequest
): Promise<DeleteRatingResponse> {
  const response = await fetch(
    `/api/companies/${data.companyId}/ratings?ratingId=${data.ratingId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete rating');
  }

  return response.json();
}

interface UseDeleteCompanyRatingOptions {
  onSuccess?: (data: DeleteRatingResponse) => void;
  onError?: (error: Error) => void;
}

export function useDeleteCompanyRating(
  options?: UseDeleteCompanyRatingOptions
) {
  const queryClient = useQueryClient();

  return useMutation<DeleteRatingResponse, Error, DeleteRatingRequest>({
    mutationFn: deleteCompanyRating,
    onSuccess: (data, variables) => {
      // Invalidate ratings for this company
      queryClient.invalidateQueries({
        queryKey: ratingKeys.company(variables.companyId),
      });
      // Also invalidate account data to refresh rating summary in header
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

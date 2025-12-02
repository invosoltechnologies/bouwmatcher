/**
 * useCreateCompanyRating Hook
 * Creates or updates a company rating
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingKeys } from './useCompanyRatings';
import { accountKeys } from '../account/useAccount';

interface CreateRatingRequest {
  companyId: string;
  rating: number;
  reviewText: string | null;
  ratingId?: string;
}

interface CreateRatingResponse {
  success: boolean;
  rating: unknown;
}

async function createCompanyRating(
  data: CreateRatingRequest
): Promise<CreateRatingResponse> {
  const response = await fetch(`/api/companies/${data.companyId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rating: data.rating,
      reviewText: data.reviewText,
      ratingId: data.ratingId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create rating');
  }

  return response.json();
}

interface UseCreateCompanyRatingOptions {
  onSuccess?: (data: CreateRatingResponse) => void;
  onError?: (error: Error) => void;
}

export function useCreateCompanyRating(
  options?: UseCreateCompanyRatingOptions
) {
  const queryClient = useQueryClient();

  return useMutation<CreateRatingResponse, Error, CreateRatingRequest>({
    mutationFn: createCompanyRating,
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

import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ApproveReviewParams {
  reviewId: string;
  action: 'approve' | 'reject';
}

interface ApproveReviewResponse {
  success: boolean;
  message: string;
  review: any;
}

async function approveReview(params: ApproveReviewParams): Promise<ApproveReviewResponse> {
  const { reviewId, action } = params;

  const response = await fetch(`/api/admin/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update review');
  }

  return response.json();
}

export function useReviewApproval() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveReview,
    onSuccess: () => {
      // Invalidate pending reviews queries
      queryClient.invalidateQueries({
        queryKey: ['adminReviews', 'pending'],
      });
    },
  });
}

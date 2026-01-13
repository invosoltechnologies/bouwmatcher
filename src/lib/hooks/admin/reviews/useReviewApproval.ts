import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ApproveReviewParams {
  reviewId: string;
  action: 'approve' | 'reject';
  rejectionReason?: string;
}

interface ApproveReviewResponse {
  success: boolean;
  message: string;
  review: any;
}

async function approveReview(params: ApproveReviewParams): Promise<ApproveReviewResponse> {
  const { reviewId, action, rejectionReason } = params;

  const body: any = { action };
  if (action === 'reject' && rejectionReason) {
    body.rejectionReason = rejectionReason;
  }

  const response = await fetch(`/api/admin/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
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
      // Invalidate all review queries to ensure immediate UI updates
      queryClient.invalidateQueries({
        queryKey: ['adminReviews'],
      });
      queryClient.invalidateQueries({
        queryKey: ['adminAllReviews'],
      });
    },
  });
}

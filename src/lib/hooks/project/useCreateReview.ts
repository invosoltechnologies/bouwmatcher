import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CreateReviewPayload {
  projectId: string;
  accessToken: string;
  professionalEmail: string;
  rating: number;
  reviewText: string;
}

export function useCreateReview() {
  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create review');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success('Review submitted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

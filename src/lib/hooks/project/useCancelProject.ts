import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CancelProjectPayload {
  projectId: string;
  accessToken: string;
  cancellationReason: string;
  review?: {
    professionalEmail: string;
    rating: number;
    reviewText: string;
  };
}

export function useCancelProject() {
  return useMutation({
    mutationFn: async (payload: CancelProjectPayload) => {
      const response = await fetch('/api/projects/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to cancel project');
      }

      return response.json();
    },
    onSuccess: (data) => {
      const message = data.data?.reviewCreated
        ? 'Project cancelled and review submitted!'
        : 'Project cancelled successfully!';
      toast.success(message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

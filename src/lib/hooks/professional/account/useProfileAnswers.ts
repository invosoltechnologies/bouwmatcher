/**
 * Profile Q&A Management Hooks
 * React Query hooks for managing profile question answers
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountKeys } from './useAccount';

interface UpdateProfileAnswersRequest {
  questionId: string;
  answer: string;
}

interface UpdateProfileAnswersResponse {
  message: string;
}

interface UseUpdateProfileAnswersOptions {
  onSuccess?: (data: UpdateProfileAnswersResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Update a profile answer
 */
async function updateProfileAnswer(
  data: UpdateProfileAnswersRequest
): Promise<UpdateProfileAnswersResponse> {
  const response = await fetch('/api/account/profile-answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update answer');
  }

  return result;
}

/**
 * Hook to update a profile answer
 */
export function useUpdateProfileAnswers(
  options?: UseUpdateProfileAnswersOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileAnswer,
    onSuccess: (data) => {
      // Invalidate account query to refresh account data
      queryClient.invalidateQueries({ queryKey: accountKeys.detail() });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}
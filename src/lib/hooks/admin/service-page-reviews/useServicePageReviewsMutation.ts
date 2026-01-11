import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageReviewsApi } from '@/lib/api/admin/service-page-reviews.api';
import { servicePageReviewsQueryKeys } from './useServicePageReviews';
import toast from 'react-hot-toast';

export function useSaveServicePageReviews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageReviewsApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageReviewsQueryKeys.byServicePageId(
          variables.servicePageId
        ),
      });
      toast.success(data.message || 'Reviews section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Reviews section');
    },
  });
}

import { useQuery } from '@tanstack/react-query';
import { adminServicePageReviewsApi } from '@/lib/api/admin/service-page-reviews.api';

export const servicePageReviewsQueryKeys = {
  all: ['servicePageReviews'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageReviewsQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageReviews(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageReviewsQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageReviewsApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

import { useQuery } from '@tanstack/react-query';
import { adminServicePageFaqsApi } from '@/lib/api/admin/service-page-faqs.api';

export const servicePageFaqQueryKeys = {
  all: ['service-page-faqs'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageFaqQueryKeys.all, 'by-service-page-id', servicePageId] as const,
};

export function useServicePageFaq(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageFaqQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageFaqsApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

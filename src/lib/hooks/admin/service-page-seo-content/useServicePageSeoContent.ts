import { useQuery } from '@tanstack/react-query';
import { adminServicePageSeoContentApi } from '@/lib/api/admin/service-page-seo-content.api';

export const servicePageSeoContentQueryKeys = {
  all: ['servicePageSeoContent'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageSeoContentQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageSeoContent(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageSeoContentQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageSeoContentApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

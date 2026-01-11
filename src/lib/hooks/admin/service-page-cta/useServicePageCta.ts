import { useQuery } from '@tanstack/react-query';
import { adminServicePageCtaApi } from '@/lib/api/admin/service-page-cta.api';

export const servicePageCtaQueryKeys = {
  all: ['servicePageCta'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageCtaQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageCta(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageCtaQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageCtaApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

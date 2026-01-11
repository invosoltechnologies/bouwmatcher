import { useQuery } from '@tanstack/react-query';
import { adminServicePageTipsApi } from '@/lib/api/admin/service-page-tips.api';

export const servicePageTipsQueryKeys = {
  all: ['servicePageTips'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageTipsQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageTips(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageTipsQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageTipsApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

import { useQuery } from '@tanstack/react-query';
import { adminServicePageOverviewTableApi } from '@/lib/api/admin/service-page-overview-tables.api';

export const servicePageOverviewTableQueryKeys = {
  all: ['servicePageOverviewTable'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageOverviewTableQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageOverviewTable(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageOverviewTableQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageOverviewTableApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

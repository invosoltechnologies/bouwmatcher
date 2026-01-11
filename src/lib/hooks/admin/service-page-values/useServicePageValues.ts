import { useQuery } from '@tanstack/react-query';
import { adminServicePageValuesApi } from '@/lib/api/admin/service-page-values.api';

export const servicePageValuesQueryKeys = {
  all: ['servicePageValues'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageValuesQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageValues(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageValuesQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageValuesApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

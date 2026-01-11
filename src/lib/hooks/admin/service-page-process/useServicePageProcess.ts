import { useQuery } from '@tanstack/react-query';
import { adminServicePageProcessApi } from '@/lib/api/admin/service-page-process.api';

export const servicePageProcessQueryKeys = {
  all: ['servicePageProcess'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageProcessQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageProcess(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageProcessQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageProcessApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

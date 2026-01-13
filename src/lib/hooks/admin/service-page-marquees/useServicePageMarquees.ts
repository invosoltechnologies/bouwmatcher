import { useQuery } from '@tanstack/react-query';
import { adminServicePageMarqueesApi } from '@/lib/api/admin/service-page-marquees.api';

export const servicePageMarqueesQueryKeys = {
  all: ['servicePageMarquees'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageMarqueesQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageMarquees(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageMarqueesQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageMarqueesApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

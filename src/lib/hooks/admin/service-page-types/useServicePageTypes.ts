import { useQuery } from '@tanstack/react-query';
import { adminServicePageTypesApi } from '@/lib/api/admin/service-page-types.api';

export const servicePageTypesQueryKeys = {
  all: ['servicePageTypes'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageTypesQueryKeys.all, 'byServicePageId', servicePageId] as const,
};

export function useServicePageTypes(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageTypesQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageTypesApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

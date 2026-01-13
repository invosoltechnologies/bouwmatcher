import { useQuery } from '@tanstack/react-query';
import { adminServicePageComparisonTablesApi } from '@/lib/api/admin/service-page-comparison-tables.api';

export const servicePageComparisonTableQueryKeys = {
  all: ['service-page-comparison-tables'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageComparisonTableQueryKeys.all, 'by-service-page-id', servicePageId] as const,
};

export function useServicePageComparisonTable(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageComparisonTableQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: () => adminServicePageComparisonTablesApi.getByServicePageId(servicePageId),
    enabled: !!servicePageId,
  });
}

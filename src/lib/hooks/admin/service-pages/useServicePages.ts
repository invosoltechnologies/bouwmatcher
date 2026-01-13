import { useQuery } from '@tanstack/react-query';
import { adminServicePagesApi, ServicePageDTO } from '@/lib/api/admin/service-pages.api';

export const servicePagesQueryKeys = {
  all: ['admin', 'service-pages'] as const,
  lists: () => [...servicePagesQueryKeys.all, 'list'] as const,
  filtered: (search?: string, status?: string) =>
    [...servicePagesQueryKeys.lists(), { search, status }] as const,
  detail: (id: string) => [...servicePagesQueryKeys.all, 'detail', id] as const,
};

export function useServicePages(search?: string, status?: string) {
  return useQuery({
    queryKey: servicePagesQueryKeys.filtered(search, status),
    queryFn: async () => {
      const response = await adminServicePagesApi.getAll(search, status);
      return response.servicePages;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
  });
}

export function useServicePageById(id: string) {
  return useQuery({
    queryKey: servicePagesQueryKeys.detail(id),
    queryFn: async () => {
      const response = await adminServicePagesApi.getById(id);
      return response.servicePage;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

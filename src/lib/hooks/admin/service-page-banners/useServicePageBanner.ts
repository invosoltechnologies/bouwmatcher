import { useQuery } from '@tanstack/react-query';
import { adminServicePageBannersApi } from '@/lib/api/admin/service-page-banners.api';

export const servicePageBannerQueryKeys = {
  all: ['admin', 'service-page-banners'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageBannerQueryKeys.all, servicePageId] as const,
};

export function useServicePageBanner(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageBannerQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: async () => {
      if (!servicePageId) return null;
      const response = await adminServicePageBannersApi.getByServicePageId(
        servicePageId
      );
      return response.banner;
    },
    enabled: !!servicePageId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

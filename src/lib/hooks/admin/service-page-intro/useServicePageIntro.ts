import { useQuery } from '@tanstack/react-query';
import { adminServicePageIntroApi } from '@/lib/api/admin/service-page-intro.api';

export const servicePageIntroQueryKeys = {
  all: ['admin', 'service-page-intro'] as const,
  byServicePageId: (servicePageId: string) =>
    [...servicePageIntroQueryKeys.all, servicePageId] as const,
};

export function useServicePageIntro(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePageIntroQueryKeys.byServicePageId(servicePageId || ''),
    queryFn: async () => {
      if (!servicePageId) return null;
      const response = await adminServicePageIntroApi.getByServicePageId(
        servicePageId
      );
      return response.intro;
    },
    enabled: !!servicePageId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

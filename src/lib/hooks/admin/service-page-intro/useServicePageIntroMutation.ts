import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageIntroApi } from '@/lib/api/admin/service-page-intro.api';
import { servicePageIntroQueryKeys } from './useServicePageIntro';
import toast from 'react-hot-toast';

export function useSaveServicePageIntro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      servicePageId: string;
      headingNl: string;
      headingEn: string;
      descriptionNl: string;
      descriptionEn: string;
      backgroundImageUrl?: string;
    }) =>
      await adminServicePageIntroApi.save({
        service_page_id: data.servicePageId,
        heading_nl: data.headingNl,
        heading_en: data.headingEn,
        description_nl: data.descriptionNl,
        description_en: data.descriptionEn,
        background_image_url: data.backgroundImageUrl,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageIntroQueryKeys.byServicePageId(
          variables.servicePageId
        ),
      });
      toast.success(data.message || 'Intro saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save intro');
    },
  });
}

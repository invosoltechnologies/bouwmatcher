import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageBannersApi } from '@/lib/api/admin/service-page-banners.api';
import { servicePageBannerQueryKeys } from './useServicePageBanner';
import toast from 'react-hot-toast';

export function useSaveServicePageBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      servicePageId: string;
      eyebrowTextNl: string;
      eyebrowTextEn: string;
      h1TextNl: string;
      h1TextEn: string;
      descriptionNl: string;
      descriptionEn: string;
      backgroundImageUrl?: string;
      backgroundImageAlt?: string;
    }) =>
      await adminServicePageBannersApi.save({
        service_page_id: data.servicePageId,
        eyebrow_text_nl: data.eyebrowTextNl,
        eyebrow_text_en: data.eyebrowTextEn,
        h1_text_nl: data.h1TextNl,
        h1_text_en: data.h1TextEn,
        description_nl: data.descriptionNl,
        description_en: data.descriptionEn,
        background_image_url: data.backgroundImageUrl,
        background_image_alt: data.backgroundImageAlt,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageBannerQueryKeys.byServicePageId(
          variables.servicePageId
        ),
      });
      toast.success(data.message || 'Banner saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save banner');
    },
  });
}

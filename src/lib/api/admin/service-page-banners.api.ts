import { apiClient } from '@/lib/api/client';

export interface ServicePageBannerDTO {
  id: string;
  service_page_id: string;
  eyebrow_text_nl: string;
  eyebrow_text_en: string;
  h1_text_nl: string;
  h1_text_en: string;
  description_nl: string;
  description_en: string;
  background_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateServicePageBannerDTO {
  service_page_id: string;
  eyebrow_text_nl: string;
  eyebrow_text_en: string;
  h1_text_nl: string;
  h1_text_en: string;
  description_nl: string;
  description_en: string;
  background_image_url?: string;
}

export interface CreateServicePageBannerResponse {
  banner: ServicePageBannerDTO;
  message: string;
}

export const adminServicePageBannersApi = {
  // Get banner for a service page
  getByServicePageId: (servicePageId: string) =>
    apiClient.get<{ banner: ServicePageBannerDTO | null }>(
      `/api/admin/service-pages/banners?service_page_id=${servicePageId}`
    ),

  // Create or update banner
  save: (data: CreateServicePageBannerDTO) =>
    apiClient.post<CreateServicePageBannerResponse>(
      '/api/admin/service-pages/banners',
      data
    ),
};

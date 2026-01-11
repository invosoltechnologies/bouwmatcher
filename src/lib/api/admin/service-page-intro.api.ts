import { apiClient } from '@/lib/api/client';

export interface ServicePageIntroDTO {
  id: string;
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  background_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateServicePageIntroDTO {
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  background_image_url?: string;
}

export interface CreateServicePageIntroResponse {
  intro: ServicePageIntroDTO;
  message: string;
}

export const adminServicePageIntroApi = {
  // Get intro for a service page
  getByServicePageId: (servicePageId: string) =>
    apiClient.get<{ intro: ServicePageIntroDTO | null }>(
      `/api/admin/service-pages/intro?service_page_id=${servicePageId}`
    ),

  // Create or update intro
  save: (data: CreateServicePageIntroDTO) =>
    apiClient.post<CreateServicePageIntroResponse>(
      '/api/admin/service-pages/intro',
      data
    ),
};

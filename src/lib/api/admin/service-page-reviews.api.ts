import { apiClient } from '@/lib/api/client';

export interface ServicePageReviewsDTO {
  id: string;
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string | null;
  description_en: string | null;
  eye_text_nl: string;
  eye_text_en: string;
  created_at: string;
  updated_at: string;
}

export interface SaveServicePageReviewsDTO {
  headingNl: string;
  headingEn: string;
  descriptionNl: string;
  descriptionEn: string;
  eyeTextNl: string;
  eyeTextEn: string;
}

export const adminServicePageReviewsApi = {
  async getByServicePageId(
    servicePageId: string | null
  ): Promise<ServicePageReviewsDTO | null> {
    if (!servicePageId) return null;

    const response = await apiClient.get<ServicePageReviewsDTO>(
      `/api/admin/service-pages/reviews?servicePageId=${servicePageId}`
    );

    return response;
  },

  async save(payload: {
    servicePageId: string;
    headingNl: string;
    headingEn: string;
    descriptionNl: string;
    descriptionEn: string;
    eyeTextNl: string;
    eyeTextEn: string;
  }): Promise<{ message: string; data: ServicePageReviewsDTO }> {
    return apiClient.post('/api/admin/service-pages/reviews', {
      service_page_id: payload.servicePageId,
      heading_nl: payload.headingNl,
      heading_en: payload.headingEn,
      description_nl: payload.descriptionNl,
      description_en: payload.descriptionEn,
      eye_text_nl: payload.eyeTextNl,
      eye_text_en: payload.eyeTextEn,
    });
  },
};

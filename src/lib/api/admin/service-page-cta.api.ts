'use server';

import { apiClient } from '@/lib/api/client';

export interface ServicePageCtaDTO {
  id: string;
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string | null;
  description_en: string | null;
  button_text_nl: string;
  button_text_en: string;
  cta_link: string;
  created_at: string;
  updated_at: string;
}

export interface SaveServicePageCtaDTO {
  headingNl: string;
  headingEn: string;
  descriptionNl: string;
  descriptionEn: string;
  buttonTextNl: string;
  buttonTextEn: string;
  ctaLink: string;
}

export const adminServicePageCtaApi = {
  async getByServicePageId(
    servicePageId: string | null
  ): Promise<ServicePageCtaDTO | null> {
    if (!servicePageId) return null;

    const response = await apiClient.get<ServicePageCtaDTO>(
      `/api/admin/service-pages/cta?servicePageId=${servicePageId}`
    );

    return response;
  },

  async save(payload: {
    servicePageId: string;
    headingNl: string;
    headingEn: string;
    descriptionNl: string;
    descriptionEn: string;
    buttonTextNl: string;
    buttonTextEn: string;
    ctaLink: string;
  }): Promise<{ message: string; data: ServicePageCtaDTO }> {
    return apiClient.post('/api/admin/service-pages/cta', {
      service_page_id: payload.servicePageId,
      heading_nl: payload.headingNl,
      heading_en: payload.headingEn,
      description_nl: payload.descriptionNl,
      description_en: payload.descriptionEn,
      button_text_nl: payload.buttonTextNl,
      button_text_en: payload.buttonTextEn,
      cta_link: payload.ctaLink,
    });
  },
};

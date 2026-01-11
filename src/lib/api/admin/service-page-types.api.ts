import { apiClient } from '@/lib/api/client';

export interface ServicePageTypesDTO {
  id: string;
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string | null;
  description_en: string | null;
  created_at: string;
  updated_at: string;
}

export interface SaveServicePageTypesDTO {
  headingNl: string;
  headingEn: string;
  descriptionNl: string;
  descriptionEn: string;
}

export const adminServicePageTypesApi = {
  async getByServicePageId(
    servicePageId: string | null
  ): Promise<ServicePageTypesDTO | null> {
    if (!servicePageId) return null;

    const response = await apiClient.get<ServicePageTypesDTO>(
      `/api/admin/service-pages/types?servicePageId=${servicePageId}`
    );

    return response;
  },

  async save(payload: {
    servicePageId: string;
    headingNl: string;
    headingEn: string;
    descriptionNl: string;
    descriptionEn: string;
  }): Promise<{ message: string; data: ServicePageTypesDTO }> {
    return apiClient.post('/api/admin/service-pages/types', {
      service_page_id: payload.servicePageId,
      heading_nl: payload.headingNl,
      heading_en: payload.headingEn,
      description_nl: payload.descriptionNl,
      description_en: payload.descriptionEn,
    });
  },
};

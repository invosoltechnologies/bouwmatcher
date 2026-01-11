import { apiClient } from '../client';

export interface ServicePageOverviewTableDTO {
  id: string;
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  content_nl: string;
  content_en: string;
  created_at: string;
  updated_at: string;
}

export interface SaveServicePageOverviewTableDTO {
  servicePageId: string;
  headingNl: string;
  headingEn: string;
  descriptionNl: string;
  descriptionEn: string;
  contentNl: string;
  contentEn: string;
}

export const adminServicePageOverviewTableApi = {
  getByServicePageId: async (
    servicePageId: string | null
  ): Promise<ServicePageOverviewTableDTO | null> => {
    if (!servicePageId) return null;
    return apiClient.get(
      `/api/admin/service-pages/overview-tables?service_page_id=${servicePageId}`
    );
  },

  save: async (data: SaveServicePageOverviewTableDTO): Promise<{
    message: string;
    overviewTable: ServicePageOverviewTableDTO;
  }> => {
    return apiClient.post('/api/admin/service-pages/overview-tables', {
      service_page_id: data.servicePageId,
      heading_nl: data.headingNl,
      heading_en: data.headingEn,
      description_nl: data.descriptionNl,
      description_en: data.descriptionEn,
      content_nl: data.contentNl,
      content_en: data.contentEn,
    });
  },
};

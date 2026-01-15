import { apiClient } from '../client';
import { sanitizeTableHTML } from '@/lib/utils/html-sanitizer';

export interface ServicePageTipsDTO {
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

export interface SaveServicePageTipsDTO {
  servicePageId: string;
  headingNl: string;
  headingEn: string;
  descriptionNl: string;
  descriptionEn: string;
  contentNl: string;
  contentEn: string;
}

export const adminServicePageTipsApi = {
  getByServicePageId: async (
    servicePageId: string | null
  ): Promise<ServicePageTipsDTO | null> => {
    if (!servicePageId) return null;
    return apiClient.get(
      `/api/admin/service-pages/tips?service_page_id=${servicePageId}`
    );
  },

  save: async (data: SaveServicePageTipsDTO): Promise<{
    message: string;
    tips: ServicePageTipsDTO;
  }> => {
    // Sanitize HTML content before saving
    const sanitizedContentNl = data.contentNl ? sanitizeTableHTML(data.contentNl) : data.contentNl;
    const sanitizedContentEn = data.contentEn ? sanitizeTableHTML(data.contentEn) : data.contentEn;

    return apiClient.post('/api/admin/service-pages/tips', {
      service_page_id: data.servicePageId,
      heading_nl: data.headingNl,
      heading_en: data.headingEn,
      description_nl: data.descriptionNl,
      description_en: data.descriptionEn,
      content_nl: sanitizedContentNl,
      content_en: sanitizedContentEn,
    });
  },
};

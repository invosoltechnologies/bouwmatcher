import { apiClient } from '../client';
import { sanitizeTableHTML } from '@/lib/utils/html-sanitizer';

export interface ServicePageComparisonTableDTO {
  id: string;
  service_page_id: string;
  heading_nl: string | null;
  heading_en: string | null;
  description_nl: string | null;
  description_en: string | null;
  content_nl: string | null;
  content_en: string | null;
  created_at: string;
  updated_at: string;
}

export interface SaveComparisonTableDTO {
  servicePageId: string;
  headingNl?: string;
  headingEn?: string;
  descriptionNl?: string;
  descriptionEn?: string;
  contentNl?: string;
  contentEn?: string;
}

export const adminServicePageComparisonTablesApi = {
  getByServicePageId: async (
    servicePageId: string | null
  ): Promise<ServicePageComparisonTableDTO | null> => {
    if (!servicePageId) return null;
    return apiClient.get(
      `/api/admin/service-pages/comparison-tables?service_page_id=${servicePageId}`
    );
  },

  save: async (
    data: SaveComparisonTableDTO
  ): Promise<{ message: string; comparisonTable: ServicePageComparisonTableDTO }> => {
    // Sanitize HTML content before saving
    const sanitizedContentNl = data.contentNl ? sanitizeTableHTML(data.contentNl) : data.contentNl;
    const sanitizedContentEn = data.contentEn ? sanitizeTableHTML(data.contentEn) : data.contentEn;

    return apiClient.post('/api/admin/service-pages/comparison-tables', {
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

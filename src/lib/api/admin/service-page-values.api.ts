import { apiClient } from '../client';

export interface ServicePageValueItemDTO {
  id: string;
  values_id: string;
  position: 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  icon_url: string | null;
  icon_alt_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServicePageValuesDTO {
  id: string;
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  center_text_nl: string;
  center_text_en: string;
  created_at: string;
  updated_at: string;
  items: ServicePageValueItemDTO[];
}

export interface SaveValueItemDTO {
  id?: string; // undefined for new items
  position: 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  icon_url: string | null;
  icon_alt_text: string | null;
}

export interface SaveServicePageValuesDTO {
  servicePageId: string;
  headingNl: string;
  headingEn: string;
  descriptionNl: string;
  descriptionEn: string;
  centerTextNl: string;
  centerTextEn: string;
  items: SaveValueItemDTO[];
}

export const adminServicePageValuesApi = {
  getByServicePageId: async (
    servicePageId: string | null
  ): Promise<ServicePageValuesDTO | null> => {
    if (!servicePageId) return null;
    return apiClient.get(
      `/api/admin/service-pages/values?service_page_id=${servicePageId}`
    );
  },

  save: async (data: SaveServicePageValuesDTO): Promise<{
    message: string;
    values: ServicePageValuesDTO;
  }> => {
    return apiClient.post('/api/admin/service-pages/values', {
      service_page_id: data.servicePageId,
      heading_nl: data.headingNl,
      heading_en: data.headingEn,
      description_nl: data.descriptionNl,
      description_en: data.descriptionEn,
      center_text_nl: data.centerTextNl,
      center_text_en: data.centerTextEn,
      items: data.items,
    });
  },

  uploadIcon: async (
    file: File,
    bucket: string = 'service-pages'
  ): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);

    return apiClient.post('/api/admin/upload', formData);
  },
};

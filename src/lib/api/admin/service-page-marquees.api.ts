import { apiClient } from '@/lib/api/client';

export interface ServicePageMarqueeItemDTO {
  id: string;
  marquee_id: string;
  text_nl: string;
  text_en: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServicePageMarqueeDTO {
  id: string;
  service_page_id: string;
  is_enabled: boolean;
  after_sections: string[];
  items: ServicePageMarqueeItemDTO[];
  created_at: string;
  updated_at: string;
}

export interface SaveMarqueeItemDTO {
  text_nl: string;
  text_en: string;
  display_order: number;
}

export interface SaveServicePageMarqueeDTO {
  servicePageId: string;
  isEnabled: boolean;
  afterSections: string[];
  items: SaveMarqueeItemDTO[];
}

export const adminServicePageMarqueesApi = {
  async getByServicePageId(
    servicePageId: string | null
  ): Promise<ServicePageMarqueeDTO | null> {
    if (!servicePageId) return null;

    const response = await apiClient.get<ServicePageMarqueeDTO>(
      `/api/admin/service-pages/marquees?servicePageId=${servicePageId}`
    );

    return response;
  },

  async save(payload: {
    servicePageId: string;
    isEnabled: boolean;
    afterSections: string[];
    items: SaveMarqueeItemDTO[];
  }): Promise<{ message: string; data: ServicePageMarqueeDTO }> {
    return apiClient.post('/api/admin/service-pages/marquees', {
      service_page_id: payload.servicePageId,
      is_enabled: payload.isEnabled,
      after_sections: payload.afterSections,
      items: payload.items,
    });
  },
};

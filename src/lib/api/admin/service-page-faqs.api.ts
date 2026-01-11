import { apiClient } from '../client';

export interface ServicePageFaqDTO {
  id: string;
  service_page_id: string;
  heading_nl: string | null;
  heading_en: string | null;
  description_nl: string | null;
  description_en: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServicePageFaqItemDTO {
  id: string;
  service_page_faq_id: string;
  question_nl: string;
  question_en: string;
  answer_nl: string;
  answer_en: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SaveFaqDTO {
  servicePageId: string;
  headingNl?: string;
  headingEn?: string;
  descriptionNl?: string;
  descriptionEn?: string;
}

export interface CreateFaqItemDTO {
  faqId: string;
  questionNl: string;
  questionEn: string;
  answerNl: string;
  answerEn: string;
}

export interface UpdateFaqItemDTO {
  id: string;
  questionNl: string;
  questionEn: string;
  answerNl: string;
  answerEn: string;
}

export interface ReorderFaqItemsDTO {
  faqId: string;
  itemIds: string[];
}

export const adminServicePageFaqsApi = {
  getByServicePageId: async (
    servicePageId: string | null
  ): Promise<ServicePageFaqDTO | null> => {
    if (!servicePageId) return null;
    return apiClient.get(`/api/admin/service-pages/faqs?service_page_id=${servicePageId}`);
  },

  save: async (data: SaveFaqDTO): Promise<{ message: string; faq: ServicePageFaqDTO }> => {
    return apiClient.post('/api/admin/service-pages/faqs', {
      service_page_id: data.servicePageId,
      heading_nl: data.headingNl,
      heading_en: data.headingEn,
      description_nl: data.descriptionNl,
      description_en: data.descriptionEn,
    });
  },

  getItems: async (faqId: string): Promise<ServicePageFaqItemDTO[]> => {
    return apiClient.get(`/api/admin/service-pages/faqs/items?faq_id=${faqId}`);
  },

  createItem: async (data: CreateFaqItemDTO): Promise<{ message: string; item: ServicePageFaqItemDTO }> => {
    return apiClient.post('/api/admin/service-pages/faqs/items', {
      service_page_faq_id: data.faqId,
      question_nl: data.questionNl,
      question_en: data.questionEn,
      answer_nl: data.answerNl,
      answer_en: data.answerEn,
    });
  },

  updateItem: async (data: UpdateFaqItemDTO): Promise<{ message: string; item: ServicePageFaqItemDTO }> => {
    return apiClient.patch(`/api/admin/service-pages/faqs/items/${data.id}`, {
      question_nl: data.questionNl,
      question_en: data.questionEn,
      answer_nl: data.answerNl,
      answer_en: data.answerEn,
    });
  },

  deleteItem: async (itemId: string): Promise<{ message: string }> => {
    return apiClient.delete(`/api/admin/service-pages/faqs/items/${itemId}`);
  },

  reorderItems: async (data: ReorderFaqItemsDTO): Promise<{ message: string }> => {
    return apiClient.patch('/api/admin/service-pages/faqs/items/reorder', {
      faq_id: data.faqId,
      item_ids: data.itemIds,
    });
  },
};

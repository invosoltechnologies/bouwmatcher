import { apiClient } from '../client';

export interface ServicePageProcessStepDTO {
  id: string;
  process_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  image_url: string | null;
  icon_url: string | null;
  step_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServicePageProcessDTO {
  id: string;
  service_page_id: string;
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  created_at: string;
  updated_at: string;
  steps: ServicePageProcessStepDTO[];
}

export interface SaveServicePageProcessDTO {
  servicePageId: string;
  headingNl: string;
  headingEn: string;
  descriptionNl: string;
  descriptionEn: string;
  steps: SaveProcessStepDTO[];
}

export interface SaveProcessStepDTO {
  id?: string; // undefined for new steps
  heading_nl: string;
  heading_en: string;
  description_nl: string;
  description_en: string;
  image_url: string | null;
  icon_url: string | null;
  step_order: number;
}

export const adminServicePageProcessApi = {
  getByServicePageId: async (
    servicePageId: string | null
  ): Promise<ServicePageProcessDTO | null> => {
    if (!servicePageId) return null;
    return apiClient.get(
      `/api/admin/service-pages/process?service_page_id=${servicePageId}`
    );
  },

  save: async (data: SaveServicePageProcessDTO): Promise<{
    message: string;
    process: ServicePageProcessDTO;
  }> => {
    return apiClient.post('/api/admin/service-pages/process', {
      service_page_id: data.servicePageId,
      heading_nl: data.headingNl,
      heading_en: data.headingEn,
      description_nl: data.descriptionNl,
      description_en: data.descriptionEn,
      steps: data.steps,
    });
  },

  uploadImage: async (
    file: File,
    bucket: string = 'service-pages'
  ): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);

    return apiClient.post('/api/admin/upload', formData);
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

  deleteStep: async (stepId: string): Promise<{ message: string }> => {
    return apiClient.post('/api/admin/service-pages/process/delete-step', {
      step_id: stepId,
    });
  },
};

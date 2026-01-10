import { apiClient } from '@/lib/api/client';

export interface ServicePageDTO {
  id: string;
  service_category_id: string;
  status: 'draft' | 'pending' | 'active';
  created_by?: string;
  updated_by?: string;
  published_by?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  category_name?: string;
  category_name_nl?: string;
  category_name_en?: string;
}

export interface CreateServicePageDTO {
  service_category_id: string;
}

export interface UpdateServicePageDTO {
  status?: 'draft' | 'pending' | 'active';
}

export const adminServicePagesApi = {
  // Get all service pages
  getAll: (search?: string, status?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    const queryString = params.toString();
    return apiClient.get<{ servicePages: ServicePageDTO[]; total: number }>(
      `/api/admin/service-pages${queryString ? '?' + queryString : ''}`
    );
  },

  // Create a new service page
  create: (data: CreateServicePageDTO) =>
    apiClient.post<{ servicePage: ServicePageDTO; message: string }>(
      '/api/admin/service-pages',
      data
    ),

  // Update a service page
  update: (id: string, data: UpdateServicePageDTO) =>
    apiClient.patch<{ servicePage: ServicePageDTO; message: string }>(
      `/api/admin/service-pages/${id}`,
      data
    ),

  // Delete a service page
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(
      `/api/admin/service-pages/${id}`
    ),

  // Get single service page
  getById: (id: string) =>
    apiClient.get<{ servicePage: ServicePageDTO }>(
      `/api/admin/service-pages/${id}`
    ),
};

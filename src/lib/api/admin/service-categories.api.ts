import { apiClient } from '@/lib/api/client';
import { ServiceCategory, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/categories';

export const adminServiceCategoriesApi = {
  // Get all categories (including inactive and deleted)
  getAll: () =>
    apiClient.get<{ serviceCategories: ServiceCategory[] }>(
      '/api/admin/service-categories'
    ),

  // Create a new category
  create: (data: CreateCategoryDTO) =>
    apiClient.post<{ category: ServiceCategory; message: string }>(
      '/api/admin/service-categories',
      data
    ),

  // Update a category
  update: (id: number, data: UpdateCategoryDTO) =>
    apiClient.patch<{ category: ServiceCategory; message: string }>(
      `/api/admin/service-categories/${id}`,
      data
    ),

  // Toggle active/inactive status
  toggleStatus: (id: number, isActive: boolean) =>
    apiClient.patch<{ category: ServiceCategory; message: string }>(
      `/api/admin/service-categories/${id}`,
      { is_active: isActive }
    ),

  // Soft delete a category
  delete: (id: number) =>
    apiClient.delete<{ message: string }>(
      `/api/admin/service-categories/${id}`
    ),
};

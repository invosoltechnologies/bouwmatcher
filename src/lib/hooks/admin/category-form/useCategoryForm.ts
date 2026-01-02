import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import {
  CreateCategoryDraftDTO,
  CategoryDraftResponse,
  CreateSubcategoryDTO,
  SubcategoryResponse,
  CategoryFullDataResponse,
  IconUploadResponse,
} from '@/types/admin/category-form';

// ============================================================================
// Query Keys
// ============================================================================

export const categoryFormKeys = {
  all: ['admin', 'category-form'] as const,
  fullData: (categoryId: number) => ['admin', 'category-form', 'full', categoryId] as const,
};

// ============================================================================
// Mutations
// ============================================================================

/**
 * Hook to create a category draft (Step 1)
 */
export function useCreateCategoryDraft() {
  const queryClient = useQueryClient();

  return useMutation<CategoryDraftResponse, Error, CreateCategoryDraftDTO>({
    mutationFn: async (data) => {
      return apiClient.post<CategoryDraftResponse>('/api/admin/service-categories/draft', data);
    },
    onSuccess: () => {
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: ['admin', 'service-categories'] });
    },
  });
}

/**
 * Hook to update category basic info
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { categoryId: number; name_nl: string; name_en: string; slug: string }
  >({
    mutationFn: async ({ categoryId, name_nl, name_en, slug }) => {
      return apiClient.patch<void>(
        `/api/admin/service-categories/${categoryId}`,
        { name_nl, name_en, slug }
      );
    },
    onSuccess: (_, variables) => {
      // Invalidate category data
      queryClient.invalidateQueries({
        queryKey: categoryFormKeys.fullData(variables.categoryId),
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'service-categories'] });
    },
  });
}

/**
 * Hook to update root question
 */
export function useUpdateRootQuestion() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { categoryId: number; question_text_nl: string; question_text_en: string }
  >({
    mutationFn: async ({ categoryId, question_text_nl, question_text_en }) => {
      return apiClient.patch<void>(
        `/api/admin/service-categories/${categoryId}/root-question`,
        { question_text_nl, question_text_en }
      );
    },
    onSuccess: (_, variables) => {
      // Invalidate category data
      queryClient.invalidateQueries({
        queryKey: categoryFormKeys.fullData(variables.categoryId),
      });
    },
  });
}

/**
 * Hook to upload category icon
 */
export function useUploadCategoryIcon() {
  const queryClient = useQueryClient();

  return useMutation<
    IconUploadResponse,
    Error,
    { categoryId: number; formData: FormData }
  >({
    mutationFn: async ({ categoryId, formData }) => {
      return apiClient.post<IconUploadResponse>(
        `/api/admin/service-categories/${categoryId}/icon`,
        formData
      );
    },
    onSuccess: (_, variables) => {
      // Invalidate category data
      queryClient.invalidateQueries({
        queryKey: categoryFormKeys.fullData(variables.categoryId),
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'service-categories'] });
    },
  });
}

/**
 * Hook to create a subcategory with questions and options
 */
export function useCreateSubcategory() {
  const queryClient = useQueryClient();

  return useMutation<
    SubcategoryResponse,
    Error,
    { categoryId: number; data: CreateSubcategoryDTO }
  >({
    mutationFn: async ({ categoryId, data }) => {
      return apiClient.post<SubcategoryResponse>(
        `/api/admin/service-categories/${categoryId}/subcategories`,
        data
      );
    },
    onSuccess: (_, variables) => {
      // Invalidate full category data
      queryClient.invalidateQueries({
        queryKey: categoryFormKeys.fullData(variables.categoryId),
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'service-categories'] });
    },
  });
}

// ============================================================================
// Queries
// ============================================================================

/**
 * Hook to fetch full category data (for edit mode)
 */
export function useCategoryFullData(categoryId: number | null, options?: { enabled?: boolean }) {
  return useQuery<CategoryFullDataResponse, Error>({
    queryKey: categoryFormKeys.fullData(categoryId!),
    queryFn: async () => {
      return apiClient.get<CategoryFullDataResponse>(
        `/api/admin/service-categories/${categoryId}/full`
      );
    },
    enabled: !!categoryId && (options?.enabled !== false),
  });
}

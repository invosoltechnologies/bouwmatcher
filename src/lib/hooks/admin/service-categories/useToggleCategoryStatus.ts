import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServiceCategoriesApi } from '@/lib/api/admin/service-categories.api';
import { adminCategoryKeys } from './useAdminServiceCategories';

export function useToggleCategoryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      adminServiceCategoriesApi.toggleStatus(id, isActive),
    onSuccess: (data, variables) => {
      // Invalidate both the list and specific category
      queryClient.invalidateQueries({
        queryKey: adminCategoryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: adminCategoryKeys.detail(variables.id),
      });
    },
  });
}

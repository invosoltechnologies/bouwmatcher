import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServiceCategoriesApi } from '@/lib/api/admin/service-categories.api';
import { UpdateCategoryDTO } from '@/types/categories';
import { adminCategoryKeys } from './useAdminServiceCategories';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryDTO }) =>
      adminServiceCategoriesApi.update(id, data),
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

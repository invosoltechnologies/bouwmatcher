import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServiceCategoriesApi } from '@/lib/api/admin/service-categories.api';
import { adminCategoryKeys } from './useAdminServiceCategories';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminServiceCategoriesApi.delete(id),
    onSuccess: () => {
      // Invalidate the categories list to refresh
      queryClient.invalidateQueries({
        queryKey: adminCategoryKeys.lists(),
      });
    },
  });
}

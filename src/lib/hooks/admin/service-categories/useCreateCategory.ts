import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServiceCategoriesApi } from '@/lib/api/admin/service-categories.api';
import { CreateCategoryDTO } from '@/types/categories';
import { adminCategoryKeys } from './useAdminServiceCategories';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDTO) =>
      adminServiceCategoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminCategoryKeys.lists(),
      });
    },
  });
}

import { useQuery } from '@tanstack/react-query';
import { adminServiceCategoriesApi } from '@/lib/api/admin/service-categories.api';
import { ServiceCategory } from '@/types/categories';

export const adminCategoryKeys = {
  all: ['admin', 'service-categories'] as const,
  lists: () => [...adminCategoryKeys.all, 'list'] as const,
  detail: (id: number) => [...adminCategoryKeys.all, 'detail', id] as const,
};

export function useAdminServiceCategories() {
  return useQuery({
    queryKey: adminCategoryKeys.lists(),
    queryFn: async () => {
      const response = await adminServiceCategoriesApi.getAll();
      return response.serviceCategories;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

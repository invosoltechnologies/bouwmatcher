import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePagesApi } from '@/lib/api/admin/service-pages.api';
import { servicePagesQueryKeys } from './useServicePages';
import toast from 'react-hot-toast';

export function useCreateServicePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) =>
      await adminServicePagesApi.create({ service_category_id: categoryId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.lists(),
      });
      toast.success(data.message || 'Service page created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create service page');
    },
  });
}

export function useUpdateServicePageStatus(pageId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: 'draft' | 'pending' | 'active') =>
      await adminServicePagesApi.update(pageId, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.detail(pageId),
      });
      toast.success(data.message || 'Status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update status');
    },
  });
}

export function useDeleteServicePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pageId: string) =>
      await adminServicePagesApi.delete(pageId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.lists(),
      });
      toast.success(data.message || 'Service page deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete service page');
    },
  });
}

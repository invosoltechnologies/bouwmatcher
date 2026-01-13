import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePagesApi } from '@/lib/api/admin/service-pages.api';
import { servicePagesQueryKeys } from './useServicePages';
import toast from 'react-hot-toast';

export function useCreateServicePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      categoryId: string;
      metaTitleNl?: string;
      metaTitleEn?: string;
      metaDescriptionNl?: string;
      metaDescriptionEn?: string;
    }) =>
      await adminServicePagesApi.create({
        service_category_id: data.categoryId,
        meta_title_nl: data.metaTitleNl,
        meta_title_en: data.metaTitleEn,
        meta_description_nl: data.metaDescriptionNl,
        meta_description_en: data.metaDescriptionEn,
      }),
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

export function useUpdateServicePageStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      pageId,
      status,
    }: {
      pageId: string;
      status: 'draft' | 'pending' | 'active';
    }) => await adminServicePagesApi.update(pageId, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.lists(),
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

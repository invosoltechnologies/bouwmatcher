import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageFaqsApi } from '@/lib/api/admin/service-page-faqs.api';
import { servicePageFaqQueryKeys } from './useServicePageFaq';
import { servicePageFaqItemsQueryKeys } from './useServicePageFaqItems';
import toast from 'react-hot-toast';

export function useSaveServicePageFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageFaqsApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageFaqQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'FAQ section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save FAQ section');
    },
  });
}

export function useCreateFaqItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageFaqsApi.createItem,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageFaqItemsQueryKeys.byFaqId(variables.faqId),
      });
      toast.success(data.message || 'FAQ item added successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to add FAQ item');
    },
  });
}

export function useUpdateFaqItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageFaqsApi.updateItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: servicePageFaqItemsQueryKeys.all,
      });
      toast.success(data.message || 'FAQ item updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update FAQ item');
    },
  });
}

export function useDeleteFaqItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageFaqsApi.deleteItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: servicePageFaqItemsQueryKeys.all,
      });
      toast.success(data.message || 'FAQ item deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete FAQ item');
    },
  });
}

export function useReorderFaqItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageFaqsApi.reorderItems,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageFaqItemsQueryKeys.byFaqId(variables.faqId),
      });
      toast.success(data.message || 'FAQ items reordered successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to reorder FAQ items');
    },
  });
}

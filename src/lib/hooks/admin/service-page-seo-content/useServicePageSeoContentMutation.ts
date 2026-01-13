import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageSeoContentApi } from '@/lib/api/admin/service-page-seo-content.api';
import { servicePageSeoContentQueryKeys } from './useServicePageSeoContent';
import toast from 'react-hot-toast';

export function useSaveServicePageSeoContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageSeoContentApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageSeoContentQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'SEO content section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save SEO content section');
    },
  });
}

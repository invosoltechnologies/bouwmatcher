import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageCtaApi } from '@/lib/api/admin/service-page-cta.api';
import { servicePageCtaQueryKeys } from './useServicePageCta';
import toast from 'react-hot-toast';

export function useSaveServicePageCta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageCtaApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageCtaQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'CTA section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save CTA section');
    },
  });
}

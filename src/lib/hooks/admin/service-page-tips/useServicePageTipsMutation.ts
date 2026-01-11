import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageTipsApi } from '@/lib/api/admin/service-page-tips.api';
import { servicePageTipsQueryKeys } from './useServicePageTips';
import toast from 'react-hot-toast';

export function useSaveServicePageTips() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageTipsApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageTipsQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'Tips section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Tips section');
    },
  });
}

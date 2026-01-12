import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageMarqueesApi } from '@/lib/api/admin/service-page-marquees.api';
import { servicePageMarqueesQueryKeys } from './useServicePageMarquees';
import toast from 'react-hot-toast';

export function useSaveServicePageMarquees() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageMarqueesApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageMarqueesQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'Marquee section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Marquee section');
    },
  });
}

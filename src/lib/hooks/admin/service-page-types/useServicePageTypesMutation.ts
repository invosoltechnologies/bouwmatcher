import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageTypesApi } from '@/lib/api/admin/service-page-types.api';
import { servicePageTypesQueryKeys } from './useServicePageTypes';
import toast from 'react-hot-toast';

export function useSaveServicePageTypes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageTypesApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageTypesQueryKeys.byServicePageId(
          variables.servicePageId
        ),
      });
      toast.success(data.message || 'Types section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Types section');
    },
  });
}

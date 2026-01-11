import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageOverviewTableApi } from '@/lib/api/admin/service-page-overview-tables.api';
import { servicePageOverviewTableQueryKeys } from './useServicePageOverviewTable';
import toast from 'react-hot-toast';

export function useSaveServicePageOverviewTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageOverviewTableApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageOverviewTableQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'Overview table section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Overview table section');
    },
  });
}

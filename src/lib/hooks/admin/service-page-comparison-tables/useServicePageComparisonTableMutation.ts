import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageComparisonTablesApi } from '@/lib/api/admin/service-page-comparison-tables.api';
import { servicePageComparisonTableQueryKeys } from './useServicePageComparisonTable';
import toast from 'react-hot-toast';

export function useSaveServicePageComparisonTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageComparisonTablesApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageComparisonTableQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'Comparison Table section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Comparison Table section');
    },
  });
}

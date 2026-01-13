import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageValuesApi } from '@/lib/api/admin/service-page-values.api';
import { servicePageValuesQueryKeys } from './useServicePageValues';
import toast from 'react-hot-toast';

export function useSaveServicePageValues() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageValuesApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageValuesQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'Values section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Values section');
    },
  });
}

export function useUploadValueIcon() {
  return useMutation({
    mutationFn: ({ file, bucket }: { file: File; bucket?: string }) =>
      adminServicePageValuesApi.uploadIcon(file, bucket),
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to upload icon');
    },
  });
}

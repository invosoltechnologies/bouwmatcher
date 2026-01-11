import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminServicePageProcessApi } from '@/lib/api/admin/service-page-process.api';
import { servicePageProcessQueryKeys } from './useServicePageProcess';
import toast from 'react-hot-toast';

export function useSaveServicePageProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminServicePageProcessApi.save,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePageProcessQueryKeys.byServicePageId(variables.servicePageId),
      });
      toast.success(data.message || 'Process section saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save Process section');
    },
  });
}

export function useUploadProcessImage() {
  return useMutation({
    mutationFn: ({ file, bucket }: { file: File; bucket?: string }) =>
      adminServicePageProcessApi.uploadImage(file, bucket),
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to upload image');
    },
  });
}

export function useUploadProcessIcon() {
  return useMutation({
    mutationFn: ({ file, bucket }: { file: File; bucket?: string }) =>
      adminServicePageProcessApi.uploadIcon(file, bucket),
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to upload icon');
    },
  });
}

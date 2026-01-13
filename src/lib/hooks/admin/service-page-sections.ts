import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminServicePagesApi, SectionsConfig } from '@/lib/api/admin/service-pages.api';
import toast from 'react-hot-toast';

export const servicePagesQueryKeys = {
  all: ['servicePages'] as const,
  sections: (servicePageId: string) => [...servicePagesQueryKeys.all, 'sections', servicePageId] as const,
};

export function useServicePageSections(servicePageId: string | null) {
  return useQuery({
    queryKey: servicePagesQueryKeys.sections(servicePageId || ''),
    queryFn: () => adminServicePagesApi.getSectionsConfig(servicePageId!),
    enabled: !!servicePageId,
  });
}

export function useAddSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ servicePageId, sectionKey }: { servicePageId: string; sectionKey: string }) =>
      adminServicePagesApi.addSection(servicePageId, sectionKey),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.sections(variables.servicePageId),
      });
      toast.success('Section added successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to add section');
    },
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ servicePageId, sectionKey }: { servicePageId: string; sectionKey: string }) =>
      adminServicePagesApi.deleteSection(servicePageId, sectionKey),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.sections(variables.servicePageId),
      });
      toast.success('Section deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete section');
    },
  });
}

export function useReorderSections() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ servicePageId, order }: { servicePageId: string; order: string[] }) =>
      adminServicePagesApi.reorderSections(servicePageId, order),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: servicePagesQueryKeys.sections(variables.servicePageId),
      });
      toast.success('Sections reordered successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to reorder sections');
    },
  });
}

export function usePublishPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ servicePageId, status }: { servicePageId: string; status: 'draft' | 'pending' | 'active' }) =>
      adminServicePagesApi.publishPage(servicePageId, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['servicePages'],
      });
      const statusText = variables.status === 'active' ? 'published' : 'saved as pending';
      toast.success(`Page ${statusText} successfully`);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to publish page');
    },
  });
}

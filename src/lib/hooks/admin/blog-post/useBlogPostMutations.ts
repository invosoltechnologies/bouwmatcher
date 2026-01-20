import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBlogPostApi } from '@/lib/api/admin/blog-post.api';
import { blogPostQueryKeys } from './useBlogPosts';
import toast from 'react-hot-toast';
import type {
  CreateBlogPostDTO,
  UpdateBlogPostStatusDTO,
} from '@/types/dto/blog-post.dto';

export function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogPostDTO) => adminBlogPostApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogPostQueryKeys.lists() });
      toast.success('Blog post created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create blog post');
    },
  });
}

export function useUpdateBlogPostStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBlogPostStatusDTO) =>
      adminBlogPostApi.updateStatus(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: blogPostQueryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: blogPostQueryKeys.detail(variables.id),
      });
      toast.success('Blog post status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update blog post status');
    },
  });
}

export function usePublishBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: 'draft' | 'pending' | 'published' }) =>
      adminBlogPostApi.publish(data.id, data.status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: blogPostQueryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: blogPostQueryKeys.detail(variables.id),
      });
      toast.success('Blog post published successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to publish blog post');
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminBlogPostApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogPostQueryKeys.lists() });
      toast.success('Blog post deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete blog post');
    },
  });
}

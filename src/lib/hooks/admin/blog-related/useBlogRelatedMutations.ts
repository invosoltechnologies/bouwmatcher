import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBlogRelatedApi } from '@/lib/api/admin/blog-related.api';
import { blogRelatedQueryKeys } from './useBlogRelated';
import { blogPostQueryKeys } from '../blog-post';
import toast from 'react-hot-toast';
import type {
  AddRelatedPostDTO,
  ReorderRelatedPostsDTO,
} from '@/types/dto/blog-post.dto';

export function useAddRelatedPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddRelatedPostDTO) => adminBlogRelatedApi.add(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: blogRelatedQueryKeys.byBlogPostId(variables.blog_post_id),
      });
      queryClient.invalidateQueries({
        queryKey: blogPostQueryKeys.detail(variables.blog_post_id),
      });
      toast.success('Related post added successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add related post');
    },
  });
}

export function useRemoveRelatedPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; blog_post_id: string }) =>
      adminBlogRelatedApi.remove(data.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: blogRelatedQueryKeys.byBlogPostId(variables.blog_post_id),
      });
      queryClient.invalidateQueries({
        queryKey: blogPostQueryKeys.detail(variables.blog_post_id),
      });
      toast.success('Related post removed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove related post');
    },
  });
}

export function useReorderRelatedPosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReorderRelatedPostsDTO) => adminBlogRelatedApi.reorder(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: blogRelatedQueryKeys.byBlogPostId(variables.blog_post_id),
      });
      queryClient.invalidateQueries({
        queryKey: blogPostQueryKeys.detail(variables.blog_post_id),
      });
      toast.success('Related posts reordered successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reorder related posts');
    },
  });
}

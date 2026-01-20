import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBlogContentApi } from '@/lib/api/admin/blog-content.api';
import { blogContentQueryKeys } from './useBlogContent';
import { blogPostQueryKeys } from '../blog-post';
import toast from 'react-hot-toast';
import type { SaveBlogContentDTO } from '@/types/dto/blog-post.dto';

export function useSaveBlogContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveBlogContentDTO) => adminBlogContentApi.save(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: blogContentQueryKeys.byBlogPostId(variables.blog_post_id),
      });
      queryClient.invalidateQueries({
        queryKey: blogPostQueryKeys.detail(variables.blog_post_id),
      });
      queryClient.invalidateQueries({ queryKey: blogPostQueryKeys.lists() });
      toast.success('Content saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save content');
    },
  });
}

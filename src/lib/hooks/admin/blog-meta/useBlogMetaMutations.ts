import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBlogMetaApi } from '@/lib/api/admin/blog-meta.api';
import { blogMetaQueryKeys } from './useBlogMeta';
import { blogPostQueryKeys } from '../blog-post';
import toast from 'react-hot-toast';
import type { SaveBlogMetaDTO } from '@/types/dto/blog-post.dto';

export function useSaveBlogMeta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveBlogMetaDTO) => adminBlogMetaApi.save(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: blogMetaQueryKeys.byBlogPostId(variables.blog_post_id),
      });
      queryClient.invalidateQueries({
        queryKey: blogPostQueryKeys.detail(variables.blog_post_id),
      });
      toast.success('SEO metadata saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save SEO metadata');
    },
  });
}

import { useQuery } from '@tanstack/react-query';
import { adminBlogPostApi } from '@/lib/api/admin/blog-post.api';
import type { GetBlogPostsQueryDTO } from '@/types/dto/blog-post.dto';

export const blogPostQueryKeys = {
  all: ['admin', 'blog-posts'] as const,
  lists: () => [...blogPostQueryKeys.all, 'list'] as const,
  list: (params?: GetBlogPostsQueryDTO) =>
    [...blogPostQueryKeys.lists(), params] as const,
  details: () => [...blogPostQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogPostQueryKeys.details(), id] as const,
};

export function useBlogPosts(params?: GetBlogPostsQueryDTO) {
  return useQuery({
    queryKey: blogPostQueryKeys.list(params),
    queryFn: () => adminBlogPostApi.getAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBlogPost(id: string | null) {
  return useQuery({
    queryKey: blogPostQueryKeys.detail(id || ''),
    queryFn: async () => {
      if (!id) return null;
      return adminBlogPostApi.getById(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

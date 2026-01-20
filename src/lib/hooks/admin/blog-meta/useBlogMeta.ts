import { useQuery } from '@tanstack/react-query';
import { adminBlogMetaApi } from '@/lib/api/admin/blog-meta.api';

export const blogMetaQueryKeys = {
  all: ['admin', 'blog-meta'] as const,
  byBlogPostId: (blogPostId: string) =>
    [...blogMetaQueryKeys.all, blogPostId] as const,
};

export function useBlogMeta(blogPostId: string | null) {
  return useQuery({
    queryKey: blogMetaQueryKeys.byBlogPostId(blogPostId || ''),
    queryFn: async () => {
      if (!blogPostId) return null;
      return adminBlogMetaApi.getByBlogPostId(blogPostId);
    },
    enabled: !!blogPostId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

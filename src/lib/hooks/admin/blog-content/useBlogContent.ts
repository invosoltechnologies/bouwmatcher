import { useQuery } from '@tanstack/react-query';
import { adminBlogContentApi } from '@/lib/api/admin/blog-content.api';

export const blogContentQueryKeys = {
  all: ['admin', 'blog-content'] as const,
  byBlogPostId: (blogPostId: string) =>
    [...blogContentQueryKeys.all, blogPostId] as const,
};

export function useBlogContent(blogPostId: string | null) {
  return useQuery({
    queryKey: blogContentQueryKeys.byBlogPostId(blogPostId || ''),
    queryFn: async () => {
      if (!blogPostId) return null;
      return adminBlogContentApi.getByBlogPostId(blogPostId);
    },
    enabled: !!blogPostId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

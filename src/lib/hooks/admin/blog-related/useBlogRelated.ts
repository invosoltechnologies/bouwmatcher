import { useQuery } from '@tanstack/react-query';
import { adminBlogRelatedApi } from '@/lib/api/admin/blog-related.api';

export const blogRelatedQueryKeys = {
  all: ['admin', 'blog-related'] as const,
  byBlogPostId: (blogPostId: string) =>
    [...blogRelatedQueryKeys.all, blogPostId] as const,
};

export function useBlogRelated(blogPostId: string | null) {
  return useQuery({
    queryKey: blogRelatedQueryKeys.byBlogPostId(blogPostId || ''),
    queryFn: async () => {
      if (!blogPostId) return [];
      return adminBlogRelatedApi.getByBlogPostId(blogPostId);
    },
    enabled: !!blogPostId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

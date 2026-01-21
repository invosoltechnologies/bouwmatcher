import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { BlogPostFull } from '@/types/models/blog-post.model';

/**
 * Fetch published blog posts from the public API
 */
export function usePublishedBlogs(params?: {
  service_category_id?: string;
  service_subcategory_id?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ['published-blogs', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params?.service_category_id) {
        searchParams.append('service_category_id', params.service_category_id);
      }
      if (params?.service_subcategory_id) {
        searchParams.append('service_subcategory_id', params.service_subcategory_id);
      }
      if (params?.limit) {
        searchParams.append('limit', params.limit.toString());
      }
      if (params?.offset) {
        searchParams.append('offset', params.offset.toString());
      }

      const queryString = searchParams.toString();
      const url = `/api/blog${queryString ? `?${queryString}` : ''}`;

      const response = await apiClient.get<BlogPostFull[]>(url);
      return response;
    },
  });
}

/**
 * Fetch a single published blog post by slug
 */
export function usePublishedBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ['published-blog', slug],
    queryFn: async () => {
      const response = await apiClient.get<BlogPostFull>(`/api/blog/${slug}`);
      return response;
    },
    enabled: !!slug,
  });
}

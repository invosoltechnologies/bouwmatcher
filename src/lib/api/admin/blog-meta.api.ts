import { apiClient } from '@/lib/api/client';
import type { BlogPostMeta } from '@/types/models/blog-post.model';
import type { SaveBlogMetaDTO } from '@/types/dto/blog-post.dto';

export const adminBlogMetaApi = {
  // Get meta for a blog post
  getByBlogPostId: (blogPostId: string) =>
    apiClient.get<BlogPostMeta | null>(
      `/api/admin/blog/meta?blog_post_id=${blogPostId}`
    ),

  // Save (create or update) meta
  save: (data: SaveBlogMetaDTO) =>
    apiClient.post<BlogPostMeta>('/api/admin/blog/meta', data),
};

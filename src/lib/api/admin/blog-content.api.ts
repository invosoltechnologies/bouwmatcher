import { apiClient } from '@/lib/api/client';
import type { BlogPostContent } from '@/types/models/blog-post.model';
import type { SaveBlogContentDTO } from '@/types/dto/blog-post.dto';

export const adminBlogContentApi = {
  // Get content for a blog post
  getByBlogPostId: (blogPostId: string) =>
    apiClient.get<BlogPostContent | null>(
      `/api/admin/blog/content?blog_post_id=${blogPostId}`
    ),

  // Save (create or update) content
  save: (data: SaveBlogContentDTO) =>
    apiClient.post<BlogPostContent>('/api/admin/blog/content', data),
};

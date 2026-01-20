import { apiClient } from '@/lib/api/client';
import type { RelatedBlogPostWithContent } from '@/types/models/blog-post.model';
import type {
  AddRelatedPostDTO,
  ReorderRelatedPostsDTO,
} from '@/types/dto/blog-post.dto';

export const adminBlogRelatedApi = {
  // Get related posts for a blog post
  getByBlogPostId: (blogPostId: string) =>
    apiClient.get<RelatedBlogPostWithContent[]>(
      `/api/admin/blog/related?blog_post_id=${blogPostId}`
    ),

  // Add a related post
  add: (data: AddRelatedPostDTO) =>
    apiClient.post<RelatedBlogPostWithContent>('/api/admin/blog/related', data),

  // Remove a related post
  remove: (id: string) =>
    apiClient.delete<{ success: boolean }>(`/api/admin/blog/related?id=${id}`),

  // Reorder related posts
  reorder: (data: ReorderRelatedPostsDTO) =>
    apiClient.patch<{ success: boolean }>('/api/admin/blog/related', data),
};

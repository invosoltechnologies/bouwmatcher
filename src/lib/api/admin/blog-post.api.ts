import { apiClient } from '@/lib/api/client';
import type { BlogPost, BlogPostFull } from '@/types/models/blog-post.model';
import type {
  CreateBlogPostDTO,
  UpdateBlogPostStatusDTO,
  GetBlogPostsQueryDTO,
} from '@/types/dto/blog-post.dto';

export const adminBlogPostApi = {
  // Get all blog posts with optional filters
  getAll: (params?: GetBlogPostsQueryDTO) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.service_category_id)
      searchParams.append('service_category_id', params.service_category_id);
    if (params?.service_subcategory_id)
      searchParams.append('service_subcategory_id', params.service_subcategory_id);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());

    const queryString = searchParams.toString();
    return apiClient.get<BlogPostFull[]>(
      `/api/admin/blog${queryString ? `?${queryString}` : ''}`
    );
  },

  // Get a single blog post by ID
  getById: (id: string) =>
    apiClient.get<BlogPostFull>(`/api/admin/blog/${id}`),

  // Create a new blog post
  create: (data: CreateBlogPostDTO) =>
    apiClient.post<BlogPost>('/api/admin/blog', data),

  // Update blog post status
  updateStatus: (data: UpdateBlogPostStatusDTO) =>
    apiClient.patch<BlogPost>(`/api/admin/blog/${data.id}`, { status: data.status }),

  // Delete a blog post
  delete: (id: string) =>
    apiClient.delete<{ success: boolean }>(`/api/admin/blog/${id}`),

  // Publish/unpublish a blog post
  publish: (id: string, status: 'draft' | 'pending' | 'published') =>
    apiClient.patch<BlogPost>('/api/admin/blog/publish', { id, status }),
};

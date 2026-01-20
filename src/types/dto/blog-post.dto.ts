// DTOs for Blog Post API requests and responses

export interface CreateBlogPostDTO {
  slug: string;
  title_nl?: string;
  title_en?: string;
  service_category_id?: string;
  service_subcategory_id?: string;
}

export interface UpdateBlogPostStatusDTO {
  id: string;
  status: 'draft' | 'pending' | 'published';
}

export interface SaveBlogContentDTO {
  blog_post_id: string;
  title_nl?: string;
  title_en?: string;
  excerpt_nl?: string;
  excerpt_en?: string;
  content_nl?: string;
  content_en?: string;
  featured_image_url?: string;
}

export interface SaveBlogMetaDTO {
  blog_post_id: string;
  meta_title_nl?: string;
  meta_title_en?: string;
  meta_description_nl?: string;
  meta_description_en?: string;
}

export interface AddRelatedPostDTO {
  blog_post_id: string;
  related_blog_post_id: string;
  order_index?: number;
}

export interface RemoveRelatedPostDTO {
  id: string;
}

export interface ReorderRelatedPostsDTO {
  blog_post_id: string;
  related_posts: Array<{
    id: string;
    order_index: number;
  }>;
}

// Query DTOs
export interface GetBlogPostsQueryDTO {
  status?: 'draft' | 'pending' | 'published';
  search?: string;
  service_category_id?: string;
  service_subcategory_id?: string;
  limit?: number;
  offset?: number;
}

export interface GetPublishedBlogPostsQueryDTO {
  service_category_id?: string;
  service_subcategory_id?: string;
  limit?: number;
  offset?: number;
}

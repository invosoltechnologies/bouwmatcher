export interface BlogPost {
  id: string;
  slug: string;
  status: 'draft' | 'pending' | 'published';
  service_category_id: string | null;
  service_subcategory_id: string | null;
  created_by: string | null;
  published_by: string | null;
  updated_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostContent {
  id: string;
  blog_post_id: string;
  title_nl: string | null;
  title_en: string | null;
  excerpt_nl: string | null;
  excerpt_en: string | null;
  content_nl: string | null;
  content_en: string | null;
  featured_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostMeta {
  id: string;
  blog_post_id: string;
  meta_title_nl: string | null;
  meta_title_en: string | null;
  meta_description_nl: string | null;
  meta_description_en: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostRelated {
  id: string;
  blog_post_id: string;
  related_blog_post_id: string;
  order_index: number;
  created_at: string;
}

// Combined interface for full blog post with all sections
export interface BlogPostFull extends BlogPost {
  content?: BlogPostContent;
  meta?: BlogPostMeta;
  related_posts?: BlogPostRelated[];
  service_category?: {
    id: string;
    name_nl: string;
    name_en: string;
  };
  service_subcategory?: {
    id: string;
    name_nl: string;
    name_en: string;
  };
}

// Interface for related post with content
export interface RelatedBlogPostWithContent extends BlogPostRelated {
  related_post?: BlogPost & {
    content?: BlogPostContent;
  };
}

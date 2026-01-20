-- Create blog_posts table (main table)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published')),
  service_category_id BIGINT REFERENCES service_categories(id) ON DELETE SET NULL,
  service_subcategory_id BIGINT REFERENCES service_subcategories(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blog_post_content table (core content)
CREATE TABLE IF NOT EXISTS blog_post_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE UNIQUE NOT NULL,
  title_nl TEXT,
  title_en TEXT,
  excerpt_nl TEXT CHECK (char_length(excerpt_nl) <= 300),
  excerpt_en TEXT CHECK (char_length(excerpt_en) <= 300),
  content_nl TEXT,
  content_en TEXT,
  featured_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blog_post_meta table (SEO metadata)
CREATE TABLE IF NOT EXISTS blog_post_meta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE UNIQUE NOT NULL,
  meta_title_nl TEXT CHECK (char_length(meta_title_nl) <= 60),
  meta_title_en TEXT CHECK (char_length(meta_title_en) <= 60),
  meta_description_nl TEXT CHECK (char_length(meta_description_nl) <= 160),
  meta_description_en TEXT CHECK (char_length(meta_description_en) <= 160),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blog_post_related table (related posts junction table)
CREATE TABLE IF NOT EXISTS blog_post_related (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  related_blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT unique_blog_post_relation UNIQUE (blog_post_id, related_blog_post_id),
  CONSTRAINT prevent_self_relation CHECK (blog_post_id != related_blog_post_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(service_category_id);
CREATE INDEX idx_blog_posts_subcategory ON blog_posts(service_subcategory_id);
CREATE INDEX idx_blog_post_content_blog_post_id ON blog_post_content(blog_post_id);
CREATE INDEX idx_blog_post_meta_blog_post_id ON blog_post_meta(blog_post_id);
CREATE INDEX idx_blog_post_related_blog_post_id ON blog_post_related(blog_post_id);
CREATE INDEX idx_blog_post_related_order ON blog_post_related(blog_post_id, order_index);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_updated_at();

CREATE TRIGGER update_blog_post_content_updated_at
  BEFORE UPDATE ON blog_post_content
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_updated_at();

CREATE TRIGGER update_blog_post_meta_updated_at
  BEFORE UPDATE ON blog_post_meta
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_updated_at();

-- Add comments for documentation
COMMENT ON TABLE blog_posts IS 'Main blog posts table';
COMMENT ON TABLE blog_post_content IS 'Blog post content in multiple languages (NL/EN)';
COMMENT ON TABLE blog_post_meta IS 'SEO metadata for blog posts';
COMMENT ON TABLE blog_post_related IS 'Junction table for related blog posts (up to 12 per post)';
COMMENT ON COLUMN blog_posts.slug IS 'URL-friendly unique identifier for the blog post';
COMMENT ON COLUMN blog_posts.status IS 'Publication status: draft, pending, or published';
COMMENT ON COLUMN blog_post_content.excerpt_nl IS 'Short description in Dutch (max 300 characters)';
COMMENT ON COLUMN blog_post_content.excerpt_en IS 'Short description in English (max 300 characters)';
COMMENT ON COLUMN blog_post_content.content_nl IS 'Full blog content in Dutch (HTML from TinyMCE)';
COMMENT ON COLUMN blog_post_content.content_en IS 'Full blog content in English (HTML from TinyMCE)';
COMMENT ON COLUMN blog_post_content.featured_image_url IS 'Featured image URL (572x402px recommended)';
COMMENT ON COLUMN blog_post_related.order_index IS 'Display order for related posts';

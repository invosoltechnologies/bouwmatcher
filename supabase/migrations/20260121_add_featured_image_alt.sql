-- Add featured_image_alt column to blog_post_content table
ALTER TABLE blog_post_content
ADD COLUMN IF NOT EXISTS featured_image_alt TEXT CHECK (char_length(featured_image_alt) <= 150);

-- Add comment
COMMENT ON COLUMN blog_post_content.featured_image_alt IS 'Alt text for featured image (accessibility)';

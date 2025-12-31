-- ==========================================
-- PROJECT PHOTOS TABLE
-- Stores metadata for uploaded project photos
-- ==========================================

CREATE TABLE IF NOT EXISTS project_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Link to project draft
  project_draft_id UUID NOT NULL REFERENCES project_drafts(id) ON DELETE CASCADE,

  -- Storage information
  storage_path TEXT NOT NULL, -- Full path in Supabase Storage
  file_name VARCHAR(255) NOT NULL, -- Original filename
  file_size INTEGER NOT NULL, -- Size in bytes
  mime_type VARCHAR(100) NOT NULL, -- image/jpeg, image/png, etc.

  -- Image metadata (optional)
  width INTEGER NULL,
  height INTEGER NULL,

  -- Display order
  display_order INTEGER DEFAULT 1,

  -- Status
  is_primary BOOLEAN DEFAULT FALSE, -- Main photo for the project
  upload_status VARCHAR(20) DEFAULT 'completed' CHECK (upload_status IN ('uploading', 'completed', 'failed')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_file_size CHECK (file_size > 0 AND file_size <= 5242880) -- Max 5MB
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_photos_draft ON project_photos(project_draft_id);
CREATE INDEX IF NOT EXISTS idx_project_photos_order ON project_photos(project_draft_id, display_order);
CREATE INDEX IF NOT EXISTS idx_project_photos_primary ON project_photos(project_draft_id, is_primary);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_project_photo_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_project_photo_timestamp
  BEFORE UPDATE ON project_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_project_photo_timestamp();

-- Function to get public URL for a photo
CREATE OR REPLACE FUNCTION get_photo_url(storage_path_param TEXT)
RETURNS TEXT AS $$
DECLARE
  base_url TEXT;
BEGIN
  -- Construct Supabase storage URL
  -- Format: https://[project-ref].supabase.co/storage/v1/object/public/project-photos/[path]
  base_url := current_setting('app.supabase_url', true);
  RETURN base_url || '/storage/v1/object/public/project-photos/' || storage_path_param;
END;
$$ LANGUAGE plpgsql;


COMMENT ON TABLE project_photos IS 'Stores metadata and references for project photos uploaded to Supabase Storage';
COMMENT ON COLUMN project_photos.storage_path IS 'Path in Supabase Storage bucket (e.g., draft_123/photo_456.jpg)';
COMMENT ON COLUMN project_photos.is_primary IS 'True if this is the main/featured photo for the project';
COMMENT ON COLUMN project_photos.display_order IS 'Order in which photos should be displayed (1 = first)';

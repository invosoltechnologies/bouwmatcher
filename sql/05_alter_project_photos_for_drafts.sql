-- ==========================================
-- ALTER PROJECT PHOTOS TABLE FOR DRAFTS
-- Add support for draft projects (anonymous users)
-- ==========================================

-- Add project_draft_id column to support draft projects
-- NOTE: Keeps existing project_id column for final projects - both are needed!
ALTER TABLE project_photos
ADD COLUMN IF NOT EXISTS project_draft_id UUID NULL REFERENCES project_drafts(id) ON DELETE CASCADE;

-- Add constraint: must have either project_id OR project_draft_id (not both, not neither)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_project_or_draft_photo'
  ) THEN
    ALTER TABLE project_photos
    ADD CONSTRAINT check_project_or_draft_photo CHECK (
      (project_id IS NOT NULL AND project_draft_id IS NULL) OR
      (project_id IS NULL AND project_draft_id IS NOT NULL)
    );
  END IF;
END $$;

-- Add new columns for better photo management
ALTER TABLE project_photos
ADD COLUMN IF NOT EXISTS storage_path TEXT NULL,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS upload_status VARCHAR(20) DEFAULT 'completed' CHECK (upload_status IN ('uploading', 'completed', 'failed')),
ADD COLUMN IF NOT EXISTS width INTEGER NULL,
ADD COLUMN IF NOT EXISTS height INTEGER NULL,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add file size constraint (max 5MB) - only if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'valid_file_size'
  ) THEN
    ALTER TABLE project_photos
    ADD CONSTRAINT valid_file_size CHECK (file_size > 0 AND file_size <= 5242880);
  END IF;
END $$;

-- Create indexes for draft photos
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

-- Create trigger only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_project_photo_timestamp'
  ) THEN
    CREATE TRIGGER trigger_update_project_photo_timestamp
      BEFORE UPDATE ON project_photos
      FOR EACH ROW
      EXECUTE FUNCTION update_project_photo_timestamp();
  END IF;
END $$;

COMMENT ON COLUMN project_photos.project_draft_id IS 'Link to project draft for anonymous/incomplete projects';
COMMENT ON COLUMN project_photos.storage_path IS 'Path in Supabase Storage bucket (e.g., draft_123/photo_456.jpg)';
COMMENT ON COLUMN project_photos.is_primary IS 'True if this is the main/featured photo for the project';
COMMENT ON COLUMN project_photos.display_order IS 'Order in which photos should be displayed (1 = first)';

-- Create project_drafts table to store anonymous/incomplete projects
-- This allows users to start questionnaire without logging in

CREATE TABLE project_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_category_id INT8 REFERENCES service_categories(id) ON DELETE SET NULL,

  -- Session tracking
  session_token VARCHAR(255) UNIQUE NOT NULL, -- Used to track anonymous users
  ip_address VARCHAR(45), -- Store IP for security/analytics
  user_agent TEXT, -- Browser info

  -- Project basics from search form
  postcode VARCHAR(10),
  execution_timing VARCHAR(50), -- 'asap', 'within_month', 'within_3_months', etc.

  -- Current progress
  current_step INT DEFAULT 1,
  last_question_id VARCHAR(100), -- Track last answered question

  -- Status
  is_completed BOOLEAN DEFAULT FALSE,
  is_converted_to_project BOOLEAN DEFAULT FALSE,
  converted_project_id INT8, -- Reference to final project if converted

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '7 days', -- Auto-expire drafts after 7 days

  -- Indexes for performance
  CONSTRAINT valid_session_token CHECK (char_length(session_token) >= 32)
);

-- Index for fast lookup by session token
CREATE INDEX idx_project_drafts_session_token ON project_drafts(session_token);

-- Index for cleanup of expired drafts
CREATE INDEX idx_project_drafts_expires_at ON project_drafts(expires_at);

-- Update project_form_answers to support draft projects
ALTER TABLE project_form_answers
  ADD COLUMN project_draft_id UUID REFERENCES project_drafts(id) ON DELETE CASCADE;

-- Make project_id nullable since answers can be for drafts OR final projects
ALTER TABLE project_form_answers
  ALTER COLUMN project_id DROP NOT NULL;

-- Add constraint: must have either project_id OR project_draft_id
ALTER TABLE project_form_answers
  ADD CONSTRAINT check_project_or_draft CHECK (
    (project_id IS NOT NULL AND project_draft_id IS NULL) OR
    (project_id IS NULL AND project_draft_id IS NOT NULL)
  );

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_project_draft_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update timestamp
CREATE TRIGGER trigger_update_project_draft_timestamp
  BEFORE UPDATE ON project_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_project_draft_timestamp();

-- Function to cleanup expired drafts (run via cron job)
CREATE OR REPLACE FUNCTION cleanup_expired_drafts()
RETURNS void AS $$
BEGIN
  DELETE FROM project_drafts
  WHERE expires_at < NOW() AND is_converted_to_project = FALSE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE project_drafts IS 'Stores incomplete/anonymous project submissions before user completes verification';
COMMENT ON COLUMN project_drafts.session_token IS 'Unique token to track anonymous user session (UUID v4)';
COMMENT ON COLUMN project_drafts.expires_at IS 'Drafts expire after 7 days if not converted to final project';

-- ============================================================================
-- Update convert_draft_to_project Function
-- ============================================================================
-- This function converts a verified project_draft to a project
-- Changes from original:
-- 1. Removed p_verification_code parameter (OTP already verified separately)
-- 2. Creates NEW project record instead of expecting it to exist
-- 3. Generates access_token for status page
-- 4. Returns JSON with project_id and access_token
-- 5. Simplified user creation (moved to future phase)
-- ============================================================================

CREATE OR REPLACE FUNCTION convert_draft_to_project(p_draft_id UUID)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
  v_project_id UUID;
  v_access_token VARCHAR(255);
  v_draft_record RECORD;
BEGIN
  -- 1. Get draft record
  SELECT * INTO v_draft_record
  FROM project_drafts
  WHERE id = p_draft_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Draft not found';
  END IF;

  -- 2. Check if phone is verified
  IF v_draft_record.phone_verified IS NOT TRUE THEN
    RAISE EXCEPTION 'Phone number not verified';
  END IF;

  -- 3. Check if already converted
  IF v_draft_record.is_converted_to_project THEN
    RAISE EXCEPTION 'Draft already converted to project';
  END IF;

  -- 4. Generate unique access token for status page
  v_access_token := gen_random_uuid()::text;

  -- 5. Create new project record
  INSERT INTO projects (
    -- Core identifiers
    service_category_id,
    request_type,
    execution_timing,

    -- Location
    postcode,
    city,
    street_name,
    street_number,

    -- Project details
    description,
    has_photos,

    -- Contact information (denormalized)
    first_name,
    last_name,
    email,
    phone,
    company_name,

    -- Phone verification
    phone_verified,
    phone_verified_at,

    -- User references (if exist)
    personal_user_id,
    company_id,

    -- Status and tracking
    status,
    current_step,
    completed_at,
    source_draft_id,

    -- Access token for status page
    access_token,
    access_token_expires_at,

    -- Timestamps
    created_at,
    updated_at
  ) VALUES (
    -- Core identifiers
    v_draft_record.service_category_id,
    v_draft_record.request_type,
    v_draft_record.execution_timing,

    -- Location
    v_draft_record.postcode,
    v_draft_record.city,
    v_draft_record.street_name,
    v_draft_record.street_number,

    -- Project details
    v_draft_record.description,
    v_draft_record.has_photos,

    -- Contact information
    v_draft_record.first_name,
    v_draft_record.last_name,
    v_draft_record.email,
    v_draft_record.phone,
    v_draft_record.company_name,

    -- Phone verification
    TRUE,
    NOW(),

    -- User references (copy from draft if exist)
    v_draft_record.personal_user_id,
    v_draft_record.company_id,

    -- Status and tracking
    'pending_quotes', -- Default status: waiting for quotes
    8, -- Completed all steps
    NOW(),
    p_draft_id,

    -- Access token
    v_access_token,
    NULL, -- Will be set when status becomes completed/cancelled

    -- Timestamps
    NOW(),
    NOW()
  ) RETURNING id INTO v_project_id;

  -- 6. Transfer category-specific answers to new project
  -- Only transfer answers that are NOT general questions
  UPDATE project_form_answers
  SET
    project_id = v_project_id,
    project_draft_id = NULL
  WHERE project_draft_id = p_draft_id
    AND question_id NOT LIKE 'q-general-%';

  -- 7. Transfer photos to new project
  UPDATE project_photos
  SET
    project_id = v_project_id,
    project_draft_id = NULL
  WHERE project_draft_id = p_draft_id;

  -- 8. Mark draft as converted
  UPDATE project_drafts
  SET
    is_converted_to_project = TRUE,
    is_completed = TRUE,
    converted_project_id = v_project_id,
    updated_at = NOW()
  WHERE id = p_draft_id;

  -- 9. Return project_id and access_token as JSON
  RETURN json_build_object(
    'project_id', v_project_id,
    'access_token', v_access_token
  );

EXCEPTION
  WHEN OTHERS THEN
    -- Re-raise with context
    RAISE EXCEPTION 'Error converting draft to project: %', SQLERRM;
END;
$$;

-- Add helpful comment
COMMENT ON FUNCTION convert_draft_to_project(UUID) IS
'Converts a verified project_draft to a project. Returns JSON with project_id and access_token.';

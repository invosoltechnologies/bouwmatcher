-- ==========================================
-- PERSONAL USERS TABLE
-- Stores individual/private users
-- ==========================================

CREATE TABLE IF NOT EXISTS personal_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,

  -- Phone verification
  phone_verified BOOLEAN DEFAULT FALSE,
  phone_verified_at TIMESTAMPTZ NULL,

  -- Authentication (optional - for future login)
  password_hash VARCHAR(255) NULL,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (char_length(phone) >= 10)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_personal_users_email ON personal_users(email);
CREATE INDEX IF NOT EXISTS idx_personal_users_phone ON personal_users(phone);
CREATE INDEX IF NOT EXISTS idx_personal_users_phone_verified ON personal_users(phone_verified);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_personal_user_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_personal_user_timestamp
  BEFORE UPDATE ON personal_users
  FOR EACH ROW
  EXECUTE FUNCTION update_personal_user_timestamp();


-- ==========================================
-- COMPANIES TABLE
-- Stores business/company users
-- ==========================================

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Company information
  company_name VARCHAR(255) NOT NULL,

  -- Contact person
  contact_first_name VARCHAR(100) NOT NULL,
  contact_last_name VARCHAR(100) NOT NULL,
  contact_email VARCHAR(255) UNIQUE NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,

  -- Company details (optional)
  vat_number VARCHAR(50) NULL, -- BTW nummer
  kvk_number VARCHAR(20) NULL, -- Chamber of Commerce number
  website VARCHAR(255) NULL,

  -- Phone verification
  phone_verified BOOLEAN DEFAULT FALSE,
  phone_verified_at TIMESTAMPTZ NULL,

  -- Authentication (optional - for future login)
  password_hash VARCHAR(255) NULL,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_email CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (char_length(contact_phone) >= 10)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_companies_email ON companies(contact_email);
CREATE INDEX IF NOT EXISTS idx_companies_phone ON companies(contact_phone);
CREATE INDEX IF NOT EXISTS idx_companies_phone_verified ON companies(phone_verified);
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(company_name);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_company_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_company_timestamp
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_company_timestamp();


-- ==========================================
-- UPDATE PROJECT_DRAFTS TABLE
-- Add references to personal_users and companies
-- ==========================================

ALTER TABLE project_drafts
  ADD COLUMN IF NOT EXISTS personal_user_id UUID REFERENCES personal_users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS request_type VARCHAR(20) CHECK (request_type IN ('private', 'business'));

-- Add constraint: must have either personal_user_id OR company_id (not both)
ALTER TABLE project_drafts
  ADD CONSTRAINT check_user_or_company CHECK (
    (
      (personal_user_id IS NOT NULL AND company_id IS NULL) OR
      (personal_user_id IS NULL AND company_id IS NOT NULL) OR
      (personal_user_id IS NULL AND company_id IS NULL) -- Both NULL allowed for anonymous drafts
    )
  );

CREATE INDEX IF NOT EXISTS idx_project_drafts_personal_user ON project_drafts(personal_user_id);
CREATE INDEX IF NOT EXISTS idx_project_drafts_company ON project_drafts(company_id);


COMMENT ON TABLE personal_users IS 'Stores individual/private users who create project requests';
COMMENT ON TABLE companies IS 'Stores business/company users who create project requests';
COMMENT ON COLUMN project_drafts.personal_user_id IS 'Reference to personal user if request_type is private';
COMMENT ON COLUMN project_drafts.company_id IS 'Reference to company if request_type is business';
COMMENT ON COLUMN project_drafts.request_type IS 'Type of request: private (personal) or business (company)';

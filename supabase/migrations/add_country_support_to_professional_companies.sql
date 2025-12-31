-- =====================================================
-- ADD COUNTRY SUPPORT TO PROFESSIONAL COMPANIES TABLE
-- Support for both Dutch (KVK) and Belgian (KBO) companies
-- =====================================================

-- Add country column (ISO 3166-1 alpha-2 country code)
ALTER TABLE professional_companies
ADD COLUMN IF NOT EXISTS country VARCHAR(2) DEFAULT 'NL';

-- Add business_id_type column to distinguish between KVK and KBO
ALTER TABLE professional_companies
ADD COLUMN IF NOT EXISTS business_id_type VARCHAR(20);

-- Add business_id_formatted column for display purposes (e.g., "0417.497.106" for Belgian KBO)
ALTER TABLE professional_companies
ADD COLUMN IF NOT EXISTS business_id_formatted VARCHAR(50);

-- Update existing records to have business_id_type as 'KVK' (assuming all existing are Dutch)
UPDATE professional_companies
SET business_id_type = 'KVK', country = 'NL'
WHERE business_id_type IS NULL;

-- Drop existing unique constraint on business_id if it exists
-- (business_id alone is not unique across countries)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'professional_companies_business_id_key'
    ) THEN
        ALTER TABLE professional_companies
        DROP CONSTRAINT professional_companies_business_id_key;
    END IF;
END $$;

-- Create new unique constraint combining business_id, business_id_type, and country
-- This allows same business_id to exist in different countries
ALTER TABLE professional_companies
ADD CONSTRAINT unique_business_id_per_country
UNIQUE (business_id, business_id_type, country);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_professional_companies_country
ON professional_companies(country);

CREATE INDEX IF NOT EXISTS idx_professional_companies_business_id_type
ON professional_companies(business_id_type);

CREATE INDEX IF NOT EXISTS idx_professional_companies_country_business_id
ON professional_companies(country, business_id);

-- =====================================================
-- ADD COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON COLUMN professional_companies.country IS 'ISO 3166-1 alpha-2 country code (NL for Netherlands, BE for Belgium)';
COMMENT ON COLUMN professional_companies.business_id_type IS 'Type of business identifier: KVK (Dutch Chamber of Commerce), KBO (Belgian Crossroads Bank for Enterprises)';
COMMENT ON COLUMN professional_companies.business_id_formatted IS 'Formatted business ID for display (e.g., 0417.497.106 for Belgian KBO)';

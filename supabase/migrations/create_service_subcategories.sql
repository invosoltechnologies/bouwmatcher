-- =====================================================
-- CREATE SERVICE SUBCATEGORIES TABLE (SIMPLIFIED)
-- =====================================================
CREATE TABLE IF NOT EXISTS service_subcategories (
  id BIGSERIAL PRIMARY KEY,
  service_category_id BIGINT NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_nl VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  description_nl TEXT,
  description_en TEXT,

  -- Pricing columns (simpler approach)
  price_particulier DECIMAL(10, 2),
  price_zakelijk DECIMAL(10, 2),

  -- Optional fields
  icon_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_subcategories_category ON service_subcategories(service_category_id);
CREATE INDEX idx_subcategories_slug ON service_subcategories(slug);
CREATE INDEX idx_subcategories_active ON service_subcategories(is_active);
CREATE INDEX idx_subcategories_sort ON service_subcategories(service_category_id, sort_order);

-- =====================================================
-- ADD RLS POLICIES (Public Read Access)
-- =====================================================
ALTER TABLE service_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active subcategories"
ON service_subcategories FOR SELECT
USING (is_active = true);

-- =====================================================
-- ADD COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE service_subcategories IS 'Subcategories for each service category with pricing for both project types';
COMMENT ON COLUMN service_subcategories.price_particulier IS 'Price in EUR for residential projects (e.g., 45.00)';
COMMENT ON COLUMN service_subcategories.price_zakelijk IS 'Price in EUR for commercial projects (e.g., 65.00)';
COMMENT ON COLUMN service_subcategories.sort_order IS 'Display order within category (lower number = higher priority)';

-- Add invoice_number column to professional_lead_purchases table
ALTER TABLE professional_lead_purchases
ADD COLUMN invoice_number VARCHAR(50) UNIQUE;

-- Create index for faster lookups
CREATE INDEX idx_professional_lead_purchases_invoice_number
ON professional_lead_purchases(invoice_number);

-- Add comment
COMMENT ON COLUMN professional_lead_purchases.invoice_number
IS 'Unique invoice number in format BM-YYYY-NNNNN';

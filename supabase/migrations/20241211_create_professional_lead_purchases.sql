-- Table for tracking which professionals have purchased/unlocked specific leads
-- This needs to be created in your Supabase database

CREATE TABLE IF NOT EXISTS public.professional_lead_purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL,
  project_id uuid NOT NULL,
  amount_paid numeric NOT NULL,
  payment_status character varying DEFAULT 'completed',
  payment_method character varying,
  transaction_id character varying,
  purchased_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT professional_lead_purchases_pkey PRIMARY KEY (id),
  CONSTRAINT professional_lead_purchases_professional_id_fkey
    FOREIGN KEY (professional_id)
    REFERENCES public.professional_profiles(id) ON DELETE CASCADE,
  CONSTRAINT professional_lead_purchases_project_id_fkey
    FOREIGN KEY (project_id)
    REFERENCES public.projects(id) ON DELETE CASCADE,
  CONSTRAINT professional_lead_purchases_unique
    UNIQUE (professional_id, project_id)
);

-- Create index for faster lookups
CREATE INDEX idx_professional_lead_purchases_professional_id
  ON public.professional_lead_purchases(professional_id);

CREATE INDEX idx_professional_lead_purchases_project_id
  ON public.professional_lead_purchases(project_id);

-- Enable Row Level Security
ALTER TABLE public.professional_lead_purchases ENABLE ROW LEVEL SECURITY;

-- Policy: Professionals can only view their own purchases
CREATE POLICY "Professionals can view own purchases"
  ON public.professional_lead_purchases
  FOR SELECT
  USING (
    professional_id IN (
      SELECT id FROM public.professional_profiles
      WHERE user_id = auth.uid()
    )
  );

-- Policy: Professionals can insert their own purchases (via payment system)
CREATE POLICY "Professionals can create purchases"
  ON public.professional_lead_purchases
  FOR INSERT
  WITH CHECK (
    professional_id IN (
      SELECT id FROM public.professional_profiles
      WHERE user_id = auth.uid()
    )
  );

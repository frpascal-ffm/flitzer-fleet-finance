-- Enable Row Level Security
ALTER TABLE IF EXISTS public.fahrer ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.fahrzeuge ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.tankkosten ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.umsaetze ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.allgemeine_kosten ENABLE ROW LEVEL SECURITY;

-- Example for creating a new table with tenant_id
CREATE TABLE IF NOT EXISTS public.fahrzeuge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  tenant_id TEXT NOT NULL,
  kennzeichen TEXT NOT NULL,
  hersteller TEXT,
  modell TEXT,
  baujahr INTEGER,
  anschaffungsdatum DATE,
  anschaffungspreis DECIMAL(10, 2),
  active BOOLEAN DEFAULT true
);

-- Create RLS policy for fahrzeuge table
-- This policy ensures users can only see their own vehicles
CREATE POLICY "Users can only access their own fahrzeuge" ON public.fahrzeuge
  FOR ALL
  USING (tenant_id = (SELECT current_setting('request.headers')::json->>'x-tenant-id'))
  WITH CHECK (tenant_id = (SELECT current_setting('request.headers')::json->>'x-tenant-id'));

-- Similar policies for other tables
-- For example:
CREATE POLICY "Users can only access their own fahrer" ON public.fahrer
  FOR ALL
  USING (tenant_id = (SELECT current_setting('request.headers')::json->>'x-tenant-id'))
  WITH CHECK (tenant_id = (SELECT current_setting('request.headers')::json->>'x-tenant-id'));

-- Add a function to automatically set the tenant_id based on the request header
CREATE OR REPLACE FUNCTION public.set_tenant_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.tenant_id = (SELECT current_setting('request.headers')::json->>'x-tenant-id');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to fahrzeuge table to automatically set tenant_id
CREATE TRIGGER set_tenant_id_on_fahrzeuge
BEFORE INSERT ON public.fahrzeuge
FOR EACH ROW EXECUTE FUNCTION public.set_tenant_id(); 
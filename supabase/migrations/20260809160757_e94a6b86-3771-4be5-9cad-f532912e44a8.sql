-- 1. product status enum + new product columns
DO $$ BEGIN
  CREATE TYPE public.product_status AS ENUM ('active','coming_soon','in_progress','inactive');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS status public.product_status NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS product_type text,
  ADD COLUMN IF NOT EXISTS cta_text text NOT NULL DEFAULT 'Explore Product';

UPDATE public.products SET status = CASE WHEN is_active THEN 'active'::public.product_status ELSE 'inactive'::public.product_status END;

-- 2. future seller role
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'seller';

-- 3. enquiries
DO $$ BEGIN
  CREATE TYPE public.enquiry_status AS ENUM ('new','contacted','converted','closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text,
  message text,
  status public.enquiry_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can submit enquiry" ON public.enquiries;
CREATE POLICY "anyone can submit enquiry" ON public.enquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND (email IS NULL OR length(email) <= 255)
    AND (phone IS NULL OR length(phone) <= 20)
    AND (message IS NULL OR length(message) <= 2000)
  );

DROP POLICY IF EXISTS "admin read enquiries" ON public.enquiries;
CREATE POLICY "admin read enquiries" ON public.enquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admin update enquiries" ON public.enquiries;
CREATE POLICY "admin update enquiries" ON public.enquiries
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admin delete enquiries" ON public.enquiries;
CREATE POLICY "admin delete enquiries" ON public.enquiries
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS trg_enquiries_updated ON public.enquiries;
CREATE TRIGGER trg_enquiries_updated BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
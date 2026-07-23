-- Fix: anon role cannot execute has_role(), but the products and reviews
-- SELECT policies called it. Split each into two separate policies:
-- one for anon (simple column check only) and one for authenticated (with has_role).

-- ── products ──────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public read active products" ON public.products;

CREATE POLICY "anon read active products" ON public.products
  FOR SELECT TO anon
  USING (is_active = true);

CREATE POLICY "auth read products" ON public.products
  FOR SELECT TO authenticated
  USING (is_active OR public.has_role(auth.uid(), 'admin'));

-- ── reviews ───────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public read reviews" ON public.reviews;

CREATE POLICY "anon read reviews" ON public.reviews
  FOR SELECT TO anon
  USING (is_published = true);

CREATE POLICY "auth read reviews" ON public.reviews
  FOR SELECT TO authenticated
  USING (is_published OR public.has_role(auth.uid(), 'admin'));

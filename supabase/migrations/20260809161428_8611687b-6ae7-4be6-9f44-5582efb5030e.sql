DROP POLICY IF EXISTS "public read active products" ON public.products;
CREATE POLICY "public read active products" ON public.products FOR SELECT TO anon, authenticated
USING (is_active OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::app_role)));

DROP POLICY IF EXISTS "public read reviews" ON public.reviews;
CREATE POLICY "public read reviews" ON public.reviews FOR SELECT TO anon, authenticated
USING (is_published OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'::app_role)));
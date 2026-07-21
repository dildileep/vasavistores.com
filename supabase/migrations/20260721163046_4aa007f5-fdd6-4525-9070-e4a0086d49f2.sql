
-- 1) Convert has_role to SECURITY INVOKER (safe: user_roles RLS lets a user read their own row,
--    and every call in this app checks the caller's own auth.uid()).
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Ensure authenticated can still execute (revoke from public/anon for tightness).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- 2) Let customers cancel their own pending orders.
CREATE POLICY "users can cancel own pending orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending'::order_status)
WITH CHECK (
  auth.uid() = user_id
  AND status IN ('pending'::order_status, 'cancelled'::order_status)
);

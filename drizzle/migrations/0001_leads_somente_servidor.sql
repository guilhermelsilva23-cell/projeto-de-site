DROP POLICY IF EXISTS "Qualquer visitante pode enviar um lead" ON public.leads;
REVOKE INSERT ON public.leads FROM anon;
GRANT ALL ON public.leads TO service_role;
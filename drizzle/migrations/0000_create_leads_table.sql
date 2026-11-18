CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cargo text NOT NULL,
  empresa text NOT NULL,
  email text NOT NULL,
  email_corporativo boolean NOT NULL DEFAULT false,
  telefone text NOT NULL,
  maquina text NOT NULL,
  origem text NOT NULL,
  quantidade text NOT NULL,
  mensagem text NOT NULL DEFAULT '',
  utm_source text NOT NULL DEFAULT '',
  utm_medium text NOT NULL DEFAULT '',
  utm_campaign text NOT NULL DEFAULT '',
  utm_content text NOT NULL DEFAULT '',
  utm_term text NOT NULL DEFAULT '',
  origem_pagina text NOT NULL DEFAULT '',
  encaminhado_webhook boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer visitante pode enviar um lead"
  ON public.leads FOR INSERT TO anon
  WITH CHECK (true);
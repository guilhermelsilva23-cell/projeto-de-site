import { createServerFn } from "@tanstack/react-start";
import { leadSchema, FREE_EMAIL } from "./lead";
import { SITE } from "@/config/site";

export const enviarLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot: robôs recebem sucesso sem encaminhar nada.
    if (data.website) return { ok: true };

    const { website: _website, ...lead } = data;
    const payload = {
      ...lead,
      email_corporativo: !FREE_EMAIL.test(data.email),
      destino_email: SITE.EMAIL_RFQ,
      origem_pagina: "/adequacao-nr-12/diagnostico",
      recebido_em: new Date().toISOString(),
    };

    // Sempre salva o lead no banco do projeto (nada se perde).
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: salvo, error } = await supabaseAdmin
      .from("leads")
      .insert({
        nome: data.nome,
        cargo: data.cargo,
        empresa: data.empresa,
        email: data.email,
        email_corporativo: payload.email_corporativo,
        telefone: data.telefone,
        maquina: data.maquina,
        origem: data.origem,
        quantidade: data.quantidade,
        mensagem: data.mensagem,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_content: data.utm_content,
        utm_term: data.utm_term,
        origem_pagina: payload.origem_pagina,
        encaminhado_webhook: false,
      })
      .select("id")
      .single();
    if (error || !salvo) {
      console.error("Falha ao salvar lead no banco:", error?.message);
      throw new Error("Não foi possível enviar agora. Fale pelo WhatsApp.");
    }

    if (!SITE.URL_FORMULARIO_DESTINO) {
      console.warn(
        "URL_FORMULARIO_DESTINO não configurada — lead salvo apenas no banco.",
        payload.email,
      );
      return { ok: true, aviso: "destino_nao_configurado" as const };
    }

    // O lead já está salvo: falha no webhook só vai para o log, o visitante recebe sucesso.
    try {
      const res = await fetch(SITE.URL_FORMULARIO_DESTINO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(`Webhook falhou [${res.status}]: ${await res.text()}`);
        return { ok: true };
      }
      const { error: upErr } = await supabaseAdmin
        .from("leads")
        .update({ encaminhado_webhook: true })
        .eq("id", salvo.id);
      if (upErr) console.error("Falha ao marcar encaminhado_webhook:", upErr.message);
    } catch (e) {
      console.error("Webhook falhou:", e instanceof Error ? e.message : e);
    }
    // Notificação por e-mail para EMAIL_RFQ: requer domínio de e-mail verificado
    // (não configurado neste projeto). O lead fica salvo no banco e no webhook.
    return { ok: true };
  });

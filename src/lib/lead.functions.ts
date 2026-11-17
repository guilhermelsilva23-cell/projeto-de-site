import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./lead";
import { SITE } from "@/config/site";

export const enviarLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // honeypot: finge sucesso para robôs
    const payload = { ...data, website: undefined, destino_email: SITE.EMAIL_RFQ, origem_pagina: "/adequacao-nr-12/diagnostico", recebido_em: new Date().toISOString() };
    if (!SITE.URL_FORMULARIO_DESTINO) {
      console.warn("URL_FORMULARIO_DESTINO não configurada — lead não encaminhado.", payload.email);
      return { ok: true, aviso: "destino_nao_configurado" as const };
    }
    const res = await fetch(SITE.URL_FORMULARIO_DESTINO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`Webhook falhou [${res.status}]: ${await res.text()}`);
      throw new Error("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
    }
    return { ok: true };
  });

/**
 * ARQUIVO ÚNICO DE CONFIGURAÇÃO — Titans Soluções de Engenharia
 * Contatos, cores, analytics e chaves de exibição ficam aqui.
 * As cores reais são aplicadas em src/styles.css (variáveis --cor-*); mantenha os dois em sincronia.
 */
export const SITE = {
  NOME_EMPRESA: "Titans Soluções de Engenharia",
  // [PREENCHER: número do WhatsApp com DDI e DDD, só dígitos, ex.: 5511999999999]
  WHATSAPP_NUMERO: "",
  // [PREENCHER: e-mail que recebe as RFQs]
  EMAIL_RFQ: "",
  // [PREENCHER: cidade e UF da Titans]
  CIDADE_UF: "",
  // [PREENCHER: endereço completo]
  ENDERECO: "",
  // [PREENCHER: URL do webhook que recebe o formulário (ex.: Make, Zapier, CRM)]
  URL_FORMULARIO_DESTINO: "",
  // [PREENCHER: prazo de retorno após o formulário]
  PRAZO_RETORNO: "",
  // [PREENCHER: domínio com https://, ex.: https://www.titans.com.br]
  // Quando preenchido, é usado em canonical, og:url e sitemap.xml. Vazio = comportamento atual.
  SITE_URL: "",
  /** Bloco de case na landing: deixe false até haver case autorizado. */
  SHOW_CASE: false,
  /** Analytics: deixe vazio até ter os IDs reais. */
  GA4_ID: "",
  META_PIXEL_ID: "",
} as const;

/** Cores de referência (espelhadas em src/styles.css). O vermelho é provisório. */
export const CORES = {
  "--cor-preto": "#0A0A0A",
  "--cor-branco": "#FFFFFF",
  "--cor-primaria": "#E10600",
  "--cor-cinza-claro": "#F3F3F3",
  "--cor-cinza": "#6B6B6B",
} as const;

/** Monta URL absoluta a partir de SITE_URL; sem SITE_URL, devolve o caminho relativo. */
export function urlAbs(caminho: string) {
  return SITE.SITE_URL ? `${SITE.SITE_URL.replace(/\/$/, "")}${caminho}` : caminho;
}

export function whatsappUrl(texto = "Olá, gostaria de falar com a engenharia da Titans sobre NR-12.") {
  if (!SITE.WHATSAPP_NUMERO) return "#contato";
  return `https://wa.me/${SITE.WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export function rfqUrl() {
  if (!SITE.EMAIL_RFQ) return "#contato";
  return `mailto:${SITE.EMAIL_RFQ}?subject=${encodeURIComponent("RFQ — Adequação NR-12")}`;
}

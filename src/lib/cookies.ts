import { SITE } from "@/config/site";

export const CHAVE_CONSENTIMENTO = "titans_cookies";
export type Escolha = "aceito" | "recusado";

export function lerEscolha(): Escolha | null {
  try {
    const v = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

export function salvarEscolha(e: Escolha) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, e);
  } catch {
    /* navegador sem armazenamento */
  }
}

let carregado = false;
/** Carrega GA4 e Meta Pixel (só quando há IDs e o visitante aceitou). */
export function carregarAnalytics() {
  if (carregado || typeof window === "undefined") return;
  carregado = true;
  const w = window as unknown as Record<string, any>;
  if (SITE.GA4_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.GA4_ID}`;
    document.head.appendChild(s);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", SITE.GA4_ID);
  }
  if (SITE.META_PIXEL_ID) {
    const n: any = function (...args: unknown[]) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    };
    n.queue = [];
    n.loaded = true;
    n.version = "2.0";
    w.fbq = w._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    w.fbq("init", SITE.META_PIXEL_ID);
    w.fbq("track", "PageView");
  }
}

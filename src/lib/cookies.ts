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
  const w = window as unknown as Record<string, unknown> & {
    dataLayer?: unknown[];
    gtag?: (...a: unknown[]) => void;
    fbq?: (...a: unknown[]) => void;
    _fbq?: unknown;
  };
  if (SITE.GA4_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.GA4_ID}`;
    document.head.appendChild(s);
    const dl = (w.dataLayer = w.dataLayer || []);
    const gtag = function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      dl.push(arguments);
    };
    w.gtag = gtag;
    gtag("js", new Date());
    gtag("config", SITE.GA4_ID);
  }
  if (SITE.META_PIXEL_ID) {
    type Fbq = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[][];
      loaded?: boolean;
      version?: string;
    };
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    } as Fbq;
    n.queue = [];
    n.loaded = true;
    n.version = "2.0";
    w.fbq = w._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    n("init", SITE.META_PIXEL_ID);
    n("track", "PageView");
  }
}

import { SITE } from "@/config/site";

export type TitansEvent =
  "form_view" | "form_start" | "form_submit" | "click_whatsapp" | "click_rfq";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Dispara o evento para GA4 e Meta Pixel quando configurados em src/config/site.ts. */
export function track(event: TitansEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (SITE.GA4_ID && window.gtag) window.gtag("event", event, params);
  if (SITE.META_PIXEL_ID && window.fbq) window.fbq("trackCustom", event, params);
}

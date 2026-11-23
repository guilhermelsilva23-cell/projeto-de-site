const AGENTES = ["Googlebot", "Bingbot", "Twitterbot", "facebookexternalhit", "*"];

/** Monta o robots.txt; inclui a linha Sitemap só quando SITE_URL está preenchido. */
export function montarRobots(siteUrl: string): string {
  const regras = AGENTES.map((a) => `User-agent: ${a}\nAllow: /`).join("\n\n");
  const base = siteUrl.trim().replace(/\/$/, "");
  return base ? `${regras}\n\nSitemap: ${base}/sitemap.xml\n` : `${regras}\n`;
}

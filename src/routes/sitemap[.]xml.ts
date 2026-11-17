import { createFileRoute } from "@tanstack/react-router";

// Só páginas indexáveis (a landing /adequacao-nr-12/diagnostico é noindex).
const PATHS = ["/adequacao-nr-12", "/politica-de-privacidade"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = PATHS.map((p) => `  <url><loc>${origin}${p}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});

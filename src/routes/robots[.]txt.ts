import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { montarRobots } from "@/lib/robots";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(montarRobots(SITE.SITE_URL), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});

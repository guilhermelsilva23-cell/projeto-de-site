import { createFileRoute, redirect } from "@tanstack/react-router";

// A página principal do projeto é /adequacao-nr-12.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/adequacao-nr-12", statusCode: 301 });
  },
  head: () => ({
    meta: [
      { title: "Titans Soluções de Engenharia" },
      { name: "description", content: "Adequação NR-12 de máquinas com engenharia — Titans Soluções de Engenharia." },
      { property: "og:title", content: "Titans Soluções de Engenharia" },
      { property: "og:description", content: "Adequação NR-12 de máquinas com engenharia." },
    ],
  }),
});

import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/titans/Logo";
import { Footer } from "@/components/titans/Footer";
import { Preencher } from "@/components/titans/Preencher";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Titans Engenharia" },
      { name: "description", content: "Como a Titans Soluções de Engenharia trata os dados enviados pelos formulários do site." },
      { property: "og:title", content: "Política de Privacidade | Titans Engenharia" },
      { property: "og:description", content: "Tratamento de dados pessoais conforme a LGPD." },
      { property: "og:url", content: "/politica-de-privacidade" },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidade" }],
  }),
  component: Politica,
});

function Politica() {
  return (
    <>
      <header className="bg-ink py-4"><div className="container-t"><Link to="/adequacao-nr-12" aria-label="Titans — Adequação NR-12"><Logo /></Link></div></header>
      <main className="container-t max-w-3xl py-16">
        <h1 className="text-5xl uppercase">Política de privacidade</h1>
        <p className="mt-6 text-muted-foreground"><Preencher>texto da política de privacidade e LGPD fornecido pela Titans (controlador, finalidade, base legal, retenção, direitos do titular e canal do encarregado)</Preencher></p>
      </main>
      <Footer minimal />
    </>
  );
}

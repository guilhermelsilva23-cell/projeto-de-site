import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/titans/Logo";
import { Footer } from "@/components/titans/Footer";
import { urlAbs } from "@/config/site";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Titans Engenharia" },
      {
        name: "description",
        content:
          "Como a Titans Soluções de Engenharia trata os dados enviados pelos formulários do site.",
      },
      { property: "og:title", content: "Política de Privacidade | Titans Engenharia" },
      { property: "og:description", content: "Tratamento de dados pessoais conforme a LGPD." },
      { property: "og:url", content: urlAbs("/politica-de-privacidade") },
    ],
    links: [{ rel: "canonical", href: urlAbs("/politica-de-privacidade") }],
  }),
  component: Politica,
});

function Politica() {
  return (
    <>
      <header className="bg-ink py-4">
        <div className="container-t">
          <Link to="/adequacao-nr-12" aria-label="Titans — Adequação NR-12">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="container-t max-w-3xl py-16">
        <h1 className="text-5xl uppercase">Política de privacidade</h1>
        <p className="mt-6 text-muted-foreground">
          Esta política explica como a Titans Soluções de Engenharia trata os dados enviados por
          este site.
        </p>
        <div className="mt-10 space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="text-2xl uppercase">1. Controlador e contato</h2>
            <p className="mt-3">
              O controlador é a Titans Soluções de Engenharia. O canal de contato deve ser
              confirmado pela empresa antes da publicação definitiva; enquanto isso, pedidos
              relacionados com privacidade podem ser encaminhados pelo formulário de diagnóstico.
            </p>
          </section>
          <section>
            <h2 className="text-2xl uppercase">2. Dados coletados e finalidade</h2>
            <p className="mt-3">
              O formulário pode recolher nome, cargo, empresa, e-mail, telefone, tipo e origem da
              máquina, quantidade, mensagem, consentimento e parâmetros UTM. Esses dados são usados
              para responder ao pedido comercial, avaliar o escopo inicial, manter registros de
              atendimento e, quando configurado, encaminhar o lead ao webhook operacional.
            </p>
          </section>
          <section>
            <h2 className="text-2xl uppercase">3. Base legal, armazenamento e retenção</h2>
            <p className="mt-3">
              O envio depende do consentimento do titular para contato comercial. Os leads são
              armazenados na tabela operacional do projeto e devem ser mantidos apenas pelo período
              necessário ao atendimento e às obrigações legais, conforme prazo que será definido
              pela Titans na revisão final.
            </p>
          </section>
          <section>
            <h2 className="text-2xl uppercase">4. Cookies e medição</h2>
            <p className="mt-3">
              Cookies e ferramentas de analytics opcionais só devem ser ativados após consentimento
              e quando os respectivos IDs estiverem configurados. Sem IDs configurados, o site não
              ativa GA4 nem Meta Pixel.
            </p>
          </section>
          <section>
            <h2 className="text-2xl uppercase">5. Direitos do titular</h2>
            <p className="mt-3">
              O titular pode solicitar confirmação de tratamento, acesso, correção, eliminação,
              informação sobre partilha e revogação do consentimento, observadas as exceções legais.
              O canal e a identificação do encarregado, quando aplicável, serão confirmados pela
              Titans antes da publicação.
            </p>
          </section>
          <section>
            <h2 className="text-2xl uppercase">6. Revisão</h2>
            <p className="mt-3">
              Esta é a base publicada com o código até a etapa 08. A versão final deve ser aprovada
              pela Titans e revista juridicamente antes de campanhas ou publicação definitiva.
            </p>
          </section>
        </div>
      </main>
      <Footer minimal />
    </>
  );
}

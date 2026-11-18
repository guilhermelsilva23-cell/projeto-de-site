import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle, FileWarning, ShieldOff, Menu, X, Check, ShieldCheck, Lock, KeyRound, Rows3,
  ScanLine, Cpu, OctagonX, Hand, CircuitBoard, MessageCircle, Plus,
} from "lucide-react";
import { Logo } from "@/components/titans/Logo";
import { Footer } from "@/components/titans/Footer";
import { MediaSlot } from "@/components/titans/MediaSlot";
import { Preencher } from "@/components/titans/Preencher";
import { btn, SectionHead } from "@/components/titans/Buttons";
import { whatsappUrl, rfqUrl, urlAbs } from "@/config/site";
import { track } from "@/lib/analytics";
import { organizationLd, serviceLd, ldScript } from "@/lib/schema";

const TITLE = "Adequação NR-12 de Máquinas | Titans Engenharia";
const DESC = "Adequação NR-12 com engenharia: diagnóstico, apreciação de risco, projeto, validação e laudo com ART. Solicite um diagnóstico com a Titans.";

const FAQ = [
  { q: "A NR-12 vale para máquinas importadas?", a: "Sim. A norma se aplica a máquinas novas e usadas, nacionais ou importadas." },
  { q: "Qual a diferença entre laudo e adequação?", a: "O laudo documenta a situação; a adequação implanta as medidas na máquina. A Titans conduz os dois no mesmo fluxo." },
  { q: "Preciso parar a máquina?", a: "A adequação física exige uma janela de parada, planejada junto com o cliente." },
  { q: "Quem assina a documentação?", a: "Profissional habilitado, com ART." },
  { q: "Por onde começar?", a: "Pelo diagnóstico: ele mostra o que está fora de conformidade e a ordem de prioridade." },
];

export const Route = createFileRoute("/adequacao-nr-12/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: urlAbs("/adequacao-nr-12") },
    ],
    links: [{ rel: "canonical", href: urlAbs("/adequacao-nr-12") }],
    scripts: [
      ldScript(organizationLd),
      ldScript(serviceLd("Adequação NR-12 de máquinas", DESC)),
      ldScript({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    ],
  }),
  component: AdequacaoPage,
});

const NAV = [
  { href: "#solucao", label: "Solução" },
  { href: "#metodologia", label: "Metodologia" },
  { href: "#aplicacoes", label: "Aplicações" },
  { href: "#cases", label: "Cases" },
  { href: "#contato", label: "Contato" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/95 text-ink-foreground backdrop-blur">
      <div className="container-t flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#topo" aria-label="Titans — início"><Logo className="h-9 w-auto md:h-11" /></a>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-8 font-display text-sm font-semibold uppercase tracking-widest">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="text-ink-muted transition-colors hover:text-ink-foreground">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/adequacao-nr-12/diagnostico" className={`${btn.primary} hidden px-4 py-2.5 text-sm sm:inline-flex`}>Solicitar diagnóstico</Link>
          <button type="button" className="p-2 lg:hidden" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Principal (celular)" className="border-t border-ink-line lg:hidden">
          <ul className="container-t space-y-1 py-4 font-display text-lg font-semibold uppercase tracking-wider">
            {NAV.map((n) => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block py-2">{n.label}</a></li>)}
            <li className="pt-2"><Link to="/adequacao-nr-12/diagnostico" className={`${btn.primary} w-full`}>Solicitar diagnóstico</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

const STEPS = ["Diagnóstico NR-12", "Apreciação de Risco", "Projeto de Segurança", "Adequação", "Validação e Documentação"];
const MAQUINAS = ["Prensas", "Dobradeiras", "Guilhotinas", "Injetoras", "Embaladoras", "Esteiras", "Células robotizadas e cobots", "Transelevadores e AGVs"];
const SETORES = ["Metalúrgico", "Autopeças", "Automotivo", "Bens de capital", "Alimentos e bebidas", "Plásticos", "Logística"];
const BENEFICIOS = [
  "Máquina avaliada, protegida e documentada.",
  "Riscos priorizados por criticidade.",
  "Decisão de investimento baseada em apreciação de risco, não em estimativa.",
  "Um contrato, um responsável técnico.",
  "Laudo e documentação com responsabilidade técnica e ART.",
];
const TECNOLOGIAS = [
  { icon: Lock, t: "Proteções fixas e móveis intertravadas" },
  { icon: KeyRound, t: "Chaves de segurança" },
  { icon: Rows3, t: "Cortinas de luz" },
  { icon: ScanLine, t: "Scanners e tapetes de segurança" },
  { icon: Cpu, t: "Relés e CLPs de segurança" },
  { icon: OctagonX, t: "Parada de emergência" },
  { icon: Hand, t: "Comando bimanual" },
  { icon: CircuitBoard, t: "Projeto elétrico de comando" },
];
const NORMAS = ["ABNT NBR ISO 12100", "ABNT NBR ISO 13849-1/-2", "NR-12", "NR-10"];
const FASES = [
  { f: "Diagnóstico", o: "Inventário de máquinas, zonas de perigo e checagem de documentação.", r: "Inventário e lista de não conformidades." },
  { f: "Análise de risco", o: "Apreciação conforme ISO 12100 e priorização.", r: "Documento de apreciação de risco e PLr requerido." },
  { f: "Projeto", o: "Proteções, sensores, relés, intertravamentos, parada de emergência e projeto elétrico.", r: "Projeto mecânico e elétrico de segurança." },
  { f: "Adequação", o: "Instalação e integração das medidas.", r: "Máquina adequada fisicamente." },
  { f: "Validação", o: "Verificação do desempenho do sistema de segurança conforme ISO 13849-2.", r: "Relatório de validação." },
  { f: "Documentação", o: "Laudo de conformidade, manual em português e registros de capacitação.", r: "Pacote documental com ART." },
];

function Chip({ children, dark = false }: { children: string; dark?: boolean }) {
  return <li className={`border px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-wider ${dark ? "border-ink-line text-ink-foreground" : "border-foreground/80"}`}>{children}</li>;
}

function AdequacaoPage() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-primary focus:p-3 focus:text-primary-foreground">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        {/* 1 HERO */}
        <section id="topo" aria-labelledby="h1" className="relative overflow-hidden bg-ink text-ink-foreground">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="container-t relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="eyebrow">NR-12 · Segurança de máquinas</p>
              <h1 id="h1" className="mt-5 text-5xl uppercase sm:text-6xl lg:text-7xl">Adequação NR-12 de máquinas tratada como <span className="text-primary">engenharia</span></h1>
              <p className="mt-6 max-w-xl text-lg text-ink-muted">Do diagnóstico ao laudo, em um só fluxo: inventário, apreciação de risco, projeto, adequação, validação e documentação, com responsável técnico e ART.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/adequacao-nr-12/diagnostico" className={btn.primary}>Solicite um diagnóstico NR-12</Link>
                <a href={rfqUrl()} onClick={() => track("click_rfq", { local: "hero" })} className={btn.outlineLight}>Envie sua RFQ</a>
              </div>
            </div>
            <MediaSlot dark legenda="VÍDEO OU FOTO: máquina industrial protegida (proteções e cortina de luz instaladas)" width={1200} height={900} />
          </div>
        </section>

        {/* 2 PROBLEMA */}
        <section aria-labelledby="problema" className="py-20 md:py-28">
          <div className="container-t grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <SectionHead eyebrow="O problema" id="problema" title="Sua máquina está protegida e documentada?">
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">A NR-12 vale para máquinas novas e usadas, nacionais e importadas. Máquina sem apreciação de risco, sem sistema de segurança verificado e sem documentação expõe pessoas e empresa. Comprar o dispositivo de segurança não basta: escolha ou ligação incorreta pode anular a função de segurança.</p>
            </SectionHead>
            <aside aria-label="Dado de acidentes" className="self-start border-l-4 border-primary bg-ink p-8 text-ink-foreground">
              <p className="font-display text-6xl font-extrabold text-primary md:text-7xl">Cerca de 15%</p>
              <p className="mt-4 text-lg">dos acidentes de trabalho registrados entre 2012 e 2022 envolveram máquinas e equipamentos.</p>
              <p className="mt-6 text-xs text-ink-muted">Fonte: Observatório de Segurança e Saúde no Trabalho (SmartLab).</p>
            </aside>
          </div>
          <div className="container-t mt-14"><ul className="grid border-l border-t border-border md:grid-cols-3">
            {[
              { icon: FileWarning, t: "Sem apreciação de risco documentada" },
              { icon: AlertTriangle, t: "Máquina importada sem verificação de conformidade" },
              { icon: ShieldOff, t: "Laudo sem execução: o risco continua na máquina" },
            ].map(({ icon: I, t }) => (
              <li key={t} className="border-r border-b border-border bg-background p-8">
                <I aria-hidden className="size-8 text-primary" />
                <h3 className="mt-5 text-2xl uppercase">{t}</h3>
              </li>
            ))}
          </ul></div>
        </section>

        {/* 3 SOLUÇÃO */}
        <section id="solucao" aria-labelledby="solucao-h" className="bg-secondary py-20 md:py-28">
          <div className="container-t">
            <SectionHead eyebrow="A solução Titans" id="solucao-h" title="Um fluxo de engenharia, um responsável técnico">
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">A Titans conduz a máquina do diagnóstico à documentação final, com projeto, implantação e validação do sistema de segurança. Você recebe a máquina avaliada, protegida e documentada, e decide o investimento com os riscos priorizados.</p>
            </SectionHead>
            <ol className="mt-14 grid items-end gap-3 md:grid-cols-5" aria-label="Escada de serviços Titans NR-12">
              {STEPS.map((s, i) => (
                <li key={s} className="flex flex-col justify-between border-t-4 border-primary bg-background p-5" style={{ minHeight: `${9 + i * 2.5}rem` }}>
                  <span className="font-display text-5xl font-extrabold text-primary">{i + 1}</span>
                  <h3 className="mt-4 text-xl uppercase">{s}</h3>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-2xl text-muted-foreground">Cada degrau pode ser contratado separadamente, ou no pacote <strong className="text-foreground">“Titans NR-12 Completo”</strong>.</p>
          </div>
        </section>

        {/* 4 APLICAÇÕES */}
        <section id="aplicacoes" aria-labelledby="aplicacoes-h" className="py-20 md:py-28">
          <div className="container-t grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow="Aplicações" id="aplicacoes-h" title="Máquinas e setores atendidos" />
              <h3 className="mt-10 text-xl uppercase">Máquinas</h3>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {MAQUINAS.map((m) => <li key={m} className="flex items-center gap-3 border-b border-border py-3 font-medium"><span className="size-2 bg-primary" aria-hidden />{m}</li>)}
              </ul>
              <p className="mt-4 text-muted-foreground">Nacionais, importadas, novas e usadas.</p>
              <h3 className="mt-10 text-xl uppercase">Setores</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{SETORES.map((s) => <Chip key={s}>{s}</Chip>)}</ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <MediaSlot legenda="FOTO: prensa ou dobradeira com proteções instaladas" width={1200} height={700} />
              <MediaSlot legenda="FOTO: célula robotizada ou cobot com área de segurança" width={1200} height={700} />
            </div>
          </div>
        </section>

        {/* 5 BENEFÍCIOS */}
        <section aria-labelledby="beneficios-h" className="bg-ink py-20 text-ink-foreground md:py-28">
          <div className="container-t">
            <SectionHead dark eyebrow="Benefícios" id="beneficios-h" title="O que você recebe" />
            <ul className="mt-12 grid border-l border-t border-ink-line md:grid-cols-2 lg:grid-cols-3">
              {BENEFICIOS.map((b) => (
                <li key={b} className="flex gap-4 border-r border-b border-ink-line bg-ink p-7">
                  <Check aria-hidden className="mt-0.5 size-6 shrink-0 text-primary" />
                  <span className="text-lg">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-ink-muted">A Titans não garante ausência de autuação; entrega engenharia e documentação técnica.</p>
          </div>
        </section>

        {/* 6 TECNOLOGIAS */}
        <section aria-labelledby="tec-h" className="py-20 md:py-28">
          <div className="container-t">
            <SectionHead eyebrow="Tecnologias" id="tec-h" title="Como fazemos" />
            <ul className="mt-12 grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
              {TECNOLOGIAS.map(({ icon: I, t }) => (
                <li key={t} className="border-r border-b border-border bg-background p-6">
                  <I aria-hidden className="size-7 text-primary" />
                  <p className="mt-4 font-semibold leading-snug">{t}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 text-xl uppercase">Normas de referência</h3>
            <ul className="mt-4 flex flex-wrap gap-2">{NORMAS.map((n) => <Chip key={n}>{n}</Chip>)}</ul>
          </div>
        </section>

        {/* 7 METODOLOGIA */}
        <section id="metodologia" aria-labelledby="metodo-h" className="bg-secondary py-20 md:py-28">
          <div className="container-t">
            <SectionHead eyebrow="Metodologia" id="metodo-h" title="Como a Titans conduz o projeto" />
            <ol className="relative mt-14 grid gap-8 border-l-2 border-primary pl-8 lg:grid-cols-6 lg:gap-4 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-10">
              {FASES.map((f, i) => (
                <li key={f.f} className="relative">
                  <span aria-hidden className="absolute -left-[2.6rem] top-0 flex size-8 items-center justify-center bg-primary font-display font-bold text-primary-foreground lg:-top-[3.55rem] lg:left-0">{i + 1}</span>
                  <h3 className="text-xl uppercase">{f.f}</h3>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">O que acontece</p>
                  <p className="mt-1 text-sm">{f.o}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">O que você recebe</p>
                  <p className="mt-1 text-sm font-semibold">{f.r}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8 CASES */}
        <section id="cases" aria-labelledby="cases-h" className="py-20 md:py-28">
          <div className="container-t">
            <SectionHead eyebrow="Cases" id="cases-h" title="Experiência comprovada" />
            <div className="mt-10 flex min-h-20 items-center justify-center border border-dashed border-input bg-secondary p-6 text-center">
              <Preencher>logos autorizados</Preencher>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <li key={n} className="border-t-4 border-primary bg-secondary p-6">
                  <MediaSlot legenda={`FOTO: case ${n} (máquina adequada)`} width={1200} height={750} />
                  <h3 className="mt-5 text-xl uppercase">Case {n}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    {["Setor", "Máquina", "Desafio", "O que foi feito", "Resultado"].map((k) => (
                      <div key={k}><dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="mt-1"><Preencher>case autorizado pela Titans</Preencher></dd></div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9 FAQ */}
        <section aria-labelledby="faq-h" className="bg-secondary py-20 md:py-28">
          <div className="container-t grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <SectionHead eyebrow="FAQ" id="faq-h" title="Perguntas frequentes" />
            <div className="divide-y divide-border border-y border-border">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <h3 className="text-xl normal-case">{f.q}</h3>
                    <Plus aria-hidden className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10 CTA FINAL */}
        <section aria-labelledby="cta-h" className="relative overflow-hidden bg-ink py-20 text-ink-foreground md:py-28">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
          <div className="container-t relative text-center">
            <ShieldCheck aria-hidden className="mx-auto size-10 text-primary" />
            <h2 id="cta-h" className="mx-auto mt-6 max-w-4xl text-4xl uppercase md:text-6xl">Comece pelo diagnóstico. Decida com os riscos na mão.</h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/adequacao-nr-12/diagnostico" className={btn.primary}>Solicite um diagnóstico NR-12</Link>
              <a href={whatsappUrl()} target="_blank" rel="noopener" onClick={() => track("click_whatsapp", { local: "cta_final" })} className={btn.outlineLight}><MessageCircle aria-hidden className="size-5" />Fale com nossa engenharia</a>
              <a href={rfqUrl()} onClick={() => track("click_rfq", { local: "cta_final" })} className={btn.outlineLight}>Envie sua RFQ</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

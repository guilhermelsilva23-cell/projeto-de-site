import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { HelpCircle, FileX, Ship, Check, CheckCircle2, Loader2 } from "lucide-react";
import { Logo } from "@/components/titans/Logo";
import { Footer } from "@/components/titans/Footer";
import { MediaSlot } from "@/components/titans/MediaSlot";
import { Preencher } from "@/components/titans/Preencher";
import { btn, SectionHead } from "@/components/titans/Buttons";
import { SITE } from "@/config/site";
import { track } from "@/lib/analytics";
import { organizationLd, serviceLd, ldScript } from "@/lib/schema";
import { CARGOS, MAQUINAS, ORIGENS, QUANTIDADES, leadSchema } from "@/lib/lead";
import { enviarLead } from "@/lib/lead.functions";

const TITLE = "Diagnóstico NR-12 de Máquinas | Titans Engenharia";
const DESC = "Descubra o que está fora da NR-12 na sua máquina e o que priorizar. Solicite o diagnóstico com a engenharia da Titans.";

export const Route = createFileRoute("/adequacao-nr-12/diagnostico")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/adequacao-nr-12/diagnostico" },
    ],
    links: [{ rel: "canonical", href: "/adequacao-nr-12/diagnostico" }],
    scripts: [ldScript(organizationLd), ldScript(serviceLd("Diagnóstico NR-12 de máquinas", DESC))],
  }),
  component: Landing,
});

const ToForm = ({ children = "Solicitar diagnóstico" }: { children?: string }) => (
  <a href="#formulario" className={btn.primary}>{children}</a>
);

function Landing() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/95 backdrop-blur">
        <div className="container-t flex h-16 items-center justify-between">
          <Logo className="h-9 w-auto" />
          <a href="#formulario" className={`${btn.primary} px-4 py-2.5 text-sm`}>Solicitar diagnóstico</a>
        </div>
      </header>
      <main>
        <section aria-labelledby="h1" className="relative overflow-hidden bg-ink text-ink-foreground">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="container-t relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">Diagnóstico NR-12</p>
              <h1 id="h1" className="mt-5 text-5xl uppercase sm:text-6xl lg:text-7xl">Sua máquina está em conformidade com a <span className="text-primary">NR-12</span>?</h1>
              <p className="mt-6 max-w-xl text-lg text-ink-muted">Descubra o que está fora da norma, o que priorizar e como corrigir, antes de decidir quanto investir.</p>
              <div className="mt-9"><ToForm /></div>
              <p className="mt-4 text-sm text-ink-muted">Engenharia com responsável técnico e ART <Preencher>confirmar com a Titans antes de publicar</Preencher></p>
            </div>
            <MediaSlot dark legenda="FOTO: engenheiro avaliando máquina industrial em campo" width={1200} height={900} />
          </div>
        </section>

        <section aria-labelledby="prob-h" className="py-20 md:py-24">
          <div className="container-t">
            <SectionHead eyebrow="O problema" id="prob-h" title="Máquina sem diagnóstico é risco sem prioridade" />
            <ul className="mt-12 grid border-l border-t border-border md:grid-cols-3">
              {[
                { icon: HelpCircle, t: "Você não sabe o que está fora da norma" },
                { icon: FileX, t: "Laudo sozinho não protege o operador" },
                { icon: Ship, t: "Máquina importada pode chegar sem manual em português e sem sistema de segurança verificável" },
              ].map(({ icon: I, t }) => (
                <li key={t} className="border-r border-b border-border bg-background p-8"><I aria-hidden className="size-8 text-primary" /><h3 className="mt-5 text-2xl uppercase">{t}</h3></li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="sol-h" className="pb-20 md:pb-24">
          <div className="container-t grid gap-12 border-t border-border pt-20 lg:grid-cols-2">
            <SectionHead eyebrow="A solução" id="sol-h" title="O que é o Diagnóstico NR-12 da Titans">
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Uma avaliação de engenharia da sua máquina: inventário, identificação das zonas de perigo, checagem da documentação e lista de não conformidades priorizada.</p>
              <p className="mt-6 font-semibold">Preço: <Preencher>gratuito ou valor de entrada; decisão pendente da Titans</Preencher></p>
            </SectionHead>
            <div className="border-t-4 border-primary bg-secondary p-8">
              <h3 className="text-2xl uppercase">Entregáveis</h3>
              <ul className="mt-6 space-y-4">
                {["Inventário da máquina", "Lista de não conformidades", "Prioridades de correção", "Caminho estimado de adequação"].map((e) => (
                  <li key={e} className="flex gap-3 text-lg"><Check aria-hidden className="mt-1 size-5 shrink-0 text-primary" />{e}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm"><Preencher>confirmar o que está incluído e o prazo</Preencher></p>
            </div>
          </div>
        </section>

        <section aria-labelledby="ben-h" className="bg-secondary py-20 md:py-24">
          <div className="container-t">
            <SectionHead eyebrow="Benefícios" id="ben-h" title="Por que começar pelo diagnóstico" />
            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                <>Escopo fechado e prazo definido <Preencher>prazo</Preencher></>,
                "Riscos priorizados por criticidade.",
                "Base para decidir o investimento sem estimar.",
                "Um único responsável técnico.",
              ].map((b, i) => (
                <li key={i} className="bg-background p-6">
                  <span className="font-display text-4xl font-extrabold text-primary">0{i + 1}</span>
                  <p className="mt-3 text-lg font-semibold">{b}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10"><ToForm /></div>
          </div>
        </section>

        {SITE.SHOW_CASE && (
          <section aria-labelledby="case-h" className="py-20 md:py-24">
            <div className="container-t">
              <SectionHead eyebrow="Case" id="case-h" title="Experiência em máquinas industriais" />
              <div className="mt-10 border-t-4 border-primary bg-secondary p-8"><Preencher>case autorizado</Preencher></div>
            </div>
          </section>
        )}

        <FormSection />

        <section className="py-12">
          <div className="container-t text-center">
            <Link to="/adequacao-nr-12" className="font-semibold underline decoration-primary decoration-2 underline-offset-4">Conheça a solução completa de Adequação NR-12</Link>
          </div>
        </section>
      </main>
      <Footer minimal />
    </>
  );
}

type Errors = { [k: string]: string | undefined };
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function Field({ id, label, error, children, optional }: { id: string; label: string; error?: string | undefined; children: React.ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">{label}{optional && <span className="font-normal text-ink-muted"> (opcional)</span>}</label>
      <div className="mt-1.5">{children}</div>
      {error && <p id={`${id}-erro`} role="alert" className="mt-1 text-sm font-semibold text-primary">{error}</p>}
    </div>
  );
}

const inputCls = "w-full border border-ink-line bg-[color-mix(in_oklab,var(--ink-foreground)_6%,transparent)] px-3 py-3 text-ink-foreground placeholder:text-ink-muted focus:border-primary";

function FormSection() {
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [failMsg, setFailMsg] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtm(Object.fromEntries(UTM.map((k) => [k, p.get(k) ?? ""])) as Record<string, string>);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { track("form_view"); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = { ...Object.fromEntries(fd.entries()), consentimento: fd.get("consentimento") === "on" };
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await enviarLead({ data: parsed.data });
      track("form_submit", { maquina: parsed.data.maquina, origem: parsed.data.origem, quantidade: parsed.data.quantidade });
      setStatus("ok");
    } catch (err) {
      setFailMsg(err instanceof Error ? err.message : "Erro ao enviar.");
      setStatus("fail");
    }
  }

  const a = (k: string) => ({ id: `f-${k}`, name: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `f-${k}-erro` : undefined });

  return (
    <section ref={ref} id="formulario" aria-labelledby="form-h" className="border-y-4 border-primary bg-ink py-20 text-ink-foreground md:py-24">
      <div className="container-t grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHead dark eyebrow="Formulário" id="form-h" title="Solicite seu diagnóstico">
          <p className="mt-6 text-ink-muted">Preencha os dados da sua máquina. A engenharia da Titans retorna com os próximos passos.</p>
        </SectionHead>

        {status === "ok" ? (
          <div role="status" className="border border-ink-line p-8">
            <CheckCircle2 aria-hidden className="size-10 text-primary" />
            <p className="mt-4 text-xl font-semibold">Recebemos sua solicitação. Nossa engenharia entra em contato em {SITE.PRAZO_RETORNO || <Preencher>prazo</Preencher>}.</p>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} onFocus={() => { if (!started.current) { started.current = true; track("form_start"); } }} className="grid gap-5 sm:grid-cols-2">
            <Field id="f-nome" label="Nome" error={errors["nome"]}><input {...a("nome")} autoComplete="name" className={inputCls} /></Field>
            <Field id="f-cargo" label="Cargo" error={errors["cargo"]}>
              <select {...a("cargo")} defaultValue="" className={inputCls}><option value="" disabled>Selecione</option>{CARGOS.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field id="f-empresa" label="Empresa" error={errors["empresa"]}><input {...a("empresa")} autoComplete="organization" className={inputCls} /></Field>
            <Field id="f-email" label="E-mail corporativo" error={errors["email"]}><input {...a("email")} type="email" autoComplete="email" className={inputCls} /></Field>
            <Field id="f-telefone" label="Telefone/WhatsApp" error={errors["telefone"]}><input {...a("telefone")} type="tel" autoComplete="tel" placeholder="(11) 99999-9999" className={inputCls} /></Field>
            <Field id="f-maquina" label="Tipo de máquina" error={errors["maquina"]}>
              <select {...a("maquina")} defaultValue="" className={inputCls}><option value="" disabled>Selecione</option>{MAQUINAS.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <fieldset className="sm:col-span-1">
              <legend className="text-sm font-semibold">Origem da máquina</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {ORIGENS.map((o, i) => (
                  <label key={o} className="flex items-center gap-2"><input type="radio" name="origem" value={o} id={i === 0 ? "f-origem" : undefined} className="size-4 accent-primary" />{o}</label>
                ))}
              </div>
              {errors["origem"] && <p role="alert" className="mt-1 text-sm font-semibold text-primary">{errors["origem"]}</p>}
            </fieldset>
            <Field id="f-quantidade" label="Quantidade de máquinas" error={errors["quantidade"]}>
              <select {...a("quantidade")} defaultValue="" className={inputCls}><option value="" disabled>Selecione</option>{QUANTIDADES.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <div className="sm:col-span-2">
              <Field id="f-mensagem" label="Mensagem" optional error={errors["mensagem"]}><textarea {...a("mensagem")} rows={4} className={inputCls} /></Field>
            </div>
            {/* honeypot anti-spam */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="f-website">Não preencha</label><input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {UTM.map((k) => <input key={k} type="hidden" name={k} value={utm[k] ?? ""} />)}
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-sm">
                <input {...a("consentimento")} type="checkbox" className="mt-0.5 size-5 shrink-0 accent-primary" />
                <span>Concordo com o tratamento dos meus dados para contato comercial, conforme a <Link to="/politica-de-privacidade" className="underline">política de privacidade</Link> (LGPD).</span>
              </label>
              {errors["consentimento"] && <p id="f-consentimento-erro" role="alert" className="mt-1 text-sm font-semibold text-primary">{errors["consentimento"]}</p>}
            </div>
            {status === "fail" && <p role="alert" className="text-sm font-semibold text-primary sm:col-span-2">{failMsg}</p>}
            <div className="sm:col-span-2">
              <button type="submit" disabled={status === "sending"} className={`${btn.primary} w-full sm:w-auto disabled:opacity-70`}>
                {status === "sending" && <Loader2 aria-hidden className="size-5 animate-spin" />}Solicitar diagnóstico
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { Logo } from "./Logo";
import { Preencher } from "./Preencher";

export function Footer({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer id="contato" className="border-t-2 border-primary bg-ink text-ink-foreground">
      <div className="container-t grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo className="h-12 w-auto" />
          <p className="mt-4 text-sm text-ink-muted">{SITE.NOME_EMPRESA}</p>
        </div>
        <address className="space-y-2 text-sm not-italic text-ink-muted">
          <p className="font-display text-base font-bold uppercase tracking-wide text-ink-foreground">
            Contato
          </p>
          <p>{SITE.ENDERECO || <Preencher>endereço</Preencher>}</p>
          <p>{SITE.CIDADE_UF || <Preencher>CIDADE_UF</Preencher>}</p>
          <p>WhatsApp: {SITE.WHATSAPP_NUMERO || <Preencher>WHATSAPP_NUMERO</Preencher>}</p>
          <p>
            E-mail:{" "}
            {SITE.EMAIL_RFQ ? (
              <a className="underline" href={`mailto:${SITE.EMAIL_RFQ}`}>
                {SITE.EMAIL_RFQ}
              </a>
            ) : (
              <Preencher>EMAIL_RFQ</Preencher>
            )}
          </p>
        </address>
        <nav aria-label="Links institucionais" className="text-sm">
          <p className="font-display text-base font-bold uppercase tracking-wide">Links</p>
          <ul className="mt-2 space-y-2 text-ink-muted">
            {!minimal && (
              <li>
                <Link to="/adequacao-nr-12/diagnostico" className="hover:text-ink-foreground">
                  Diagnóstico NR-12
                </Link>
              </li>
            )}
            {minimal && (
              <li>
                <Link to="/adequacao-nr-12" className="hover:text-ink-foreground">
                  Adequação NR-12
                </Link>
              </li>
            )}
            <li>
              <Link to="/politica-de-privacidade" className="hover:text-ink-foreground">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} {SITE.NOME_EMPRESA}
      </div>
    </footer>
  );
}

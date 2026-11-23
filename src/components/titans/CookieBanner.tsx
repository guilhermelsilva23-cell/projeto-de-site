import { useEffect, useState } from "react";
import { carregarAnalytics, lerEscolha, salvarEscolha, type Escolha } from "@/lib/cookies";

export function CookieBanner() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const e = lerEscolha();
    if (e === "aceito") carregarAnalytics();
    else if (e === null) setAberto(true);
  }, []);

  if (!aberto) return null;

  const escolher = (e: Escolha) => {
    salvarEscolha(e);
    if (e === "aceito") carregarAnalytics();
    setAberto(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--cor-cinza)] bg-[color:var(--cor-preto)] text-[color:var(--cor-branco)]"
    >
      <div className="container-t flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          Usamos cookies de medição para entender o uso do site. Veja a{" "}
          <a href="/politica-de-privacidade" className="underline">
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => escolher("recusado")}
            className="border border-[color:var(--cor-branco)] px-4 py-2 text-sm font-semibold"
          >
            Recusar
          </button>
          <button
            onClick={() => escolher("aceito")}
            className="border border-[color:var(--cor-branco)] px-4 py-2 text-sm font-semibold"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

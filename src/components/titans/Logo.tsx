import logoBranco from "@/assets/titans-logo-horizontal-branco.png.asset.json";

/** Logo Titans (versão branca para fundo preto). Troque por SVG quando disponível. */
export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={logoBranco.url} alt="Titans Soluções" width={813} height={307} className={className} />;
}

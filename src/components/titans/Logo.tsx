/** Logo Titans (versão branca para fundo preto), servida de public/. Troque por SVG quando disponível. */
export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src="/titans-logo-horizontal-branco.png"
      alt="Titans Soluções"
      width={813}
      height={307}
      className={className}
    />
  );
}

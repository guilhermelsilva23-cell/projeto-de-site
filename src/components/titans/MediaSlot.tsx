import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Área reservada para foto/vídeo. Para trocar: passe `src` com a imagem real
 * (mantenha width/height e alt descritivo).
 */
export function MediaSlot({
  legenda, src, alt, width = 1200, height = 800, dark = false, className,
}: { legenda: string; src?: string; alt?: string; width?: number; height?: number; dark?: boolean; className?: string | undefined }) {
  if (src) {
    return <img src={src} alt={alt ?? legenda} width={width} height={height} loading="lazy" decoding="async" className={cn("h-auto w-full object-cover", className)} />;
  }
  return (
    <figure
      className={cn("media-slot", dark ? "media-slot--dark" : "", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={`Espaço reservado: ${legenda}`}
    >
      <ImageIcon aria-hidden className="size-8 opacity-60" />
      <figcaption className="mt-3 max-w-xs text-center text-xs font-semibold uppercase tracking-wider">{legenda}</figcaption>
    </figure>
  );
}

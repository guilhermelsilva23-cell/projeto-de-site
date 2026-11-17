import { cn } from "@/lib/utils";

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 font-display text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary-hover",
  outlineLight: "inline-flex items-center justify-center gap-2 border-2 border-ink-foreground px-6 py-3 font-display text-base font-bold uppercase tracking-wider text-ink-foreground transition-colors hover:bg-ink-foreground hover:text-ink",
  outlineDark: "inline-flex items-center justify-center gap-2 border-2 border-foreground px-6 py-3 font-display text-base font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background",
};

export function SectionHead({ eyebrow, title, id, dark = false, children, className }: { eyebrow: string; title: string; id: string; dark?: boolean; children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={cn("mt-4 text-4xl uppercase md:text-5xl", dark ? "text-ink-foreground" : "text-foreground")}>{title}</h2>
      {children}
    </div>
  );
}

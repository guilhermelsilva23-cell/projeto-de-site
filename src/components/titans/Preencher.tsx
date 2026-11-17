/** Marcador visível de dado faltante. Busque por "[PREENCHER" no código. */
export function Preencher({ children }: { children: string }) {
  return <mark className="preencher">[PREENCHER: {children}]</mark>;
}

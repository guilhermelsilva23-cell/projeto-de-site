import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/config/site", async (orig) => {
  const m = await orig<typeof import("@/config/site")>();
  return { ...m, SITE: { ...m.SITE, SHOW_CASE: true } };
});
vi.mock("@tanstack/react-router", async (orig) => {
  const m = await orig<typeof import("@tanstack/react-router")>();
  return { ...m, Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a> };
});
vi.mock("@/lib/lead.functions", () => ({ enviarLead: vi.fn() }));

globalThis.IntersectionObserver ??= class {
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

describe("Landing de diagnóstico com SHOW_CASE ligado", () => {
  it("renderiza o bloco de case sem erro", async () => {
    const { Route } = await import("@/routes/adequacao-nr-12.diagnostico");
    const C = Route.options.component as React.ComponentType;
    render(<C />);
    expect(screen.getByText(/case autorizado/)).toBeTruthy();
  });
});

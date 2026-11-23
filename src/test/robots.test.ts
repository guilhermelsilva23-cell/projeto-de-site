import { describe, expect, it } from "vitest";
import { montarRobots } from "@/lib/robots";

describe("robots.txt", () => {
  it("sem SITE_URL: mantém regras e não inclui Sitemap", () => {
    const r = montarRobots("");
    expect(r).toContain("User-agent: Googlebot\nAllow: /");
    expect(r).toContain("User-agent: *\nAllow: /");
    expect(r).not.toContain("Sitemap:");
  });
  it("com SITE_URL: inclui Sitemap com o domínio", () => {
    expect(montarRobots("https://titans.com.br/")).toContain("Sitemap: https://titans.com.br/sitemap.xml");
  });
});

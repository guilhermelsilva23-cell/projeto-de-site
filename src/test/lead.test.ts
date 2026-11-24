import { describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/lead";

const base = {
  nome: "Ana Souza",
  cargo: "Compras",
  empresa: "Metal SA",
  email: "ana@metalsa.com.br",
  telefone: "(11) 99999-0000",
  maquina: "Prensa",
  origem: "Importada",
  quantidade: "2 a 5",
  consentimento: true,
};

describe("formulário de diagnóstico", () => {
  it("aceita um lead completo", () => expect(leadSchema.safeParse(base).success).toBe(true));
  it("exige consentimento LGPD", () =>
    expect(leadSchema.safeParse({ ...base, consentimento: false }).success).toBe(false));
  it("aceita e-mail gratuito (gmail, hotmail etc.)", () =>
    expect(leadSchema.safeParse({ ...base, email: "ana@gmail.com" }).success).toBe(true));
  it("recusa e-mail com formato inválido", () =>
    expect(leadSchema.safeParse({ ...base, email: "ana@invalido" }).success).toBe(false));
  it("não falha a validação quando o honeypot vem preenchido", () =>
    expect(leadSchema.safeParse({ ...base, website: "spam" }).success).toBe(true));
});

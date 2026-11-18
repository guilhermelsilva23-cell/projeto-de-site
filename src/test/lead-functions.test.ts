import { beforeEach, describe, expect, it, vi } from "vitest";

// Expõe o handler puro do createServerFn para testar a lógica do servidor.
vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    inputValidator: (v: (d: unknown) => unknown) => ({
      handler: (h: (args: { data: unknown }) => unknown) => {
        const fn = async (opts: { data: unknown }) => h({ data: v(opts.data) });
        fn.handler = h;
        return fn;
      },
    }),
  }),
}));

const insertMock = vi.fn();
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: { from: () => ({ insert: insertMock }) },
}));

const { enviarLead } = await import("@/lib/lead.functions");
const { SITE } = await import("@/config/site");

const lead = {
  nome: "Ana Souza", cargo: "Compras", empresa: "Metal SA", email: "ana@gmail.com",
  telefone: "(11) 99999-0000", maquina: "Prensa", origem: "Importada", quantidade: "2 a 5",
  mensagem: "", consentimento: true, website: "",
  utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "",
};

describe("enviarLead (servidor)", () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
  });

  it("honeypot preenchido: retorna sucesso sem salvar nem encaminhar", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const res = await enviarLead({ data: { ...lead, website: "http://spam" } });
    expect(res).toEqual({ ok: true });
    expect(insertMock).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("sem URL_FORMULARIO_DESTINO: salva no banco e avisa destino_nao_configurado", async () => {
    expect(SITE.URL_FORMULARIO_DESTINO).toBe(""); // pré-condição do projeto
    const res = await enviarLead({ data: lead });
    expect(res).toEqual({ ok: true, aviso: "destino_nao_configurado" });
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock.mock.calls[0]![0]).toMatchObject({ email: "ana@gmail.com", email_corporativo: false });
  });

  it("marca e-mail corporativo como true para domínio empresarial", async () => {
    await enviarLead({ data: { ...lead, email: "ana@metalsa.com.br" } });
    expect(insertMock.mock.calls[0]![0]).toMatchObject({ email_corporativo: true });
  });

  it("falha do banco: retorna erro pedindo para falar pelo WhatsApp", async () => {
    insertMock.mockResolvedValue({ error: { message: "boom" } });
    await expect(enviarLead({ data: lead })).rejects.toThrow("Não foi possível enviar agora. Fale pelo WhatsApp.");
  });
});

import { z } from "zod";

export const CARGOS = ["Engenharia/Manutenção", "Segurança do Trabalho", "Gerência/Direção", "Compras", "Outro"] as const;
export const MAQUINAS = ["Prensa", "Dobradeira", "Guilhotina", "Injetora", "Embaladora", "Esteira", "Célula robotizada/cobot", "AGV/transelevador", "Outra"] as const;
export const ORIGENS = ["Nacional", "Importada", "Não sei"] as const;
export const QUANTIDADES = ["1", "2 a 5", "6 a 20", "Mais de 20"] as const;

export const FREE_EMAIL = /@(gmail|hotmail|outlook|yahoo|live|bol|uol|icloud)\./i;

export const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  cargo: z.enum(CARGOS, { errorMap: () => ({ message: "Selecione o cargo" }) }),
  empresa: z.string().trim().min(2, "Informe a empresa").max(120),
  email: z.string().trim().email("E-mail inválido").max(160),
  telefone: z.string().trim().regex(/^[\d\s()+-]{10,20}$/, "Telefone inválido"),
  maquina: z.enum(MAQUINAS, { errorMap: () => ({ message: "Selecione o tipo de máquina" }) }),
  origem: z.enum(ORIGENS, { errorMap: () => ({ message: "Selecione a origem" }) }),
  quantidade: z.enum(QUANTIDADES, { errorMap: () => ({ message: "Selecione a quantidade" }) }),
  mensagem: z.string().trim().max(1500).optional().default(""),
  consentimento: z.literal(true, { errorMap: () => ({ message: "É preciso aceitar a política de privacidade" }) }),
  website: z.string().max(200).optional().default(""), // honeypot: preenchido = robô; o servidor finge sucesso
  utm_source: z.string().max(200).optional().default(""),
  utm_medium: z.string().max(200).optional().default(""),
  utm_campaign: z.string().max(200).optional().default(""),
  utm_content: z.string().max(200).optional().default(""),
  utm_term: z.string().max(200).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

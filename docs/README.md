# Documentação consolidada — etapas 01–08

Esta pasta é a área oficial da documentação entregue com o código do site. A duplicação de pastas existente no material auditado não foi reproduzida: cada etapa tem uma única localização em `docs/etapas/` e o código permanece na raiz do repositório.

## Estado

As etapas 01 a 08 estão em **rascunho desenvolvido / parcialmente validado**. O repositório contém evidência técnica do site, do formulário, da persistência server-side, do consentimento, do SEO técnico e da operação de leads. Isso não equivale a publicação concluída: ainda faltam dados fornecidos pela Titans e validação humana, jurídica e técnica.

## Estrutura

| Pasta             | Tema                                       | Situação nesta entrega                                        |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------- |
| `01-diagnostico`  | problema, público e enquadramento          | hipóteses a validar com entrevistas e evidências              |
| `02-mercado`      | dados de mercado, Comex Stat e TAM/SAM/SOM | fontes e números ainda não fornecidos                         |
| `03-concorrencia` | benchmarking e provas                      | autorização e levantamento final pendentes                    |
| `04-oferta`       | escopo, preço, prazo e capacidade          | decisão comercial da Titans pendente                          |
| `05-personas`     | personas e simulações                      | entrevistas e rodadas S01–S04 pendentes                       |
| `06-prototipo`    | site, UX e conteúdo                        | código consolidado; revisão visual pendente                   |
| `07-seo`          | rotas, metadados, sitemap e robots         | implementado no código; domínio e Search Console pendentes    |
| `08-metricas`     | eventos, baseline e acompanhamento         | instrumentação inicial no código; metas e dashboard pendentes |

## Fontes e limitações

A auditoria recebida menciona um ZIP académico, mas esse ZIP não estava disponível no ambiente desta consolidação. Por isso, esta entrega não inventa os 98 documentos, dados de mercado, cases, logos, contactos, credenciais, preços ou resultados. O TXT de auditoria foi preservado fora do repositório como material de entrada; as decisões implementadas encontram-se no `README.md`, em `roadmap.md` e no histórico Git.

## Checklist de passagem para publicação

A publicação deve aguardar o preenchimento de `src/config/site.ts`, a configuração do destino de leads, a confirmação da migração Supabase, a aprovação da política de privacidade, a revisão do engenheiro responsável, as autorizações de provas e a execução de lint, testes, build e revisão visual no ambiente oficial.

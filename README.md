# Site — Titans Soluções de Engenharia

Site institucional da Titans focado em adequação de máquinas à NR-12, com página de campanha e formulário de diagnóstico.

## Rotas

| Rota                           | Descrição                                    |
| ------------------------------ | -------------------------------------------- |
| `/`                            | Redireciona para `/adequacao-nr-12`          |
| `/adequacao-nr-12`             | Página principal (10 seções, indexável)      |
| `/adequacao-nr-12/diagnostico` | Landing de campanha com formulário (noindex) |
| `/politica-de-privacidade`     | Política de privacidade (LGPD)               |
| `/sitemap.xml`                 | Sitemap das páginas indexáveis               |

## Configurações

- **`src/config/site.ts`** — contatos (WhatsApp, e-mail de RFQ, endereço), URL de destino do formulário, prazo de retorno, `SITE_URL`, IDs de analytics (GA4, Meta Pixel) e o interruptor do bloco de case (`SHOW_CASE`). Os campos comerciais devem ser preenchidos apenas com dados confirmados pela Titans.
- **`src/styles.css`** — cores do tema (variáveis `--cor-*`), espelhadas em `CORES` no `site.ts`.

### SITE_URL e sitemap

Basta preencher `SITE_URL` em `src/config/site.ts` com o domínio oficial (ex.: `https://www.titans.com.br`). Canonical, `og:url`, `sitemap.xml` e o `Sitemap:` de `/robots.txt` passam a usar esse domínio automaticamente; não é necessário editar a rota manualmente.

### Formulário de diagnóstico

Cada envio é salvo no banco do projeto (tabela `leads`). Se `URL_FORMULARIO_DESTINO` estiver preenchida, o lead também é encaminhado ao webhook (Make, Zapier, CRM etc.).

## Publicar

Antes de publicar, execute `npm run lint`, `npm test` e `npm run build`. Confirme também a migração `drizzle/migrations/0001_leads_somente_servidor.sql` no Supabase, os dados em `src/config/site.ts`, o destino dos leads e a revisão técnica dos textos.

## Onde ver os leads

Todo envio do formulário é salvo na tabela **leads** do banco do projeto (área de Backend/Database). A coluna `encaminhado_webhook` fica `true` só quando o webhook de `URL_FORMULARIO_DESTINO` respondeu com sucesso.

## robots.txt

`/robots.txt` é gerado dinamicamente; com `SITE_URL` preenchido, inclui a linha `Sitemap: {SITE_URL}/sitemap.xml`.

## Desenvolvimento local

```sh
npm i
npm run dev
```

Testes: `npx vitest run`.

## Estado de entrega

O repositório é a fonte oficial do código do site e está consolidado numa única raiz. A implementação técnica está fechada até à etapa 08 (site, formulário, SEO técnico, consentimento, armazenamento de leads e documentação de operação), mas a publicação continua bloqueada até a Titans fornecer contactos, domínio, regra comercial, política institucional aprovada, credenciais técnicas, imagens e autorizações de cases. Consulte `docs/README.md` e `roadmap.md`.

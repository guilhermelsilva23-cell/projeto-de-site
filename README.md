# Site — Titans Soluções de Engenharia

Site institucional da Titans focado em adequação de máquinas à NR-12, com página de campanha e formulário de diagnóstico.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Redireciona para `/adequacao-nr-12` |
| `/adequacao-nr-12` | Página principal (10 seções, indexável) |
| `/adequacao-nr-12/diagnostico` | Landing de campanha com formulário (noindex) |
| `/politica-de-privacidade` | Política de privacidade (LGPD) |
| `/sitemap.xml` | Sitemap das páginas indexáveis |

## Configurações

- **`src/config/site.ts`** — contatos (WhatsApp, e-mail de RFQ, endereço), URL de destino do formulário, prazo de retorno, `SITE_URL`, IDs de analytics (GA4, Meta Pixel) e o interruptor do bloco de case (`SHOW_CASE`). Campos vazios aparecem no site como etiquetas amarelas `[PREENCHER]`.
- **`src/styles.css`** — cores do tema (variáveis `--cor-*`), espelhadas em `CORES` no `site.ts`.

### SITE_URL e sitemap

Quando o domínio oficial estiver definido, preencha `SITE_URL` em `src/config/site.ts` (ex.: `https://www.titans.com.br`). Com isso, canonical, `og:url` e `sitemap.xml` passam a usar o domínio. Depois, edite `a rota /robots.txt` e descomente a linha `Sitemap:` com o mesmo domínio.

### Formulário de diagnóstico

Cada envio é salvo no banco do projeto (tabela `leads`). Se `URL_FORMULARIO_DESTINO` estiver preenchida, o lead também é encaminhado ao webhook (Make, Zapier, CRM etc.).

## Publicar

Use a opção de publicação da plataforma onde o projeto está hospedado. As alterações de código só aparecem no endereço público depois de publicadas.

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

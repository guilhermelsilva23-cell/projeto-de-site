# Prompt de ajustes (v4) — pequenos acertos

Como usar: cole o texto entre as linhas na ferramenta, no mesmo projeto. Registre o resultado no campo ao fim.

---
## INÍCIO DO PROMPT

Faça só os ajustes abaixo. Não altere textos, layout, cores nem rotas que não forem citados.

1. TELA DE ERRO. Em src/routes/__root.tsx, o componente de erro voltou para o inglês. Traduza para português do Brasil: "Esta página não carregou", "Algo deu errado do nosso lado. Tente atualizar ou volte ao início.", botão "Tentar de novo". Mantenha igual o texto de src/lib/error-page.ts.
2. BANNER DE COOKIES. Mostre o banner somente quando GA4_ID ou META_PIXEL_ID estiver preenchido. Com os dois vazios, não exibir o banner.
3. README. Na seção "SITE_URL e sitemap", remova a frase que manda editar a rota /robots.txt e descomentar a linha Sitemap. Explique que basta preencher SITE_URL.
4. .ENV. Adicione .env ao .gitignore. Não apague o arquivo .env do projeto.
5. TESTES. Adicione um teste que confirme o banner oculto quando os dois IDs estão vazios. Rode todos os testes.

Entrega: resumo do que foi alterado, o que não foi possível e quais testes passaram.

## FIM DO PROMPT
---

## Registro do resultado

A tela de erro em `src/routes/__root.tsx` usa agora os três textos exatos de `src/lib/error-page.ts`. O banner de cookies só é apresentado e só considera carregar analytics quando pelo menos um dos IDs `GA4_ID` ou `META_PIXEL_ID` está configurado. A seção `SITE_URL e sitemap` do README explica que basta preencher `SITE_URL`; `.env` já estava coberto pelo `.gitignore` e foi mantido intacto no projeto. Foi adicionado um teste de regressão para o caso em que os dois IDs estão vazios.

**Validação:** `npm test` — 5 ficheiros aprovados, 16 testes aprovados. `npm run build` — concluído com sucesso. `git diff --check` e Prettier dos ficheiros alterados — aprovados. Não houve impedimentos para os ajustes; a publicação do site em domínio público não foi realizada, pois não fazia parte deste prompt.

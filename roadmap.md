# Roadmap

## Site fora do ar
- [ ] Diagnosticar 404 no domínio publicado e republicar

## Prompt de ajustes v2
- [ ] 1. Leads: salvar no banco quando URL_FORMULARIO_DESTINO estiver vazia (exige Lovable Cloud); webhook mantido quando configurado; notificação por e-mail se houver conector
- [ ] 2. E-mail: parar de bloquear e-mails gratuitos; adicionar campo email_corporativo no payload; manter rótulo "E-mail"
- [ ] 3. Honeypot: website preenchido → sucesso silencioso, sem erro de validação
- [ ] 4. Analytics: carregar GA4 só se GA4_ID preenchido; Meta Pixel só se META_PIXEL_ID preenchido; manter dataLayer e eventos form_view/form_start/form_submit
- [ ] 5. SITE_URL em src/config/site.ts; usar em canonical, og:url e sitemap.xml quando preenchido
- [ ] 6. robots.txt: linha Sitemap quando SITE_URL existir; documentar no README
- [ ] 7. Tela de erro em pt-BR
- [ ] 8. Logos salvos no repositório (public/), não só no armazenamento Lovable
- [ ] 9. README em português (projeto, rotas, configurações, como publicar)
- [ ] 10. Rodar testes; adicionar teste do honeypot e do caso URL_FORMULARIO_DESTINO vazia
- [ ] Publicar ao final e confirmar o site no ar

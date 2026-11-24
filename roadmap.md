# Roadmap — Titans Soluções de Engenharia

## Estado da entrega

**Etapas 01–08: rascunho desenvolvido / tecnicamente consolidado.** O site, o formulário, a persistência server-side, o consentimento LGPD, o SEO técnico e a documentação de operação estão reunidos neste repositório. A etapa 08 não é marcada como publicação concluída porque faltam decisões e evidências da Titans.

## Fechado no código

- [x] Código do site versionado na raiz oficial, sem cópia interna duplicada.
- [x] Erro global traduzido para português.
- [x] `/robots.txt` e `/sitemap.xml` gerados dinamicamente a partir de `SITE_URL`.
- [x] Landing de diagnóstico com `noindex, follow`.
- [x] Formulário com validação, honeypot, consentimento e UTM.
- [x] Leads gravados pelo servidor; webhook opcional marca `encaminhado_webhook` quando responde com sucesso.
- [x] `.env` excluído do Git e `.env.example` preparado para configuração sem segredos.
- [x] Cases e logos não autorizados ocultos do site institucional.
- [x] Política de privacidade-base publicada, com os pontos de tratamento documentados e indicação das decisões que a Titans deve validar.

## Bloqueadores antes da publicação

- [ ] Preencher WhatsApp, e-mail, cidade/região, prazo de retorno e domínio em `src/config/site.ts`.
- [ ] Definir e testar o webhook/CRM ou rotina operacional de consulta da tabela `leads`.
- [ ] Confirmar no Supabase a aplicação da migração `0001_leads_somente_servidor.sql`.
- [ ] Aprovar juridicamente a política de privacidade e definir controlador/canal de contato institucional.
- [ ] Validar com engenheiro responsável as afirmações técnicas, escopo, ART e credenciais divulgáveis.
- [ ] Definir preço, prazo e escopo final do diagnóstico.
- [ ] Obter autorização escrita para cases, logos e fotografias.
- [ ] Executar lint, testes, build e revisão visual no ambiente oficial.

## Nota acadêmica

Este repositório encerra o desenvolvimento disponível até a etapa 08. As etapas 09–16 (conteúdo, vídeo, mídia paga, campanha, funil, apresentação comercial e KPIs) não são inventadas aqui: precisam de materiais, dados e decisões que não estavam disponíveis no ambiente desta entrega.

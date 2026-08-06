# Alinhar o envio de leads das páginas /i6-intelligence (conteúdo gated)

## O que foi verificado

Li o código dos três caminhos de envio:

- `/contact` → `ContactForm.tsx`: envia via form + iframe oculto, `reason: 'contact-form'`, `source: 'contact-form'`.
- `/i6-blog` (não gated) → `ArticleCTAForm.tsx`: `fetch` no-cors, `reason: 'article-cta-insights'`, `source: 'article-cta-insight'`.
- `/i6-intelligence` gated → `LeadGateForm.tsx`: mesmo pipeline (`normalizeLeadFields` + `APPS_SCRIPT_URL`), `reason: 'lead-gate-research'`, `source: 'lead-gate-research'`, `subscription: 'research:<slug>'`, `insight_id: <id do frontmatter>`.

Ou seja: o formulário gated usa exatamente o mesmo endpoint, token, honeypot, `lead_uid` e campos de tracking do caminho que já está funcionando. Não há campo obrigatório faltando.

Três divergências reais entre esse caminho e o do blog:

1. `reason` no CTA do blog vai no plural (`article-cta-insights`) e no gate de insight também (`lead-gate-insights`), enquanto `source` é singular. É inconsistência de rótulo, não quebra o envio, mas atrapalha a classificação no HUB.
2. `subscription` do research vai como `research:<slug>`; todos os outros caminhos usam o prefixo `insight:` (inclusive o kiosk). Se o HUB casa a inscrição por prefixo `insight:`, o lead de research entra sem vínculo.
3. `insight_id` vem do frontmatter. Conteúdo sincronizado do HUB traz o id real (UUID), mas conteúdo criado manualmente no repo traz um id em formato de slug (ex.: `ruptura-gondola-ia-preditiva`), que o HUB rejeita como UUID inválido — hoje o Apps Script descarta o campo (`uuidOk_`), então o lead entra sem vínculo com o insight, silenciosamente.

## O que fazer

1. Padronizar os `reason` em `LeadGateForm.tsx` e `ArticleCTAForm.tsx` para os mesmos valores de `LeadSource` (singular): `lead-gate-insight`, `lead-gate-research`, `article-cta-insight`, `article-cta-research`.
2. Em `LeadGateForm.tsx`, usar sempre o prefixo `insight:` na `subscription`, mantendo o slug (`insight:<slug>`), igual aos demais caminhos.
3. Em `leadFormConfig.ts`, validar `insight_id` como UUID dentro de `normalizeLeadFields` e remover quando não for UUID — evita mandar id de slug que o HUB descarta sem aviso.
4. Registrar aviso no console (dev) quando um conteúdo gated tiver `id` não-UUID, para detectarmos rápido conteúdo criado fora do HUB.

## Validação

- Abrir um research gated em PT e EN, submeter o gate e confirmar: linha na planilha com `lead_uid`, `reason: lead-gate-research`, `subscription: insight:<slug>`, `source: lead-gate-research`, e registro em `_dispatch_log`.
- Confirmar no HUB um único lead (sem duplicata push/pull) e com o insight vinculado.
- Repetir o botão "Reenviar por e-mail" (modo `resend`) e confirmar que gera novo `lead_uid` e novo despacho.

## Nota técnica

Nenhuma mudança no Apps Script é necessária; tudo acontece no payload enviado pelo site (`src/lib/leadFormConfig.ts`, `src/components/insights/LeadGateForm.tsx`, `src/components/insights/ArticleCTAForm.tsx`).

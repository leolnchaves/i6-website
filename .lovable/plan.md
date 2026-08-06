# Alinhar o envio de leads das páginas /i6-intelligence (conteúdo gated)

## O que foi verificado

Li o código dos três caminhos de envio:

- `/contact` → `ContactForm.tsx`: envia via form + iframe oculto, `reason: 'contact-form'`, `source: 'contact-form'`.
- `/i6-blog` (não gated) → `ArticleCTAForm.tsx`: `fetch` no-cors, `reason: 'article-cta-insights'`, `source: 'article-cta-insight'`.
- `/i6-intelligence` gated → `LeadGateForm.tsx`: mesmo pipeline (`normalizeLeadFields` + `APPS_SCRIPT_URL`), `reason: 'lead-gate-research'`, `source: 'lead-gate-research'`, `subscription: 'research:<slug>'`, `insight_id: <id do frontmatter>`.

Ou seja: o formulário gated usa exatamente o mesmo endpoint, token, honeypot, `lead_uid` e campos de tracking do caminho que já está funcionando. Não há campo obrigatório faltando.

Três divergências reais entre esse caminho e o do blog:

1. `reason` no CTA do blog vai no plural (`article-cta-insights`) e no gate de insight também (`lead-gate-insights`), enquanto `source` é singular. É inconsistência de rótulo, não quebra o envio, mas atrapalha a classificação no HUB.
2. `subscription`: o research manda `research:<slug>` (correto) e o /i6-blog manda `insight:<slug>`, que não identifica o blog como origem.
3. `insight_id` vem do frontmatter e chega preenchido em todo conteúdo gated (sempre provido pelo HUB) — nada a corrigir aqui.

## O que fazer

1. Padronizar os `reason` em `LeadGateForm.tsx` e `ArticleCTAForm.tsx` para os mesmos valores de `LeadSource` (singular): `lead-gate-insight`, `lead-gate-research`, `article-cta-insight`, `article-cta-research`.
2. `subscription`: manter `research:<slug>` no /i6-research (é o comportamento desejado) e passar a usar `blog:<slug>` nos conteúdos do /i6-blog, em vez do atual `insight:<slug>` — assim a origem do lead fica legível no HUB.

Os dois itens anteriores sobre `insight_id` saem do plano: como 100% do conteúdo gated vem do HUB, o `id` é sempre UUID válido e não há necessidade de validação nem de aviso.

## Validação

- Abrir um research gated em PT e EN, submeter o gate e confirmar: linha na planilha com `lead_uid`, `reason: lead-gate-research`, `subscription: research:<slug>`, `source: lead-gate-research`, `insight_id` preenchido, e registro em `_dispatch_log`.
- Abrir um artigo do /i6-blog não gated, submeter o CTA e confirmar `reason: article-cta-insight` e `subscription: blog:<slug>`.
- Confirmar no HUB um único lead (sem duplicata push/pull) e com o insight vinculado.
- Repetir o botão "Reenviar por e-mail" (modo `resend`) e confirmar que gera novo `lead_uid` e novo despacho.


## Nota técnica

Nenhuma mudança no Apps Script é necessária; tudo acontece no payload enviado pelo site (`src/lib/leadFormConfig.ts`, `src/components/insights/LeadGateForm.tsx`, `src/components/insights/ArticleCTAForm.tsx`).

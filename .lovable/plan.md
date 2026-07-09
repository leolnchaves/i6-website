## Objetivo

Fazer o form CTA (bottom de artigos/research não-gated) chegar no i6Hub com o mesmo "source" do form gated (`i6-website`), em vez de cair como `Website`.

## Diagnóstico

O site não envia um campo `source` explícito. O i6Hub deriva o "source" a partir do valor de `subscription` que o form manda:

- `LeadGateForm` (gated) envia `subscription = "insight:<slug>"` ou `"research:<slug>"` → HUB reconhece e rotula como **i6-website**.
- `ArticleCTAForm` (CTA bottom) envia `subscription = "article-cta:<slug>"` ou `"research-cta:<slug>"` → HUB não reconhece o prefixo e cai no default **Website**.

## Mudança

Em `src/components/insights/ArticleCTAForm.tsx`, alinhar o `subscription` ao mesmo formato usado pelo LeadGateForm:

```ts
// antes
formData.append('subscription', `${kind === 'research' ? 'research-cta' : 'article-cta'}:${slug}`);

// depois
formData.append('subscription', `${kind}:${slug}`);
```

Mantemos a diferenciação de origem para o CRM/analytics através dos campos já presentes:

- `message` continua com a tag `[Lead Insights CTA]` / `[Lead Research CTA]`
- `message` continua com `Origem: article-cta-insights` / `article-cta-research`
- Eventos GA4 continuam distintos (`insight_cta_submitted` / `research_cta_submitted`)

Assim o HUB reconhece o `subscription` e marca o lead como **i6-website**, e ainda conseguimos distinguir gated vs CTA olhando a mensagem no lead.

## Fora de escopo

- Não mexer no `LeadGateForm`.
- Não adicionar um campo `source` novo (o HUB já infere do `subscription`).
- Nenhuma release/tag — só depois que você validar.
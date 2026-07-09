## Objetivo

Quando um **i6 Article**  ou um **i6 Research** **não é gated (i6 eBook é sempre gated)**, exibir ao final do artigo um bloco de CTA com uma mensagem (vinda do i6Hub) e um formulário simples de **Nome + E-mail**. Ao enviar, o comportamento é idêntico ao do gate atual: POST para o Apps Script (mesma URL, mesmo token, mesmos campos de tracking) e a tela de sucesso "Obrigado! Em breve entraremos em contato.".

Gated não muda em nada — só os não-gated ganham esse form no rodapé.

## Contrato com o i6Hub (frontmatter dos MDs)

O HUB passa a incluir 2 novos campos opcionais nos feeds `public-insights-feed` e `public-research-feed`:

- `cta_form: true` — flag que liga o CTA no final da página. Ausente ou `false` = sem CTA.
- `cta_form_text: "..."` — texto (uma linha, aspas duplas, aceita `\n` e `**bold**` como já suportamos) exibido acima do form como headline/copy do CTA.

Nenhuma mudança de schema no lado do site além de ler esses dois campos. O script `sync-content-from-i6hub.mjs` já grava frontmatter cru — só precisa incluir os dois novos campos na projeção.

## Onde vai o CTA

- `**/insights/<slug>**` (tipo `i6 Article` ou `i6 eBook`) → só quando `gated=false` e `cta_form=true`, injeta bloco **depois** do `<ReactMarkdown>` do corpo.
- `**/i6-intelligence/<slug>**` — 2 caminhos:
  - Research não-gated e **sem** `asset_url` (fluxo que renderiza markdown do body): injeta o mesmo bloco depois do body.
  - Research não-gated **com** `asset_url` (fluxo "PDF enviado + Resend") **não** recebe o CTA — já existe formulário de reenvio, adicionar outro form no mesmo espaço confunde.
- **Gated** (`gated=true`): ignora `cta_form` totalmente. O gate atual já cumpre a função.

## Componente novo: `ArticleCTAForm`

Novo arquivo `src/components/insights/ArticleCTAForm.tsx`, reaproveitando toda a infraestrutura do `LeadGateForm`:

- Reusa `APPS_SCRIPT_URL`, `SHARED_FORM_TOKEN`, `HONEYPOT_FIELD`, `getLeadContextFields`, `formatLeadContextForMessage`, `trackEvent`.
- Props: `kind: 'insight' | 'research'`, `title`, `slug`, `id`, `ctaText: string`.
- Renderiza:
  - Headline em coral com o `ctaText` (via `ReactMarkdown` inline para respeitar `\n` e `**bold**` como o subhero das landings).
  - Inputs Nome + E-mail (mesma validação `zod` do gate: `name` 1–100, `email` válido, honeypot).
  - Botão CTA no mesmo estilo (bg `#F4845F`, glow, "Enviar" / "Send", loading state).
  - Nota de Privacy Policy embaixo.
- No submit:
  - Monta o mesmo payload do gate (name, email, company=title, message contendo `[Lead Insights CTA]` ou `[Lead Research CTA]` + slug/id/URL/idioma/origem/tracking, subscription=`article-cta:<slug>` ou `research-cta:<slug>`, insight_id, token, todos os `getLeadContextFields()`).
  - `fetch` com `mode: 'no-cors'` para o Apps Script (idêntico ao gate).
  - Dispara `trackEvent`:
    - insight → novo evento `INSIGHT_CTA_SUBMITTED`
    - research → novo evento `RESEARCH_CTA_SUBMITTED`
  - Ao concluir com sucesso, troca o form pela mesma tela de sucesso do `LeadGateForm` ("Tudo certo / All set" + orientação de checar SPAM + link para /contact em caso de problema), com traduções PT/EN.
  - Em erro, `toast` "Não foi possível enviar. Tente novamente".

Nota: **não** dá para reusar o `LeadGateForm` como está porque ele foi feito para "liberar conteúdo" (título "Conteúdo exclusivo", ícone de cadeado). Copiar a estrutura em um componente irmão é mais limpo do que sobrecarregar o `LeadGateForm` com mais um `mode`.

## Alterações por arquivo

### `src/hooks/useInsights.ts`

1. Adicionar em `InsightFrontmatter`:
  ```ts
   cta_form?: boolean;
   cta_form_text?: string | null;
  ```
2. No `.map()` de `ALL`, projetar:
  ```ts
   cta_form: fm.cta_form === true,
   cta_form_text: fm.cta_form_text ?? null,
  ```

### `src/hooks/useIntelligence.ts`

1. Adicionar em `IntelligenceFrontmatter` os mesmos dois campos.
2. Antes de projetar `cta_form_text`, aplicar o mesmo `decodeYamlEscapes` que o `useInsights` usa (o parser atual do intelligence não trata `\n`/`**` em aspas duplas). Ou seja: extrair `decodeYamlEscapes` para função local aqui também, ou aplicar só nesse campo. Mais seguro: passar a decodificar quando o valor original vinha entre `"..."`, replicando o comportamento do `useInsights`. Isso não muda os demais campos (excerpt continua igual, pois o hook do intelligence já usa aspas simples/sem escapes).

### `src/components/insights/ArticleCTAForm.tsx` (novo)

Implementar conforme descrito acima.

### `src/lib/tracker-events.ts`

Adicionar as constantes `INSIGHT_CTA_SUBMITTED` e `RESEARCH_CTA_SUBMITTED`.

### `src/pages/InsightArticle.tsx`

Dentro do ramo não-locked (else do `isLocked`), depois do `<ReactMarkdown>`, adicionar:

```tsx
{insight.cta_form && insight.cta_form_text && (
  <ArticleCTAForm
    kind="insight"
    title={insight.title}
    slug={insight.slug}
    id={insight.id}
    ctaText={insight.cta_form_text}
  />
)}
```

### `src/pages/IntelligenceArticle.tsx`

Somente no ramo "não gated E sem `asset_url`" (o `else` final que renderiza `<ReactMarkdown>`), depois do body e **antes** do bloco de cross-links / "Colocar Dados em Movimento":

```tsx
{piece.cta_form && piece.cta_form_text && (
  <ArticleCTAForm
    kind="research"
    title={piece.title}
    slug={piece.slug}
    id={piece.id}
    ctaText={piece.cta_form_text}
  />
)}
```

### `scripts/sync-content-from-i6hub.mjs`

Ao montar o frontmatter dos itens de `public-insights-feed` e `public-research-feed`, incluir (se presentes na resposta do HUB):

```
cta_form: <bool>
cta_form_text: "<string com \n e ** preservados>"
```

Se o HUB ainda não enviar, o front lê como `false`/`null` e o CTA some — retrocompatível.

## Validação

- MD sem `cta_form` → nada muda (comportamento atual).
- MD com `gated: true` → CTA ignorado (gate manda).
- MD com `gated: false, cta_form: true, cta_form_text: "..."`:
  - i6 Article: aparece no final do body.
  - Research sem `asset_url`: aparece no final do body.
  - Research com `asset_url`: **não** aparece (já tem o form de "Reenviar por e-mail").
- Submit: POST idêntico ao gate, tela de sucesso idêntica, evento de tracking distinto (`*_CTA_SUBMITTED`).
- PT e EN cobertos nos textos do form (labels, botão, sucesso, erro, privacy).
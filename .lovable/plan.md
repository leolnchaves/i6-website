## Objetivo

Garantir que qualquer link presente no corpo (Markdown) de Insights, i6 Articles e i6 Research abra sempre em uma nova aba, nunca substituindo a navegação atual do site.

## Escopo

Aplica-se ao conteúdo renderizado por `ReactMarkdown` nas páginas:

- `src/pages/InsightArticle.tsx` (i6 on Media, i6 Social, i6 Article)
- `src/pages/IntelligenceArticle.tsx` (i6 Article, i6 eBook — quando o conteúdo é exibido inline, não só PDF)

Fora de escopo: links de UI internos (botões "Voltar", CTAs, cross-links) — esses continuam com comportamento atual (mesma aba, via `<Link>`). A regra vale só para links inseridos pelo HUB dentro do markdown.

## Abordagem

Passar um `components` customizado ao `ReactMarkdown` que sobrescreve o render de `<a>` para:

- `target="_blank"`
- `rel="noopener noreferrer"`

Sem tocar em lógica de parsing, sanitização ou no conteúdo do MD. Sem regex no texto — a substituição acontece no nível do renderer, portanto é seguro e determinístico.

Snippet (ilustrativo, aplicado nos 2 arquivos):

```tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    a: ({ node, ...props }) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
  }}
>
  {content}
</ReactMarkdown>
```

## Arquivos

1. `src/pages/InsightArticle.tsx` — adicionar `components={{ a: ... }}` no `ReactMarkdown` do corpo.
2. `src/pages/IntelligenceArticle.tsx` — mesmo ajuste no `ReactMarkdown` do corpo (branch sem `asset_url`).

## Validação

- Build/typecheck limpos.
- Um link no MD do HUB (`[texto](https://exemplo.com)`) renderiza com `target="_blank"` e `rel="noopener noreferrer"` no DOM.
- Links internos da UI (Voltar, CTAs) seguem inalterados.

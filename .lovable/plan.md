## Objetivo
Corrigir o fallback do `src/pages/InsightArticle.tsx` para que, se um usuário acessar diretamente a URL de um insight não-artigo (ex: `/insights/mention-cnn-infinity6`), o link externo abra em **nova aba** em vez de redirecionar a aba atual — mantendo o usuário no site.

## Mudança

No `InsightArticle.tsx`, substituir o bloco atual:

```tsx
if (insight.type !== 'article') {
  if (insight.external_url) {
    window.location.href = insight.external_url;
    return null;
  }
  return <Navigate to={localized('/insights')} replace />;
}
```

Por uma tela curta de "redirecionando" que:
1. Abre o link externo em nova aba via `window.open(url, '_blank', 'noopener,noreferrer')` num `useEffect`.
2. Mostra uma mensagem com o título do insight + botão manual ("Abrir em nova aba") caso o popup seja bloqueado.
3. Oferece link "Voltar para Insights".

Textos bilíngues (pt/en) seguindo o padrão já usado na página.

## Fora de escopo
- Nenhuma mudança em `InsightsSection.tsx`, `Insights.tsx` ou no hook — eles já abrem externos em nova aba corretamente.
- Sem mudanças de estilo/design system além de reuso de classes existentes.
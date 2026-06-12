# Ajuste da página /insights

Alinhar o cabeçalho da página de Insights ao padrão usado em i6 Research.

## Mudança

Em `src/pages/Insights.tsx`:

- Remover o `<h1>` visível ("Insights").
- Adicionar acima do subheading um eyebrow laranja em letras menores: `infinity6 · Insights` (mesmo estilo usado em `Intelligence.tsx`: texto pequeno, uppercase, tracking aumentado, cor `#F4845F`).
- Manter o `<h1>` apenas como `sr-only` para SEO/acessibilidade.
- Manter o subheading (parágrafo descritivo) e o restante da página inalterados.

## Fora do escopo

- Sem mudanças em rotas, traduções, SEO meta, JSON-LD ou no grid de cards.
- Sem alterações em outras páginas.



# Fix: Manter "anticipate" na primeira linha do hero (EN)

## Problema
No ingles, o titulo esta quebrando em 3 linhas:
1. "Solutions that"
2. "anticipate"
3. "the market."

O esperado e que fique em 2 linhas, como no PT:
1. "Solutions that anticipate"
2. "the market."

## Causa
O componente `SolutionsHero.tsx` usa `<span className="block mb-2">` para o primeiro bloco de texto, o que forca a quebra de linha apos o subtitle. Porem, como o titulo + subtitle ("Solutions that anticipate") e longo em tamanhos de fonte grandes, o browser quebra antes do "anticipate".

## Solucao
Usar `whitespace-nowrap` no primeiro `<span>` para garantir que "Solutions that anticipate" nunca quebre em duas linhas. Isso funciona porque tanto em PT quanto em EN o texto da primeira linha cabe na tela com o tamanho de fonte atual.

## Detalhes tecnicos

**Arquivo:** `src/components/solutions/SolutionsHero.tsx` (linha 18)

Alterar:
```tsx
<span className="block mb-2">
```
Para:
```tsx
<span className="block mb-2 whitespace-nowrap">
```

Isso garante que "Solutions that anticipate" e "Solucoes que antecipam" fiquem sempre em uma unica linha, com "the market." / "o mercado." na segunda linha.


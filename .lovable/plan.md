# Enriquecer a página de detalhe dos Cases

Atualiza apenas a página `/success-stories/[slug]` (arquivo `SuccessStoryArticle.tsx`) e o loader de MD. Os cards da grid **não mudam**.

## Novos campos no frontmatter MD

Adicionar dois novos campos opcionais (preenchidos pelo i6HUB) mantendo os atuais:

```yaml
challenge: "..."              # continua igual — renderizado como "A DOR REAL"
what_to_anticipate: "..."     # NOVO — "O QUE PRECISAVA SER ANTECIPADO"
prediction: "..."             # NOVO — "A PREDIÇÃO"
solution: "..."               # continua — "A SOLUÇÃO"
```

Cada seção só é renderizada se o campo tiver conteúdo (retrocompatível com MDs atuais).

## Renomeações de títulos (PT / EN)

| Antes | Depois |
|---|---|
| Desafio / Challenge | **A DOR REAL** / **THE REAL PAIN** |
| — | **O QUE PRECISAVA SER ANTECIPADO** / **WHAT NEEDED TO BE ANTICIPATED** |
| — | **A PREDIÇÃO** / **THE PREDICTION** |
| Solução / Solution | **A SOLUÇÃO** / **THE SOLUTION** |
| Resultados / Results | **IMPACTO COMPROVADO** / **PROVEN IMPACT** |
| Soluções Aplicadas / Applied Solutions | **ALAVANCAS DE VALOR** / **VALUE LEVERS** |

Estilo: eyebrow em uppercase + coral, mantendo a hierarquia visual atual.

## Layout dos 4 blocos narrativos

Hoje "Desafio" e "Solução" são um grid 2 colunas. Como agora são até 4 blocos sequenciais que contam uma história (dor → o que antecipar → predição → solução), o layout muda para **coluna única, stack vertical**, cada bloco com eyebrow coral + título + parágrafo, separados por espaçamento generoso. Isso preserva a leitura narrativa.

## Exibir logo do cliente

Quando `client_anon: false` e existir `logo`, exibir o logo do cliente na hero do case, próximo ao segmento/cliente (topo esquerdo da área de texto sobre a imagem). Aplicar `brightness-0 invert opacity-80` como já é feito no `StoryCard` para manter consistência visual no fundo escuro. Se `client_anon: true`, não renderiza logo.

## Detalhes técnicos

- `src/hooks/useSuccessStoriesMarkdown.ts`: adicionar `whatToAnticipate` e `prediction` na interface `SuccessStoryItem` e no parsing do frontmatter (`fm.what_to_anticipate`, `fm.prediction`).
- `src/pages/SuccessStoryArticle.tsx`:
  - Atualizar objeto `t` com os novos labels PT/EN.
  - Trocar seção "Results" heading para "Impacto Comprovado".
  - Substituir o grid `md:grid-cols-2` (challenge/solution) por 4 blocos sequenciais renderizados condicionalmente.
  - Renomear título "Applied Solutions" → "Alavancas de Valor".
  - Adicionar `<img>` do logo do cliente na hero quando `!clientAnon && logo`.
- `src/content/stories/README.md`: documentar os dois novos campos opcionais.
- Nenhuma mudança em `StoryCard.tsx`, `ModernStoriesGrid.tsx` ou qualquer componente da grid/home.

## Fora de escopo

- Popular os novos campos nos MDs existentes (virão do i6HUB).
- Mudanças visuais nos cards da listagem.

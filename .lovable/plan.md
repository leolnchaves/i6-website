## Plan: rebrand "Territórios" → "Alavancas Preditivas de Valor" em /solutions-v2

### Escopo

Alterar toda ocorrência do termo "Territórios" para "Alavancas Preditivas de Valor" na página `/solutions-v2` (preview) e inserir o subtítulo solicitado abaixo do título principal.

### Arquivos e mudanças

1. `**src/data/solutionsV2/content.ts**`
  - Alterar o título da seção de `"Três territórios de decisão preditiva"` para `"Três alavancas preditivas de valor"`.
  - Alterar os `eyebrow` de cada território:
    - `"Território 1"` → `"Alavanca Preditiva de Valor 1"`
    - `"Território 2"` → `"Alavanca Preditiva de Valor 2"`
    - `"Território 3"` → `"Alavanca Preditiva de Valor 3"`
  - O restante do conteúdo (títulos dos territórios, taglines, descrições, chips e cards) permanece inalterado.
2. `**src/components/solutions-v2/TerritoriesBlock.tsx**`
  - Adicionar o subtítulo solicitado abaixo do `<h2>`:
    > "Organizamos nossas soluções em três frentes de impacto, exatamente onde sua operação precisa capturar resultado: crescimento e inteligência de consumidor, planejamento operacional / comercial e inteligência de preço."
  - Alterar o texto do link de scroll:
    - `"Ver soluções deste território"` → `"Ver soluções desta alavanca"`
  - O `eyebrow` de cada card já será atualizado automaticamente via `content.ts`.
3. `**src/components/solutions-v2/TerritorySection.tsx**`
  - Nenhuma alteração necessária; o `eyebrow` já vem de `content.ts`.

### Resultado esperado

- Título da seção: "Três alavancas preditivas de valor".
- Subtítulo posicionado abaixo do título, com a frase fornecida.
- Eyebrows dos cards: "Alavanca Preditiva de Valor 1/2/3".
- CTA dos cards: "Ver soluções desta alavanca preditiva de valor".
- Eyebrows das seções subsequentes (Growth, Planning, Pricing) também refletem "Alavanca Preditiva de Valor".
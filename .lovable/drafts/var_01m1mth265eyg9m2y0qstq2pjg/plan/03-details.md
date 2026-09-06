## Estrutura de arquivos e mudanças

### Arquivos alterados

1. `src/pages/Insights.tsx`
   - Reescreve o `InsightCard` inline com novo tratamento visual.
   - Reorganiza a página em abertura tipográfica + grade.
   - Mantém `isExternal`, `target="_blank"`, `rel="noopener noreferrer"` e o `Link` interno exatamente como estão.

2. `src/components/hometeste/HeaderNovo.tsx`
   - Adiciona `'/insights'` ao array `isLightPage` para o header manter fundo navy sólido.

3. `src/data/translations/{pt,en,es}.ts`
   - Novas chaves:
     - `insights.pageTitle` / `insights.pageSubtitle`
     - `insights.eyebrow`
     - `insights.viewOriginal` (texto visível do link externo)
     - `insights.viewOriginalAria` (aria-label equivalente)
     - `insights.empty`

### Comportamento dos cards

- O cálculo de `isExternal` permanece idêntico:
  ```ts
  const isExternal = !insight.gated && insight.type !== 'i6 Article' && !!insight.external_url;
  ```
- Cards externos renderizam o rótulo "Ver no site original" / "View original" / "Ver en el sitio original" com seta à direita, em terracota, dentro do próprio card. O ícone `ExternalLink` pode continuar, mas o texto é obrigatório.
- Cards internos (`i6 Article` não-externo, embora raros em `/insights`) mantêm o link interno sem rótulo de saída.
- O `aria-label` do link externo inclui o título do insight e a indicação de abertura em nova aba.

### Tratamento visual do card

- Fundo do card: branco ou `bg-card` sobre o fundo areia, com borda sutil e sombra leve no hover.
- Área do logo: retângulo com fundo bege claro (`bg-secondary/40`) e padding generoso, altura fixa (~64 px), para o logo do veículo/rede social respirar. Sem logo, usa o símbolo infinity6 como fallback, em tom mais apagado.
- Corpo do card: badge de tipo (`i6 On Media` / `i6 Social`) + data, título em 2 linhas, excerpt em 2-3 linhas.
- Hover: borda terracota suave, título muda para terracota, logo ganha opacidade total.
- Card `featured`: ocupa 2 colunas no desktop (`md:col-span-2`) e mantém a mesma densidade visual, apenas com mais espaço horizontal para o título/excerpt.

### Grade responsiva

```text
mobile:  1 coluna
tablet:  2 colunas
 desktop: 3 colunas (ou 4 se o design do blog sugerir 4)
```

A escolha final será 3 colunas no desktop, alinhada ao ritmo do `/i6-blog`. O card `featured` ocupa 2 colunas; em telas menores, todos ocupam 1 coluna.

### Abertura tipográfica

- Título grande (`text-4xl md:text-5xl lg:text-6xl`), peso semibold, cor do texto principal do tema areia.
- Eyebrow terracota: "infinity6 · Na Mídia" / "infinity6 · In the Media" / "infinity6 · En los Medios".
- Subtítulo curto e direto, sem repetição do texto atual genérico.

### Estado vazio

- Mantém a mensagem localizada no mesmo tom tipográfico quando `insights.length === 0`.

### Fora de escopo (garantido)

- Nenhuma mudança em `InsightArticle.tsx`, `useInsights.ts`, parser de frontmatter, `scripts/sync-content-from-i6hub.mjs`, interface `InsightFrontmatter`.
- Nenhuma mudança em `/i6-blog`, `/i6-intelligence`, `InsightsRow.tsx`, `InsightsSection.tsx`.
- Nenhuma mudança na lógica `isExternal` ou no comportamento de abertura em nova aba.
- Sem release/deploy nesta rodada.

### Verificação planejada

- `npx tsgo --noEmit`
- `bun run build`
- Playwright: abrir `/pt/insights`, `/en/insights`, `/es/insights` e confirmar que cards externos exibem o rótulo de saída visível, que o header está com fundo navy sólido e que a grade não quebra em 390, 768, 1280 e 1600 px.

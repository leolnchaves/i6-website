## Mudança proposta no card de /insights

A faixa de imagem de capa (~112px) é removida. O card vira **tipográfico**, com um **logo no canto superior direito** representando a fonte do conteúdo (veículo, canal, cliente ou própria infinity6).

**Sem alteração no frontmatter / no fluxo do i6hub.** O campo `cover_image` que hoje vira capa passa a ser tratado pelo front como **logo**. Quando vier nulo, entra o **fallback automático**: símbolo branco da infinity6 (imagem em anexo).

### Como ficaria

```text
┌──────────────────────────────────────────┐
│  ON MEDIA · 12 jun 2026     [veículo]   │  ← cover_image renderizada como logo top-right
│                                          │
│  Título do insight em até                │
│  duas linhas                             │
│                                          │
│  Resumo curto em até três linhas         │
│  descrevendo o conteúdo publicado…       │
│                                          │
│  5 min · ↗                               │
└──────────────────────────────────────────┘
```

Quando `cover_image` é nulo:

```text
│  ARTICLE · 12 jun 2026          [⟨i6⟩]  │  ← símbolo branco infinity6 (fallback)
```

### Detalhes visuais do card

- **Sem faixa de imagem**: bloco `<div className="h-28 ...">` removido do `InsightCard`, junto com o background gradient placeholder.
- **Logo top-right**:
  - Altura ~32px, `max-w-[96px]`, `object-contain`, alinhada ao topo direito do card.
  - Opacidade `0.8` em repouso → `1` no hover.
  - Sem borda/caixa em volta — deixa o glyph respirar sobre o fundo navy.
- **Fallback**: símbolo branco infinity6 (anexo) renderizado quando `cover_image` é null/vazio, com `opacity-50` para não competir com o título (é marca neutra, não fonte específica).
- **Padding** do card sobe para `p-5`. Chip do tipo + data continuam na primeira linha (à esquerda do logo). Ícone external (`↗`) e `read_time` descem para o rodapé do card.
- **Hover**: borda coral `#F4845F/40`, título coral, leve `bg-white/[0.08]` (mantém o comportamento atual).

### Lógica do logo (no `InsightCard`)

```ts
const logo = insight.cover_image
  ? resolveCoverImage(insight.cover_image)   // usa o que o i6hub mandar
  : i6SymbolFallback;                         // símbolo branco infinity6
const isFallback = !insight.cover_image;
```

`resolveCoverImage` continua igual (já lida com URL absoluta vs. relativa). `<img>` recebe `object-contain` e classes diferentes via `isFallback` (opacidade menor + width fixa pequena).

### Arquivos afetados

- `src/pages/Insights.tsx` — reescrever `InsightCard`: remove faixa de imagem, novo header com logo top-right + fallback, padding ajustado, external/read-time movidos para rodapé.
- `src/assets/images/i6-symbol-white.png` — adicionar o símbolo branco anexado (será o asset do fallback). Importado direto no `InsightCard`.
- **Sem mudança**: `src/hooks/useInsights.ts` (frontmatter intacto), `InsightsSection` da home, página de detalhe, SEO, filtros, fluxo i6hub.

### Fora do escopo

- Página de detalhe `/insights/:slug` — segue usando `cover_image` como capa visual ali (não mexo agora; se quiser, fazemos depois).
- Qualquer mudança no processo de upload no i6hub.

Aprovo e implemento?
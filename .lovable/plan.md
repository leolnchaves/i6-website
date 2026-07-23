## Diagnóstico

A seção **existe** e está montada em `src/pages/HomeTeste.tsx` (componente `InsightsSection`, logo abaixo das logos/`ClientesSection`). Ela some porque `useFeaturedInsights` retorna zero itens no idioma atual — quando isso acontece, o componente faz `return null` (linha 38 de `InsightsSection.tsx`).

**Por que retorna zero:**

1. `useInsights.ts` (linha 132) só faz glob de `/src/content/insights/*.md`. Não carrega `/src/content/intelligence/` nem `/src/content/stories/`.
2. Hoje os únicos MDs com `featured: true` estão em `src/content/intelligence/` (Research/eBooks) e em `src/content/stories/` (success stories) — nenhum deles entra em `ALL` do `useInsights`.
3. Além disso, o MD `ruptura-gondola-ia-preditiva-*.md` não declara `type:` no frontmatter, então mesmo se fosse capturado seria descartado pelo filtro de `VALID_TYPES`.

Resultado: `ALL` só tem itens de `insights/` (i6 on Media / i6 Social / i6 Article), e nenhum deles está marcado `featured: true` atualmente → `useFeaturedInsights` = `[]` → seção escondida.

## Correção proposta

Ampliar `useFeaturedInsights` para considerar destaques vindos de **todas as três fontes** que o site publica hoje (i6 on Media/Social, i6 Article do blog, i6 eBook/Research da Intelligence, e Success Stories), mantendo o link certo de cada card. Ou seja, "Featured on Home" volta a funcionar transversalmente como antes.

### Mudanças

**1. `src/hooks/useInsights.ts`**
- Adicionar glob para `/src/content/intelligence/*.md` além de `/src/content/insights/*.md`.
- Para MDs de `intelligence/`, se o frontmatter não tiver `type`, inferir: `type: 'i6 eBook'` quando `asset_url` (PDF) estiver presente, senão `type: 'i6 Article'` (a página de detalhe é a mesma `IntelligenceOrInsightArticle` que já roteia via `resolveArticleRoute`).
- `useFeaturedInsights` continua filtrando por `language + featured === true`, agora enxergando ambas as pastas.

**2. `src/components/hometeste/InsightsSection.tsx`**
- Cobrir a rota correta por tipo:
  - `i6 eBook` → `/i6-intelligence/<slug>`
  - `i6 Article` → `/i6-blog/<slug>` (hoje o código manda para `/i6-intelligence`, o que está inconsistente com o menu novo)
  - `i6 on Media` / `i6 Social` → external_url se existir, senão `/insights/<slug>`
- Nenhuma mudança visual nos minicards.

**3. Success stories em destaque (opcional, decidir na hora de implementar)**
- Se você também quiser voltar a exibir mini-cards de success stories aqui (era comum na versão anterior), a alternativa mais limpa é criar um novo hook `useFeaturedContent` que combina `useFeaturedInsights` + stories com `featured: true` em `useSuccessStoriesMarkdown`. Fora do escopo mínimo — só entra se você pedir.

### Como testar
- Marcar `featured: true` em pelo menos 1 MD em `insights/` e 1 em `intelligence/` (PT e EN).
- Home em `/pt` e `/en`: seção "Últimos Insights / Latest Insights" aparece com até 3 minicards; cada um leva à rota correta (blog / intelligence / insights externos).

## Fora de escopo
- Não mexer no visual do card, no layout da seção nem em outras páginas.
- Não alterar frontmatter dos MDs existentes (isso continua no i6HUB).
- Não trocar o texto do título/CTA da seção.
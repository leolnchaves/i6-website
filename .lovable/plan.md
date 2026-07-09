## Objetivo

1. Migrar a página `/pt/solutions-v2` (PT) para `/pt/solutions`, substituindo o conteúdo atual.
2. Remover a rota de preview `/pt/solutions-v2`.
3. Criar a versão EN em `/en/solutions` seguindo exatamente o mesmo padrão de i18n já usado no restante do site (mesma arquitetura de hoje), usando os nomes oficiais das alavancas e soluções do anexo.

## Escopo

### 1. Substituir `/solutions` pela composição do V2

- `src/pages/Solutions.tsx` passa a renderizar exatamente o que `SolutionsV2.tsx` renderiza hoje:
`SolutionsV2Hero` → `TerritoriesBlock` → 3× `TerritorySection` → `SignalLayerBlock` → `HowWeImplement` → `RealResultsStrip` → `SolutionsCTA`.
- Mantém `SEOHead page="solutions"` (indexável, sem `noindex`).
- Saem da página: `SolutionsHero` (antigo), `StaticSolutionsGrid`, `SolutionsFAQ` e o JSON-LD de `FAQPage`.

### 2. Remover o preview

- Remover rota `solutions-v2` e import de `SolutionsV2` em `src/App.tsx`.
- Deletar `src/pages/SolutionsV2.tsx`.
- `src/components/solutions-v2/*` permanecem — passam a ser a implementação oficial de `/solutions`.
- Deletar arquivos que ficam órfãos após checar refs: `src/components/solutions/SolutionsHero.tsx`, `StaticSolutionsGrid.tsx`, `SolutionsFAQ.tsx` e dados associados (ex.: `solutionsFaqData`).

### 3. Internacionalização (mesmo padrão do site: `useLanguage()` + objeto por idioma)

- `src/data/solutionsV2/content.ts`: passa a exportar `solutionsContent: Record<Language, SolutionsV2Content>` com blocos `pt` e `en`. Nenhuma mudança de layout.
- `hero.title` dividido em `titleBefore` + `titleHighlight` + `titleAfter` para preservar o realce laranja em ambos os idiomas.
- Labels hoje hardcoded nos componentes migram para o content por idioma:
  - `LeanSolutionCard`: `Resolve / Entrega / Impacto` → `Resolve / Deliver / Impact`.
  - `TerritoriesBlock`: label "Ver as soluções desta alavanca" → "See this lever's solutions".
- Componentes atualizados para ler `solutionsContent[language]` via `useLanguage()`:
`SolutionsV2Hero`, `TerritoriesBlock`, `TerritorySection`, `LeanSolutionCard`, `SignalLayerBlock`, `HowWeImplement`, `SummaryBullets` (se usado).
- `I6SignalDemo` já é i18n — sem mudança.

### 4. Conteúdo EN — nomes obrigatórios do anexo

- **Alavancas**:
  - Growth & Customer Intelligence
  - Demand, Supply & Commercial Planning
  - Pricing & Margin Intelligence
- **Soluções**:
  - Predictive Personalization
  - Smart Discovery
  - Predictive Campaign Targeting
  - Demand Forecasting
  - Predictive Commercial Goals
  - Predictive Assortment & Order Recommendation
  - Price-to-Margin
  - Price-to-Turnover
  - Price-to-Conversion
- Chips das alavancas em EN espelham exatamente os nomes das soluções acima.
- Demais textos (hero, taglines, descriptions, Resolve/Deliver/Impact, bloco Signal, "How we implement", badge de custo zero, summary) traduzidos mantendo tom e intenção do PT atual.

### 5. Fora de escopo

- Sem alteração de layout, cores, espaçamentos, animações ou SEO metadata/sitemap.
- Sem publicação de tag/patch neste passo.

## Verificação

- Conferir visualmente `/pt/solutions` e `/en/solutions` (hero com destaque laranja correto, 3 alavancas, cards com labels Resolve/Deliver/Impact em EN, badge de custo zero, Signal, How we implement, CTA).
- Confirmar que `/pt/solutions-v2` e `/en/solutions-v2` retornam 404 (rota removida).
Padronizar o bloco final "convite ao contato" usando `CTAFinal` (o mesmo do Home) em todas as páginas institucionais que hoje têm um CTA final diferente.

**Substituições:**

1. `src/pages/Solutions.tsx` — trocar `<SolutionsCTA />` por `<CTAFinal />`.
2. `src/pages/TransformationLanding.tsx` — trocar `<SolutionsCTA />` por `<CTAFinal />`.
3. `src/pages/OurAI.tsx` — trocar `<OurAICTA content={c.cta} />` por `<CTAFinal />`.

**Não alterar** (são formulários de captura de leads, não CTAs finais de contato):
- `ArticleCTAForm` em `InsightArticle` e `IntelligenceArticle`.
- `EbookCTA` em `Kiosk`.

**Não mexer** nas páginas que já usam `CTAFinal` (HomeTeste, SuccessStories, SuccessStoryArticle).

**Limpeza opcional:** manter os componentes `SolutionsCTA` e `OurAICTA` no repo (não remover) para evitar quebras se forem reutilizados; apenas deixam de ser importados nas páginas acima.
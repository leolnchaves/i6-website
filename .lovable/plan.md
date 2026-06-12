
# Plano — Auditoria e limpeza de órfãos

Você pediu para **manter o card como está** (h3 = `quote` do MD). Nenhuma mudança no `StoryCard`. O conteúdo do MD do i6Hub está correto; a divergência percebida é só de mapeamento de campo (card mostra `quote`, página de detalhe mostra `title`) — comportamento mantido.

O foco passa a ser **limpar pontas soltas** com a abordagem aprovada: **auditar primeiro, remover só após sua aprovação**.

## Resultado da auditoria

Varri o `src/` cruzando importações reais. Cada item abaixo foi confirmado **sem nenhuma referência ativa** (fora dos próprios arquivos órfãos que se referenciam entre si). Agrupei por confiança.

### Fase 1 — Remoção segura (zero impacto no site atual)

Estes arquivos não são importados por nenhuma rota/componente em uso.

**Success Stories**
- `src/components/success-stories/SuccessStoriesCTA.tsx` — não importado.
- `src/components/success-stories/MetricsSection.tsx` — não importado.
- `src/components/success-stories/hooks/useCompanyDetails.ts` — não importado.
- `src/components/success-stories/hooks/useSolutionsMapping.ts` — não importado.
- (pasta `src/components/success-stories/hooks/` fica vazia → remover também)

**Dados estáticos legados** (substituídos pelos MD em `src/content/stories/` + `useSuccessStoriesMarkdown`)
- `src/data/staticData/successStoriesCards.ts`
- `src/data/staticData/successStoriesCardsData.ts`
- `src/data/staticData/successStoriesData.ts` (só referenciado pelos 4 componentes órfãos acima)
- `src/data/staticData/testimonialsData.ts` — sem referências.
- `src/data/staticData/solutionsCTAData.ts` — sem referências.
- `src/data/staticData/solutionsCards.ts` — sem referências.

**Solutions — fluxos antigos**
- `src/components/solutions/ProcessFlow.tsx`
- `src/components/solutions/ProcessStep.tsx`
- `src/components/solutions/AnimatedProcessFlow.tsx`
- `src/components/solutions/HorizontalWaves.tsx`
- `src/components/solutions/SandboxEnvironment.tsx` (só usado por `AnimatedProcessFlow`)
- `src/data/staticData/sandboxEnvironmentData.ts` (só usado por `SandboxEnvironment`)
- `src/data/solutions/processDataStatic.ts` — verificar e remover se sem referências.

**Outros**
- `src/assets/gifs/teste.txt` — placeholder.
- `scripts/generate-i6-editorial-pdf.py` — script avulso sem chamada no workflow nem no `package.json`.
- `.lovable/audit-geo-v10.md` — auditoria antiga.
- `.lovable/plan.md` — plano de fix já executado.

### Fase 2 — Remoção do bloco "Home antiga" (precisa sua confirmação extra)

A home atual é `HomeTeste.tsx` (rota `index`). O `Home.tsx` só existe na rota legada `/oldhome_teste` e arrasta uma árvore inteira de componentes/dados que **só essa rota usa**:

- Rota `/oldhome_teste` em `src/App.tsx` (linha 113).
- `src/pages/Home.tsx` e `src/pages/Index.tsx` (Index também só consome a árvore antiga).
- `src/components/Layout.tsx` (só usado em `/oldhome_teste`).
- Todo `src/components/home/` (HeroSection, StatsSection, ResultsSection, CTASection, PartnersSection, CompactSolutionsSection, FeaturedStoriesSection, PolicyLinksSection) e subpastas `home/hero/`, `home/results/`, `home/stats/`, `home/featured-stories/`, `home/compact-solutions/`.
- `src/components/ClientCarousel.tsx` (só usado por `home/StatsSection`).
- `src/components/VideoModal.tsx` (só usado por `home/HeroSection`).
- `src/components/LanguageSelector.tsx` (sem referência — `LanguageSelectorSimple` é o usado).

Risco: nenhum link interno aponta para `/oldhome_teste`; é uma URL solta. Se confirmar, removo essa rota junto.

### Não vou tocar (parecem órfãos, mas não são)
- `src/components/success-stories/SuccessStoriesHero.tsx`, `TestimonialsSection.tsx` — usados por `SuccessStories.tsx`.
- `src/content/*/README.md` — documentação editorial do conteúdo MD.
- `deploy-static-site.sh` — não há referência no repo, mas pode ser usado manualmente; **mantenho até você confirmar**.

## Execução

1. Aplicar Fase 1 (remoção dos arquivos listados, em lote).
2. Rodar busca final por imports quebrados para garantir build verde.
3. Aguardar decisão sobre Fase 2 (Home antiga) e `deploy-static-site.sh`.

## Detalhes técnicos

- Remoções via `rm` em paralelo agrupado por pasta.
- Após remover, `rg "from.*<basename>"` para garantir zero referência residual.
- Sem mudanças em `StoryCard`, `useSuccessStoriesMarkdown`, MDs, ou qualquer rota ativa.



## Redesign da Pagina /success-stories para o Novo Layout

### Objetivo
Migrar a pagina `/success-stories` do layout antigo (Layout wrapper com Header/Footer classicos, fundo claro) para o novo layout escuro consistente com `/solutions` e `/` (HomeTeste).

### Estrutura Final

```text
+-------------------------------------------+
| VerticalWaves (fixed, z-[15])             |
| +---------------------------------------+ |
| | HeaderNovo (z-[20])                   | |
| +---------------------------------------+ |
| | Hero (dark, estilo SolutionsHero)     | |
| |   titulo + subtitulo coral + desc     | |
| +---------------------------------------+ |
| | MetricsSection (adaptada p/ dark)     | |
| +---------------------------------------+ |
| | SegmentFilter (adaptado p/ dark)      | |
| +---------------------------------------+ |
| | ModernStoriesGrid (cards dark)        | |
| +---------------------------------------+ |
| | TestimonialsSection (dark theme)      | |
| +---------------------------------------+ |
| | CTAFinal (gradiente coral, reusado)   | |
| +---------------------------------------+ |
| | FooterNovo (z-[20])                   | |
| +---------------------------------------+ |
| | CookieConsentManager                  | |
| +---------------------------------------+ |
+-------------------------------------------+
```

### Mudancas por Arquivo

#### 1. `src/pages/SuccessStories.tsx` — Reescrever pagina
- Remover import do Layout wrapper (ja saira do Layout no App.tsx)
- Usar mesma estrutura do Solutions: `bg-[#0B1224]`, VerticalWaves, HeaderNovo, FooterNovo, CTAFinal, CookieConsentManager
- Remover SuccessStoriesCTA (substituir por CTAFinal)
- Manter SuccessStoriesHero, MetricsSection, SegmentFilter, ModernStoriesGrid, TestimonialsSection

#### 2. `src/App.tsx` — Mover rota para fora do Layout
- Mover `<Route path="/success-stories">` de dentro do `Layout` wrapper para ficar ao lado de `/` e `/solutions` (linhas 64-66)

#### 3. `src/components/success-stories/SuccessStoriesHero.tsx` — Adaptar ao dark theme
- Remover background image com blur e overlays
- Usar estilo identico ao SolutionsHero: fundo `bg-[#0B1224]`, padding `pt-28 pb-0`
- Titulo branco com subtitulo em coral (`text-[#F4845F]` com textShadow glow)
- Descricao em `text-white/60`

#### 4. `src/components/success-stories/MetricsSection.tsx` — Adaptar ao dark theme
- Trocar fundo claro (`bg-gradient-to-b from-slate-200/80...`) por fundo escuro (`bg-white/5 border-white/10`)
- Textos: valores em branco/coral, labels em `text-white/60`
- Remover scroll indicator (chevron bounce)

#### 5. `src/components/success-stories/SegmentFilter.tsx` — Adaptar ao dark theme
- Fundo: `bg-transparent` ou `bg-white/5`
- Titulo e texto em branco/white-60
- Botoes: estilo dark (bg-white/10 border-white/20, ativo em coral `bg-[#F4845F]`)

#### 6. `src/components/success-stories/ModernStoriesGrid.tsx` — Adaptar ao dark theme
- Container: remover `bg-gray-50`, usar transparente
- Os cards internos (StoryCard) precisam ser adaptados

#### 7. `src/components/success-stories/story-components/StoryCard.tsx` — Dark theme
- Card: `bg-white/5 border-white/10` em vez de `bg-white border-gray-200`
- Textos: branco e white/60 em vez de gray-900 e gray-600
- Metricas: fundo `bg-white/5 border-white/10`, valores em coral
- Hover bar: manter gradiente coral
- Industry tag: texto `text-white/50`

#### 8. `src/components/success-stories/story-components/StoryModal.tsx` — Dark theme
- Modal backdrop: manter blur
- Modal body: `bg-[#0B1224] border-white/10` em vez de `bg-white`
- Textos adaptados para branco
- Metricas e sections em `bg-white/5 border-white/10`

#### 9. `src/components/success-stories/story-components/EmptyState.tsx` — Dark theme
- Fundo transparente, textos em branco/white-60

#### 10. `src/components/success-stories/TestimonialsSection.tsx` — Dark theme
- Remover `bg-gradient-to-br from-background...`, usar transparente
- Cards: `bg-white/5 border-white/10`
- Textos em branco, quote em `text-white/80`
- Titulo em branco, subtitulo em `text-white/60`
- Dots do carousel: manter estilo coral para ativo

### O que NAO muda
- Conteudo dos MDs (textos de stories, testimonials)
- Logica de filtragem por segmento
- Dados estaticos em `successStoriesData.ts`
- StoryModal funcionalidade (apenas visual)
- Componente VerticalWaves (reusado sem alteracao)
- CTAFinal (reusado sem alteracao)
- HeaderNovo/FooterNovo (reusados sem alteracao)


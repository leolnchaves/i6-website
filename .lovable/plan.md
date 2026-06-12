
# Plano — Fase 2: remover Home antiga

## Auditoria de impacto (confirmada)
- `Home.tsx`, `Layout.tsx` → só importados por `App.tsx` (rota `/oldhome_teste`).
- `Index.tsx` → nenhuma referência (já órfã).
- `src/components/home/**` → nenhuma referência fora da própria pasta.
- `ClientCarousel.tsx` → só usado por `home/StatsSection.tsx`.
- `VideoModal.tsx` → só usado por `home/HeroSection.tsx`.
- `LanguageSelector.tsx` → sem nenhuma referência (versão `LanguageSelectorSimple` é a usada).
- Nenhum link interno (nav, footer, redirect) aponta para `/oldhome_teste`.

A home ativa (`HomeTeste.tsx`, montada em `DarkLayout` na rota `index`) não é afetada.

## Mudanças

**Remover arquivos/pastas**
- `src/pages/Home.tsx`
- `src/pages/Index.tsx`
- `src/components/Layout.tsx`
- `src/components/ClientCarousel.tsx`
- `src/components/VideoModal.tsx`
- `src/components/LanguageSelector.tsx`
- `src/components/home/` (toda a pasta, incluindo subpastas `hero/`, `results/`, `stats/`, `featured-stories/`, `compact-solutions/`)

**Editar `src/App.tsx`**
- Remover imports: `Layout`, `Home`.
- Remover a linha da rota `/oldhome_teste`.

## Verificação
- `rg` final por qualquer referência residual aos nomes removidos.
- Garantir que `App.tsx` compila (imports e JSX consistentes).

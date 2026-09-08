## Ajustes específicos

### 1. Mais espaço entre o header e o conteúdo da hero
- Em `src/components/home-v3/HeroSuite.tsx`, aumentar o padding superior da seção interna:
  - Mobile: `pt-24` → `pt-28`
  - Desktop: `md:pt-24` → `md:pt-32`
- Isso abre respiro entre o header fixo e o badge "AI DECISION INTELLIGENCE", e entre o badge e o título/painel.

### 2. Descer a faixa de soluções suavemente
- Aumentar o padding inferior da hero para empurrar a `SolutionBands` para baixo:
  - Mobile: `pb-3` → `pb-8`
  - Desktop: `md:pb-0` → `md:pb-10`
- Para manter a faixa de logos na primeira tela sem scroll, compensar reduzindo o padding vertical da própria faixa de soluções:
  - `py-4` → `py-3`
  - `md:py-4` → `md:py-3.5`
- A faixa de logos (`ClientProof`) não sofre alteração de altura; ela continua ancorada por `md:mt-auto` dentro do wrapper `md:min-h-screen`.

### 3. Fundo da faixa de soluções um pouco mais destacado
- Em `src/components/home-v3/SolutionBands.tsx`, aumentar a opacidade dos tons de fundo para dar presença sem competir com o painel animado:
  - Faixa esquerda: `bg-secondary/50` → `bg-secondary/80`
  - Faixa direita: `bg-muted/40` → `bg-muted/70`
- Manter as bordas e a divisória vertical como estão; não adicionar sombras, arredondamentos ou gradientes.

## Validação
- Verificar se, em 1440×900 e 1280×800, a faixa de logos ainda aparece sem rolagem.
- Testar PT/EN/ES e mobile 390px.
- Rodar `bunx tsgo --noEmit` e `bun run build`.
- Sem release/deploy.

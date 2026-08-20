# Ajuste de layout em /go/ (PT e EN)

## Objetivo
Tornar a página `/go/` (PT e EN) mais compacta para que o formulário de contato caiba preferencialmente sem scroll, removendo o título da seção "Como implementamos" e reduzindo o tamanho dos cards.

## Mudanças propostas

### 1. `src/components/solutions-v2/HowWeImplement.tsx`
- Adicionar props opcionais:
  - `hideHeader?: boolean` — oculta o eyebrow + título da seção.
  - `compact?: boolean` — ativa layout compacto dos cards.
- Quando `compact=true`:
  - Reduzir padding interno dos cards (`p-3` ou `p-4`).
  - Reduzir tamanho dos números (`text-2xl`).
  - Reduzir tamanho do título do card (`text-xs`) e descrição (`text-[10px]` ou `text-xs` com leading menor).
  - Reduzir gap entre cards (`gap-2` ou `gap-3`).
  - Reposicionar o badge "Custo zero até o Backtest" para não sobrepor os cards (ajustar posicionamento absoluto ou usar fluxo inline).
- Manter comportamento padrão inalterado nas demais páginas (`/solutions`).

### 2. `src/pages/GoLanding.tsx`
- Reduzir espaçamento da hero (`pt-16 pb-4` ou similar).
- Invocar `<HowWeImplement hideHeader compact />`.
- Reduzir espaçamento entre a seção de cards e o formulário (`pt-6 pb-8` ou similar).
- Garantir que o formulário use a versão compacta (`compact` já está ativo).

### 3. Verificação visual
- Testar no preview em `/pt/go/` e `/en/go/` para confirmar que o formulário cabe sem scroll em viewport comum (1045x745 e 1920x1080).
- Ajustar fino se necessário (padding, gaps, altura do textarea).

## Fora de escopo
- Não alterar texto ou conteúdo dos cards.
- Não alterar a página `/solutions`.
- Não modificar a lógica do formulário ou do token de outreach.

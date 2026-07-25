## Objetivo

Refatorar o quiz do /kiosk de "3 perguntas base + desempate de pricing" para um fluxo em **2 passos com roteamento por território**: a primeira pergunta escolhe o território (Growth / Planning / Pricing) e a segunda escolhe a solução dentro daquele território, indo direto para a tela de resultado (mesma tela padrão que existe hoje).

## Novo fluxo

```text
Q1 (território)
├─ Growth & Customer Intelligence ──► Q2A ─┬─ Personalization + Smart Discovery
│                                           └─ Predictive Campaign Targeting
├─ Demand, Supply & Commercial Planning ──► Q2B ─┬─ Predictive Forecasting
│                                                 ├─ Predictive Commercial Goals
│                                                 └─ Predictive Assortment & Order
└─ Pricing & Margin Intelligence ──► Q2C ─┬─ Price-to-Margin
                                           ├─ Price-to-Turnover
                                           └─ Price-to-Conversion
```

Total: sempre 2 perguntas. Sem desempate. Ao responder Q2, vai direto para `results` com a solução recomendada já selecionada, e a mesma tela padrão de hoje é reutilizada (SolutionsGrid + SolutionDemoBlock + KioskSignalIntelliboard + EbookCTA).

Caso especial: quando a resposta indica **Personalization + Smart Discovery** (dois IDs combinados), a tela de resultados exibe as duas soluções lado a lado (grid com 2 cards, primeira pré-selecionada), reaproveitando o layout já usado no fallback de empate.

## Mudanças

### 1. `src/data/kiosk/config.ts`
- Trocar o modelo de dados: em vez de `PricingBucket` + `weights`, cada opção passa a carregar diretamente um `next` (id da próxima pergunta) na Q1, e um `solutionIds: string[]` na Q2.
- Substituir `questions: QuizQuestion[]` + `tiebreaker` por:
  - `routing: QuizQuestion` (Q1 com 3 opções → `growth` | `planning` | `pricing`)
  - `branches: Record<'growth'|'planning'|'pricing', QuizQuestion>` (as três Q2)
- Remover `bucketToSolutionId`, `PRICING_SOLUTION_IDS`, `PricingBucket` e o conceito de desempate.
- Reescrever textos PT/EN conforme copy fornecida (rótulos curtos + helper com a explicação longa "Quero..."). Manter `intro`, `results`, `ebook`, `attract`, `footer`, `solutionEbook`, `solutionSignalMap` como estão.
- Ajustar `progressLabel` para 2 passos.

### 2. `src/pages/Kiosk.tsx`
- Remover estados `scores`, `showTiebreaker`, `quizStep` numérico e a lógica `resolveWinner` / `hasTopTie`.
- Novos estados: `route: 'growth'|'planning'|'pricing'|null` e `recommendedIds: string[] | null`.
- Handler da Q1 seta `route` e avança para Q2 da branch correspondente.
- Handler da Q2 seta `recommendedIds` (1 ou 2 ids), muda stage para `results`, dispara `KIOSK_QUIZ_COMPLETED` com `{ route, solutions }`.
- `solutionsForResults` = filtra `sContent.solutions` por `recommendedIds`. Auto-seleciona o primeiro id (mesma UX de hoje). Sem "tie fallback".
- Ajustar `results.title/subtitle`: usar o mesmo copy padrão de hoje (a tela de resultados não muda visualmente). Se `recommendedIds.length > 1`, usar `tieTitle/tieSubtitle` já existentes como copy de "combinação".
- Ajustar `reset()` para os novos estados.

### 3. `src/components/kiosk/QuizScreen.tsx`
- Remover a prop `isTiebreaker` e o parâmetro `weights`. `onAnswer` passa a receber apenas o `optionId` (o pai decide o que fazer).
- `stepIndex`/`totalSteps` continuam funcionando (agora 1 de 2 e 2 de 2).

### 4. Copy (PT — espelhar em EN)

**Q1** — "Qual resultado você precisa priorizar agora?"
- Aumentar conversão e receita — helper: "Vender mais por cliente, visitante ou canal, com ofertas e abordagens mais relevantes." → `growth`
- Planejar demanda e operação com mais precisão — helper: "Melhorar previsões, metas, mix e pedidos para reduzir ruptura, excesso e desperdício." → `planning`
- Tomar melhores decisões de preço — helper: "Proteger margem, acelerar o giro ou aumentar a conversão por meio do preço." → `pricing`

**Q2 growth** — "Onde está a maior oportunidade de crescimento?"
- Melhorar o que cada cliente ou visitante encontra e recebe → `['predictive-personalization','smart-discovery']`
- Identificar quem deve ser abordado em cada campanha → `['predictive-campaign-targeting']`

**Q2 planning** — "Qual decisão precisa de mais precisão?"
- Antecipar quanto será demandado, onde e quando → `['demand-forecasting']`
- Definir metas de acordo com o potencial real de mercado → `['predictive-commercial-targets']`
- Definir o melhor mix, volume ou pedido → `['mix-assortment-order']`

**Q2 pricing** — "O que sua decisão de preço precisa otimizar prioritariamente?"
- Capturar mais margem → `['price-to-margin']`
- Acelerar o giro de estoque → `['price-to-turnover']`
- Aumentar a conversão → `['price-to-conversion']`

## Fora do escopo
- Tela de resultados permanece igual (mesmo layout, mesma demo, mesmo Intelliboard, mesmo EbookCTA). Telas dedicadas por solução ficam para a próxima rodada.
- Não mexe em `SolutionsGrid`, `SolutionDemoBlock`, `KioskSignalIntelliboard`, `EbookCTA`, `AttractScreen`.
- Não altera i18n do resto do site.

## Verificação
- Q1 → cada uma das 3 opções leva à Q2 correta.
- Growth R1 abre results com 2 cards (Personalization + Smart Discovery), primeiro pré-selecionado.
- Todas as outras respostas abrem results com 1 card já pré-selecionado e scroll para o demo.
- Botão Recomeçar volta para attract e zera route/recomendação.
- PT e EN.

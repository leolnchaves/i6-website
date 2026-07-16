
## Objetivo

Trocar o quiz atual do `/kiosk` (1 pergunta, escolha de território) por um fluxo de **3 perguntas obrigatórias + 1 pergunta de desempate condicional** que pontuam as 3 soluções de pricing. O resultado abre direto na solução vencedora — ou, se persistir empate, mostra as 3 pra o visitante tocar.

Escopo: só PT nesta rodada (o EN atual do quiz fica intocado por enquanto; se alguém abrir `?lang=en` continua vendo o quiz antigo até subirmos a tradução).

## Perguntas e pesos

Cada resposta soma pontos em um dos 3 buckets: `margin`, `turnover`, `conversion`.

**Q1 — Roteamento: "Com que frequência o seu preço precisa mudar para acompanhar o mercado?"**
- Uma vez por mês, ou por semana → margin +2
- Toda semana, e muda de novo quando o produto encalha → turnover +2
- A cada visita do cliente ao site → conversion +2
- Nunca mudou. É tabela fixa → 0 (segue sem pontuar)

**Q2 — Granularidade: "Qual é a menor unidade em que o preço é decidido hoje?"**
- O SKU. Mesmo preço em todo canal → margin +2
- O SKU em cada loja ou região → turnover +2
- O produto, para cada cliente que entra → conversion +2

**Q3 — Dor: "O que mais te incomoda no preço atual?"**
- Margem que ficou na mesa em SKUs que aguentavam mais → margin +2
- Estoque parado e desconto dado no momento errado → turnover +2
- Visita que entrou, olhou e não converteu → conversion +2

**Q4 — Desempate (só aparece se, após Q3, os 2 maiores buckets estiverem empatados):**
"O produto tem prazo para sair (coleção, validade, temporada)?"
- Sim → turnover +1
- Não, o giro é estável → margin +1
- O prazo é a própria sessão → conversion +1

**Resolução final:**
- Vencedor único → abre direto o demo da solução (`price-to-margin` | `price-to-turnover` | `price-to-conversion`).
- Empate persistente OU todos zerados → mostra os 3 cards de pricing e deixa o visitante tocar (comportamento parecido com o results atual, mas filtrado só para as 3 soluções de pricing).

## Fluxo de tela

```text
Attract
   ↓ (tap)
Q1 → Q2 → Q3 → [Q4 se empate] → Results
                                    │
                          ┌─────────┴──────────┐
                          │                    │
                    vencedor único       empate/zerado
                          │                    │
                  abre solução           mostra 3 cards
                  direto no demo         de pricing p/ tocar
```

Cada pergunta é uma tela cheia (single-question), com as 3–4 opções em botões grandes touch-friendly (mesmo padrão visual do QuizScreen atual: pills grandes, coral no selecionado, min-h touch). Progresso "Passo X de 3" no topo. Botão "Continuar" só habilita após selecionar uma opção (single-select agora, não multi).

## Arquivos afetados

**Dados (PT-only nesta rodada):**
- `src/data/kiosk/config.ts` — trocar a shape do quiz:
  - Novo tipo `PricingBucket = 'margin' | 'turnover' | 'conversion'`.
  - `QuizContent` passa a ter `questions: QuizQuestion[]` (3 perguntas base) + `tiebreaker: QuizQuestion` (Q4).
  - Cada `QuizOption` ganha `weights: Partial<Record<PricingBucket, number>>` em vez de `territory`.
  - Textos de intro/results ajustados ("suas alavancas preditivas" → algo mais alinhado a pricing, ex.: "sua estratégia de preço recomendada").
  - EN mantém a estrutura antiga por ora — vou manter os dois formatos coexistindo via feature flag no lang, ou simplesmente marcar EN como "coming soon" e forçar `?lang=pt`. **Decisão sugerida:** no EN, esconder toggle de idioma e forçar PT temporariamente (mais simples).

**Componentes:**
- `src/components/kiosk/QuizScreen.tsx` — refatorar para receber `question: QuizQuestion` + índice + total, e chamar `onAnswer(weights)` a cada tela. Single-select em vez de multi.
- `src/pages/Kiosk.tsx` — nova máquina de estado do quiz:
  - `stage: 'attract' | 'quiz' | 'results'`
  - `quizStep: 0..2` para Q1–Q3, `4` para tiebreaker
  - `scores: { margin, turnover, conversion }`
  - Ao terminar Q3, decide se roda Q4 (empate entre os dois maiores) ou pula pra results.
  - Resultado: `winner` = bucket com score único max → mapeia para solutionId; caso contrário `winners = [...]`.
- Results:
  - Se `winner` único: seleciona automaticamente a solução vencedora (`setSelectedSolutionId`) e faz scroll pro demo.
  - Se empate: renderiza `SolutionsGrid` filtrado só nas 3 de pricing (`price-to-margin`, `price-to-turnover`, `price-to-conversion`), sem auto-select.

**Tracking:**
- `src/lib/tracker-events.ts` — adicionar `KIOSK_PRICING_QUIZ_ANSWERED` (por pergunta, com peso escolhido) e `KIOSK_PRICING_RESULT` (com bucket vencedor ou "tie").
- Manter `KIOSK_SESSION_STARTED` e `KIOSK_SOLUTION_SELECTED`.

## Mapeamento bucket → solução

```
margin     → price-to-margin
turnover   → price-to-turnover
conversion → price-to-conversion
```

## Detalhes técnicos

- Q4 aparece se `max(scores) == segundoMaior(scores)` E `max > 0`. Se todos zerados após Q3, pula Q4 e vai direto pro fallback (mostra os 3).
- Após Q4, se ainda empatar, cai no fallback dos 3 cards.
- `handleQuizSubmit` no `Kiosk.tsx` some; entra `handleAnswer(weights)` que soma no state e avança step.
- `territories` state deixa de ser usado no fluxo novo; posso remover ou manter zerado. Vou remover a filtragem por território no results e usar filtragem por ID fixo das 3 de pricing.
- EN: no toggle de idioma da AttractScreen, escondo o botão EN temporariamente (comentário no código pra reativar quando traduzirmos).

## Fora do escopo

- Tradução EN do novo quiz (fica pra próxima release).
- Mudanças nos demos de Price-to-Turnover e Price-to-Conversion (hoje só temos demo de Price-to-Margin; os outros dois já caem no `SolutionDemoBlock` padrão).
- Nenhuma mudança nas outras solutions (Growth/Planning) — elas simplesmente somem do kiosk agora que o fluxo é 100% pricing.

Se preferir manter Growth/Planning como uma pergunta 0 ("Seu foco hoje é crescer, prever ou precificar?") antes do fluxo de pricing, me avise antes de eu construir — a base atual suporta essa variação com pouco esforço extra.

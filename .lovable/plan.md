## Objetivo
Adaptar a conclusão de **Personalização + Descoberta Preditiva** para um totem 27" em formato retrato. Toda a simulação (seleção de cenário + navegação e-commerce + raciocínio do modelo + POR QUE) sai da rolagem infinita da página e vai para um **modal em 90% da tela**, aberto por um botão claro. Este é o piloto — se aprovado, replicamos o mesmo padrão nas outras conclusões.

## Escopo (apenas Personalização + Descoberta)

### 1. Gatilho no lugar da mensagem "Toque em uma solução…"
Em `src/pages/Kiosk.tsx`, quando a solução selecionada for `predictive-personalization` ou `smart-discovery`, no lugar de renderizar o `SolutionDemoBlock` direto exibimos um **botão coral grande**:

- Texto: `Clique aqui para simular a solução` (PT) / `Click here to simulate the solution` (EN).
- Ao clicar, abre o modal descrito abaixo.
- O texto atual `results.selectSolutionHint` (anexo 3) some quando existe uma solução ativa — o botão o substitui.

Para as demais soluções, nada muda por enquanto.

### 2. Modal de simulação (novo componente)
Novo arquivo `src/components/kiosk/PersonalizationSimulationModal.tsx`:

- Overlay escuro fullscreen; painel central `w-[90vw] h-[90vh]` com `rounded-3xl`, borda coral suave, scroll interno se precisar.
- Header enxuto: título "Personalização + Descoberta · i6RecSys" + subtítulo curto.
- **Corpo do modal contém tudo que hoje está no `PredictivePersonalizationDemo`**: seletor de cenário, objetivo, e-commerce mock + raciocínio.
- Rodapé fixo com botão **`Fechar simulação`** / `Close simulation` que fecha o modal e volta ao estado anterior.
- Fecha também no `Esc` e no clique no overlay.
- Reset do estado interno da simulação ao fechar.

### 3. Seletor de cenário em grade 2×2 (anexo 1)
Dentro do modal, no topo, substituir os 4 tabs em linha por uma **matriz**:

```text
                 Anônimo        Logado
   MODA          [   btn   ]    [   btn   ]
   BENS CONSUMO  [   btn   ]    [   btn   ]
```

- Duas linhas (`MODA`, `BENS DE CONSUMO`) com rótulo à esquerda em coral.
- Cada linha tem 2 botões grandes de toque: `Usuário anônimo` e `Usuário logado`, com ícone `UserX` / `User` e altura mínima `~9vmin`.
- Um único botão fica ativo por vez (borda coral + fundo coral suave).
- Alimenta os mesmos `userMode` + `vertical` que hoje.

### 4. Reorganização do corpo — retrato, em pilha
Hoje o corpo do demo é `grid-cols-2` (e-commerce à esquerda, raciocínio à direita). Em retrato isso fica apertado. Passa a ser **empilhado verticalmente**:

**Parte superior — "loja" (inalterada em conteúdo):**
- Barra falsa `vivashop.io / {vertical}`.
- Vitrine (grid 3 colunas), PDP não-fashion (herói + 4 recomendações) e PDP fashion (âncora + look complementar) exatamente como estão hoje.
- Os KPIs (`Uplift no ticket`, `Propensão cross-sell`, `Confiança`) permanecem logo abaixo do resultado, dentro deste bloco.

**Parte inferior — raciocínio do modelo (redesenhado):**

a) **Timeline horizontal** substituindo os 4 blocos verticais.
- Linha coral fina cruza a largura do bloco.
- Cada `scenario.features` (hoje 4 passos) vira um **ponto** na linha: círculo com número, e legenda curta abaixo (`step.label`).
- Estados: `idle` (branco/30% opacidade), `active` (círculo coral pulsando + barra de progresso preenchendo o segmento até o próximo ponto), `done` (círculo coral cheio com check).
- Sem os textos `microMetric` completos por padrão — mostrar só o do passo ativo em uma linha discreta acima da timeline (para não crescer altura).

b) **Card "POR QUE" abaixo da timeline (baixinho):**
- Aparece só depois do pipeline terminar (`phase === 'pdp'`).
- **Remove o traço pontuado SVG** (linha conectora PDP → argumento) — deletamos o bloco `line` / `setLine` / `<svg>` e refs relacionados.
- Layout compacto: título `Por que` + parágrafo `argumentText` + latência em uma única linha; padding reduzido, sem o pill "Insight" absoluto no canto (opcional manter texto "Insight" inline).
- Altura alvo: ~1/4 da altura do painel de raciocínio, sem quebras verticais desnecessárias.

### 5. Comportamento e limpeza
- `PredictivePersonalizationDemo` passa a ser renderizado **apenas dentro do modal**. Mantemos o export atual e o modal o consome como conteúdo, mas com:
  - `grid-cols-2` → `flex-col gap-...` no wrapper principal.
  - Coluna de raciocínio transformada em timeline horizontal + insight compacto (novo sub-componente `ReasoningTimeline`).
  - Remoção completa do `useLayoutEffect` de medição, `line`, `pdpRef`/`argRef` refs e do `<svg>` de conector.
- `SolutionDemoBlock` continua roteando `predictive-personalization` / `smart-discovery` para o mesmo componente; o modal apenas embrulha.
- `Kiosk.tsx` controla `isSimOpen` só quando `selectedSolution.id ∈ { predictive-personalization, smart-discovery }`; caso contrário, comportamento atual.

### 6. i18n
Novas strings em `src/data/kiosk/config.ts` → `kioskContent.pt/en.results`:
- `simulateButton`: "Clique aqui para simular a solução" / "Click here to simulate the solution".
- `closeSimulation`: "Fechar simulação" / "Close simulation".
- `matrixFashion`: "Moda" / "Fashion".
- `matrixProducts`: "Bens de consumo" / "Consumer goods".

### 7. Fora do escopo desta rodada
- Demais conclusões (Forecast, Campanhas, Metas, Mix, Preços) — só migramos depois de validar este piloto.
- Nenhuma mudança de conteúdo/textos das features ou dos cenários.
- Sem alteração no i6Signal Intelliboard nem no EbookCTA.

## Detalhes técnicos
- Modal: componente próprio com `createPortal` no `document.body`, `role="dialog"`, `aria-modal`, listener global de `Escape`, foco inicial no botão de fechar, bloqueio de scroll do `body` enquanto aberto.
- Timeline: implementação em CSS/flex — pontos em `flex justify-between`, linha via `absolute inset-x-0 top-1/2 h-[2px] bg-white/15`, preenchimento coral via segundo `div` com `width: ${(progress / steps.length) * 100}%`.
- Todas as medidas continuam em `vmin` para escalar no totem retrato.

## Estrutura resultante (parte inferior do modal)

```text
[ ●───●───●───●  ]  ← timeline horizontal, ponto ativo pulsa
   Sinal   Feats   Score   Rank
--------------------------------------------------
| POR QUE                                        |
| Texto do argumento em 1–3 linhas · 34.12 ms    |
--------------------------------------------------
```

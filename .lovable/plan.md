# Ajustes no demo i6 Signal

Arquivo único: `src/components/solutions/I6SignalDemo.tsx`

## 1. Renomear labels dos botões (PT e EN)

PT (`pt.scenarios.*.label`):

| De | Para |
|---|---|
| Abastecimento | Ruptura |
| Previsão | Sazonalidade |
| Precificação | Preço Ótimo |
| Comercial | Foco Comercial |
| Mix | Mix / Sortimento |
| Comportamento | Compra / Recompra |

EN (`en.scenarios.*.label`) — equivalentes traduzidos:

| De | Para |
|---|---|
| Supply | Stockout |
| Forecast | Seasonality |
| Pricing | Optimal Price |
| Commercial | Commercial Focus |
| Mix | Mix / Assortment |
| Behavior | Purchase / Repurchase |

Somente o campo `label` muda. Títulos, perguntas, tabelas e demais conteúdos permanecem.

## 2. Destacar o botão imediatamente ao clicar

Comportamento atual: `handleScenarioClick` limpa o chat e inicia o preenchimento do input; `activeScenario` só é atualizado depois, quando `startAnimation` roda ao fim da digitação — por isso o laranja só aparece após a resposta.

Correção: em `handleScenarioClick` (e por consistência em `handleSuggestedQuestionClick` quando o cenário mudar), chamar `setActiveScenario(sc)` imediatamente, antes de iniciar o preenchimento do input. O destaque passa a acompanhar o clique; a animação de digitação e resposta segue igual.

## 3. Aumentar a altura do quadro do Intelliboard no demo

Aumentar a altura máxima/visível da área de resposta/demo (Intelliboard) para que mais texto da resposta seja exibido sem scroll excessivo. Ajustar o container interno (área de mensagens/tabela) — sem modificar o layout externo da página ou quebrar a proporção do componente.

Nenhuma outra lógica é alterada.

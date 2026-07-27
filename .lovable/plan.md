## Objetivo
Aplicar em **Campanhas por Propensão** o mesmo padrão que ficou aprovado em Personalização + Descoberta Preditiva: fora do modal só existe um card com o botão coral "Clique aqui para simular a solução"; toda a experiência da demo (setup, pipeline, resultado, POR QUE) roda dentro de um modal ocupando 90% da tela, com botão "Fechar simulação" no rodapé.

## Escopo

### 1. Reutilizar o padrão do launcher
Generalizar `PersonalizationSimulationLauncher.tsx` para receber o conteúdo da demo como children (ou criar um `SimulationLauncher` genérico usado por ambas as soluções). O launcher mantém:
- Card coral com título/tagline da solução.
- Botão grande "Clique aqui para simular a solução".
- Modal fullscreen 90vw × 90vh, fecha em Esc / overlay / botão "Fechar simulação" no rodapé.
- Reset do estado interno da demo ao fechar (via `key` remount).

### 2. Rota em `SolutionDemoBlock`
Trocar o retorno de `predictive-campaign-targeting` para embrulhar `<PropensityCampaignDemo />` dentro desse launcher genérico, passando `solution.title` e `solution.tagline`.

### 3. Ajustes de layout em `PropensityCampaignDemo` para retrato
Hoje é `grid-cols-[1.25fr_1fr]` (lado a lado). Em totem retrato empilhar em coluna:
- **Bloco superior**: CRM/setup + resultado (canvas atual da esquerda) — inalterado em conteúdo.
- **Linha de KPIs + botão "Voltar ao setup" na mesma linha** (padrão que aprovamos em Personalização), logo abaixo do resultado.
- **Bloco inferior — raciocínio**:
  - Card **POR QUE** compacto no topo (título + argumento + latência em 1 linha), sem SVG conector nem pontilhados.
  - **Timeline horizontal** abaixo do POR QUE, com cada passo do `pipeline` virando um ponto (idle / active pulsando / done com check), micro-métrica do passo ativo em linha discreta acima da timeline e o label + microMetric fixo abaixo de cada ponto.
- Remover qualquer `useLayoutEffect` de medição / refs de linha conectora que existam nesse demo (se houver), análogo ao que foi feito em Personalização.

### 4. Fora do escopo
- Demais conclusões (Forecast, Metas, Mix, Preços) — migram depois de validar Campanhas.
- Sem mudança de conteúdo/textos, cenários, KPIs calculados ou lógica de `computeResult`.
- Sem mudança em i6Signal Intelliboard e EbookCTA.

### 5. i18n
Reaproveitar as chaves existentes `results.simulateButton` e `results.closeSimulation` já usadas em Personalização. Nenhuma nova string necessária.

## Detalhes técnicos
- Preferência: extrair `SimulationLauncher` genérico em `src/components/kiosk/SimulationLauncher.tsx` (mesmo markup do atual `PersonalizationSimulationLauncher`) recebendo `children`. `PersonalizationSimulationLauncher` passa a ser um wrapper fino ou é substituído nos dois pontos de uso em `SolutionDemoBlock`.
- Timeline em `PropensityCampaignDemo`: reaproveitar o padrão CSS/flex de Personalização (pontos em `flex justify-between`, linha coral fina, preenchimento por `width: progress/steps * 100%`).
- Tudo continua em `vmin` para escalar no totem 27" retrato.

## Estrutura resultante (dentro do modal, empilhada)

```text
[ CRM / Setup ] → [ Resultado da campanha ]
[ Voltar ao setup ] [ KPI 1 ] [ KPI 2 ] [ KPI 3 ]
--------------------------------------------------
| POR QUE  · argumento em 1–3 linhas · 42.17 ms  |
--------------------------------------------------
[ ●───●───●───●  ]   ← timeline horizontal
 Sinal  Feats  Score  Rank
```

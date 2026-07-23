## Objetivo
Na tela de resultados de `/kiosk` (após o usuário receber a estratégia de preço), substituir o bloco atual do "i6 Signal" (`KioskSignalDemo` — simples, texto puro) pela mesma experiência interativa do demo do i6 Signal usado em `/solutions` (`I6SignalDemo` — Intelliboard com typing, tabelas, gráficos, análise executiva e ações). Com uma diferença: em vez do seletor de temas (pills "Preço Ótimo", "Mix", etc.), exibir **algumas perguntas inteiras** clicáveis, relacionadas à solução recomendada, cada uma disparando o mesmo fluxo de resposta.

## Arquivos e mudanças

### 1. Novo componente: `src/components/kiosk/KioskSignalIntelliboard.tsx`
Fork adaptado do `I6SignalDemo.tsx` (`src/components/solutions/I6SignalDemo.tsx`), com:

- **Reuso total dos dados** já existentes no próprio `I6SignalDemo` (cenários com `question`, `title`, `analysis`, `table/chartData/comercialChart/barChartData/comparison`, `actions`). Nada de duplicar conteúdo — importar o objeto `content` de lá (exportá-lo do `I6SignalDemo.tsx`) ou movê-lo para `src/data/signalDemo/content.ts` compartilhado por ambas as telas.
- **Prop `solutionId`**: seleciona quais cenários (perguntas) mostrar via `solutionSignalMap` já existente em `src/data/kiosk/config.ts`. Ex.: `pricing-dynamics` → `['pricing', 'comercial']`.
- **Seletor de perguntas (substitui as pills)**: lista vertical, cada item é um card grande touch-friendly (min-height ~10vmin) mostrando a pergunta inteira (`scenario.question`) — sem o pill "Preço Ótimo". Ao tocar, dispara o mesmo `handleScenarioClick` (typing → response) do demo original.
- **Estado inicial**: nenhuma pergunta ativa; área de resposta vazia com hint tipo "Toque em uma pergunta para ver o insight".
- **Bloco final "Perguntas Sugeridas"** do demo original: removido (fluxo linear único no kiosk).

### 2. Ajustes de layout para TV 27" retrato / touchscreen
- **Sidebar** do Intelliboard (Home, Ingestion Tokens, etc.): oculta no kiosk (`hidden` sempre) — não há valor num kiosk retrato.
- **Área principal em coluna única**: header do Intelliboard no topo, lista de perguntas em seguida, área de resposta abaixo.
- **Tipografia e touch targets em `vmin`**: perguntas ~2.4vmin, cards com padding 3vmin; áreas clicáveis com altura mínima de 9vmin.
- **Input de digitação inferior**: manter só visual (não editável no kiosk); ou remover — recomendo remover para reforçar que o único caminho é tocar as perguntas.
- **Animação de typing e delay de resposta**: mantidos idênticos ao demo `/solutions`.

### 3. `src/pages/Kiosk.tsx`
- Substituir `<KioskSignalDemo ... />` (linha ~280) por `<KioskSignalIntelliboard lang={lang} solutionId={selectedSolution.id} />`.
- Remover o import antigo `KioskSignalDemo`.

### 4. Limpeza
- Manter `src/components/kiosk/KioskSignalDemo.tsx` e `src/data/kiosk/signals.ts` no repo por enquanto (não referenciados). Podem ser removidos numa passada futura.
- `solutionSignalMap` em `src/data/kiosk/config.ts`: manter como está (já define os cenários por solução).

## Fora de escopo
- Não altero o demo de `/solutions` (fica exatamente como está hoje).
- Não altero textos/conteúdo dos cenários — reuso 1:1.
- Não mexo em quiz, ebook CTA, price-to-margin ou header/footer do kiosk.

## Detalhes técnicos
- Para compartilhar o objeto `content` entre `I6SignalDemo.tsx` e o novo componente do kiosk, extrair para `src/data/signalDemo/content.ts` (ou exportar de `I6SignalDemo.tsx`). Recomendação: extrair para arquivo próprio — mais limpo e evita import cruzado entre features.
- Tipos `Scenario` e `Phase` também migram para o mesmo arquivo compartilhado.
- Ambos os componentes (`I6SignalDemo` original e `KioskSignalIntelliboard`) passam a importar de lá.

# Forecast Preditivo — ajustes de UX e realismo

## Escopo
Arquivos: `src/components/kiosk/demos/DemandForecastDemo.tsx` e `src/data/kiosk/demos/demandForecast.ts`.

## 1. Remover intervalo de confiança
- Excluir a construção do `ciPath`/polígono no `MainChart` e a `LegendDot` de "Intervalo de confiança i6".
- Manter `ciLow/ciHigh` no tipo (não quebra outros usos), apenas não desenhar nem entrar na legenda.

## 2. Linhas de sazonalidade e tendência mais reais (chart de composição)
- **Tendência**: hoje é uma curva suave CAGR quase reta. Passar a plotar o *desvio* da tendência sobre uma média móvel curta (variando visivelmente ao longo dos meses) com leve micro-ruído determinístico via `noise(seed)`, para dar textura orgânica sem virar serrilhado.
- **Sazonalidade**: hoje o gráfico usa `Math.abs(season)`, o que remove os vales negativos e torna a curva "gêmea" da tendência. Trocar por sazonalidade *raiada com sinal* (pode ficar negativa) desenhada em torno de uma linha zero horizontal — inclui um eixo zero tênue e labels no eixo Y (+/−). Isso mostra "picos" e "vales" reais do ciclo.
- Ajustar levemente `seasonComp` no `buildSeries` para amplificar contraste onde `seasonAmp` é baixo (evita linha achatada em SKUs recorrentes).

## 3. Filtros — segmented buttons, sem dropdown, sem PDV
- Substituir todos os `ChipSelect` (dropdown) por um novo componente `SegmentedFilter` renderizando botões visíveis, tamanho touch (min-h ~7vmin, padding generoso).
- Layout: uma linha por dimensão — `Produto` (4 botões, um por SKU), `Canal` (3 botões: Total/Digital/Físico), `Região` (4 botões: Total/Sudeste/Sul/Nordeste), `Horizonte` (2 botões: 6/12 meses).
- Remover completamente o pill "Loja/PDV · Todas" (dado e label também podem sair do dicionário).
- Cada dimensão em sua própria linha (`flex flex-wrap gap-*`), com rótulo prefixo pequeno em coral à esquerda.

## 4. Fazer canal/região impactarem o gráfico visualmente
- Causa raiz: o eixo Y do `MainChart` é autoescala; quando região reduz o volume, o gráfico é reescalado e o formato fica igual.
- Correção: fixar `maxY` baseado no cenário `total × total` do SKU atual (`buildSeries(sku, 'total', 'total', horizon)`) e usar essa escala fixa para todas as combinações. Assim, filtrar `Sul` faz as linhas caírem visivelmente para ~19% da altura do total; `Sudeste` ~58%; etc.
- O `CompositionChart` fica com autoescala (mudança já é evidente pelas barras/linhas).

## 5. Cliques mais robustos no chart de composição (touchscreen)
- Aumentar altura do SVG (ver item 6) e a `bandW` mínima para ~ suficiente para 12 meses caberem com faixas largas.
- Adicionar em cada mês um `<rect>` de hitbox transparente cobrindo toda a faixa vertical (`x = cx - bandW/2`, altura = área do gráfico) para o `onClick` — assim o dedo acerta clicando em qualquer lugar da coluna, não só na barra pequena.
- Realçar o mês selecionado com um retângulo coral mais grosso (borda 1.6px) e um rótulo de mês em negrito maior (fontSize 10.5, coral). Estados `hover`/`active` com brilho.
- Deixar o `cursor-pointer` e `role="button"` explícitos.

## 6. Aumentar altura dos dois gráficos (alinhar com painel direito)
- `MainChart`: aumentar `H` de 190 → ~240 e `maxHeight` inline de 240 → ~320.
- `CompositionChart`: aumentar `H` de 170 → ~220 e `maxHeight` de 200 → ~280.
- Padding vertical dos containers dos gráficos aumenta levemente para acompanhar. Objetivo: coluna esquerda ficar ~alinhada em altura à direita (raciocínio do modelo + insight).

## Fora de escopo
- Nada de mudanças em pipeline, KPIs, argumentação, dados dos SKUs (exceto o pequeno tweak de `seasonComp` do item 2) ou conector SVG entre painéis.
- Sem mudanças em outros demos do kiosk.

## Objetivo

Aplicar em **Metas Comerciais Preditivas** (`predictive-commercial-targets`) exatamente o padrão já consolidado em Personalização, Campanhas e Forecast:

1. Navegação com **SimulationLauncher** (card unificado RESOLVE/ENTREGA/IMPACTO + botão que abre modal a 90%).
2. Signal e CTA de ebook **só aparecem depois de fechar a simulação**.
3. Layout do modal empilhado: **resultados em cima**, **timeline horizontal de reasoning embaixo**, com **card "POR QUE"** logo acima da timeline.
4. Fechar simulação pelo botão inferior "Conversar com a camada preditiva..." (sem X no topo).

## Alterações

### 1. `src/components/kiosk/SolutionDemoBlock.tsx`
Substituir o branch atual:
```
if (solution.id === 'predictive-commercial-targets') {
  return <CommercialTargetsDemo />;
}
```
por wrapping em `SimulationLauncher`, passando `solution.title/tagline/resolve/entrega/impacto`, `labels`, `lang`, `onSimulationClosed` e um ícone coerente (ex.: `Target` do lucide). O `<CommercialTargetsDemo lang={lang} />` vira children.

### 2. `src/pages/Kiosk.tsx`
Adicionar `'predictive-commercial-targets'` ao array `migratedIds`, para:
- ocultar o `SolutionsGrid` do topo,
- gating do Signal + EbookCTA atrás de `simulationCompleted`,
- scroll para o Signal ao fechar a simulação.

### 3. `src/components/kiosk/demos/CommercialTargetsDemo.tsx` — refatorar layout para padrão "empilhado"
- Aceitar prop `lang` (usado só se necessário; L continua vindo de `commercialTargets.ts`).
- Remover grid `grid-cols-[1.3fr_1fr]`. Estrutura nova:
  - **Bloco superior (dashboard):** tabela de metas + tabela de alocação + KPIs (grid 4 colunas, todos os 4 KPIs em uma linha só, como no Forecast). Botão "Calcular" quando `phase === 'setup'`; estado "running" com spinner.
  - **Card "POR QUE" (insight):** aparece só em `result`, largura total, acima da timeline.
  - **Timeline horizontal de reasoning:** `pipeline.map` em `grid-cols-<N>` (mesmo estilo compacto usado em `DemandForecastDemo`), estados idle/active/done preservados.
  - Botão "Nova simulação" no rodapé do bloco de resultado (permanece).
- Manter drill-down modal existente (fica dentro do container). Ajustar `absolute inset-0` para funcionar dentro do novo layout empilhado.
- Latência/tempos: manter a lógica atual do `useEffect` de `pipeline`.

### 4. Ícone
Importar `Target` (ou `Crosshair`) do `lucide-react` em `SolutionDemoBlock.tsx` e passar via prop `icon` do launcher — coerente com "metas".

## Fora do escopo

- Sem mudanças em textos, KPIs, dados ou fórmulas de `src/data/kiosk/demos/commercialTargets.ts`.
- Sem mudanças em Mix/Sortimento (próximo passo).
- Sem bump de versão até validação visual.

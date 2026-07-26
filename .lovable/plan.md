## Ajustes na demo "Metas Comerciais Preditivas" (`/kiosk`)

Alinhar a demo ao padrão das demais conclusões do kiosk.

### 1. Estado inicial do painel esquerdo (setup)
- Remover completamente os filtros do setup (período, região, vendedor, portfólio, categoria, orçamento).
- Mostrar de cara o mesmo layout do resultado, com **apenas** as colunas "Meta atual" e "Investimento atual" preenchidas nas tabelas de metas e alocação. As colunas "Meta sugerida", "Potencial", "Δ vs. atual", "CAC incremental" e a badge de ação ficam vazias / com placeholder (`—`).
- O switcher de dimensão (Região/Vendedor/Cliente/SKU) fica oculto nesse momento.
- O CTA principal muda para "Calcular metas e investimento ideal" (mantém o texto atual) e dispara o `phase = 'running'`.

### 2. Fase "running" (treinamento)
- Painel esquerdo: continua mostrando as mesmas tabelas parcialmente preenchidas + o estado de "calculando" já existente.
- Painel direito: exibe os passos do pipeline (mesma implementação atual).

### 3. Fase "result"
**Painel esquerdo — passa a conter, na ordem:**
1. Switcher de dimensão (Região, Vendedor, Cliente, SKU).
2. Tabela "Meta atual × Meta preditiva" completa.
3. Tabela "Alocação recomendada de investimento comercial" completa.
4. Bloco de KPIs (grade 2×2) — os 4 `ConclusionCard` que hoje estão à direita: Volume incremental, Meta total, Investimento sugerido, CAC.
5. Bloco de highlights "Onde a IA aponta oportunidade" (movido do lado direito).

**Painel direito — passa a conter, na ordem:**
1. Passos do pipeline de treinamento (permanecem visíveis após o cálculo, com todos os passos marcados como `done`, como nas demais demos).
2. Um único bloco de rationale: "**POR QUE ESSE MIX / SORTIMENTO**" (mantém o visual "Insight" com badge coral e texto do `rationale.increase`).
3. Botão **"Nova simulação"** logo abaixo do bloco POR QUE (estilo pill outline, mesmo componente do reset atual).

**Removidos do painel direito:** os blocos "Por que redistribuir" e "Por que reduzir a meta" (permanecem apenas no drill-down modal, que continua funcionando como hoje).

**Removido do painel esquerdo:** o botão "Explorar outra solução" (foi movido para o direito como "Nova simulação").

### Detalhes técnicos
- Edições concentradas em `src/components/kiosk/demos/CommercialTargetsDemo.tsx`.
- Nenhuma mudança na lógica de `computeResult` — apenas reorganização de UI e rendering condicional.
- Nos estados `setup`/`running`, renderizar as tabelas com um helper que exibe `—` nas células projetadas; nas linhas de alocação, ocultar a badge de ação.
- Adicionar em `src/data/kiosk/demos/commercialTargets.ts` os labels: `result.mixTitle = 'Por que esse mix / sortimento'` e `result.newSimulation = 'Nova simulação'` (substituindo/complementando `reset`).
- Layout do painel esquerdo em `phase === 'result'` deve empilhar tabelas + KPIs + highlights com `gap` adequado; garantir que o painel direito com pipeline + POR QUE + botão fique alinhado em altura via `flex-col` + `mt-auto` no botão.

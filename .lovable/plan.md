

# Novo cenario "Comportamento" com grafico de barras de compra/recompra

## Resumo
Adicionar um sexto cenario ao I6SignalDemo com o botao chamado **"Comportamento"** (PT) / **"Behavior"** (EN). O cenario mostra comportamento de compra e recompra de Losartana Potassica 50mg na regiao do Vale do Paraiba, com um grafico de barras usando Recharts.

## Mudancas

### 1. Atualizar tipo e imports (I6SignalDemo.tsx)

- Linha 11: adicionar `'pdv'` ao tipo `Scenario`
- Linha 9: adicionar `BarChart, Bar` aos imports do recharts

### 2. Adicionar dados do cenario nos objetos de traducao

**PT:**
- `label: 'Comportamento'`
- question sobre compra/recompra de Losartana Potassica 50mg no Vale do Paraiba
- title, analysis, actions, questions seguindo a mesma estrutura dos outros cenarios
- `barChartData`: array com 6 meses (Set-Fev), campos `month`, `compra`, `recompra`
- `barChartNote`: nota do grafico

**EN:**
- `label: 'Behavior'`
- Traducao equivalente de todos os campos

### 3. Criar componente PdvBarChart

Sub-componente inline usando `BarChart`, `Bar`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Legend`, `ResponsiveContainer` do Recharts. Duas barras lado a lado: laranja para Compra, azul para Recompra.

### 4. Renderizar o grafico na area de resposta

Adicionar condicional `activeScenario === 'pdv'` para renderizar o `PdvBarChart` na mesma posicao onde os outros cenarios renderizam suas visualizacoes.

### Arquivo modificado
- `src/components/solutions/I6SignalDemo.tsx`


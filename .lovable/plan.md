
# Criar Secao i6Signal Demo Interativa na Pagina Solutions

## Resumo

Comentar o `ProcessFlow` (que contem o "AI Implementation Journey" + Sandbox) e criar um novo componente `I6SignalDemo.tsx` que simula a interface do i6Signal Intelliboard com respostas no formato real do produto.

## O que sera comentado (preservado)

- Import e uso do `ProcessFlow` em `Solutions.tsx`
- Arquivos `ProcessFlow.tsx`, `AnimatedProcessFlow.tsx`, `SandboxEnvironment.tsx` permanecem intactos

## Formato das respostas do i6Signal (baseado no screenshot)

Cada resposta segue a estrutura real do produto:

1. **Titulo principal** (ex: "Analise Mensal do Item Mais Vendido (ID: 28822)")
2. **Analise Executiva** - paragrafo descritivo com analise detalhada
3. **Visualizacao** (opcional) - tabela OU grafico conforme o cenario
4. **Acoes Recomendadas** - lista numerada com titulo em negrito + descricao
5. **Perguntas Sugeridas (Nivel Tatico/Operacional)** - bullets com sugestoes de aprofundamento

## 5 Cenarios da Demo

### 1. Supply
- Pergunta: "Quais SKUs estao em risco de ruptura esta semana?"
- Resposta: Analise Executiva + **Tabela** (SKU, Produto, Prob. Ruptura, Estoque, Acao) + Acoes Recomendadas + Perguntas Sugeridas

### 2. Forecast
- Pergunta: "Qual a sazonalidade e tendencia do produto mais vendido para o ultimo quarter?"
- Resposta: Analise Executiva + **Grafico de linhas** (Recharts) com duas series:
  - Sazonalidade (coral/laranja #F4845F)
  - Tendencia (azul/ciano #38bdf8)
  - Eixo X: meses do quarter (Out, Nov, Dez)
  - Eixo Y: volume
- Texto descritivo abaixo do grafico + Acoes Recomendadas + Perguntas Sugeridas

### 3. Pricing
- Pergunta: "Qual o preco otimo para o produto X nesta regiao?"
- Resposta: Analise Executiva + Cards com metricas + Acoes + Perguntas

### 4. Comercial
- Pergunta: "Onde devo focar o esforco comercial este mes?"
- Resposta: Analise Executiva + Ranking com metricas + Acoes + Perguntas

### 5. Mix
- Pergunta: "Qual mix ideal para a regiao Sul?"
- Resposta: Analise Executiva + Comparativo + Acoes + Perguntas

## Layout Visual

```text
+------------------------------------------------------------------+
|  [i6SIGNAL]  Veja o i6Signal em acao                              |
|                                                                    |
|  +----------+---+-----------------------------------------------+ |
|  | Sidebar  |   | Area principal (chat)                          | |
|  |          | I |                                                 | |
|  | Home     | c | [Pergunta do usuario com typing animation]     | |
|  | Data     | o |                                                 | |
|  | i6Signal*| n | [Resposta estruturada:]                        | |
|  | Widgets  | s |   Titulo                                       | |
|  |          |   |   Analise Executiva (paragrafo)                 | |
|  |          |   |   [TABELA ou GRAFICO]                          | |
|  |          |   |   Acoes Recomendadas (1. 2. 3.)                | |
|  |          |   |   Perguntas Sugeridas (bullets)                | |
|  |          |   |                                                 | |
|  |          |   | [Supply][Forecast][Pricing][Comercial][Mix]    | |
|  |          |   | [Type your question...                  Send] | |
|  +----------+---+-----------------------------------------------+ |
+------------------------------------------------------------------+
```

## Detalhes tecnicos

### Arquivos

| Acao | Arquivo |
|------|---------|
| Criar | `src/components/solutions/I6SignalDemo.tsx` |
| Editar | `src/pages/Solutions.tsx` |

### Solutions.tsx - mudancas

- Comentar import do `ProcessFlow`
- Comentar `<ProcessFlow />` no JSX
- Importar e renderizar `<I6SignalDemo />` no mesmo local

### I6SignalDemo.tsx - estrutura

**Estado:**
- `activeScenario`: qual cenario esta selecionado (supply/forecast/pricing/comercial/mix)
- `animationPhase`: idle / typing / responding
- `typedText`: texto da pergunta sendo digitado caractere a caractere

**Sidebar:**
- Fundo escuro, itens de menu estaticos (Home, Data Ingestion, i6 Signal destacado com coral, Widgets)
- Responsivo: oculta no mobile

**Area de chat:**
- Fundo levemente diferente do sidebar
- Mensagem do usuario aparece com animacao de digitacao
- Resposta do i6Signal aparece progressivamente no formato real:
  - Titulo em fonte grande e bold (navy/branco)
  - Subtitulo "Analise Executiva" em bold
  - Paragrafo descritivo
  - Visualizacao (tabela HTML estilizada para Supply, grafico Recharts para Forecast, cards para outros)
  - "Acoes Recomendadas" com lista numerada (titulo em bold + descricao)
  - "Perguntas Sugeridas" com bullets

**Tabela (cenario Supply):**
- 5 colunas: SKU, Produto, Prob. Ruptura, Estoque Atual, Acao Sugerida
- 4-5 linhas com dados ficticios
- Cores de prioridade: vermelho (>80%), amarelo (50-80%), verde (<50%)
- Estilo consistente com dark theme

**Grafico (cenario Forecast):**
- Recharts LineChart (ja instalado)
- Duas linhas: Sazonalidade (#F4845F coral) e Tendencia (#38bdf8 azul)
- Eixo X: meses (Out, Nov, Dez ou Oct, Nov, Dec)
- Tooltip e legenda estilizados
- Texto analitico abaixo do grafico

**Tabs de cenario:**
- Botoes na parte inferior da area de chat, acima do input
- Ao clicar, reinicia a animacao com novo cenario

**Input visual:**
- Campo de texto + botao Send (coral)
- Apenas visual, nao funcional

**Internacionalizacao:**
- Todo conteudo bilingue PT/EN inline no componente

**Design:**
- Fundo: `bg-[#0B1224]` e `bg-[#0d1a2e]` para contraste
- Coral: `#F4845F` para destaques
- Bordas: `border-white/10`
- Texto: `text-white`, `text-white/60`, `text-white/40`
- Responsivo: sidebar oculta no mobile, layout empilhado

### Dependencias
- `recharts` - ja instalado
- Nenhuma nova dependencia

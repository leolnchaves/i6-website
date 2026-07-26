# Demo Kiosk — Campanhas por Propensão (Activation)

Nova demo interativa para o `solutionId = predictive-campaign-targeting`, seguindo o padrão das demos existentes do kiosk. **Apenas PT**, sem i18n (segue o padrão estático do site).

## Arquivos

**Novo `src/data/kiosk/demos/propensityCampaign.ts**`

- Strings 100% em PT (sem `lang`/switch de idioma).
- Objetivo exibido: **OBJETIVO: CONVERSÃO**.
- Catálogo de 6 produtos focado em varejo / bens de consumo, com 1–2 opções financeiras:
  1. **Kit Cuidados Premium** (higiene/beleza — CPG)
  2. **Linha de Bebidas Sazonais** (varejo alimentar)
  3. **Eletroportátil de Cozinha** (bens duráveis)
  4. **Coleção Moda Nova Temporada** (moda/varejo)
  5. **Cartão Fidelidade Premium** (financeiro/loyalty)
  6. **Seguro Extensão de Garantia** (financeiro atrelado a produto)
- Cada produto traz: taxa-base de conversão, canal ideal, tamanho de audiência total, argumento contextual rico.
- Segmentos: "Clientes ativos 90d", "Compradores recorrentes de categoria", "Base cross-sell", "Base completa".
- Períodos: 7d / 14d / 30d.
- Canais permitidos (multi-select): WhatsApp, e-mail, push, SMS, telefone.
- Latências fixas realistas por passo, soma total 55–80 ms — sempre com hint "abaixo da média de mercado (200 ms)".
- Faixas de audiência priorizada calculadas com fórmulas simples baseadas em produto × segmento × canais permitidos, gerando:
  - Prioridade alta (~propensão 80–85%)
  - Prioridade média (~55–65%)
  - Oportunidade futura (~30–38%)
- Cards de conclusão: audiência recomendada, conversão potencial, canal prioritário, pressão sugerida.
- Pool de 8 argumentos por produto (rotativos) para o insight "Por que recomendamos esta audiência".

**Novo `src/components/kiosk/demos/PropensityCampaignDemo.tsx**`

- Layout de duas colunas (`grid-cols-2 items-stretch`), coerente com Forecast/Price-to-Conversion.
- **Coluna esquerda — Setup CRM (fase `setup`)**:
  - Card Produto: 6 tiles selecionáveis em `SegmentedRow` compacto.
  - Card Público: pills de segmentos.
  - Card Período: 3 pills.
  - Card Canais permitidos: 5 chips multi-select.
  - CTA touch-friendly: **Calcular melhor audiência**.
- **Coluna esquerda — Resultado (fase `result`)**:
  - Tabela de audiência priorizada (3 linhas: faixa / clientes / propensão / canal recomendado / prioridade).
  - Grid 2×2 de cards de conclusão (audiência, conversão, canal, pressão).
  - Botão secundário **Explorar clientes priorizados** → abre painel drill-down com cliente mock (produto de maior propensão, canal, momento sugerido, top-3 fatores de score).
  - Botão de reset: **Nova simulação**.
- **Coluna direita — Como o modelo está pensando**:
  - 5 passos animados (mesmo componente visual dos demais):
    1. Lendo comportamento e histórico dos clientes
    2. Calculando propensão por cliente e produto
    3. Identificando o canal de maior resposta
    4. Aplicando elegibilidade e pressão comercial
    5. Priorizando audiência e régua de ativação
  - Ao terminar, pill: "Latência 62.4 ms · abaixo da média de mercado (~200 ms)".
  - Card **Insight — Por que recomendamos esta audiência** com o argumento contextualizado ao produto/segmento/canais escolhidos, no mesmo visual coral do Forecast.

**Editar `src/components/kiosk/SolutionDemoBlock.tsx**`

- Adicionar branch:
  ```
  if (solution.id === 'predictive-campaign-targeting') {
    return <PropensityCampaignDemo />;
  }
  ```
  (Sem prop `lang`, componente é PT-only.)

## Argumentações adicionais para o insight (varejo/CPG)

Pool rotativo em PT, adaptado ao contexto de varejo/CPG:

- "Clientes com aumento de 42% na frequência de compra da categoria nos últimos 30 dias e 3× mais engajamento com push segmentado."
- "Recência de compra abaixo de 21 dias combinada com histórico positivo de resposta pelo canal recomendado — janela ideal de reativação."
- "Score de propensão calibrado com backtest de 12 campanhas anteriores; segmento apresenta lift médio de 3.1× vs. base geral."
- "Sinais de intenção detectados: buscas recentes pela categoria, cliques em vitrine personalizada e permanência acima da média na página do produto."
- "Ticket médio crescente e afinidade forte com marcas premium da categoria — público qualificado para trade-up."
- "Público concentra 68% da conversão esperada com apenas 24% do custo de contato — priorização reduz CAC efetivo em 2.8×."
- "Elegibilidade cruzada com consentimento LGPD e pressão comercial abaixo do teto (2 contatos/7d) — aderência regulatória garantida."
- "Recorte exclui clientes em cool-down pós-campanha e reforça público com resposta positiva histórica ao canal e à categoria."
- "Sazonalidade favorável: categoria em pico de demanda e estoque adequado no CD regional — sem risco de ruptura pós-ativação."
- "Match de perfil com compradores conversores da última campanha similar (look-alike de 1º grau, cobertura de 74%)."

O componente escolhe 1–2 argumentos do pool de acordo com o produto selecionado.

## Detalhes técnicos

- Sem `KioskLang`; strings PT diretas.
- `latencyMs` = soma das durações + jitter determinístico por produto, sempre ≤ 80 ms.
- Estado local: `product`, `segment`, `period`, `channels[]`, `phase` ('setup' | 'thinking' | 'result'), `drillOpen`, `selectedRow`.
- Tokens visuais existentes: `#F4845F`, `bg-white/5`, `border-white/10`, tipografia em `vmin` para touch.
- 100% simulado, sem chamadas de rede.

## Fora de escopo

- Sem mudanças no quiz nem no `solutionSignalMap`.
- Sem alterações no ebook CTA ou nas métricas do kiosk.
- EN fica para depois, se você pedir.

Após aprovado, implemento os três arquivos e valido o build.
## Objetivo

Substituir as 2 perguntas atuais do i6 Signal na solução **Campanhas por Propensão** (`predictive-campaign-targeting`) por duas novas, específicas do contexto de campanhas — sem alterar o comportamento das outras soluções.

## Perguntas novas

1. **Propensão por produto agora**
   - Pergunta: *"Nesse momento, quais produtos teriam mais propensão de venda?"*
   - Resposta i6 Signal: análise executiva + **gráfico combinado** (barras = volume de clientes propensos; linha = % propensão média) para 5–6 produtos genéricos de varejo/serviços (diferentes dos usados na demo interativa da tela) + ações recomendadas.

2. **Clusters comportamentais para régua de campanha**
   - Pergunta: *"Defina o melhor cluster de comportamento de compra para que eu crie uma régua de campanha."*
   - Resposta i6 Signal: análise executiva + **tabela com 4 clusters** (nome, % da base, ticket médio, frequência, canal preferido, propensão) + **explicação de cada cluster** logo abaixo, com abordagem sugerida em produtos/campanhas + ações recomendadas.

## Escopo técnico

1. `src/data/signalDemo/content.ts`
   - Estender `Scenario` com `'propensity' | 'clusters'`.
   - Adicionar os dois blocos em `scenarios` para PT e EN (mesma estrutura de `label`, `question`, `title`, `analysis`, `actions`, e payload específico da visualização).
   - Produtos e clusters plausíveis, com dados fixos (determinísticos), estilo dos demais cenários. Sem sobreposição com o catálogo da demo interativa (`PropensityCampaignDemo`).

2. `src/data/kiosk/config.ts`
   - Atualizar `solutionSignalMap['predictive-campaign-targeting']` de `['comercial','pdv']` para `['propensity','clusters']`.
   - Atualizar o tipo do map para incluir os dois novos cenários.

3. `src/components/signalDemo/visualizations.tsx` (ou arquivo equivalente)
   - Novo `PropensityByProductChart`: recharts `ComposedChart` com `Bar` (clientes propensos) + `Line` (% propensão), eixos duplos, tooltip, legenda; segue paleta coral/navy do site.
   - Novo `BehaviorClustersTable`: tabela com colunas (Cluster, % base, ticket médio, frequência, canal, propensão) + bloco de descrição por cluster abaixo (título + parágrafo + "Como abordar").

4. `src/components/kiosk/KioskSignalIntelliboard.tsx` e `src/components/solutions/I6SignalDemo.tsx`
   - Adicionar branches de render para `activeScenario === 'propensity'` e `activeScenario === 'clusters'` usando os novos componentes. Nenhuma mudança de layout/espacamento — mesmo padrão dos cenários atuais.

## Fora de escopo

- Nenhuma alteração em outras soluções, na demo interativa `PropensityCampaignDemo`, em i18n do Kiosk ou em outras páginas.
- Sem novas dependências (recharts já está no projeto).

## Dados sugeridos (para revisão antes do build)

**Produtos (Q1)** — 6 itens: Tênis de Corrida, Cafeteira Espresso, Fone Bluetooth, Camiseta Dry-Fit, Ar-Condicionado Portátil, Assinatura Streaming Premium. Volumes 1.8k–6.4k; propensão 34–71%.

**Clusters (Q2)** — 4 grupos:
- *Compradores Frequentes de Alto Valor* (~12% da base, ticket alto, freq. alta, canal WhatsApp, propensão 78–88%).
- *Exploradores Sazonais* (~28%, ticket médio, freq. média, e-mail, 52–63%).
- *Sensíveis a Preço* (~34%, ticket baixo/médio, freq. média, push, 38–48%).
- *Dormentes com Potencial* (~26%, histórico relevante mas sem compra recente, e-mail + SMS reativação, 22–31%).

Se preferir outros produtos/nomes de cluster, ajuste antes de aprovar o plano.

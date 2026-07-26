// Shared content + types for the i6 Signal Intelliboard demo.
// Consumed by both /solutions (I6SignalDemo) and /kiosk (KioskSignalIntelliboard).

export type Scenario = 'supply' | 'forecast' | 'pricing' | 'comercial' | 'mix' | 'pdv' | 'propensity' | 'clusters';
export type Phase = 'idle' | 'typing' | 'responding';

export const TYPING_SPEED = 30;
export const RESPONSE_DELAY = 600;

export const signalDemoContent = {
  pt: {
    sectionTitle: '',
    sectionSubtitle: 'Clique em um tema abaixo e veja como sinais preditivos viram decisões que movem crescimento, margem e eficiência.',
    placeholder: 'Digite sua pergunta...',
    sidebar: ['Home', 'Ingestion Tokens', 'Recsys Tokens', 'Data Ingestion', 'i6 Signal', 'Widgets'],
    executiveAnalysis: 'Análise Executiva',
    recommendedActions: 'Ações Recomendadas',
    suggestedQuestions: 'Perguntas Sugeridas',
    emptyState: 'Qual insight preditivo vamos descobrir hoje?',
    scenarios: {
      supply: {
        label: 'Ruptura',
        question: 'Quais SKUs estão em risco de ruptura nos próximos 3 meses?',
        title: 'Análise de Risco de Ruptura — Próximo Trimestre',
        analysis: 'A projeção de demanda vs capacidade de reposição para os próximos 90 dias indica 5 SKUs com probabilidade elevada de ruptura. O SKU 44210 (Dipirona 500mg) lidera o risco (94%) devido à sazonalidade de outono e lead time de 22 dias do fornecedor principal. O impacto acumulado estimado é de R$ 510.000 em receita no trimestre caso nenhuma ação preventiva seja tomada.',
        table: {
          headers: ['SKU', 'Produto', 'Prob. Ruptura', 'Estoque (dias)'],
          rows: [
            ['44210', 'Dipirona 500mg 20cp', '94%', '18'],
            ['31087', 'Omeprazol 20mg 28cp', '87%', '24'],
            ['28901', 'Losartana 50mg 30cp', '72%', '38'],
            ['55432', 'Amoxicilina 500mg 21cp', '61%', '45'],
            ['19876', 'Metformina 850mg 30cp', '48%', '62'],
          ],
        },
        actions: [
          { bold: 'Renegociar contratos', text: 'com fornecedor do SKU 44210 — garantir lead time máximo de 15 dias e lote mínimo flexível para o trimestre.' },
          { bold: 'Ajustar forecast', text: 'dos SKUs 31087 e 28901 — incorporar curva sazonal de outono ao modelo de reposição.' },
          { bold: 'Revisar estoque de segurança', text: '— elevar cobertura mínima para 30 dias nos 5 SKUs críticos durante o próximo trimestre.' },
        ],
        questions: [
          'Qual o impacto financeiro acumulado das rupturas dos últimos 30 dias?',
          'Quais fornecedores apresentam maior variabilidade no lead time?',
          'Como redistribuir estoque entre CDs para cobrir a demanda regional?',
        ],
      },
      forecast: {
        label: 'Sazonalidade',
        question: 'Qual a sazonalidade e tendência do produto mais vendido para o último quarter?',
        title: 'Análise Mensal do Item Mais Vendido (ID: 28822)',
        analysis: 'O produto ID 28822 (Paracetamol 750mg) apresenta forte componente sazonal com pico em dezembro (+34% vs média). A tendência de longo prazo é de crescimento de 8,2% ao trimestre, impulsionada por expansão de cobertura em farmácias independentes. O modelo apresentou alta acurácia preditiva neste item, o que representa uma predição de alta confiabilidade para o planejamento comercial.',
        chartData: [
          { month: 'Out', seasonality: 12400, trend: 11800 },
          { month: 'Nov', seasonality: 14200, trend: 12600 },
          { month: 'Dez', seasonality: 18900, trend: 13400 },
        ],
        chartNote: 'O padrão sazonal indica aumento de 52% entre outubro e dezembro, consistente com os últimos 3 anos. A linha de tendência sugere que a base de consumo está se expandindo independentemente da sazonalidade.',
        actions: [
          { bold: 'Aumentar estoque de segurança', text: 'em 25% para novembro e 40% para dezembro, alinhado à curva sazonal.' },
          { bold: 'Planejar campanhas promocionais', text: 'para outubro, aproveitando o início da curva ascendente.' },
          { bold: 'Renegociar contratos', text: 'com fornecedores para volumes maiores no Q4, garantindo condições competitivas.' },
        ],
        questions: [
          'Como a sazonalidade varia por região (Sul vs Nordeste)?',
          'Qual o efeito de promoções na aceleração da curva sazonal?',
          'Existe canibalização com outros SKUs da mesma categoria?',
        ],
      },
      pricing: {
        label: 'Preço Ótimo',
        question: 'Qual o preço ótimo para o Ibuprofeno 400mg nesta região?',
        title: 'Otimização de Preço — Ibuprofeno 400mg (Região Sudeste)',
        analysis: 'A análise de elasticidade-preço para o Ibuprofeno 400mg na Região Sudeste indica que o preço atual de R$ 18,90 está 7% acima do ponto ótimo. A redução para R$ 17,50 maximizaria a margem de contribuição total, com aumento estimado de 12% no volume e ganho líquido de R$ 43.000/mês na região.',
        table: {
          headers: ['Indicador', 'Valor', 'Observação'],
          rows: [
            ['Preço Atual', 'R$ 18,90', 'Acima do ótimo'],
            ['Preço Ótimo', 'R$ 17,50', 'Maximiza margem total'],
            ['Elasticidade', '-1.34', 'Demanda elástica'],
            ['Ganho Estimado', '+R$ 43k/mês', '+12% volume'],
          ],
        },
        actions: [
          { bold: 'Implementar preço sugerido', text: 'de R$ 17,50 em fase piloto em 50 PDVs da Grande SP.' },
          { bold: 'Monitorar elasticidade cruzada', text: '— avaliar impacto em genéricos concorrentes.' },
          { bold: 'Teste A/B regional', text: '— comparar performance do novo preço vs atual durante 4 semanas.' },
        ],
        questions: [
          'Como a elasticidade varia entre canais (farma vs varejo)?',
          'Qual o preço ótimo para a Região Sul considerando a concorrência local?',
          'Existe oportunidade de bundling com outros produtos da linha?',
        ],
      },
      comercial: {
        label: 'Foco Comercial',
        question: 'Onde devo focar o esforço comercial este mês?',
        title: 'Priorização Comercial — Fevereiro 2026',
        analysis: 'A análise de potencial vs performance identificou 8 territórios com gap significativo de receita. Os 3 territórios prioritários concentram 62% do gap total (R$ 890k), com alta probabilidade de conversão baseada no histórico de resposta a ações comerciais similares.',
        comercialChart: [
          { territory: 'Grande BH', gap: 234, potential: 1200, score: 94 },
          { territory: 'Campinas', gap: 198, potential: 890, score: 89 },
          { territory: 'Curitiba', gap: 167, potential: 760, score: 85 },
          { territory: 'P. Alegre', gap: 145, potential: 680, score: 78 },
        ],
        actions: [
          { bold: 'Alocar representantes adicionais', text: 'para Grande BH, focando nos PDVs com maior gap individual.' },
          { bold: 'Campanha de incentivo', text: 'para Campinas com bonificação escalonada por faixa de crescimento.' },
          { bold: 'Visita executiva', text: 'aos maiores clientes de Curitiba para renegociar mix e share of shelf.' },
        ],
        questions: [
          'Qual o ROI histórico de ações comerciais em cada território?',
          'Quais produtos apresentam maior oportunidade de cross-sell?',
          'Como está a performance dos representantes vs quota individual?',
        ],
      },
      mix: {
        label: 'Mix / Sortimento',
        question: 'Qual mix ideal para a região Sul?',
        title: 'Otimização de Mix — Região Sul',
        analysis: 'A análise do mix atual vs recomendado para a Região Sul revela desalinhamento em 3 categorias principais. O mix atual sobre-indexa analgésicos (38% vs recomendado 29%) e sub-indexa anti-hipertensivos (12% vs recomendado 19%). O ajuste projetado impactaria em +R$ 312k/mês na margem de contribuição regional.',
        comparison: [
          { category: 'Analgésicos', current: '38%', recommended: '29%', direction: 'down' as const },
          { category: 'Anti-inflamatórios', current: '22%', recommended: '24%', direction: 'up' as const },
          { category: 'Anti-hipertensivos', current: '12%', recommended: '19%', direction: 'up' as const },
          { category: 'Antibióticos', current: '15%', recommended: '16%', direction: 'stable' as const },
          { category: 'Outros', current: '13%', recommended: '12%', direction: 'stable' as const },
        ],
        actions: [
          { bold: 'Reduzir exposição de analgésicos', text: 'em 9pp, redistribuindo espaço para anti-hipertensivos.' },
          { bold: 'Aumentar push comercial', text: 'de anti-hipertensivos com campanha médica direcionada.' },
          { bold: 'Revisar sortimento', text: 'de 120 PDVs da região para alinhar ao mix recomendado em 60 dias.' },
        ],
        questions: [
          'Qual o impacto do mix recomendado na rentabilidade por PDV?',
          'Como o mix ideal varia entre capital e interior?',
          'Quais SKUs específicos devem ser priorizados em anti-hipertensivos?',
        ],
      },
      pdv: {
        label: 'Compra / Recompra',
        question: 'Qual o comportamento de compra e recompra da Losartana Potássica 50mg na região de São Paulo?',
        title: 'Comportamento de Compra e Recompra — Losartana Potássica 50mg (São Paulo)',
        analysis: 'A análise de comportamento de PDV na região de São Paulo revela que a Losartana Potássica 50mg apresenta taxa de recompra crescente nos últimos 6 meses, passando de 62% em setembro para 78% em fevereiro. O ciclo médio de recompra é de 28 dias, alinhado à posologia padrão. Farmácias com programa de fidelidade apresentam taxa de recompra 15pp superior à média regional, indicando forte correlação entre ações de retenção e recorrência.',
        barChartData: [
          { month: 'Set', compra: 4200, recompra: 2600 },
          { month: 'Out', compra: 4500, recompra: 2950 },
          { month: 'Nov', compra: 4800, recompra: 3400 },
          { month: 'Dez', compra: 5100, recompra: 3750 },
          { month: 'Jan', compra: 5400, recompra: 4100 },
          { month: 'Fev', compra: 5700, recompra: 4450 },
        ],
        barChartNote: 'A taxa de recompra cresceu 18pp no período, sugerindo aumento da adesão ao tratamento e eficácia das ações de fidelização nos PDVs da região.',
        actions: [
          { bold: 'Expandir programa de fidelidade', text: 'para os 40 PDVs com menor taxa de recompra na região, replicando o modelo dos top performers.' },
          { bold: 'Criar alertas de reposição', text: 'automáticos para pacientes com ciclo de recompra > 35 dias, reduzindo abandono de tratamento.' },
          { bold: 'Campanha de adesão', text: 'junto a prescritores da região, reforçando a importância da continuidade terapêutica.' },
        ],
        questions: [
          'Qual a taxa de recompra por bandeira de farmácia na região?',
          'Como o preço impacta o ciclo de recompra da Losartana?',
          'Quais PDVs apresentam maior risco de perda de pacientes para genéricos concorrentes?',
        ],
      },
      propensity: {
        label: 'Propensão por Produto',
        question: 'Nesse momento, quais produtos teriam mais propensão de venda?',
        title: 'Produtos com Maior Propensão de Venda — Janela Atual',
        analysis: 'O modelo cruzou sinais de intenção (navegação, carrinho, recorrência), momento do ciclo de vida e contexto externo (clima, calendário promocional) para identificar 6 produtos com janela de conversão aberta agora. As barras representam o volume de clientes propensos e a linha representa a propensão média por produto. O topo do ranking concentra 58% do potencial de conversão da janela, com destaque para Tênis de Corrida e Fone Bluetooth TWS, que combinam alto volume propenso com propensão média acima de 60%.',
        productChart: [
          { product: 'Tênis de Corrida', customers: 6420, propensity: 71 },
          { product: 'Fone Bluetooth TWS', customers: 5180, propensity: 64 },
          { product: 'Cafeteira Espresso', customers: 3940, propensity: 58 },
          { product: 'Camiseta Dry-Fit', customers: 3210, propensity: 49 },
          { product: 'Ar-Cond. Portátil', customers: 2470, propensity: 42 },
          { product: 'Streaming Premium', customers: 1830, propensity: 34 },
        ],
        productChartNote: 'Barras = clientes propensos na janela atual (7 dias). Linha = propensão média (%). O corte de propensão >55% concentra 71% do potencial de receita da janela.',
        actions: [
          { bold: 'Ativar campanha agora', text: 'para os 3 produtos do topo — a janela de conversão fecha em 5–7 dias segundo o modelo.' },
          { bold: 'Reservar estoque preditivo', text: 'nos CDs regionais para Tênis de Corrida e Fone Bluetooth, evitando ruptura no pico de conversão.' },
          { bold: 'Cross-sell orquestrado', text: 'combinando Tênis + Camiseta Dry-Fit e Cafeteira + Streaming Premium com desconto progressivo.' },
        ],
        questions: [
          'Qual o ticket médio esperado por produto na janela atual?',
          'Como varia a propensão entre novos clientes e recorrentes?',
          'Quais produtos têm maior risco de canibalização na cesta?',
        ],
      },
      clusters: {
        label: 'Clusters de Comportamento',
        question: 'Defina o melhor cluster de comportamento de compra para que eu crie uma régua de campanha.',
        title: 'Clusters Comportamentais — Base Ativa para Régua de Campanha',
        analysis: 'A base ativa foi segmentada em 4 clusters comportamentais a partir de sinais preditivos de recência, frequência, ticket, sensibilidade a preço e resposta a canais. Cada cluster tem uma régua de campanha própria — ritmo, canal e oferta — para maximizar engajamento e conversão sem sobreposição de contato.',
        clustersTable: {
          headers: ['Cluster', '% Base', 'Ticket Médio', 'Frequência', 'Canal Preferido', 'Propensão'],
          rows: [
            ['Alto Valor Recorrente', '12%', 'R$ 480', 'Alta (2x/mês)', 'WhatsApp', '84%'],
            ['Explorador Sazonal', '28%', 'R$ 210', 'Média (1x/mês)', 'E-mail', '58%'],
            ['Sensível a Preço', '34%', 'R$ 95', 'Média (1x/mês)', 'Push', '43%'],
            ['Dormente c/ Potencial', '26%', 'R$ 170', 'Baixa (>90 dias)', 'E-mail + SMS', '27%'],
          ],
        },
        clustersDetail: [
          {
            name: 'Alto Valor Recorrente',
            description: 'Clientes fiéis, ticket alto e frequência elevada. Já compraram nos últimos 30 dias e respondem bem a exclusividade.',
            approach: 'Régua premium: novidades em pré-venda, benefícios de assinatura e curadoria personalizada via WhatsApp 1:1. Evitar descontos genéricos — proteger margem.',
          },
          {
            name: 'Explorador Sazonal',
            description: 'Compra concentrada em momentos-chave (datas, coleções, lançamentos). Alta abertura de e-mail e engajamento em conteúdo editorial.',
            approach: 'Régua temática: campanhas por evento/coleção com storytelling, bundles temáticos e recomendação preditiva de próximo produto por afinidade.',
          },
          {
            name: 'Sensível a Preço',
            description: 'Reage fortemente a descontos e frete grátis. Ticket menor, mas alta reação a push em janelas curtas de oferta.',
            approach: 'Régua de conversão rápida: push com contador de urgência, cupom escalonado por valor de cesta e frete grátis a partir de threshold otimizado.',
          },
          {
            name: 'Dormente com Potencial',
            description: 'Histórico relevante de compra, mas sem atividade recente. Modelo identifica sinal de retorno (busca, e-mail aberto, visita reincidente).',
            approach: 'Régua de reativação: e-mail com prova social + SMS com oferta de retorno personalizada. Cadência escalonada (D+0, D+3, D+7) antes de rebaixar para nutrição.',
          },
        ],
        actions: [
          { bold: 'Priorizar Alto Valor Recorrente', text: 'com régua premium — protege margem e sustenta LTV da base.' },
          { bold: 'Escalar Explorador Sazonal', text: 'no próximo evento comercial — maior ganho marginal de receita por contato.' },
          { bold: 'Reativar Dormentes agora', text: '— janela de retorno detectada; postergar reduz taxa de reativação em ~40%.' },
        ],
        questions: [
          'Qual o LTV projetado por cluster nos próximos 12 meses?',
          'Como evitar sobreposição de contato entre réguas?',
          'Qual cluster tem maior migração positiva (upgrade de valor)?',
        ],
      },
    },
  },
  en: {
    sectionTitle: '',
    sectionSubtitle: 'Click a topic below and see how predictive signals become decisions that drive growth, margin and efficiency.',
    placeholder: 'Type your question...',
    sidebar: ['Home', 'Ingestion Tokens', 'Recsys Tokens', 'Data Ingestion', 'i6 Signal', 'Widgets'],
    executiveAnalysis: 'Executive Analysis',
    recommendedActions: 'Recommended Actions',
    suggestedQuestions: 'Suggested Questions',
    emptyState: 'What predictive insight shall we discover today?',
    scenarios: {
      supply: {
        label: 'Stockout',
        question: 'Which SKUs are at risk of stockout in the next 3 months?',
        title: 'Stockout Risk Analysis — Next Quarter',
        analysis: 'Demand projection vs replenishment capacity for the next 90 days indicates 5 SKUs with elevated stockout probability. SKU 44210 (Dipyrone 500mg) leads the risk (94%) due to autumn seasonality and 22-day lead time from the primary supplier. The estimated cumulative impact is $102,000 in quarterly revenue if no preventive action is taken.',
        table: {
          headers: ['SKU', 'Product', 'Stockout Prob.', 'Stock (days)'],
          rows: [
            ['44210', 'Dipyrone 500mg 20ct', '94%', '18'],
            ['31087', 'Omeprazole 20mg 28ct', '87%', '24'],
            ['28901', 'Losartan 50mg 30ct', '72%', '38'],
            ['55432', 'Amoxicillin 500mg 21ct', '61%', '45'],
            ['19876', 'Metformin 850mg 30ct', '48%', '62'],
          ],
        },
        actions: [
          { bold: 'Renegotiate contracts', text: 'with SKU 44210 supplier — secure max 15-day lead time and flexible minimum lot for the quarter.' },
          { bold: 'Adjust forecast', text: 'for SKUs 31087 and 28901 — incorporate autumn seasonal curve into replenishment model.' },
          { bold: 'Review safety stock', text: '— raise minimum coverage to 30 days for the 5 critical SKUs during the next quarter.' },
        ],
        questions: [
          'What is the accumulated financial impact of stockouts in the last 30 days?',
          'Which suppliers show the highest lead time variability?',
          'How to redistribute inventory across DCs to cover regional demand?',
        ],
      },
      forecast: {
        label: 'Seasonality',
        question: 'What is the seasonality and trend of the best-selling product for the last quarter?',
        title: 'Monthly Analysis of Best-Selling Item (ID: 28822)',
        analysis: 'Product ID 28822 (Paracetamol 750mg) shows a strong seasonal component with a peak in December (+34% vs average). The long-term trend shows 8.2% growth per quarter, driven by coverage expansion in independent pharmacies. The model showed high predictive accuracy for this item, representing a highly reliable prediction for commercial planning.',
        chartData: [
          { month: 'Oct', seasonality: 12400, trend: 11800 },
          { month: 'Nov', seasonality: 14200, trend: 12600 },
          { month: 'Dec', seasonality: 18900, trend: 13400 },
        ],
        chartNote: 'The seasonal pattern indicates a 52% increase between October and December, consistent with the last 3 years. The trend line suggests the consumption base is expanding independently of seasonality.',
        actions: [
          { bold: 'Increase safety stock', text: 'by 25% for November and 40% for December, aligned with the seasonal curve.' },
          { bold: 'Plan promotional campaigns', text: 'for October, leveraging the start of the ascending curve.' },
          { bold: 'Renegotiate contracts', text: 'with suppliers for larger Q4 volumes, securing competitive conditions.' },
        ],
        questions: [
          'How does seasonality vary by region (East Coast vs West Coast)?',
          'What is the effect of promotions on seasonal curve acceleration?',
          'Is there cannibalization with other SKUs in the same category?',
        ],
      },
      pricing: {
        label: 'Optimal Price',
        question: 'What is the optimal price for Ibuprofen 400mg in this region?',
        title: 'Price Optimization — Ibuprofen 400mg (Northeast Region)',
        analysis: 'Price elasticity analysis for Ibuprofen 400mg in the Northeast Region indicates the current price of $3.80 is 7% above the optimal point. Reducing to $3.50 would maximize total contribution margin, with an estimated 12% volume increase and net gain of $8,600/month in the region.',
        table: {
          headers: ['Indicator', 'Value', 'Note'],
          rows: [
            ['Current Price', '$3.80', 'Above optimal'],
            ['Optimal Price', '$3.50', 'Maximizes total margin'],
            ['Elasticity', '-1.34', 'Elastic demand'],
            ['Est. Gain', '+$8.6k/mo', '+12% volume'],
          ],
        },
        actions: [
          { bold: 'Implement suggested price', text: 'of $3.50 in a pilot phase across 50 POS in the metro area.' },
          { bold: 'Monitor cross-elasticity', text: '— assess impact on competing generics.' },
          { bold: 'Regional A/B test', text: '— compare new price vs current performance over 4 weeks.' },
        ],
        questions: [
          'How does elasticity vary across channels (pharma vs retail)?',
          'What is the optimal price for the West Coast considering local competition?',
          'Is there a bundling opportunity with other products in the line?',
        ],
      },
      comercial: {
        label: 'Commercial Focus',
        question: 'Where should I focus commercial efforts this month?',
        title: 'Commercial Prioritization — February 2026',
        analysis: 'Potential vs performance analysis identified 8 territories with significant revenue gaps. The top 3 priority territories concentrate 62% of the total gap ($178k), with high conversion probability based on historical response to similar commercial actions.',
        comercialChart: [
          { territory: 'New York', gap: 47, potential: 240, score: 94 },
          { territory: 'Chicago', gap: 40, potential: 178, score: 89 },
          { territory: 'Los Angeles', gap: 33, potential: 152, score: 85 },
          { territory: 'Miami', gap: 29, potential: 136, score: 78 },
        ],
        actions: [
          { bold: 'Allocate additional reps', text: 'to New York, focusing on the POS with the largest individual gap.' },
          { bold: 'Incentive campaign', text: 'for Chicago with scaled bonus by growth tier.' },
          { bold: 'Executive visit', text: 'to the top clients in Los Angeles to renegotiate mix and share of shelf.' },
        ],
        questions: [
          'What is the historical ROI of commercial actions in each territory?',
          'Which products present the best cross-sell opportunity?',
          'How is rep performance vs individual quota?',
        ],
      },
      mix: {
        label: 'Mix / Assortment',
        question: 'What is the ideal mix for the West Coast?',
        title: 'Mix Optimization — West Coast',
        analysis: 'Analysis of current vs recommended mix for the West Coast reveals misalignment in 3 key categories. The current mix over-indexes analgesics (38% vs recommended 29%) and under-indexes antihypertensives (12% vs recommended 19%). The projected adjustment would impact +$62k/month in regional contribution margin.',
        comparison: [
          { category: 'Analgesics', current: '38%', recommended: '29%', direction: 'down' as const },
          { category: 'Anti-inflammatories', current: '22%', recommended: '24%', direction: 'up' as const },
          { category: 'Antihypertensives', current: '12%', recommended: '19%', direction: 'up' as const },
          { category: 'Antibiotics', current: '15%', recommended: '16%', direction: 'stable' as const },
          { category: 'Others', current: '13%', recommended: '12%', direction: 'stable' as const },
        ],
        actions: [
          { bold: 'Reduce analgesic exposure', text: 'by 9pp, redistributing shelf space to antihypertensives.' },
          { bold: 'Increase commercial push', text: 'for antihypertensives with a targeted medical campaign.' },
          { bold: 'Review assortment', text: 'across 120 POS in the region to align with the recommended mix within 60 days.' },
        ],
        questions: [
          'What is the recommended mix impact on per-POS profitability?',
          'How does the ideal mix vary between metro and rural areas?',
          'Which specific SKUs should be prioritized in antihypertensives?',
        ],
      },
      pdv: {
        label: 'Purchase / Repurchase',
        question: 'What is the purchase and repurchase behavior of Losartan Potassium 50mg in the Greater New York area?',
        title: 'Purchase & Repurchase Behavior — Losartan Potassium 50mg (Greater New York)',
        analysis: 'POS behavior analysis in the Greater New York area reveals that Losartan Potassium 50mg shows an increasing repurchase rate over the past 6 months, rising from 62% in September to 78% in February. The average repurchase cycle is 28 days, aligned with standard dosing. Pharmacies with loyalty programs show a repurchase rate 15pp above the regional average, indicating a strong correlation between retention actions and recurrence.',
        barChartData: [
          { month: 'Sep', compra: 4200, recompra: 2600 },
          { month: 'Oct', compra: 4500, recompra: 2950 },
          { month: 'Nov', compra: 4800, recompra: 3400 },
          { month: 'Dec', compra: 5100, recompra: 3750 },
          { month: 'Jan', compra: 5400, recompra: 4100 },
          { month: 'Feb', compra: 5700, recompra: 4450 },
        ],
        barChartNote: 'The repurchase rate grew 18pp over the period, suggesting increased treatment adherence and effectiveness of loyalty actions at regional POS.',
        actions: [
          { bold: 'Expand loyalty program', text: 'to the 40 POS with the lowest repurchase rate in the region, replicating the top performers model.' },
          { bold: 'Create automatic replenishment alerts', text: 'for patients with repurchase cycles > 35 days, reducing treatment abandonment.' },
          { bold: 'Adherence campaign', text: 'with regional prescribers, reinforcing the importance of treatment continuity.' },
        ],
        questions: [
          'What is the repurchase rate by pharmacy chain in the region?',
          'How does pricing impact the Losartan repurchase cycle?',
          'Which POS show the highest risk of losing patients to competing generics?',
        ],
      },
    },
  },
};

export type SignalLang = keyof typeof signalDemoContent;

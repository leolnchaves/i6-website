// Copy da nova página /pt/solutions-v2. Todas as ocorrências de "i6" foram
// escritas como "infinity6" conforme solicitado.

export type TerritoryId = 'growth' | 'planning' | 'pricing';

export interface LeanSolution {
  id: string;
  territory: TerritoryId;
  title: string;
  tagline: string;
  description?: string;
  resolve: string;
  entrega: string;
  impacto: string;
}

export interface Territory {
  id: TerritoryId;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  chips: string[];
}

export const solutionsV2Content = {
  hero: {
    eyebrow: 'Soluções',
    title: 'IA aplicada para prever demanda, recomendar decisões e capturar crescimento com precisão.',
    subtitle:
      'A infinity6 transforma dados de clientes, produtos, canais, PDVs, estoque e preço em decisões preditivas para aumentar receita, proteger margem e reduzir desperdício operacional.',
    ctaLabel: 'Ver cases de sucesso',
    ctaHref: '/success-stories',
  },
  territories: [
    {
      id: 'growth',
      eyebrow: 'Território 1',
      title: 'Growth & Customer Intelligence',
      tagline: 'Venda mais para clientes, visitantes e canais com maior propensão de conversão.',
      description:
        'Quando todo cliente recebe a mesma oferta, a empresa desperdiça mídia, CRM, força comercial e oportunidade de receita. A infinity6 antecipa intenção, próxima melhor oferta e produtos com maior potencial de conversão.',
      chips: ['Predictive Personalization', 'Smart Discovery', 'Predictive Campaign Targeting'],
    },
    {
      id: 'planning',
      eyebrow: 'Território 2',
      title: 'Demand, Supply & Commercial Planning',
      tagline: 'Planeje melhor, venda melhor e reduza desperdício operacional.',
      description:
        'Empresas perdem receita quando planejam demanda, metas, sortimento e pedidos com base apenas em histórico, média ou pressão comercial. A infinity6 transforma sinais de mercado, comportamento, estoque, sell-out e canal em decisões preditivas para orientar a operação.',
      chips: ['Demand Forecasting', 'Metas Comerciais Preditivas', 'Recomendação de Mix e Pedido Ideal', 'Assortment Optimization'],
    },
    {
      id: 'pricing',
      eyebrow: 'Território 3',
      title: 'Pricing & Margin Intelligence',
      tagline: 'Ajuste preço ao movimento real de mercado, cliente, estoque e margem.',
      description:
        'Preço não é tabela. É uma alavanca direta de margem, giro e conversão. A infinity6 transforma elasticidade, forecast, concorrência, estoque, demanda e comportamento em recomendações de preço dinâmicas, mensuráveis e governadas.',
      chips: ['Price-to-Margin', 'Price-to-Turnover', 'Price-to-Conversion'],
    },
  ] as Territory[],
  solutions: [
    // Growth & Customer Intelligence
    {
      id: 'predictive-personalization',
      territory: 'growth',
      title: 'Predictive Personalization',
      tagline: 'Antecipe a próxima melhor oferta para cada cliente.',
      resolve: 'CRM genérico, baixa conversão e desperdício de acionamento.',
      entrega: 'NBA, NBO, cross-sell, up-sell e reativação.',
      impacto: 'Maior LTV, mais frequência de compra e melhor eficiência comercial.',
    },
    {
      id: 'smart-discovery',
      territory: 'growth',
      title: 'Smart Discovery',
      tagline: 'Transforme tráfego anônimo em receita incremental.',
      resolve: 'Visitantes anônimos tratados como ruído.',
      entrega: 'Recomendação contextual em tempo real, mesmo antes da identificação.',
      impacto: 'Mais conversão sem aumentar investimento em aquisição.',
    },
    {
      id: 'predictive-campaign-targeting',
      territory: 'growth',
      title: 'Predictive Campaign Targeting',
      tagline: 'Ative os clientes certos, com mais precisão, mais resultado e menos custo.',
      resolve: 'Campanhas amplas, caras e pouco eficientes.',
      entrega: 'Score de propensão, audiência priorizada e régua de ativação.',
      impacto: 'Maior conversão, menor CAC e ROI de marketing mais mensurável.',
    },
    // Demand, Supply & Commercial Planning
    {
      id: 'demand-forecasting',
      territory: 'planning',
      title: 'Demand Forecasting',
      tagline: 'Antecipe demanda antes da ruptura, do excesso ou da perda de venda.',
      resolve: 'Forecast médio demais para uma operação granular.',
      entrega: 'Previsão de demanda por SKU, loja, PDV, canal, região ou cliente.',
      impacto: 'Maior acurácia, menos ruptura, menos excesso e melhor planejamento de supply.',
    },
    {
      id: 'predictive-commercial-targets',
      territory: 'planning',
      title: 'Metas Comerciais Preditivas',
      tagline: 'Defina metas com base em potencial real de demanda, não apenas histórico ou pressão comercial.',
      resolve: 'Metas top-down desconectadas do potencial real do mercado.',
      entrega: 'Metas sugeridas por território, carteira, canal, SKU ou PDV.',
      impacto: 'Melhor alocação de esforço comercial, menos distorção de incentivo e maior previsibilidade de receita.',
    },
    {
      id: 'mix-assortment-order',
      territory: 'planning',
      title: 'Mix, Sortimento e Pedido Ideal',
      tagline: 'Recomende o produto certo, no lugar certo e na quantidade certa.',
      description:
        'A infinity6 identifica o melhor mix por loja, PDV, região, cluster ou cliente e recomenda pedidos com maior potencial de venda, giro e margem.',
      resolve: 'Sortimento padronizado, pedidos baseados em média, feeling ou repetição histórica e baixa aderência ao comportamento real de cada ponto de venda.',
      entrega: 'Recomendação de mix, inclusão ou substituição de SKUs, quantidade sugerida, pedido incremental e próxima melhor ação comercial.',
      impacto: 'Maior ticket, mais positivação de produtos, melhor giro, menos ruptura e menos estoque parado.',
    },
    // Pricing & Margin Intelligence
    {
      id: 'price-to-margin',
      territory: 'pricing',
      title: 'Price-to-Margin',
      tagline: 'Capture margem por SKU sem romper governança comercial.',
      resolve: 'SKUs com elasticidade, estoque e pressão competitiva diferentes tratados da mesma forma.',
      entrega: 'Preço ótimo, intervalo de confiança e cenários alternativos.',
      impacto: 'Mais margem capturada, maior controle comercial e melhor resultado por SKU.',
    },
    {
      id: 'price-to-turnover',
      territory: 'pricing',
      title: 'Price-to-Turnover',
      tagline: 'Acelere giro sem destruir margem.',
      resolve: 'Estoque parado, markdown tardio e margem corroída.',
      entrega: 'Preço recomendado e markdown progressivo por loja, região ou cluster.',
      impacto: 'Mais giro com rentabilidade, menos estoque envelhecido e capital mais eficiente.',
    },
    {
      id: 'price-to-conversion',
      territory: 'pricing',
      title: 'Price-to-Conversion',
      tagline: 'Maximize conversão e receita por sessão com governança de margem.',
      resolve: 'Sessões com intenções diferentes recebendo o mesmo preço.',
      entrega: 'Preço contextual por sessão, respeitando margem mínima e política comercial.',
      impacto: 'Mais conversão, mais receita por sessão e melhor captura de margem.',
    },
  ] as LeanSolution[],
  signal: {
    eyebrow: 'Camada transversal',
    title: 'i6 Signal',
    tagline: 'A camada conversacional que transforma predição em decisão.',
    description:
      'O i6 Signal conecta os sinais preditivos da infinity6 aos times de negócio, permitindo entender rapidamente onde agir, por que agir e qual impacto esperado.',
    examplesTitle: 'Exemplos de sinais',
    examples: [
      'SKU com alto risco de ruptura.',
      'Cliente com alta propensão de recompra.',
      'PDV com oportunidade de pedido adicional.',
      'Produto com margem abaixo do potencial.',
      'Cluster com necessidade de markdown.',
      'Campanha com audiência prioritária.',
      'Meta comercial desalinhada ao potencial real.',
    ],
  },
  howWeImplement: {
    eyebrow: 'Como implementamos',
    title: 'Validação antes da escala. Resultado antes do discurso.',
    steps: [
      {
        n: '01',
        title: 'Ingestão dos dados',
        description: 'Integramos dados comerciais, transacionais, comportamentais, operacionais e externos, sem necessidade de dados sensíveis (dados anonimizados na origem).',
      },
      {
        n: '02',
        title: 'Modelagem e Fine-tuning',
        description: 'Modelamos os motores proprietários ao contexto do cliente, segmento, canal, produto e objetivo de negócio.',
      },
      {
        n: '03',
        title: 'Backtest',
        description: 'Comparamos recomendação preditiva contra resultado real antes da ativação, para dar clareza do potencial dos resultados preditivos antes mesmo das integrações.',
      },
      {
        n: '04',
        title: 'Ativação',
        description: 'Entregamos os outputs preditivos por API, lake-to-lake, arquivos operacionais, plugins para ERP e CRM, ou widgets embarcáveis. Também habilitamos o i6Signal como camada conversacional, usando os aprendizados comportamentais dos modelos para transformar predição em decisão acionável.',
      },
      {
        n: '05',
        title: 'Aprendizado contínuo',
        description: 'Recalibramos modelos conforme demanda, estoque, preço, comportamento e resposta comercial evoluem.',
      },
    ],
    footer: 'IA aplicada para capturar valor onde a operação ainda decide tarde demais.',
  },
  summary: {
    eyebrow: 'Em resumo',
    title: 'A infinity6 ajuda empresas a:',
    bullets: [
      'Prever demanda com mais precisão.',
      'Definir metas comerciais mais inteligentes.',
      'Recomendar mix e pedido ideal por cliente ou PDV.',
      'Priorizar campanhas por propensão real.',
      'Personalizar ofertas em tempo real.',
      'Otimizar preço por margem, giro e conversão.',
      'Reduzir ruptura, excesso, CAC, desperdício comercial e margem deixada na mesa.',
    ],
  },
};

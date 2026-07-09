// Copy da página /solutions (PT + EN). Todas as ocorrências de "i6" foram
// escritas como "infinity6" conforme solicitado.
import type { Language } from '@/types/language';

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

export interface SolutionsV2Content {
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  territoriesBlock: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaLabel: string;
  };
  labels: {
    resolve: string;
    entrega: string;
    impacto: string;
  };
  territories: Territory[];
  solutions: LeanSolution[];
  signal: {
    eyebrow: string;
    title: string;
    tagline: string;
    description: string;
    examplesTitle: string;
    examples: string[];
  };
  howWeImplement: {
    eyebrow: string;
    title: string;
    costNote: string;
    steps: { n: string; title: string; description: string }[];
  };
  summary: {
    eyebrow: string;
    title: string;
    bullets: string[];
  };
}

const pt: SolutionsV2Content = {
  hero: {
    eyebrow: 'Soluções',
    titleBefore: 'IA aplicada para prever demanda, recomendar decisões e ',
    titleHighlight: 'capturar crescimento',
    titleAfter: ' com precisão.',
    subtitle:
      'Transformamos dados de clientes, produtos, canais, PDVs, estoque e preço em decisões preditivas para aumentar receita, proteger margem e reduzir desperdício operacional.',
    ctaLabel: 'Ver cases de sucesso',
    ctaHref: '/success-stories',
  },
  territoriesBlock: {
    eyebrow: 'Onde a predição vira resultado',
    title: 'Alavancas Preditivas de Valor',
    intro:
      'Organizamos nossas soluções em frentes de impacto, orientadas exatamente para onde as operações precisam capturar resultado.',
    ctaLabel: 'Ver as soluções desta alavanca',
  },
  labels: {
    resolve: 'Resolve',
    entrega: 'Entrega',
    impacto: 'Impacto',
  },
  territories: [
    {
      id: 'growth',
      eyebrow: 'Alavanca Preditiva de Valor',
      title: 'Crescimento & Inteligência de Consumidor',
      tagline: 'Venda mais para clientes, visitantes e canais com maior propensão de conversão.',
      description:
        'Quando todo cliente recebe a mesma oferta, a empresa desperdiça mídia, CRM, força comercial e oportunidade de receita. Nós antecipamos intenção, a próxima melhor oferta e quais produtos têm maior potencial de conversão.',
      chips: ['Personalização Preditiva', 'Descoberta Preditiva', 'Campanhas por Propensão'],
    },
    {
      id: 'planning',
      eyebrow: 'Alavanca Preditiva de Valor',
      title: 'Demanda, Distribuição e Planejamento Comercial',
      tagline: 'Planeje melhor, venda melhor e reduza desperdício operacional.',
      description:
        'Empresas perdem receita quando planejam demanda, metas, sortimento e pedidos com base apenas em histórico, média ou pressão comercial. Transformamos sinais de mercado, comportamento, estoque, sell-out e canal em decisões preditivas para orientar a operação com extrema eficiência.',
      chips: ['Forecast Preditivo de Demanda', 'Metas Comerciais Preditivas', 'Mix, Sortimento e Pedido Ideal'],
    },
    {
      id: 'pricing',
      eyebrow: 'Alavanca Preditiva de Valor',
      title: 'Precificação e Inteligência de Margem',
      tagline: 'Ajuste preço ao movimento real de mercado, cliente, estoque e margem.',
      description:
        'Preço não é tabela. É uma alavanca direta de margem, giro e conversão. Nós transformamos elasticidade, forecast, concorrência, estoque, demanda e comportamento em recomendações de preço dinâmicas, mensuráveis e governadas.',
      chips: ['Preço Orientado à Margem', 'Preço Orientado ao Giro', 'Preço Orientado à Conversão'],
    },
  ],
  solutions: [
    {
      id: 'predictive-personalization',
      territory: 'growth',
      title: 'Personalização Preditiva',
      tagline: 'Antecipe a próxima melhor oferta para cada cliente.',
      resolve: 'CRM genérico, baixa conversão e desperdício de acionamento.',
      entrega: 'NBA, NBO, cross-sell, up-sell e reativação.',
      impacto: 'Maior LTV, mais frequência de compra e melhor eficiência comercial.',
    },
    {
      id: 'smart-discovery',
      territory: 'growth',
      title: 'Descoberta Preditiva',
      tagline: 'Transforme tráfego anônimo em receita incremental.',
      resolve: 'Visitantes anônimos tratados como ruído.',
      entrega: 'Recomendação contextual em tempo real, mesmo antes da identificação.',
      impacto: 'Mais conversão sem aumentar investimento em aquisição.',
    },
    {
      id: 'predictive-campaign-targeting',
      territory: 'growth',
      title: 'Campanhas por Propensão',
      tagline: 'Ative os clientes certos, com mais precisão, mais resultado e menos custo.',
      resolve: 'Campanhas amplas, caras e pouco eficientes.',
      entrega: 'Score de propensão, audiência priorizada e régua de ativação.',
      impacto: 'Maior conversão, menor CAC e ROI de marketing mais mensurável.',
    },
    {
      id: 'demand-forecasting',
      territory: 'planning',
      title: 'Forecast Preditivo de Demanda',
      tagline: 'Antecipe demanda antes da ruptura, do excesso ou da perda de venda.',
      resolve: 'Forecast médio demais para uma operação granular.',
      entrega: 'Previsão de demanda por SKU, loja, PDV, canal, região ou cliente.',
      impacto: 'Maior acurácia, menos ruptura, menos excesso e melhor planejamento de supply.',
    },
    {
      id: 'predictive-commercial-targets',
      territory: 'planning',
      title: 'Metas Comerciais Preditivas',
      tagline:
        'Defina metas com base em potencial real de demanda, não apenas histórico ou pressão comercial.',
      resolve: 'Metas top-down desconectadas do potencial real do mercado.',
      entrega: 'Metas sugeridas por território, carteira, canal, SKU ou PDV.',
      impacto:
        'Melhor alocação de esforço comercial, menos distorção de incentivo e maior previsibilidade de receita.',
    },
    {
      id: 'mix-assortment-order',
      territory: 'planning',
      title: 'Mix, Sortimento e Pedido Ideal',
      tagline:
        'Recomende o mix certo e o pedido ideal por loja, PDV, região, cluster ou cliente.',
      resolve:
        'Sortimento padronizado e pedidos baseados em média, feeling ou repetição histórica.',
      entrega:
        'Mix ideal, inclusão ou substituição de SKUs, volume sugerido, pedido incremental e próxima ação comercial.',
      impacto:
        'Maior ticket, mais positivação de produtos, melhor giro, menos ruptura e menos estoque parado.',
    },
    {
      id: 'price-to-margin',
      territory: 'pricing',
      title: 'Preço Orientado à Margem',
      tagline: 'Capture margem por SKU sem romper governança comercial.',
      resolve:
        'SKUs com elasticidade, estoque e pressão competitiva diferentes tratados da mesma forma.',
      entrega: 'Preço ótimo, intervalo de confiança e cenários alternativos.',
      impacto: 'Mais margem capturada, maior controle comercial e melhor resultado por SKU.',
    },
    {
      id: 'price-to-turnover',
      territory: 'pricing',
      title: 'Preço Orientado ao Giro',
      tagline: 'Acelere giro sem destruir margem.',
      resolve: 'Estoque parado, markdown tardio e margem corroída.',
      entrega: 'Preço recomendado e markdown progressivo por loja, região ou cluster.',
      impacto: 'Mais giro com rentabilidade, menos estoque envelhecido e capital mais eficiente.',
    },
    {
      id: 'price-to-conversion',
      territory: 'pricing',
      title: 'Preço Orientado à Conversão',
      tagline: 'Maximize conversão e receita por sessão com governança de margem.',
      resolve: 'Sessões com intenções diferentes recebendo o mesmo preço.',
      entrega: 'Preço contextual por sessão, respeitando margem mínima e política comercial.',
      impacto: 'Mais conversão, mais receita por sessão e melhor captura de margem.',
    },
  ],
  signal: {
    eyebrow: 'Camada transversal',
    title: 'i6 Signal',
    tagline: 'A camada conversacional que transforma predição em decisão.',
    description:
      'O i6 Signal conecta os sinais preditivos dos modelos aos times de negócio, permitindo entender rapidamente onde agir, por que agir e qual impacto esperado.',
    examplesTitle: 'Exemplos de sinais',
    examples: [
      'SKU com alto risco de ruptura.',
      'Cliente com alta propensão de recompra.',
      'PDV com oportunidade de pedido adicional.',
      'Produto com margem abaixo do potencial.',
      'Cliente com alta propensão de cross-sell.',
      'Cluster com necessidade de markdown.',
      'Meta comercial desalinhada ao potencial real.',
      'SKU com demanda prevista fora do mix atual.',
      'Campanha com audiência prioritária.',
    ],
  },
  howWeImplement: {
    eyebrow: 'Como implementamos',
    title: 'Validação antes da escala. Resultado antes do discurso.',
    costNote:
      'Custo zero até o Backtest. Você só avança com validação do potencial de resultado.',
    steps: [
      {
        n: '01',
        title: 'Ingestão dos dados',
        description:
          'Integramos dados comerciais, transacionais, comportamentais, operacionais e externos, com anonimização na origem e sem necessidade de dados sensíveis.',
      },
      {
        n: '02',
        title: 'Modelagem IA',
        description:
          'Ajustamos os motores proprietários ao contexto do cliente, segmento, canal, produto e objetivo de negócio.',
      },
      {
        n: '03',
        title: 'Backtest',
        description:
          'Comparamos recomendações preditivas com resultados reais antes da ativação, validando impacto potencial, aderência operacional e clareza para escala.',
      },
      {
        n: '04',
        title: 'Piloto / Ativação',
        description:
          'Entregamos outputs por API, lake-to-lake, arquivos operacionais, plugins para ERP/CRM ou widgets, com i6Signal para consulta, explicação e ativação dos sinais.',
      },
      {
        n: '05',
        title: 'Aprendizado contínuo',
        description:
          'Recalibramos os modelos conforme demanda, estoque, preço, comportamento e resposta comercial evoluem, mantendo os sinais atualizados e acionáveis.',
      },
    ],
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

const en: SolutionsV2Content = {
  hero: {
    eyebrow: 'Solutions',
    titleBefore: 'AI applied to forecast demand, recommend decisions and ',
    titleHighlight: 'capture growth',
    titleAfter: ' with precision.',
    subtitle:
      'We turn customer, product, channel, POS, inventory and price data into predictive decisions that increase revenue, protect margin and reduce operational waste.',
    ctaLabel: 'See success stories',
    ctaHref: '/success-stories',
  },
  territoriesBlock: {
    eyebrow: 'Where prediction becomes result',
    title: 'Predictive Value Levers',
    intro:
      'We organize our solutions into impact fronts, oriented exactly where operations need to capture results.',
    ctaLabel: "See this lever's solutions",
  },
  labels: {
    resolve: 'Resolve',
    entrega: 'Deliver',
    impacto: 'Impact',
  },
  territories: [
    {
      id: 'growth',
      eyebrow: 'Predictive Value Lever',
      title: 'Growth & Customer Intelligence',
      tagline: 'Sell more to customers, visitors and channels with the highest propensity to convert.',
      description:
        'When every customer receives the same offer, the company wastes media, CRM, sales effort and revenue opportunity. We anticipate intent, the next best offer and which products have the highest conversion potential.',
      chips: ['Predictive Personalization', 'Smart Discovery', 'Predictive Campaign Targeting'],
    },
    {
      id: 'planning',
      eyebrow: 'Predictive Value Lever',
      title: 'Demand, Supply & Commercial Planning',
      tagline: 'Plan better, sell better and reduce operational waste.',
      description:
        'Companies lose revenue when they plan demand, targets, assortment and orders based only on history, averages or commercial pressure. We turn market, behavior, inventory, sell-out and channel signals into predictive decisions to orient operations with extreme efficiency.',
      chips: [
        'Demand Forecasting',
        'Predictive Commercial Targets',
        'Predictive Assortment & Order Recommendation',
      ],
    },
    {
      id: 'pricing',
      eyebrow: 'Predictive Value Lever',
      title: 'Pricing & Margin Intelligence',
      tagline: 'Adjust price to the real movement of market, customer, inventory and margin.',
      description:
        'Price is not a table. It is a direct lever of margin, turnover and conversion. We turn elasticity, forecast, competition, inventory, demand and behavior into dynamic, measurable and governed price recommendations.',
      chips: ['Price-to-Margin', 'Price-to-Turnover', 'Price-to-Conversion'],
    },
  ],
  solutions: [
    {
      id: 'predictive-personalization',
      territory: 'growth',
      title: 'Predictive Personalization',
      tagline: 'Anticipate the next best offer for each customer.',
      resolve: 'Generic CRM, low conversion and wasted outreach.',
      entrega: 'NBA, NBO, cross-sell, up-sell and reactivation.',
      impacto: 'Higher LTV, more purchase frequency and better commercial efficiency.',
    },
    {
      id: 'smart-discovery',
      territory: 'growth',
      title: 'Smart Discovery',
      tagline: 'Turn anonymous traffic into incremental revenue.',
      resolve: 'Anonymous visitors treated as noise.',
      entrega: 'Contextual real-time recommendation, even before identification.',
      impacto: 'More conversion without increasing acquisition spend.',
    },
    {
      id: 'predictive-campaign-targeting',
      territory: 'growth',
      title: 'Predictive Campaign Targeting',
      tagline: 'Activate the right customers with more precision, more results and less cost.',
      resolve: 'Broad, expensive and inefficient campaigns.',
      entrega: 'Propensity score, prioritized audience and activation cadence.',
      impacto: 'Higher conversion, lower CAC and more measurable marketing ROI.',
    },
    {
      id: 'demand-forecasting',
      territory: 'planning',
      title: 'Demand Forecasting',
      tagline: 'Anticipate demand before stockout, excess or lost sales.',
      resolve: 'Forecast too coarse for a granular operation.',
      entrega: 'Demand forecast by SKU, store, POS, channel, region or customer.',
      impacto: 'Higher accuracy, less stockout, less excess and better supply planning.',
    },
    {
      id: 'predictive-commercial-targets',
      territory: 'planning',
      title: 'Predictive Commercial Targets',
      tagline:
        'Set targets based on real demand potential, not just history or commercial pressure.',
      resolve: 'Top-down targets disconnected from real market potential.',
      entrega: 'Suggested targets by territory, portfolio, channel, SKU or POS.',
      impacto:
        'Better allocation of commercial effort, less incentive distortion and greater revenue predictability.',
    },
    {
      id: 'mix-assortment-order',
      territory: 'planning',
      title: 'Predictive Assortment & Order Recommendation',
      tagline: 'Recommend the right mix and ideal order by store, POS, region, cluster or customer.',
      resolve: 'Standardized assortment and orders based on averages, gut feel or historical repetition.',
      entrega:
        'Ideal mix, SKU inclusion or substitution, suggested volume, incremental order and next commercial action.',
      impacto:
        'Higher ticket, more product positivation, better turnover, less stockout and less idle inventory.',
    },
    {
      id: 'price-to-margin',
      territory: 'pricing',
      title: 'Price-to-Margin',
      tagline: 'Capture margin per SKU without breaking commercial governance.',
      resolve:
        'SKUs with different elasticity, inventory and competitive pressure treated the same way.',
      entrega: 'Optimal price, confidence interval and alternative scenarios.',
      impacto: 'More margin captured, greater commercial control and better result per SKU.',
    },
    {
      id: 'price-to-turnover',
      territory: 'pricing',
      title: 'Price-to-Turnover',
      tagline: 'Accelerate turnover without destroying margin.',
      resolve: 'Idle inventory, late markdown and eroded margin.',
      entrega: 'Recommended price and progressive markdown by store, region or cluster.',
      impacto: 'More turnover with profitability, less aged inventory and more efficient capital.',
    },
    {
      id: 'price-to-conversion',
      territory: 'pricing',
      title: 'Price-to-Conversion',
      tagline: 'Maximize conversion and revenue per session with margin governance.',
      resolve: 'Sessions with different intents receiving the same price.',
      entrega: 'Contextual price per session, respecting minimum margin and commercial policy.',
      impacto: 'More conversion, more revenue per session and better margin capture.',
    },
  ],
  signal: {
    eyebrow: 'Cross-cutting layer',
    title: 'i6 Signal',
    tagline: 'The conversational layer that turns prediction into decision.',
    description:
      'i6 Signal connects the predictive signals from the models to business teams, making it easy to understand where to act, why to act and what impact to expect.',
    examplesTitle: 'Signal examples',
    examples: [
      'SKU with high stockout risk.',
      'Customer with high repurchase propensity.',
      'POS with additional order opportunity.',
      'Product with margin below potential.',
      'Customer with high cross-sell propensity.',
      'Cluster needing markdown.',
      'Commercial target misaligned with real potential.',
      'SKU with forecasted demand outside current mix.',
      'Campaign with priority audience.',
    ],
  },
  howWeImplement: {
    eyebrow: 'How we implement',
    title: 'Validation before scale. Results before rhetoric.',
    costNote: 'Zero cost through Backtest. You only move forward with validated potential.',
    steps: [
      {
        n: '01',
        title: 'Data ingestion',
        description:
          'We integrate commercial, transactional, behavioral, operational and external data, with anonymization at the source and no need for sensitive data.',
      },
      {
        n: '02',
        title: 'AI modeling',
        description:
          'We tune the proprietary engines to the customer, segment, channel, product and business objective context.',
      },
      {
        n: '03',
        title: 'Backtest',
        description:
          'We compare predictive recommendations against real results before activation, validating potential impact, operational adherence and clarity to scale.',
      },
      {
        n: '04',
        title: 'Pilot / Activation',
        description:
          'We deliver outputs via API, lake-to-lake, operational files, ERP/CRM plugins or widgets, with i6Signal for querying, explanation and activation of signals.',
      },
      {
        n: '05',
        title: 'Continuous learning',
        description:
          'We recalibrate the models as demand, inventory, price, behavior and commercial response evolve, keeping the signals updated and actionable.',
      },
    ],
  },
  summary: {
    eyebrow: 'In short',
    title: 'infinity6 helps companies to:',
    bullets: [
      'Forecast demand with more precision.',
      'Set smarter commercial targets.',
      'Recommend ideal mix and order by customer or POS.',
      'Prioritize campaigns by real propensity.',
      'Personalize offers in real time.',
      'Optimize price by margin, turnover and conversion.',
      'Reduce stockout, excess, CAC, commercial waste and margin left on the table.',
    ],
  },
};

export const solutionsContent: Record<Language, SolutionsV2Content> = { pt, en };

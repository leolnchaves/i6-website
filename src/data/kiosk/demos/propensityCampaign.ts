import type { KioskLang } from '@/data/kiosk/config';

export type ChannelId = 'whatsapp' | 'email' | 'push' | 'sms' | 'phone';
export type SegmentId = 'active90' | 'recurring' | 'crossSell' | 'full';
export type PeriodId = '7d' | '14d' | '30d';

export interface ProductDef {
  id: string;
  namePt: string;
  nameEn: string;
  categoryPt: string;
  categoryEn: string;
  audienceTotal: number; // clientes elegíveis
  baseConversion: number; // %
  bestChannel: ChannelId;
  argumentsPt: string[];
  argumentsEn: string[];
}

export const channels: { id: ChannelId; labelPt: string; labelEn: string; short: string }[] = [
  { id: 'whatsapp', labelPt: 'WhatsApp', labelEn: 'WhatsApp', short: 'WA' },
  { id: 'email', labelPt: 'E-mail', labelEn: 'Email', short: 'E' },
  { id: 'push', labelPt: 'Push', labelEn: 'Push', short: 'P' },
  { id: 'sms', labelPt: 'SMS', labelEn: 'SMS', short: 'S' },
  { id: 'phone', labelPt: 'Telefone', labelEn: 'Phone', short: 'T' },
];

export const channelLabel = (id: ChannelId, lang: KioskLang) =>
  (lang === 'pt'
    ? channels.find((c) => c.id === id)?.labelPt
    : channels.find((c) => c.id === id)?.labelEn) ?? id;

export const segments: { id: SegmentId; labelPt: string; labelEn: string }[] = [
  { id: 'active90', labelPt: 'Ativos 90 dias', labelEn: 'Active last 90 days' },
  { id: 'recurring', labelPt: 'Recorrentes da categoria', labelEn: 'Category repeat buyers' },
  { id: 'crossSell', labelPt: 'Base cross-sell', labelEn: 'Cross-sell base' },
  { id: 'full', labelPt: 'Base completa', labelEn: 'Full base' },
];

export const periods: { id: PeriodId; labelPt: string; labelEn: string }[] = [
  { id: '7d', labelPt: '7 dias', labelEn: '7 days' },
  { id: '14d', labelPt: '14 dias', labelEn: '14 days' },
  { id: '30d', labelPt: '30 dias', labelEn: '30 days' },
];

export const products: ProductDef[] = [
  {
    id: 'kit-cuidados',
    namePt: 'Kit Cuidados Premium',
    nameEn: 'Premium Care Kit',
    categoryPt: 'Higiene & Beleza',
    categoryEn: 'Personal Care & Beauty',
    audienceTotal: 62_400,
    baseConversion: 8.4,
    bestChannel: 'whatsapp',
    argumentsPt: [
      'Clientes com aumento de 42% na frequência de compra da categoria nos últimos 30 dias e 3× mais engajamento com push segmentado.',
      'Base com recompra de dermocosméticos crescendo 38% no último trimestre e resposta 2,4× maior a WhatsApp que a média da loja.',
      'Clientes parecidos com quem converteu no último lançamento — 74% deles compraram na primeira semana da campanha.',
      'Público concentrado nas lojas com maior giro da categoria e histórico de resposta rápida a ofertas de trade-up.',
      'Recorte exclui quem foi impactado nos últimos 14 dias — reforça só quem responde bem a WhatsApp sem saturação.',
      'Regiões com maior densidade de compradoras da categoria e picos de tráfego em lojas premium nos fins de semana.',
    ],
    argumentsEn: [
      'Customers with a 42% increase in category purchase frequency over the last 30 days and 3× more engagement with segmented push.',
      'Base with dermocosmetics repurchase growing 38% last quarter and 2.4× higher response to WhatsApp than the store average.',
      'Customers similar to those who converted in the last launch — 74% of them purchased in the campaign\'s first week.',
      'Audience concentrated in stores with the highest category turnover and a history of fast response to trade-up offers.',
      'Selection excludes anyone contacted in the last 14 days — reinforces only those who respond well to WhatsApp without saturation.',
      'Regions with the highest density of category buyers and traffic peaks in premium stores on weekends.',
    ],
  },
  {
    id: 'bebidas-sazonais',
    namePt: 'Linha de Bebidas Sazonais',
    nameEn: 'Seasonal Beverage Line',
    categoryPt: 'Varejo Alimentar',
    categoryEn: 'Grocery Retail',
    audienceTotal: 84_900,
    baseConversion: 6.1,
    bestChannel: 'push',
    argumentsPt: [
      'Regiões com previsão de calor acima da média nos próximos 7 dias concentram 61% do consumo histórico da categoria — janela alinhada ao clima.',
      'PDVs com estoque saudável e giro semanal crescente nas últimas 4 semanas — sem risco de ruptura após a ativação.',
      'Clientes com compra da categoria em janela inferior a 14 dias respondem 2,6× mais a push que a base geral.',
      'Base parecida com quem converteu em campanhas sazonais anteriores — mesmo perfil de frequência e ticket em bebidas.',
      'Feriado prolongado na próxima semana em regiões-chave — histórico mostra aumento de 1,8× nas compras de combos.',
    ],
    argumentsEn: [
      'Regions with above-average heat forecast for the next 7 days account for 61% of the category\'s historical consumption — a window aligned with the weather.',
      'Stores with healthy stock and growing weekly turnover over the last 4 weeks — no stockout risk after the activation.',
      'Customers who bought in the category within the last 14 days respond 2.6× more to push than the general base.',
      'Base similar to those who converted in previous seasonal campaigns — same frequency and ticket profile in beverages.',
      'Extended holiday next week in key regions — history shows a 1.8× increase in combo purchases.',
    ],
  },
  {
    id: 'eletroportatil',
    namePt: 'Eletroportátil de Cozinha',
    nameEn: 'Kitchen Small Appliance',
    categoryPt: 'Bens Duráveis',
    categoryEn: 'Durable Goods',
    audienceTotal: 41_200,
    baseConversion: 4.7,
    bestChannel: 'email',
    argumentsPt: [
      'Compradores de utensílios de cozinha nos últimos 60 dias com abertura de e-mail 3,1× acima da média — comportamento típico de quem está completando a cozinha.',
      'Clientes com ticket médio 2,1× superior à base geral e histórico de compra de bens duráveis com parcelamento.',
      'Base parecida com quem comprou eletroportátil na última safra — mesma faixa de renda, mesma resposta a e-mail com prova social.',
      'Público com visitas recentes à vitrine de "casa & cozinha" e listas de desejos ativas há menos de 30 dias.',
      'Regiões metropolitanas com maior densidade de mudanças recentes — perfil clássico de reposição de eletroportáteis.',
    ],
    argumentsEn: [
      'Buyers of kitchenware in the last 60 days with email open rates 3.1× above average — typical behavior of someone completing their kitchen.',
      'Customers with average ticket 2.1× higher than the general base and a history of financed durable-goods purchases.',
      'Base similar to those who bought a small appliance last season — same income bracket, same response to email with social proof.',
      'Audience with recent visits to the "home & kitchen" showcase and active wish lists less than 30 days old.',
      'Metro regions with a higher density of recent moves — a classic profile for appliance replacement.',
    ],
  },
  {
    id: 'colecao-moda',
    namePt: 'Coleção Moda Nova Temporada',
    nameEn: 'New Season Fashion Collection',
    categoryPt: 'Moda & Vestuário',
    categoryEn: 'Fashion & Apparel',
    audienceTotal: 96_700,
    baseConversion: 7.2,
    bestChannel: 'push',
    argumentsPt: [
      'Clientes parecidos com quem comprou na última coleção — mesmo estilo, mesma frequência — 71% converteram na campanha anterior.',
      'Base com compras em moda a cada 45 dias em média e engajamento crescente com conteúdo de novidades no app.',
      'Mudança de estação nas próximas 2 semanas em regiões-alvo — histórico mostra pico de 2,2× nas compras de coleção nova.',
      'Público com alta resposta a push nos últimos 30 dias e adesão frequente a combos completos (peças por pedido +1,6×).',
      'Recorte exclui clientes com devolução recente e reforça lojas com maior conversão em lançamentos anteriores.',
    ],
    argumentsEn: [
      'Customers similar to those who bought in the last collection — same style, same frequency — 71% converted in the previous campaign.',
      'Base with fashion purchases every 45 days on average and growing engagement with new-arrival content in the app.',
      'Season change in the next 2 weeks in target regions — history shows a 2.2× spike in new-collection purchases.',
      'Audience with high push response in the last 30 days and frequent adoption of full combos (items per order +1.6×).',
      'Selection excludes customers with recent returns and reinforces stores with higher conversion in previous launches.',
    ],
  },
  {
    id: 'cartao-fidelidade',
    namePt: 'Cartão Fidelidade Premium',
    nameEn: 'Premium Loyalty Card',
    categoryPt: 'Financeiro / Loyalty',
    categoryEn: 'Financial / Loyalty',
    audienceTotal: 28_500,
    baseConversion: 5.3,
    bestChannel: 'whatsapp',
    argumentsPt: [
      'Base que já usa o programa de pontos 2× por mês e concentra compras nas lojas com maior ticket — perfil natural de upgrade.',
      'Clientes com engajamento crescente em benefícios exclusivos nos últimos 90 dias e alta resposta a WhatsApp que push.',
      'Público parecido com quem fez upgrade de cartão na safra anterior — mesma frequência de compra e mesma faixa de gasto mensal.',
      'Regiões com maior densidade de clientes fiéis e histórico positivo de resposta a ofertas de benefícios ancorados.',
      'Recorte prioriza quem responde a WhatsApp em janela de 48h — comportamento típico de decisão rápida em ofertas de valor.',
    ],
    argumentsEn: [
      'Base that already uses the points program 2× a month and concentrates purchases in the highest-ticket stores — a natural upgrade profile.',
      'Customers with growing engagement in exclusive benefits over the last 90 days and higher response to WhatsApp than push.',
      'Audience similar to those who upgraded their card last season — same purchase frequency and same monthly spend range.',
      'Regions with a higher density of loyal customers and a positive history of response to benefit-anchored offers.',
      'Selection prioritizes those who respond to WhatsApp within a 48h window — typical fast-decision behavior on value offers.',
    ],
  },
  {
    id: 'seguro-garantia',
    namePt: 'Seguro Extensão de Garantia',
    nameEn: 'Extended Warranty Insurance',
    categoryPt: 'Financeiro / Cross-sell',
    categoryEn: 'Financial / Cross-sell',
    audienceTotal: 33_800,
    baseConversion: 9.6,
    bestChannel: 'phone',
    argumentsPt: [
      'Clientes que compraram eletroportátil ou eletrônico nos últimos 30 dias — janela em que a decisão de proteger o produto é 4× mais aceita.',
      'Base com histórico de atender chamadas comerciais e conversão alta em produtos financeiros ancorados a uma compra recente.',
      'Público parecido com quem contratou garantia na safra anterior — mesmo perfil de ticket e mesma janela pós-compra.',
      'Compradores em regiões com maior sinistralidade histórica de eletroportáteis — sensibilidade natural à proteção do produto.',
      'Recorte prioriza clientes sem contato comercial nos últimos 14 dias — pressão baixa aumenta 1,9× a taxa de atendimento.',
    ],
    argumentsEn: [
      'Customers who bought a small appliance or electronics in the last 30 days — a window in which the decision to protect the product is 4× more accepted.',
      'Base with a history of answering sales calls and high conversion on financial products anchored to a recent purchase.',
      'Audience similar to those who bought a warranty last season — same ticket profile and same post-purchase window.',
      'Buyers in regions with higher historical claim rates for small appliances — natural sensitivity to product protection.',
      'Selection prioritizes customers with no sales contact in the last 14 days — low pressure increases the answer rate by 1.9×.',
    ],
  },
];


export const pipeline: { labelPt: string; labelEn: string; microPt: string; microEn: string; durationMs: number }[] = [
  {
    labelPt: 'Lendo comportamento e histórico dos clientes',
    labelEn: 'Reading customer behavior and history',
    microPt: 'Compras, interações, recência, frequência e resposta a campanhas.',
    microEn: 'Purchases, interactions, recency, frequency and campaign response.',
    durationMs: 620,
  },
  {
    labelPt: 'Calculando propensão por cliente e produto',
    labelEn: 'Calculating propensity per customer and product',
    microPt: 'Estimando a probabilidade de cada cliente contratar a oferta selecionada.',
    microEn: 'Estimating the probability of each customer taking the selected offer.',
    durationMs: 780,
  },
  {
    labelPt: 'Identificando o canal de maior resposta',
    labelEn: 'Identifying the highest-response channel',
    microPt: 'Comparando WhatsApp, e-mail, push, SMS e telefone.',
    microEn: 'Comparing WhatsApp, email, push, SMS and phone.',
    durationMs: 540,
  },
  {
    labelPt: 'Aplicando elegibilidade e pressão comercial',
    labelEn: 'Applying eligibility and contact pressure rules',
    microPt: 'Consentimento, frequência de contato, restrições e campanhas recentes.',
    microEn: 'Consent, contact frequency, restrictions and recent campaigns.',
    durationMs: 660,
  },
  {
    labelPt: 'Priorizando audiência e régua de ativação',
    labelEn: 'Prioritizing audience and activation cadence',
    microPt: 'Ordenando clientes por potencial de conversão e eficiência de abordagem.',
    microEn: 'Ranking customers by conversion potential and outreach efficiency.',
    durationMs: 520,
  },
];

export interface AudienceTierSplit {
  channel: ChannelId;
  clients: number;
}

export type TierId = 'high' | 'medium' | 'future';

export interface AudienceTier {
  tier: TierId;
  clients: number;
  propensityPct: number;
  channels: AudienceTierSplit[];
}

export interface ComputedResult {
  tiers: AudienceTier[];
  recommendedAudience: number;
  conversionPct: number;
  primaryChannel: ChannelId;
  pressurePt: string;
  pressureEn: string;
  argumentPt: string;
  argumentEn: string;
  drill: DrillCustomer;
}

export interface DrillCustomer {
  id: string;
  namePt: string;
  nameEn: string;
  topProductPt: string;
  topProductEn: string;
  channel: ChannelId;
  momentPt: string;
  momentEn: string;
  factorsPt: string[];
  factorsEn: string[];
}

const segmentMultiplier: Record<SegmentId, number> = {
  active90: 0.42,
  recurring: 0.28,
  crossSell: 0.34,
  full: 1.0,
};

const periodMultiplier: Record<PeriodId, number> = {
  '7d': 0.9,
  '14d': 1.0,
  '30d': 1.15,
};

const buildPriority = (product: ProductDef, allowed: ChannelId[]): ChannelId[] => {
  const list: ChannelId[] = [];
  const push = (c: ChannelId) => {
    if (!list.includes(c)) list.push(c);
  };
  if (allowed.includes(product.bestChannel)) push(product.bestChannel);
  allowed.forEach(push);
  if (!list.length) push(product.bestChannel);
  return list;
};

export const computeResult = (
  product: ProductDef,
  segment: SegmentId,
  period: PeriodId,
  allowedChannels: ChannelId[],
  argIndex: number,
): ComputedResult => {
  const totalEligible = Math.round(
    product.audienceTotal * segmentMultiplier[segment] * periodMultiplier[period],
  );

  const highShare = 0.16;
  const midShare = 0.28;
  const futureShare = 0.34;

  const priority = buildPriority(product, allowedChannels);

  const splitAcross = (total: number, channels: ChannelId[]): AudienceTierSplit[] => {
    const n = Math.min(channels.length, 3);
    if (n <= 1) return [{ channel: channels[0], clients: total }];
    const weights = n === 2 ? [0.6, 0.4] : [0.5, 0.3, 0.2];
    const parts = weights.slice(0, n).map((w) => Math.round(total * w));
    const diff = total - parts.reduce((a, b) => a + b, 0);
    parts[0] += diff;
    return parts.map((clients, idx) => ({ channel: channels[idx], clients }));
  };

  const highTotal = Math.round(totalEligible * highShare);
  const midTotal = Math.round(totalEligible * midShare);
  const futureTotal = Math.round(totalEligible * futureShare);

  const seed = (argIndex * 31 + product.baseConversion * 17 + allowedChannels.length * 7) % 1000;
  const rand = (min: number, max: number, offset: number) => {
    const v = ((seed * 9301 + offset * 49297) % 233280) / 233280;
    return Math.round((min + v * (max - min)) * 10) / 10;
  };

  const tiers: AudienceTier[] = [
    {
      tier: 'high',
      clients: highTotal,
      propensityPct: rand(83, 92, 11),
      channels: splitAcross(highTotal, priority),
    },
    {
      tier: 'medium',
      clients: midTotal,
      propensityPct: rand(55, 68, 23),
      channels: splitAcross(midTotal, priority),
    },
    {
      tier: 'future',
      clients: futureTotal,
      propensityPct: rand(28, 40, 37),
      channels: splitAcross(futureTotal, priority),
    },
  ];

  const recommendedAudience = tiers[0].clients + tiers[1].clients;
  // Conversão potencial ~30–40% (audiência já filtrada por propensão)
  const convSeed = (product.baseConversion * 13 + argIndex * 7) % 100;
  const conversionPct = Number((30 + (convSeed / 100) * 10 + (allowedChannels.length >= 3 ? 0.8 : 0)).toFixed(1));

  const primary = priority[0];

  const momentPt = period === '7d' ? 'Próximas 48h' : period === '14d' ? 'Próximos 5 dias' : 'Próximos 10 dias';
  const momentEn = period === '7d' ? 'Next 48h' : period === '14d' ? 'Next 5 days' : 'Next 10 days';

  const drill: DrillCustomer = {
    id: 'CLI-' + (100000 + Math.floor(argIndex * 137 + product.baseConversion * 11)),
    namePt: 'Cliente exemplo',
    nameEn: 'Sample customer',
    topProductPt: product.namePt,
    topProductEn: product.nameEn,
    channel: primary,
    momentPt,
    momentEn,
    factorsPt: [
      `Recência de compra em ${product.categoryPt.toLowerCase()} abaixo de 21 dias`,
      `Engajamento 3× acima da média com ofertas no canal ${channelLabel(primary, 'pt')}`,
    ],
    factorsEn: [
      `Purchase recency in ${product.categoryEn.toLowerCase()} under 21 days`,
      `Engagement 3× above average with offers on the ${channelLabel(primary, 'en')} channel`,
    ],
  };

  return {
    tiers,
    recommendedAudience,
    conversionPct,
    primaryChannel: primary,
    pressurePt: '2 contatos em 7 dias',
    pressureEn: '2 contacts in 7 days',
    argumentPt: product.argumentsPt[argIndex % product.argumentsPt.length],
    argumentEn: product.argumentsEn[argIndex % product.argumentsEn.length],
    drill,
  };
};

export const demoLabels: Record<KioskLang, {
  objective: string;
  crm: {
    title: string;
    subtitle: string;
    product: string;
    audience: string;
    period: string;
    channels: string;
    cta: string;
    channelsHint: string;
    eligible: string;
  };
  running: string;
  result: {
    title: string;
    subtitle: string;
    tableTier: string;
    tableClients: string;
    tablePropensity: string;
    tableChannel: string;
    audience: string;
    audienceHint: string;
    conversion: string;
    channel: string;
    pressure: string;
    drillCta: string;
    drillTitle: string;
    drillTopProduct: string;
    drillChannel: string;
    drillMoment: string;
    drillFactors: string;
    drillClose: string;
    reset: string;
    selectedProduct: string;
  };
  tierLabels: Record<TierId, string>;
  reasoningTitle: string;
  reasoningSubtitle: string;
  rationaleLabel: string;
  latency: string;
  latencyHint: string;
}> = {
  pt: {
    objective: 'OBJETIVO: ENGAJAMENTO E CONVERSÃO',
    crm: {
      title: 'CRM · Nova campanha',
      subtitle: 'Configure a oferta e o público disponível',
      product: 'ESCOLHA UM PRODUTO OU OFERTA',
      audience: 'Público disponível',
      period: 'Período da campanha',
      channels: 'SELECIONE OS CANAIS DESEJADOS',
      cta: 'Calcular melhor audiência',
      channelsHint: 'Selecione um ou mais canais',
      eligible: 'elegíveis',
    },
    running: 'Calculando audiência…',
    result: {
      title: 'Audiência priorizada',
      subtitle: 'Ordenada por potencial de conversão',
      tableTier: 'Faixa',
      tableClients: 'Clientes',
      tablePropensity: 'Propensão',
      tableChannel: 'Canal recomendado',
      audience: 'Audiência recomendada',
      audienceHint: 'clientes',
      conversion: 'Conversão potencial',
      channel: 'Canal prioritário',
      pressure: 'Pressão recomendada',
      drillCta: 'EXPLORAR GRANULARIDADE POR CLIENTE',
      drillTitle: 'Cliente priorizado',
      drillTopProduct: 'Produto com maior propensão',
      drillChannel: 'Canal recomendado',
      drillMoment: 'Momento sugerido',
      drillFactors: 'Fatores que sustentam o score',
      drillClose: 'Fechar',
      reset: 'Nova simulação',
      selectedProduct: 'Produto selecionado',
    },
    tierLabels: {
      high: 'Prioridade alta',
      medium: 'Prioridade média',
      future: 'Oportunidade futura',
    },
    reasoningTitle: 'Explicabilidade e raciocínio do modelo',
    reasoningSubtitle: '',
    rationaleLabel: 'Por que recomendamos esta audiência',
    latency: 'Latência',
    latencyHint: 'abaixo da média de mercado (~200 ms)',
  },
  en: {
    objective: 'OBJECTIVE: ENGAGEMENT AND CONVERSION',
    crm: {
      title: 'CRM · New campaign',
      subtitle: 'Set up the offer and the available audience',
      product: 'CHOOSE A PRODUCT OR OFFER',
      audience: 'Available audience',
      period: 'Campaign period',
      channels: 'SELECT THE DESIRED CHANNELS',
      cta: 'Calculate best audience',
      channelsHint: 'Select one or more channels',
      eligible: 'eligible',
    },
    running: 'Calculating audience…',
    result: {
      title: 'Prioritized audience',
      subtitle: 'Ranked by conversion potential',
      tableTier: 'Tier',
      tableClients: 'Customers',
      tablePropensity: 'Propensity',
      tableChannel: 'Recommended channel',
      audience: 'Recommended audience',
      audienceHint: 'customers',
      conversion: 'Potential conversion',
      channel: 'Primary channel',
      pressure: 'Recommended pressure',
      drillCta: 'EXPLORE CUSTOMER-LEVEL GRANULARITY',
      drillTitle: 'Prioritized customer',
      drillTopProduct: 'Highest-propensity product',
      drillChannel: 'Recommended channel',
      drillMoment: 'Suggested moment',
      drillFactors: 'Factors behind the score',
      drillClose: 'Close',
      reset: 'New simulation',
      selectedProduct: 'Selected product',
    },
    tierLabels: {
      high: 'High priority',
      medium: 'Medium priority',
      future: 'Future opportunity',
    },
    reasoningTitle: 'Explainability and model reasoning',
    reasoningSubtitle: '',
    rationaleLabel: 'Why we recommend this audience',
    latency: 'Latency',
    latencyHint: 'below market average (~200 ms)',
  },
};

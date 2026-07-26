export type ChannelId = 'whatsapp' | 'email' | 'push' | 'sms' | 'phone';
export type SegmentId = 'active90' | 'recurring' | 'crossSell' | 'full';
export type PeriodId = '7d' | '14d' | '30d';

export interface ProductDef {
  id: string;
  name: string;
  category: string;
  audienceTotal: number; // clientes elegíveis
  baseConversion: number; // %
  bestChannel: ChannelId;
  arguments: string[];
}

export const channels: { id: ChannelId; label: string; short: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp', short: 'WA' },
  { id: 'email', label: 'E-mail', short: 'E' },
  { id: 'push', label: 'Push', short: 'P' },
  { id: 'sms', label: 'SMS', short: 'S' },
  { id: 'phone', label: 'Telefone', short: 'T' },
];

export const channelLabel = (id: ChannelId) =>
  channels.find((c) => c.id === id)?.label ?? id;

export const segments: { id: SegmentId; label: string }[] = [
  { id: 'active90', label: 'Ativos 90 dias' },
  { id: 'recurring', label: 'Recorrentes da categoria' },
  { id: 'crossSell', label: 'Base cross-sell' },
  { id: 'full', label: 'Base completa' },
];

export const periods: { id: PeriodId; label: string }[] = [
  { id: '7d', label: '7 dias' },
  { id: '14d', label: '14 dias' },
  { id: '30d', label: '30 dias' },
];

export const products: ProductDef[] = [
  {
    id: 'kit-cuidados',
    name: 'Kit Cuidados Premium',
    category: 'Higiene & Beleza',
    audienceTotal: 62_400,
    baseConversion: 8.4,
    bestChannel: 'whatsapp',
    arguments: [
      'Clientes com aumento de 42% na frequência de compra da categoria nos últimos 30 dias e 3× mais engajamento com push segmentado.',
      'Base com recompra de dermocosméticos crescendo 38% no último trimestre e resposta 2,4× maior a WhatsApp que a média da loja.',
      'Clientes parecidos com quem converteu no último lançamento — 74% deles compraram na primeira semana da campanha.',
      'Público concentrado nas lojas com maior giro da categoria e histórico de resposta rápida a ofertas de trade-up.',
      'Recorte exclui quem foi impactado nos últimos 14 dias — reforça só quem responde bem a WhatsApp sem saturação.',
      'Regiões com maior densidade de compradoras da categoria e picos de tráfego em lojas premium nos fins de semana.',
    ],
  },
  {
    id: 'bebidas-sazonais',
    name: 'Linha de Bebidas Sazonais',
    category: 'Varejo Alimentar',
    audienceTotal: 84_900,
    baseConversion: 6.1,
    bestChannel: 'push',
    arguments: [
      'Regiões com previsão de calor acima da média nos próximos 7 dias concentram 61% do consumo histórico da categoria — janela alinhada ao clima.',
      'PDVs com estoque saudável e giro semanal crescente nas últimas 4 semanas — sem risco de ruptura após a ativação.',
      'Clientes com compra da categoria em janela inferior a 14 dias respondem 2,6× mais a push que a base geral.',
      'Base parecida com quem converteu em campanhas sazonais anteriores — mesmo perfil de frequência e ticket em bebidas.',
      'Feriado prolongado na próxima semana em regiões-chave — histórico mostra aumento de 1,8× nas compras de combos.',
    ],
  },
  {
    id: 'eletroportatil',
    name: 'Eletroportátil de Cozinha',
    category: 'Bens Duráveis',
    audienceTotal: 41_200,
    baseConversion: 4.7,
    bestChannel: 'email',
    arguments: [
      'Compradores de utensílios de cozinha nos últimos 60 dias com abertura de e-mail 3,1× acima da média — comportamento típico de quem está completando a cozinha.',
      'Clientes com ticket médio 2,1× superior à base geral e histórico de compra de bens duráveis com parcelamento.',
      'Base parecida com quem comprou eletroportátil na última safra — mesma faixa de renda, mesma resposta a e-mail com prova social.',
      'Público com visitas recentes à vitrine de "casa & cozinha" e listas de desejos ativas há menos de 30 dias.',
      'Regiões metropolitanas com maior densidade de mudanças recentes — perfil clássico de reposição de eletroportáteis.',
    ],
  },
  {
    id: 'colecao-moda',
    name: 'Coleção Moda Nova Temporada',
    category: 'Moda & Vestuário',
    audienceTotal: 96_700,
    baseConversion: 7.2,
    bestChannel: 'push',
    arguments: [
      'Clientes parecidos com quem comprou na última coleção — mesmo estilo, mesma frequência — 71% converteram na campanha anterior.',
      'Base com compras em moda a cada 45 dias em média e engajamento crescente com conteúdo de novidades no app.',
      'Mudança de estação nas próximas 2 semanas em regiões-alvo — histórico mostra pico de 2,2× nas compras de coleção nova.',
      'Público com alta resposta a push nos últimos 30 dias e adesão frequente a combos completos (peças por pedido +1,6×).',
      'Recorte exclui clientes com devolução recente e reforça lojas com maior conversão em lançamentos anteriores.',
    ],
  },
  {
    id: 'cartao-fidelidade',
    name: 'Cartão Fidelidade Premium',
    category: 'Financeiro / Loyalty',
    audienceTotal: 28_500,
    baseConversion: 5.3,
    bestChannel: 'whatsapp',
    arguments: [
      'Base que já usa o programa de pontos 2× por mês e concentra compras nas lojas com maior ticket — perfil natural de upgrade.',
      'Clientes com engajamento crescente em benefícios exclusivos nos últimos 90 dias e alta resposta a WhatsApp que push.',
      'Público parecido com quem fez upgrade de cartão na safra anterior — mesma frequência de compra e mesma faixa de gasto mensal.',
      'Regiões com maior densidade de clientes fiéis e histórico positivo de resposta a ofertas de benefícios ancorados.',
      'Recorte prioriza quem responde a WhatsApp em janela de 48h — comportamento típico de decisão rápida em ofertas de valor.',
    ],
  },
  {
    id: 'seguro-garantia',
    name: 'Seguro Extensão de Garantia',
    category: 'Financeiro / Cross-sell',
    audienceTotal: 33_800,
    baseConversion: 9.6,
    bestChannel: 'phone',
    arguments: [
      'Clientes que compraram eletroportátil ou eletrônico nos últimos 30 dias — janela em que a decisão de proteger o produto é 4× mais aceita.',
      'Base com histórico de atender chamadas comerciais e conversão alta em produtos financeiros ancorados a uma compra recente.',
      'Público parecido com quem contratou garantia na safra anterior — mesmo perfil de ticket e mesma janela pós-compra.',
      'Compradores em regiões com maior sinistralidade histórica de eletroportáteis — sensibilidade natural à proteção do produto.',
      'Recorte prioriza clientes sem contato comercial nos últimos 14 dias — pressão baixa aumenta 1,9× a taxa de atendimento.',
    ],
  },
];


export const pipeline: { label: string; micro: string; durationMs: number }[] = [
  {
    label: 'Lendo comportamento e histórico dos clientes',
    micro: 'Compras, interações, recência, frequência e resposta a campanhas.',
    durationMs: 620,
  },
  {
    label: 'Calculando propensão por cliente e produto',
    micro: 'Estimando a probabilidade de cada cliente contratar a oferta selecionada.',
    durationMs: 780,
  },
  {
    label: 'Identificando o canal de maior resposta',
    micro: 'Comparando WhatsApp, e-mail, push, SMS e telefone.',
    durationMs: 540,
  },
  {
    label: 'Aplicando elegibilidade e pressão comercial',
    micro: 'Consentimento, frequência de contato, restrições e campanhas recentes.',
    durationMs: 660,
  },
  {
    label: 'Priorizando audiência e régua de ativação',
    micro: 'Ordenando clientes por potencial de conversão e eficiência de abordagem.',
    durationMs: 520,
  },
];

export interface AudienceTierSplit {
  channel: ChannelId;
  clients: number;
}

export interface AudienceTier {
  tier: 'Prioridade alta' | 'Prioridade média' | 'Oportunidade futura';
  clients: number;
  propensityPct: number;
  channels: AudienceTierSplit[];
}

export interface ComputedResult {
  tiers: AudienceTier[];
  recommendedAudience: number;
  conversionPct: number;
  primaryChannel: ChannelId;
  pressure: string;
  argument: string;
  drill: DrillCustomer;
}

export interface DrillCustomer {
  id: string;
  name: string;
  topProduct: string;
  channel: ChannelId;
  moment: string;
  factors: string[];
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

const pick = (arr: ChannelId[], i: number): ChannelId => arr[Math.min(i, arr.length - 1)];

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
      tier: 'Prioridade alta',
      clients: highTotal,
      propensityPct: rand(83, 92, 11),
      channels: splitAcross(highTotal, priority),
    },
    {
      tier: 'Prioridade média',
      clients: midTotal,
      propensityPct: rand(55, 68, 23),
      channels: splitAcross(midTotal, priority),
    },
    {
      tier: 'Oportunidade futura',
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

  const drill: DrillCustomer = {
    id: 'CLI-' + (100000 + Math.floor(argIndex * 137 + product.baseConversion * 11)),
    name: 'Cliente exemplo',
    topProduct: product.name,
    channel: primary,
    moment: period === '7d' ? 'Próximas 48h' : period === '14d' ? 'Próximos 5 dias' : 'Próximos 10 dias',
    factors: [
      `Recência de compra em ${product.category.toLowerCase()} abaixo de 21 dias`,
      `Engajamento 3× acima da média com ofertas no canal ${channelLabel(primary)}`,
    ],
  };

  return {
    tiers,
    recommendedAudience,
    conversionPct,
    primaryChannel: primary,
    pressure: '2 contatos em 7 dias',
    argument: product.arguments[argIndex % product.arguments.length],
    drill,
  };
};

export const labels = {
  objective: 'OBJETIVO: ENGAJAMENTO E CONVERSÃO',
  crm: {
    title: 'CRM · Nova campanha',
    subtitle: 'Configure a oferta e o público disponível',
    product: 'Produto ou oferta',
    audience: 'Público disponível',
    period: 'Período da campanha',
    channels: 'Canais permitidos',
    cta: 'Calcular melhor audiência',
    channelsHint: 'Selecione um ou mais canais',
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
    drillCta: 'Explorar clientes priorizados',
    drillTitle: 'Cliente priorizado',
    drillTopProduct: 'Produto com maior propensão',
    drillChannel: 'Canal recomendado',
    drillMoment: 'Momento sugerido',
    drillFactors: 'Fatores que sustentam o score',
    drillClose: 'Fechar',
    reset: 'Nova simulação',
  },
  reasoningTitle: 'Como o modelo está pensando',
  reasoningSubtitle: 'Etapas do modelo de propensão da infinity6',
  rationaleLabel: 'Por que recomendamos esta audiência',
  latency: 'Latência',
  latencyHint: 'abaixo da média de mercado (~200 ms)',
};

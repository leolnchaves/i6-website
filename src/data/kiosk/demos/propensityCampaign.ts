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
      'Sinais de intenção detectados: buscas recentes por dermocosméticos premium e permanência acima da média nas páginas de produto.',
      'Público concentra 68% da conversão esperada com apenas 24% do custo de contato — priorização reduz CAC efetivo em 2.8×.',
      'Match de perfil com compradoras conversoras da última campanha de lançamento (look-alike de 1º grau, cobertura de 74%).',
      'Ticket médio crescente e afinidade forte com marcas premium da categoria — público qualificado para trade-up.',
      'Recorte exclui clientes em cool-down pós-campanha e reforça público com resposta positiva histórica ao WhatsApp.',
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
      'Sazonalidade favorável: categoria em pico de demanda e estoque adequado no CD regional — sem risco de ruptura pós-ativação.',
      'Clientes com histórico de compra na categoria e frequência semanal em loja física próxima aos pontos de venda participantes.',
      'Recência de compra abaixo de 14 dias combinada com alto engajamento em ofertas por push — janela ideal de reativação.',
      'Score calibrado com backtest de 8 campanhas sazonais anteriores; segmento apresenta lift médio de 2.6× vs. base geral.',
      'Base concentra alta afinidade com combos e ofertas de mix — potencial de aumento de itens por ticket em 1.4×.',
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
      'Público com buscas recentes por eletroportáteis e histórico positivo de conversão em campanhas de alto ticket via e-mail.',
      'Recorrência de compra na categoria "casa & cozinha" acima da média e forte resposta a e-mails com prova social.',
      'Ticket médio 2.1× superior à base geral — público qualificado para categorias premium com parcelamento estendido.',
      'Elegibilidade cruzada com política de crédito aprovada e pressão comercial abaixo do teto — aderência garantida.',
      'Sinais de intenção: comparação de modelos, cliques em vitrine personalizada e adição recente a lista de desejos.',
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
      'Público com alta afinidade de estilo pelo cluster da coleção e frequência de compra a cada 45 dias em moda.',
      'Sinais de intenção detectados: navegação recente em novidades, engajamento com influenciadores parceiros e cliques em push.',
      'Match de perfil com compradoras conversoras da última coleção (look-alike de 1º grau, cobertura de 71%).',
      'Ticket médio crescente e ampla adesão a combos completos — potencial de aumento de peças por pedido em 1.6×.',
      'Recorte exclui clientes com devolução recente e reforça base com resposta positiva ao canal push nos últimos 30 dias.',
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
      'Base com alto engajamento no programa de pontos e frequência de compra acima de 2× por mês — perfil ideal para upgrade.',
      'Score de propensão calibrado com backtest de 12 campanhas anteriores; segmento apresenta lift médio de 3.1× vs. base geral.',
      'Elegibilidade cruzada com consentimento LGPD e política de crédito — aderência regulatória garantida.',
      'Público concentra 62% da conversão esperada com apenas 21% do custo de contato — priorização reduz CAC efetivo.',
      'Ticket médio e recência favoráveis; histórico positivo de resposta ao WhatsApp em ofertas de benefícios exclusivos.',
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
      'Compradores recentes de eletroportáteis e eletrônicos de alto ticket — janela de 30 dias para oferta de garantia estendida.',
      'Público com histórico positivo de resposta a abordagens humanas por telefone e alta conversão em produtos financeiros ancorados.',
      'Match direto com compradores conversores da última safra de cross-sell (look-alike de 1º grau, cobertura de 78%).',
      'Elegibilidade cruzada com consentimento LGPD e pressão comercial abaixo do teto — sem sobreposição de campanhas.',
      'Score calibrado com backtest de 10 campanhas de cross-sell; segmento apresenta lift médio de 2.9× vs. base geral.',
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

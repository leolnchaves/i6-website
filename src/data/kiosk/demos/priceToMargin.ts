import type { KioskLang } from '@/data/kiosk/config';
import p1 from '@/assets/kiosk/product-1.jpg';
import p2 from '@/assets/kiosk/product-2.jpg';
import p3 from '@/assets/kiosk/product-3.jpg';
import p4 from '@/assets/kiosk/product-4.jpg';

export interface DemoProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  cost: number;
  currentPrice: number;
  currentMargin: number; // %
  turnover: string;
  recommendedPrice: number;
  recommendedMargin: number; // %
  deltaRevenuePct: number; // %
  deltaMarginPct: number; // % absolute points
  insight: string;
}

export interface PipelineStep {
  label: string;
  microMetric: string;
  durationMs: number;
}

export interface PriceToMarginDemoContent {
  scenarioTitle: string;
  scenarioSubtitle: string;
  storeName: string;
  catalogLabel: string;
  pickHint: string;
  zoomHint: string;
  backToCatalog: string;
  idealPriceBadge: string;
  analyzingLabel: string;
  productLabels: {
    cost: string;
    price: string;
    margin: string;
    turnover: string;
    recommended: string;
    deltaRevenue: string;
    deltaMargin: string;
    latency: string;
    latencyHint: string;
  };

  objectiveLabel: string;
  reasoningTitle: string;
  reasoningSubtitle: string;
  pipeline: PipelineStep[];
  ctaLabel: string;
  rationaleLabel: string;
  doneLabel: string;
  products: DemoProduct[];
}

const productsPt: DemoProduct[] = [
  {
    id: 'sku-1',
    name: 'Hidratante Facial 200ml',
    image: p1,
    category: 'Skincare',
    cost: 24.5,
    currentPrice: 49.9,
    currentMargin: 50.9,
    turnover: '18 un/sem',
    recommendedPrice: 57.9,
    recommendedMargin: 57.7,
    deltaRevenuePct: 12.4,
    deltaMarginPct: 6.8,
    insight: 'Elasticidade estimada de −0,7 sinaliza baixa reação de demanda ao preço. Concorrência estável nas últimas 8 semanas e giro consistente abrem headroom de +16% no ticket. O reajuste captura margem sem comprometer o volume projetado nem a posição relativa no shelf digital.',
  },
  {
    id: 'sku-2',
    name: 'Suplemento Vitamina D 60cps',
    image: p2,
    category: 'Nutrição',
    cost: 18.2,
    currentPrice: 39.9,
    currentMargin: 54.4,
    turnover: '32 un/sem',
    recommendedPrice: 44.9,
    recommendedMargin: 59.5,
    deltaRevenuePct: 9.1,
    deltaMarginPct: 5.1,
    insight: 'SKU de altíssima recorrência (ciclo de recompra de 42 dias). Sensibilidade a preço média compensada pela fidelidade do cluster de assinantes, que representa 61% do volume. O novo patamar preserva conversão de novos compradores e expande margem no core recorrente.',
  },
  {
    id: 'sku-3',
    name: 'Shampoo Reparador 400ml',
    image: p3,
    category: 'Haircare',
    cost: 12.8,
    currentPrice: 28.9,
    currentMargin: 55.7,
    turnover: '46 un/sem',
    recommendedPrice: 32.5,
    recommendedMargin: 60.6,
    deltaRevenuePct: 7.5,
    deltaMarginPct: 4.9,
    insight: 'Líder de categoria com giro 2,3× acima da mediana. O modelo detecta headroom competitivo de R$ 4,20 antes do próximo comparável relevante. Reajuste absorvido pelo mix e pelo posicionamento premium, sem risco de erosão de share no trimestre.',
  },
  {
    id: 'sku-4',
    name: 'Protetor Solar FPS 60',
    image: p4,
    category: 'Sazonal',
    cost: 21.4,
    currentPrice: 54.9,
    currentMargin: 61.0,
    turnover: '24 un/sem',
    recommendedPrice: 62.9,
    recommendedMargin: 66.0,
    deltaRevenuePct: 14.6,
    deltaMarginPct: 5.0,
    insight: 'Início do pico sazonal detectado nas últimas 3 semanas (buscas +38%, cliques em concorrentes +22%). Elasticidade cai de −1,1 para −0,4 nesse regime. Janela ideal de captura de margem antes da aceleração de conversão típica da temporada.',
  },
];

const productsEn: DemoProduct[] = [
  {
    id: 'sku-1',
    name: 'Facial Moisturizer 200ml',
    image: p1,
    category: 'Skincare',
    cost: 24.5,
    currentPrice: 49.9,
    currentMargin: 50.9,
    turnover: '18 u/wk',
    recommendedPrice: 57.9,
    recommendedMargin: 57.7,
    deltaRevenuePct: 12.4,
    deltaMarginPct: 6.8,
    insight: 'Estimated elasticity of −0.7 signals low demand reaction to price. Competition stable over the last 8 weeks and consistent turnover open a +16% headroom on ticket. The raise captures margin without hurting projected volume or shelf position.',
  },
  {
    id: 'sku-2',
    name: 'Vitamin D Supplement 60ct',
    image: p2,
    category: 'Nutrition',
    cost: 18.2,
    currentPrice: 39.9,
    currentMargin: 54.4,
    turnover: '32 u/wk',
    recommendedPrice: 44.9,
    recommendedMargin: 59.5,
    deltaRevenuePct: 9.1,
    deltaMarginPct: 5.1,
    insight: 'Very high-recurrence SKU (42-day repurchase cycle). Mid price sensitivity is offset by the loyal subscription cluster, which drives 61% of volume. The new level preserves new-buyer conversion and expands margin on the recurring core.',
  },
  {
    id: 'sku-3',
    name: 'Repair Shampoo 400ml',
    image: p3,
    category: 'Haircare',
    cost: 12.8,
    currentPrice: 28.9,
    currentMargin: 55.7,
    turnover: '46 u/wk',
    recommendedPrice: 32.5,
    recommendedMargin: 60.6,
    deltaRevenuePct: 7.5,
    deltaMarginPct: 4.9,
    insight: 'Category leader with turnover 2.3× above the median. The model detects $4.20 of competitive headroom before the next relevant benchmark. The raise is absorbed by mix and premium positioning, with no share erosion risk this quarter.',
  },
  {
    id: 'sku-4',
    name: 'Sunscreen SPF 60',
    image: p4,
    category: 'Seasonal',
    cost: 21.4,
    currentPrice: 54.9,
    currentMargin: 61.0,
    turnover: '24 u/wk',
    recommendedPrice: 62.9,
    recommendedMargin: 66.0,
    deltaRevenuePct: 14.6,
    deltaMarginPct: 5.0,
    insight: 'Seasonal peak detected over the past 3 weeks (searches +38%, competitor clicks +22%). Elasticity drops from −1.1 to −0.4 in this regime. Ideal window to capture margin before the typical conversion surge of the season.',
  },
];

export const priceToMarginDemo: Record<KioskLang, PriceToMarginDemoContent> = {
  pt: {
    scenarioTitle: 'VivaShop B2B',
    scenarioSubtitle: 'Catálogo · Precificação em tempo real',
    storeName: 'VivaShop B2B',
    catalogLabel: 'Catálogo',
    pickHint: 'Toque em um produto para descobrir o preço ideal',
    zoomHint: 'Analisando o produto',
    backToCatalog: '← Escolher outro produto',
    idealPriceBadge: 'Preço ideal',
    analyzingLabel: 'Aguarde · o modelo está pensando',
    productLabels: {
      cost: 'Custo',
      price: 'Preço',
      margin: 'Margem',
      turnover: 'Giro',
      recommended: 'Preço recomendado',
      deltaRevenue: 'Δ Receita',
      deltaMargin: 'Δ Margem',
      latency: 'Latência do modelo',
      latencyHint: 'média mercado ~180 ms',
    },

    objectiveLabel: 'Objetivo: margem',
    reasoningTitle: 'Como o modelo está pensando',
    reasoningSubtitle: 'Pipeline preditivo · i6ElasticPrice',
    pipeline: [
      { label: 'Lendo histórico e elasticidade do SKU', microMetric: '312 SKUs comparáveis · 24 meses', durationMs: 1400 },
      { label: 'Detectando concorrência e sazonalidade', microMetric: '7 players monitorados · índice 0.82', durationMs: 1400 },
      { label: 'Simulando 10.000 cenários de preço', microMetric: 'elasticidade estimada: -1.4', durationMs: 1800 },
      { label: 'Otimizando para margem', microMetric: 'restrições: giro mínimo · headroom competitivo', durationMs: 1600 },
      { label: 'Recomendando novo preço', microMetric: 'confiança: 94%', durationMs: 1200 },
    ],
    ctaLabel: 'Aplicar preço',
    rationaleLabel: 'Por que este preço',
    doneLabel: 'Recomendação pronta',
    products: productsPt,
  },
  en: {
    scenarioTitle: 'VivaShop B2B',
    scenarioSubtitle: 'Catalog · Real-time pricing',
    storeName: 'VivaShop B2B',
    catalogLabel: 'Catalog',
    pickHint: 'Tap a product to reveal the ideal price',
    zoomHint: 'Analyzing product',
    backToCatalog: '← Pick another product',
    idealPriceBadge: 'Ideal price',
    analyzingLabel: 'Please wait · the model is thinking',
    productLabels: {
      cost: 'Cost',
      price: 'Price',
      margin: 'Margin',
      turnover: 'Turnover',
      recommended: 'Recommended price',
      deltaRevenue: 'Δ Revenue',
      deltaMargin: 'Δ Margin',
      latency: 'Model latency',
      latencyHint: 'market avg 50–100 ms',
    },

    objectiveLabel: 'Objective: margin',
    reasoningTitle: 'How the model is thinking',
    reasoningSubtitle: 'Predictive pipeline · i6ElasticPrice',
    pipeline: [
      { label: 'Reading SKU history and elasticity', microMetric: '312 comparable SKUs · 24 months', durationMs: 1400 },
      { label: 'Detecting competition and seasonality', microMetric: '7 players monitored · index 0.82', durationMs: 1400 },
      { label: 'Simulating 10,000 price scenarios', microMetric: 'estimated elasticity: -1.4', durationMs: 1800 },
      { label: 'Optimizing for margin', microMetric: 'constraints: min turnover · competitive headroom', durationMs: 1600 },
      { label: 'Recommending new price', microMetric: 'confidence: 94%', durationMs: 1200 },
    ],
    ctaLabel: 'Apply price',
    rationaleLabel: 'Why this price',
    doneLabel: 'Recommendation ready',
    products: productsEn,
  },
};

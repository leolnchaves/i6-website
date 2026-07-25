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
  deltaConversionPct: number; // % relative
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
    deltaConversion: string;
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
    recommendedPrice: 44.7,
    recommendedMargin: 45.2,
    deltaRevenuePct: 8.3,
    deltaMarginPct: -5.7,
    deltaConversionPct: 18.3,
    insight: 'Abandono de carrinho >62% e sessões repetidas mostram hesitação. Pequeno corte destrava a conversão do cluster de fim de semana sem canibalizar o premium.',
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
    recommendedPrice: 37.3,
    recommendedMargin: 51.2,
    deltaRevenuePct: 6.1,
    deltaMarginPct: -3.2,
    deltaConversionPct: 11.7,
    insight: 'Primeira compra do ciclo de assinatura concentra 71% do drop-off. Comportamento observado: 3+ visitas antes de converter, cliques em concorrentes crescendo 24% no mês. O ajuste destrava a entrada no funil recorrente, onde o LTV compensa o giveback de ticket já no 2º pedido.',
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
    recommendedPrice: 29.9,
    recommendedMargin: 57.2,
    deltaRevenuePct: 4.2,
    deltaMarginPct: 1.5,
    deltaConversionPct: 9.4,
    insight: 'Clientes recorrentes (61% do volume) mostram baixa sensibilidade a preço e alta velocidade de checkout (< 90s). Elasticidade de conversão de apenas −0,3 abre espaço para pequeno reajuste. Novos compradores continuam convertendo porque o benchmark comportamental do cluster é a categoria, não o SKU.',
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
    recommendedPrice: 47.9,
    recommendedMargin: 55.3,
    deltaRevenuePct: 13.6,
    deltaMarginPct: -5.7,
    deltaConversionPct: 22.1,
    insight: 'Pico sazonal com buscas +38% e comparação intensa: 3,2 abas paralelas em média por sessão. Abandono de carrinho salta para 71% acima de R$ 52. Reduzir o ticket agora captura o comprador indeciso na janela de decisão de 48h, quando a concorrência ainda não reagiu.',
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
    recommendedPrice: 44.7,
    recommendedMargin: 45.2,
    deltaRevenuePct: 8.3,
    deltaMarginPct: -5.7,
    deltaConversionPct: 18.3,
    insight: 'Repeat PDP sessions with cart-abandon above 62% show hesitation at the current ticket. The dominant behavioral cluster (weekend browsers) reacts strongly to small cuts: conversion elasticity of −1.8. The new price unlocks latent conversion without cannibalizing the premium cluster.',
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
    recommendedPrice: 37.3,
    recommendedMargin: 51.2,
    deltaRevenuePct: 6.1,
    deltaMarginPct: -3.2,
    deltaConversionPct: 11.7,
    insight: 'First order of the subscription cycle concentrates 71% of drop-off. Behavior observed: 3+ visits before converting, competitor clicks growing 24% MoM. The move unlocks entry into the recurring funnel, where LTV offsets the ticket giveback from the 2nd order onward.',
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
    recommendedPrice: 29.9,
    recommendedMargin: 57.2,
    deltaRevenuePct: 4.2,
    deltaMarginPct: 1.5,
    deltaConversionPct: 9.4,
    insight: 'Returning customers (61% of volume) show low price sensitivity and fast checkout (< 90s). Conversion elasticity of just −0.3 supports a small raise. New buyers still convert because the cluster benchmark is the category, not this SKU.',
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
    recommendedPrice: 47.9,
    recommendedMargin: 55.3,
    deltaRevenuePct: 13.6,
    deltaMarginPct: -5.7,
    deltaConversionPct: 22.1,
    insight: 'Seasonal peak with searches +38% and intense comparison: 3.2 parallel tabs per session on average. Cart abandonment jumps to 71% above $52. Cutting the ticket now captures the undecided buyer in the 48h decision window, before competitors react.',
  },
];

export const priceToMarginDemo: Record<KioskLang, PriceToMarginDemoContent> = {
  pt: {
    scenarioTitle: 'VivaShop B2B',
    scenarioSubtitle: 'Catálogo · Precificação orientada a conversão',
    storeName: 'VivaShop B2B',
    catalogLabel: 'Catálogo',
    pickHint: 'Toque em um produto para descobrir o preço ideal de conversão',
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
      deltaConversion: 'Δ Conversão',
      latency: 'Latência do modelo',
      latencyHint: 'média mercado ~180 ms',
    },

    objectiveLabel: 'Objetivo: conversão',
    reasoningTitle: 'Como o modelo está pensando',
    reasoningSubtitle: 'Pipeline preditivo · i6ElasticPrice',
    pipeline: [
      { label: 'Lendo sessões, cliques e carrinhos abandonados', microMetric: '48.612 sessões · janela de 30 dias', durationMs: 1400 },
      { label: 'Segmentando clusters de intenção e sensibilidade', microMetric: '6 clusters ativos · cluster dominante: 42%', durationMs: 1400 },
      { label: 'Simulando resposta de conversão em 10.000 cenários', microMetric: 'elasticidade de conversão estimada: -1.8', durationMs: 1800 },
      { label: 'Otimizando para conversão com piso de margem', microMetric: 'restrições: margem mínima · sinal competitivo', durationMs: 1600 },
      { label: 'Recomendando preço ideal para converter', microMetric: 'confiança: 94%', durationMs: 1200 },
    ],
    ctaLabel: 'Aplicar preço',
    rationaleLabel: 'Por que este preço',
    doneLabel: 'Recomendação pronta',
    products: productsPt,
  },
  en: {
    scenarioTitle: 'VivaShop B2B',
    scenarioSubtitle: 'Catalog · Conversion-driven pricing',
    storeName: 'VivaShop B2B',
    catalogLabel: 'Catalog',
    pickHint: 'Tap a product to reveal the ideal conversion price',
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
      deltaConversion: 'Δ Conversion',
      latency: 'Model latency',
      latencyHint: 'market avg ~180 ms',
    },

    objectiveLabel: 'Objective: conversion',
    reasoningTitle: 'How the model is thinking',
    reasoningSubtitle: 'Predictive pipeline · i6ElasticPrice',
    pipeline: [
      { label: 'Reading sessions, clicks and abandoned carts', microMetric: '48,612 sessions · 30-day window', durationMs: 1400 },
      { label: 'Segmenting intent and price-sensitivity clusters', microMetric: '6 active clusters · dominant cluster: 42%', durationMs: 1400 },
      { label: 'Simulating conversion response across 10,000 scenarios', microMetric: 'estimated conversion elasticity: -1.8', durationMs: 1800 },
      { label: 'Optimizing for conversion with a margin floor', microMetric: 'constraints: min margin · competitive signal', durationMs: 1600 },
      { label: 'Recommending the ideal price to convert', microMetric: 'confidence: 94%', durationMs: 1200 },
    ],
    ctaLabel: 'Apply price',
    rationaleLabel: 'Why this price',
    doneLabel: 'Recommendation ready',
    products: productsEn,
  },
};

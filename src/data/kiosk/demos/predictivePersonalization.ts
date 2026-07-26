import type { KioskLang } from '../config';

export type Vertical = 'products' | 'fashion';
export type UserMode = 'logged' | 'anon';

export interface Sku {
  id: string;
  emoji: string;
  name: { pt: string; en: string };
  category: { pt: string; en: string };
  price: number;
  /** ids de outros SKUs deste catálogo — usados como recomendações padrão */
  recIds: string[];
  /** para fashion: ids que compõem um look completo (top + bottom + calçado + acessório) */
  lookIds?: string[];
}

export interface Feature {
  label: { pt: string; en: string };
  microMetric: { pt: string; en: string };
  durationMs: number;
}

export interface ScenarioContent {
  objective: { pt: string; en: string };
  features: Feature[];
  /** argumento genérico exibido junto à recomendação (substitui {name} pelo produto) */
  argument: { pt: string; en: string };
}

export interface CatalogContent {
  title: { pt: string; en: string };
  subtitle: { pt: string; en: string };
  skus: Sku[];
}

// -------- Catálogos --------

const productsCatalog: CatalogContent = {
  title: { pt: 'Vitrine · Eletrônicos', en: 'Storefront · Electronics' },
  subtitle: {
    pt: 'Clique num produto para ver o modelo pensar',
    en: 'Tap a product to watch the model reason',
  },
  skus: [
    {
      id: 'p-headphones',
      emoji: '🎧',
      name: { pt: 'Fone Bluetooth Pro', en: 'Bluetooth Headphones Pro' },
      category: { pt: 'Áudio', en: 'Audio' },
      price: 899.9,
      recIds: ['p-case', 'p-cable', 'p-earbuds', 'p-speaker'],
    },
    {
      id: 'p-earbuds',
      emoji: '🎵',
      name: { pt: 'Earbuds Wireless', en: 'Wireless Earbuds' },
      category: { pt: 'Áudio', en: 'Audio' },
      price: 449.0,
      recIds: ['p-case', 'p-cable', 'p-headphones', 'p-speaker'],
    },
    {
      id: 'p-speaker',
      emoji: '🔊',
      name: { pt: 'Speaker Portátil', en: 'Portable Speaker' },
      category: { pt: 'Áudio', en: 'Audio' },
      price: 599.0,
      recIds: ['p-cable', 'p-headphones', 'p-earbuds', 'p-case'],
    },
    {
      id: 'p-mouse',
      emoji: '🖱️',
      name: { pt: 'Mouse Ergonômico', en: 'Ergonomic Mouse' },
      category: { pt: 'Periféricos', en: 'Peripherals' },
      price: 289.9,
      recIds: ['p-keyboard', 'p-monitor', 'p-cable', 'p-case'],
    },
    {
      id: 'p-keyboard',
      emoji: '⌨️',
      name: { pt: 'Teclado Mecânico', en: 'Mechanical Keyboard' },
      category: { pt: 'Periféricos', en: 'Peripherals' },
      price: 749.0,
      recIds: ['p-mouse', 'p-monitor', 'p-cable', 'p-headphones'],
    },
    {
      id: 'p-monitor',
      emoji: '🖥️',
      name: { pt: 'Monitor UltraWide', en: 'UltraWide Monitor' },
      category: { pt: 'Vídeo', en: 'Video' },
      price: 2199.0,
      recIds: ['p-keyboard', 'p-mouse', 'p-cable', 'p-speaker'],
    },
    {
      id: 'p-cable',
      emoji: '🔌',
      name: { pt: 'Cabo USB-C Trançado', en: 'Braided USB-C Cable' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      price: 89.9,
      recIds: ['p-case', 'p-earbuds', 'p-mouse', 'p-headphones'],
    },
    {
      id: 'p-case',
      emoji: '💼',
      name: { pt: 'Case de Proteção', en: 'Protective Case' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      price: 129.9,
      recIds: ['p-headphones', 'p-earbuds', 'p-cable', 'p-mouse'],
    },
  ],
};

const fashionCatalog: CatalogContent = {
  title: { pt: 'Vitrine · Moda', en: 'Storefront · Fashion' },
  subtitle: {
    pt: 'Clique num item para o modelo montar o look',
    en: 'Tap an item and let the model compose the look',
  },
  skus: [
    {
      id: 'f-shirt',
      emoji: '👕',
      name: { pt: 'Camisa Linho Oversize', en: 'Oversize Linen Shirt' },
      category: { pt: 'Tops', en: 'Tops' },
      price: 289.0,
      recIds: ['f-pants', 'f-sneakers', 'f-cap', 'f-jacket'],
      lookIds: ['f-pants', 'f-sneakers', 'f-cap'],
    },
    {
      id: 'f-tee',
      emoji: '🎽',
      name: { pt: 'T-shirt Premium', en: 'Premium T-shirt' },
      category: { pt: 'Tops', en: 'Tops' },
      price: 169.0,
      recIds: ['f-jeans', 'f-sneakers', 'f-backpack', 'f-cap'],
      lookIds: ['f-jeans', 'f-sneakers', 'f-backpack'],
    },
    {
      id: 'f-jacket',
      emoji: '🧥',
      name: { pt: 'Jaqueta Bomber', en: 'Bomber Jacket' },
      category: { pt: 'Outerwear', en: 'Outerwear' },
      price: 599.0,
      recIds: ['f-tee', 'f-jeans', 'f-boots', 'f-backpack'],
      lookIds: ['f-tee', 'f-jeans', 'f-boots'],
    },
    {
      id: 'f-pants',
      emoji: '👖',
      name: { pt: 'Calça Alfaiataria', en: 'Tailored Trousers' },
      category: { pt: 'Bottoms', en: 'Bottoms' },
      price: 349.0,
      recIds: ['f-shirt', 'f-sneakers', 'f-jacket', 'f-cap'],
      lookIds: ['f-shirt', 'f-sneakers', 'f-cap'],
    },
    {
      id: 'f-jeans',
      emoji: '👖',
      name: { pt: 'Jeans Slim', en: 'Slim Jeans' },
      category: { pt: 'Bottoms', en: 'Bottoms' },
      price: 259.0,
      recIds: ['f-tee', 'f-sneakers', 'f-jacket', 'f-backpack'],
      lookIds: ['f-tee', 'f-sneakers', 'f-backpack'],
    },
    {
      id: 'f-sneakers',
      emoji: '👟',
      name: { pt: 'Tênis Runner', en: 'Runner Sneakers' },
      category: { pt: 'Calçados', en: 'Footwear' },
      price: 549.0,
      recIds: ['f-tee', 'f-jeans', 'f-cap', 'f-backpack'],
      lookIds: ['f-tee', 'f-jeans', 'f-cap'],
    },
    {
      id: 'f-boots',
      emoji: '🥾',
      name: { pt: 'Bota Casual', en: 'Casual Boots' },
      category: { pt: 'Calçados', en: 'Footwear' },
      price: 689.0,
      recIds: ['f-jacket', 'f-jeans', 'f-shirt', 'f-backpack'],
      lookIds: ['f-jacket', 'f-jeans', 'f-backpack'],
    },
    {
      id: 'f-cap',
      emoji: '🧢',
      name: { pt: 'Boné Trucker', en: 'Trucker Cap' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      price: 119.0,
      recIds: ['f-tee', 'f-sneakers', 'f-jeans', 'f-backpack'],
      lookIds: ['f-tee', 'f-jeans', 'f-sneakers'],
    },
    {
      id: 'f-backpack',
      emoji: '🎒',
      name: { pt: 'Mochila Urbana', en: 'Urban Backpack' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      price: 429.0,
      recIds: ['f-tee', 'f-jeans', 'f-sneakers', 'f-jacket'],
      lookIds: ['f-tee', 'f-jeans', 'f-sneakers'],
    },
  ],
};

export const catalogs: Record<Vertical, CatalogContent> = {
  products: productsCatalog,
  fashion: fashionCatalog,
};

// -------- Cenários (features + argumento) --------

export const scenarios: Record<`${UserMode}-${Vertical}`, ScenarioContent> = {
  'logged-products': {
    objective: { pt: 'Cross-sell', en: 'Cross-sell' },
    features: [
      {
        label: { pt: 'Histórico de sessões', en: 'Session history' },
        microMetric: { pt: '312 eventos · janela 30d', en: '312 events · 30d window' },
        durationMs: 520,
      },
      {
        label: { pt: 'Afinidade categórica', en: 'Category affinity' },
        microMetric: { pt: 'top-3: Áudio 0.87 · Perif 0.61', en: 'top-3: Audio 0.87 · Perif 0.61' },
        durationMs: 460,
      },
      {
        label: { pt: 'Co-visualização', en: 'Co-view graph' },
        microMetric: { pt: 'grafo 2-hop · 148 nós', en: '2-hop graph · 148 nodes' },
        durationMs: 540,
      },
      {
        label: { pt: 'Aderência contextual', en: 'Contextual fit' },
        microMetric: { pt: 'estoque · preço · sazonal', en: 'stock · price · seasonal' },
        durationMs: 420,
      },
      {
        label: { pt: 'Cross-sell ranking', en: 'Cross-sell ranking' },
        microMetric: { pt: 'i6RecSys · MAML fine-tune', en: 'i6RecSys · MAML fine-tune' },
        durationMs: 520,
      },
    ],
    argument: {
      pt: 'Sessões recentes indicam afinidade forte em áudio + periféricos. Estes itens co-ocorrem em 3.2× nas compras de {name} nas próximas 48h.',
      en: 'Recent sessions show strong audio + peripherals affinity. These items co-occur 3.2× in purchases following {name} within 48h.',
    },
  },
  'logged-fashion': {
    objective: { pt: 'Cross-sell · Look', en: 'Cross-sell · Outfit' },
    features: [
      {
        label: { pt: 'Histórico de sessões', en: 'Session history' },
        microMetric: { pt: '187 eventos · janela 30d', en: '187 events · 30d window' },
        durationMs: 520,
      },
      {
        label: { pt: 'Estilo & paleta', en: 'Style & palette' },
        microMetric: { pt: 'cluster: urban-minimal', en: 'cluster: urban-minimal' },
        durationMs: 480,
      },
      {
        label: { pt: 'Co-visualização', en: 'Co-view graph' },
        microMetric: { pt: 'grafo 2-hop · 96 nós', en: '2-hop graph · 96 nodes' },
        durationMs: 500,
      },
      {
        label: { pt: 'Aderência contextual', en: 'Contextual fit' },
        microMetric: { pt: 'estação · geo · estoque', en: 'season · geo · stock' },
        durationMs: 420,
      },
      {
        label: { pt: 'Outfit composer', en: 'Outfit composer' },
        microMetric: { pt: 'i6RecSys · topo. loss', en: 'i6RecSys · topo. loss' },
        durationMs: 540,
      },
    ],
    argument: {
      pt: 'O modelo compõe um look coerente com o estilo urban-minimal do usuário. Combinações com {name} elevam ticket médio em 2.4×.',
      en: 'The model composes an outfit aligned to the user’s urban-minimal style. Combos featuring {name} lift AOV by 2.4×.',
    },
  },
  'anon-products': {
    objective: { pt: 'Descoberta', en: 'Discovery' },
    features: [
      {
        label: { pt: 'Cold start', en: 'Cold start' },
        microMetric: { pt: 'geo · hora · canal · device', en: 'geo · hour · channel · device' },
        durationMs: 520,
      },
      {
        label: { pt: 'Similaridade comportamental', en: 'Behavioral similarity' },
        microMetric: { pt: 'embeddings de sessão · k=32', en: 'session embeddings · k=32' },
        durationMs: 560,
      },
      {
        label: { pt: 'Aderência contextual', en: 'Contextual fit' },
        microMetric: { pt: 'catálogo · estoque · trend', en: 'catalog · stock · trend' },
        durationMs: 440,
      },
      {
        label: { pt: 'Descoberta ranking', en: 'Discovery ranking' },
        microMetric: { pt: 'i6RecSys · active learning', en: 'i6RecSys · active learning' },
        durationMs: 520,
      },
    ],
    argument: {
      pt: 'Sem histórico do usuário, cold start + embeddings de sessão apontam para produtos com alta aderência ao contexto de {name} nesta hora e canal.',
      en: 'With no user history, cold start + session embeddings surface items with high contextual fit to {name} at this hour and channel.',
    },
  },
  'anon-fashion': {
    objective: { pt: 'Descoberta · Look', en: 'Discovery · Outfit' },
    features: [
      {
        label: { pt: 'Cold start', en: 'Cold start' },
        microMetric: { pt: 'geo · clima · hora · canal', en: 'geo · weather · hour · channel' },
        durationMs: 520,
      },
      {
        label: { pt: 'Similaridade comportamental', en: 'Behavioral similarity' },
        microMetric: { pt: 'embeddings de sessão · k=24', en: 'session embeddings · k=24' },
        durationMs: 560,
      },
      {
        label: { pt: 'Estilo & paleta', en: 'Style & palette' },
        microMetric: { pt: 'inferido da sessão · confiança 0.72', en: 'inferred from session · conf 0.72' },
        durationMs: 480,
      },
      {
        label: { pt: 'Outfit composer', en: 'Outfit composer' },
        microMetric: { pt: 'i6RecSys · topo. loss', en: 'i6RecSys · topo. loss' },
        durationMs: 540,
      },
    ],
    argument: {
      pt: 'Sem perfil, o modelo infere estilo pela sessão e monta um look coerente com {name}, ajustado a clima e geolocalização atuais.',
      en: 'Without a profile, the model infers style from the session and builds an outfit around {name}, tuned to current weather and geo.',
    },
  },
};

// -------- Labels UI (i18n) --------

export const uiLabels = {
  pt: {
    header: 'Personalização & Descoberta · i6RecSys',
    headerSubtitle: 'Simule a jornada de recomendação em tempo real',
    pickScenarioTitle: 'Escolha o cenário para simular',
    pickScenarioHint: 'Selecione um contexto para iniciar a demo',
    userLogged: 'Usuário logado',
    userAnon: 'Usuário anônimo',
    verticalProducts: 'Varejo · Produtos',
    verticalFashion: 'Varejo · Moda',
    changeScenario: 'Trocar cenário',
    backToCatalog: '← Voltar à vitrine',
    reasoningTitle: 'Raciocínio do modelo · i6RecSys',
    reasoningSubtitle: 'Features processadas em tempo real',
    reasoningIdle: 'Aguardando produto',
    reasoningIdleHint: 'Clique num produto à esquerda para o modelo começar',
    recsTitle: 'Recomendações · também gostam',
    lookTitle: 'Look completo recomendado',
    lookTotal: 'Look completo por',
    rationaleLabel: 'Por que estes itens',
    latencyLabel: 'Latência',
    latencyHint: 'abaixo da média de mercado',
    tapToExplore: 'Clique num item para novo ciclo',
    objectiveLabel: 'Objetivo',
    analyzing: 'Analisando…',
  },
  en: {
    header: 'Personalization & Discovery · i6RecSys',
    headerSubtitle: 'Simulate the recommendation journey in real time',
    pickScenarioTitle: 'Pick a scenario to simulate',
    pickScenarioHint: 'Select a context to start the demo',
    userLogged: 'Logged user',
    userAnon: 'Anonymous user',
    verticalProducts: 'Retail · Products',
    verticalFashion: 'Retail · Fashion',
    changeScenario: 'Change scenario',
    backToCatalog: '← Back to storefront',
    reasoningTitle: 'Model reasoning · i6RecSys',
    reasoningSubtitle: 'Features processed in real time',
    reasoningIdle: 'Waiting for a product',
    reasoningIdleHint: 'Tap a product on the left to start the model',
    recsTitle: 'Recommendations · also viewed',
    lookTitle: 'Recommended full outfit',
    lookTotal: 'Complete look for',
    rationaleLabel: 'Why these items',
    latencyLabel: 'Latency',
    latencyHint: 'below market average',
    tapToExplore: 'Tap an item to run a new cycle',
    objectiveLabel: 'Objective',
    analyzing: 'Analyzing…',
  },
} as const;

export const currency = (v: number, lang: KioskLang) =>
  lang === 'pt' ? `R$ ${v.toFixed(2).replace('.', ',')}` : `$ ${v.toFixed(2)}`;

import type { KioskLang } from '../config';
import imgHeadphones from '@/assets/kiosk/predictive/headphones.jpg';
import imgEarbuds from '@/assets/kiosk/predictive/earbuds.jpg';
import imgSpeaker from '@/assets/kiosk/predictive/speaker.jpg';
import imgMouse from '@/assets/kiosk/predictive/mouse.jpg';
import imgKeyboard from '@/assets/kiosk/predictive/keyboard.jpg';
import imgMonitor from '@/assets/kiosk/predictive/monitor.jpg';
import imgCable from '@/assets/kiosk/predictive/cable.jpg';
import imgCase from '@/assets/kiosk/predictive/case.jpg';
import imgShirt from '@/assets/kiosk/predictive/shirt.jpg';
import imgTee from '@/assets/kiosk/predictive/tee.jpg';
import imgJacket from '@/assets/kiosk/predictive/jacket.jpg';
import imgPants from '@/assets/kiosk/predictive/pants.jpg';
import imgJeans from '@/assets/kiosk/predictive/jeans.jpg';
import imgSneakers from '@/assets/kiosk/predictive/sneakers.jpg';
import imgBoots from '@/assets/kiosk/predictive/boots.jpg';
import imgCap from '@/assets/kiosk/predictive/cap.jpg';
import imgBackpack from '@/assets/kiosk/predictive/backpack.jpg';

export type Vertical = 'products' | 'fashion';
export type UserMode = 'logged' | 'anon';

export type CategoryKey =
  | 'audio'
  | 'peripherals'
  | 'video'
  | 'accessories'
  | 'tops'
  | 'bottoms'
  | 'outerwear'
  | 'footwear'
  | 'fashion-accessories';

export interface Sku {
  id: string;
  emoji: string;
  image: string;
  name: { pt: string; en: string };
  category: { pt: string; en: string };
  categoryKey: CategoryKey;
  price: number;
  recIds: string[];
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
  scenarioIntro: { pt: string; en: string };
  categoryReading: Partial<Record<CategoryKey, { pt: string; en: string }>>;
  recsRationale: { pt: string; en: string };
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
      image: imgHeadphones,
      name: { pt: 'Fone Bluetooth Pro', en: 'Bluetooth Headphones Pro' },
      category: { pt: 'Áudio', en: 'Audio' },
      categoryKey: 'audio',
      price: 899.9,
      recIds: ['p-case', 'p-cable', 'p-earbuds', 'p-speaker'],
    },
    {
      id: 'p-earbuds',
      emoji: '🎵',
      image: imgEarbuds,
      name: { pt: 'Earbuds Wireless', en: 'Wireless Earbuds' },
      category: { pt: 'Áudio', en: 'Audio' },
      categoryKey: 'audio',
      price: 449.0,
      recIds: ['p-case', 'p-cable', 'p-headphones', 'p-speaker'],
    },
    {
      id: 'p-speaker',
      emoji: '🔊',
      image: imgSpeaker,
      name: { pt: 'Speaker Portátil', en: 'Portable Speaker' },
      category: { pt: 'Áudio', en: 'Audio' },
      categoryKey: 'audio',
      price: 599.0,
      recIds: ['p-cable', 'p-headphones', 'p-earbuds', 'p-case'],
    },
    {
      id: 'p-mouse',
      emoji: '🖱️',
      image: imgMouse,
      name: { pt: 'Mouse Ergonômico', en: 'Ergonomic Mouse' },
      category: { pt: 'Periféricos', en: 'Peripherals' },
      categoryKey: 'peripherals',
      price: 289.9,
      recIds: ['p-keyboard', 'p-monitor', 'p-cable', 'p-case'],
    },
    {
      id: 'p-keyboard',
      emoji: '⌨️',
      image: imgKeyboard,
      name: { pt: 'Teclado Mecânico', en: 'Mechanical Keyboard' },
      category: { pt: 'Periféricos', en: 'Peripherals' },
      categoryKey: 'peripherals',
      price: 749.0,
      recIds: ['p-mouse', 'p-monitor', 'p-cable', 'p-headphones'],
    },
    {
      id: 'p-monitor',
      emoji: '🖥️',
      image: imgMonitor,
      name: { pt: 'Monitor UltraWide', en: 'UltraWide Monitor' },
      category: { pt: 'Vídeo', en: 'Video' },
      categoryKey: 'video',
      price: 2199.0,
      recIds: ['p-keyboard', 'p-mouse', 'p-cable', 'p-speaker'],
    },
    {
      id: 'p-cable',
      emoji: '🔌',
      image: imgCable,
      name: { pt: 'Cabo USB-C Trançado', en: 'Braided USB-C Cable' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      categoryKey: 'accessories',
      price: 89.9,
      recIds: ['p-case', 'p-earbuds', 'p-mouse', 'p-headphones'],
    },
    {
      id: 'p-case',
      emoji: '💼',
      image: imgCase,
      name: { pt: 'Case de Proteção', en: 'Protective Case' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      categoryKey: 'accessories',
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
      image: imgShirt,
      name: { pt: 'Camisa Linho Oversize', en: 'Oversize Linen Shirt' },
      category: { pt: 'Tops', en: 'Tops' },
      categoryKey: 'tops',
      price: 289.0,
      recIds: ['f-pants', 'f-sneakers', 'f-cap', 'f-jacket'],
      lookIds: ['f-pants', 'f-sneakers', 'f-cap'],
    },
    {
      id: 'f-tee',
      emoji: '🎽',
      image: imgTee,
      name: { pt: 'T-shirt Premium', en: 'Premium T-shirt' },
      category: { pt: 'Tops', en: 'Tops' },
      categoryKey: 'tops',
      price: 169.0,
      recIds: ['f-jeans', 'f-sneakers', 'f-backpack', 'f-cap'],
      lookIds: ['f-jeans', 'f-sneakers', 'f-backpack'],
    },
    {
      id: 'f-jacket',
      emoji: '🧥',
      image: imgJacket,
      name: { pt: 'Jaqueta Bomber', en: 'Bomber Jacket' },
      category: { pt: 'Outerwear', en: 'Outerwear' },
      categoryKey: 'outerwear',
      price: 599.0,
      recIds: ['f-tee', 'f-jeans', 'f-boots', 'f-backpack'],
      lookIds: ['f-tee', 'f-jeans', 'f-boots'],
    },
    {
      id: 'f-pants',
      emoji: '👖',
      image: imgPants,
      name: { pt: 'Calça Alfaiataria', en: 'Tailored Trousers' },
      category: { pt: 'Bottoms', en: 'Bottoms' },
      categoryKey: 'bottoms',
      price: 349.0,
      recIds: ['f-shirt', 'f-sneakers', 'f-jacket', 'f-cap'],
      lookIds: ['f-shirt', 'f-sneakers', 'f-cap'],
    },
    {
      id: 'f-jeans',
      emoji: '👖',
      image: imgJeans,
      name: { pt: 'Jeans Slim', en: 'Slim Jeans' },
      category: { pt: 'Bottoms', en: 'Bottoms' },
      categoryKey: 'bottoms',
      price: 259.0,
      recIds: ['f-tee', 'f-sneakers', 'f-jacket', 'f-backpack'],
      lookIds: ['f-tee', 'f-sneakers', 'f-backpack'],
    },
    {
      id: 'f-sneakers',
      emoji: '👟',
      image: imgSneakers,
      name: { pt: 'Tênis Runner', en: 'Runner Sneakers' },
      category: { pt: 'Calçados', en: 'Footwear' },
      categoryKey: 'footwear',
      price: 549.0,
      recIds: ['f-tee', 'f-jeans', 'f-cap', 'f-backpack'],
      lookIds: ['f-tee', 'f-jeans', 'f-cap'],
    },
    {
      id: 'f-boots',
      emoji: '🥾',
      image: imgBoots,
      name: { pt: 'Bota Casual', en: 'Casual Boots' },
      category: { pt: 'Calçados', en: 'Footwear' },
      categoryKey: 'footwear',
      price: 689.0,
      recIds: ['f-jacket', 'f-jeans', 'f-shirt', 'f-backpack'],
      lookIds: ['f-jacket', 'f-jeans', 'f-backpack'],
    },
    {
      id: 'f-cap',
      emoji: '🧢',
      image: imgCap,
      name: { pt: 'Boné Trucker', en: 'Trucker Cap' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      categoryKey: 'fashion-accessories',
      price: 119.0,
      recIds: ['f-tee', 'f-sneakers', 'f-jeans', 'f-backpack'],
      lookIds: ['f-tee', 'f-jeans', 'f-sneakers'],
    },
    {
      id: 'f-backpack',
      emoji: '🎒',
      image: imgBackpack,
      name: { pt: 'Mochila Urbana', en: 'Urban Backpack' },
      category: { pt: 'Acessórios', en: 'Accessories' },
      categoryKey: 'fashion-accessories',
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

// -------- Cenários (features + argumento composto) --------

export const scenarios: Record<`${UserMode}-${Vertical}`, ScenarioContent> = {
  'logged-products': {
    objective: { pt: 'Cross-sell', en: 'Cross-sell' },
    features: [
      {
        label: { pt: 'Lendo o histórico de navegação e compra do cliente', en: 'Reading the customer’s browsing and purchase history' },
        microMetric: { pt: 'Sessões, cliques e transações dos últimos 30 dias no perfil identificado.', en: 'Sessions, clicks and transactions from the last 30 days on the identified profile.' },
        durationMs: 520,
      },
      {
        label: { pt: 'Identificando as categorias de maior afinidade', en: 'Identifying the categories with the strongest affinity' },
        microMetric: { pt: 'Áudio e periféricos concentram o interesse recente deste cliente.', en: 'Audio and peripherals concentrate this customer’s recent interest.' },
        durationMs: 460,
      },
      {
        label: { pt: 'Mapeando produtos que costumam ser vistos e comprados juntos', en: 'Mapping products that are usually viewed and bought together' },
        microMetric: { pt: 'Grafo de co-visualização e co-compra a 2 níveis a partir do item âncora.', en: '2-hop co-view and co-purchase graph anchored on the selected item.' },
        durationMs: 540,
      },
      {
        label: { pt: 'Aplicando contexto de estoque, preço e sazonalidade', en: 'Applying stock, price and seasonality context' },
        microMetric: { pt: 'Só entram no ranking itens disponíveis, com preço competitivo e coerentes com o momento.', en: 'Only in-stock, competitively priced and season-consistent items enter the ranking.' },
        durationMs: 420,
      },
      {
        label: { pt: 'Ranqueando as melhores recomendações de cross-sell', en: 'Ranking the best cross-sell recommendations' },
        microMetric: { pt: 'Modelo i6RecSys prioriza combinações com maior probabilidade de compra conjunta.', en: 'The i6RecSys model prioritizes combinations with the highest joint-purchase probability.' },
        durationMs: 520,
      },
    ],
    scenarioIntro: {
      pt: '30d de histórico e {events} eventos indicam afinidade forte em {anchorCat}.',
      en: '30d of history and {events} events show strong affinity for {anchorCat}.',
    },
    categoryReading: {
      audio: {
        pt: '{name} ativa o cluster áudio-mobilidade — usuários com esse perfil compram acessórios de proteção e conectividade em 48h.',
        en: '{name} activates the audio-mobility cluster — this profile buys protection and connectivity accessories within 48h.',
      },
      peripherals: {
        pt: '{name} sinaliza setup de produtividade — o histórico converte forte em bundles de periféricos + vídeo.',
        en: '{name} signals a productivity setup — history converts strongly into peripherals + video bundles.',
      },
      video: {
        pt: '{name} é âncora de alto ticket — clientes desse cluster completam setup com periféricos premium.',
        en: '{name} is a high-ticket anchor — customers in this cluster complete their setup with premium peripherals.',
      },
      accessories: {
        pt: '{name} é acessório de continuidade — perfil recorrente puxa upgrade em categorias-âncora (áudio/periféricos).',
        en: '{name} is a continuity accessory — recurring profile pulls upgrades in anchor categories (audio/peripherals).',
      },
    },
    recsRationale: {
      pt: 'Estes itens co-ocorrem em {mult} nas compras seguintes de {name} — topo do ranking: {cats}.',
      en: 'These items co-occur {mult} in purchases following {name} — top of ranking: {cats}.',
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
    scenarioIntro: {
      pt: 'Estilo urban-minimal ({events} eventos em 30d) guia a composição do look.',
      en: 'Urban-minimal style ({events} events over 30d) guides the outfit composition.',
    },
    categoryReading: {
      tops: {
        pt: '{name} entra como peça-chave superior — o composer prioriza bottoms de caimento reto e calçado clean.',
        en: '{name} enters as the key top — the composer prioritizes straight-fit bottoms and clean footwear.',
      },
      bottoms: {
        pt: '{name} define a base do look — o composer busca tops de paleta neutra e sobreposição leve.',
        en: '{name} sets the outfit base — the composer picks neutral-palette tops and light layering.',
      },
      outerwear: {
        pt: '{name} eleva o outfit em camadas — o composer completa com jeans e footwear de contraste.',
        en: '{name} lifts the outfit in layers — the composer completes with jeans and contrasting footwear.',
      },
      footwear: {
        pt: '{name} ancora o outfit pelos pés — o composer sugere silhueta coerente em tops e bottoms.',
        en: '{name} anchors the outfit from the feet — the composer suggests a coherent silhouette in tops and bottoms.',
      },
      'fashion-accessories': {
        pt: '{name} fecha o styling — o composer sugere peças-base para consolidar o look em torno do acessório.',
        en: '{name} closes the styling — the composer suggests base pieces to build the look around the accessory.',
      },
    },
    recsRationale: {
      pt: 'Combinações com {name} elevam ticket médio em {mult} — look proposto: {cats}.',
      en: 'Combos featuring {name} lift AOV by {mult} — proposed outfit: {cats}.',
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
    scenarioIntro: {
      pt: 'Sem histórico, o modelo lê sinais desta sessão (device, hora, canal) e ancora em {anchorCat}.',
      en: 'With no history, the model reads this session (device, hour, channel) and anchors on {anchorCat}.',
    },
    categoryReading: {
      audio: {
        pt: '{name} sugere jornada de consumo pessoal — sessões anônimas parecidas nesta hora convertem em áudio + acessórios de proteção.',
        en: '{name} suggests a personal-consumption journey — similar anonymous sessions at this hour convert into audio + protection accessories.',
      },
      peripherals: {
        pt: '{name} sinaliza intenção de setup — clusters anônimos semelhantes migram para periféricos complementares e conectividade.',
        en: '{name} signals a setup intent — similar anonymous clusters migrate to complementary peripherals and connectivity.',
      },
      video: {
        pt: '{name} é sinal forte de intenção de compra alta — sessões anônimas com esse padrão exploram periféricos e alto ticket em paralelo.',
        en: '{name} is a strong high-intent signal — anonymous sessions with this pattern explore peripherals and high-ticket in parallel.',
      },
      accessories: {
        pt: '{name} é entrada leve — clusters anônimos parecidos revelam interesse latente em categorias-âncora (áudio/periféricos).',
        en: '{name} is a light entry — similar anonymous clusters reveal latent interest in anchor categories (audio/peripherals).',
      },
    },
    recsRationale: {
      pt: 'Embeddings de sessão (k={k}) posicionam {cats} no topo do ranking para {name} neste contexto.',
      en: 'Session embeddings (k={k}) place {cats} at the top of the ranking for {name} in this context.',
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
    scenarioIntro: {
      pt: 'Sem perfil, o modelo infere estilo pela sessão (clima, geo, hora) e ancora em {anchorCat}.',
      en: 'Without a profile, the model infers style from the session (weather, geo, hour) and anchors on {anchorCat}.',
    },
    categoryReading: {
      tops: {
        pt: '{name} indica intenção casual — estilo inferido sugere paleta neutra e caimento amplo para o restante do look.',
        en: '{name} indicates a casual intent — inferred style suggests neutral palette and relaxed fit across the outfit.',
      },
      bottoms: {
        pt: '{name} define a silhueta — o composer explora tops leves e footwear versátil, coerentes com clima/geo atuais.',
        en: '{name} defines the silhouette — the composer explores light tops and versatile footwear aligned to current weather/geo.',
      },
      outerwear: {
        pt: '{name} sinaliza necessidade de camadas — clima atual reforça peças estruturadas por baixo e footwear de contraste.',
        en: '{name} signals layering intent — current weather reinforces structured base pieces and contrasting footwear.',
      },
      footwear: {
        pt: '{name} ancora o outfit — o composer infere estilo pelo tipo de calçado e propõe silhueta coerente.',
        en: '{name} anchors the outfit — the composer infers style from footwear type and proposes a coherent silhouette.',
      },
      'fashion-accessories': {
        pt: '{name} inicia o styling — sessão anônima explora peças-base para consolidar o look em torno do acessório.',
        en: '{name} starts the styling — anonymous session explores base pieces to build the look around the accessory.',
      },
    },
    recsRationale: {
      pt: 'Similaridade comportamental (k={k}) sugere para {name} um look coerente: {cats}.',
      en: 'Behavioral similarity (k={k}) suggests a coherent outfit for {name}: {cats}.',
    },
  },
};

// -------- Helper: monta o argumento composto --------

function stableHash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function joinCats(cats: string[], lang: KioskLang): string {
  if (cats.length === 0) return '';
  if (cats.length === 1) return cats[0];
  const sep = lang === 'pt' ? ' e ' : ' and ';
  return cats.slice(0, -1).join(', ') + sep + cats[cats.length - 1];
}

function eventsFor(sku: Sku): string {
  // 260..360 range, determinístico
  const h = stableHash(sku.id);
  return String(260 + (h % 100));
}

function multFor(sku: Sku): string {
  // 2.4× .. 3.6×
  const h = stableHash(sku.id);
  const v = 2.4 + ((h % 13) / 10);
  return `${v.toFixed(1)}×`;
}

function kFor(sku: Sku, base: number): string {
  // base ± 6
  const h = stableHash(sku.id);
  return String(base - 6 + (h % 13));
}

export function buildArgument(
  scenarioKey: `${UserMode}-${Vertical}`,
  sku: Sku,
  recs: Sku[],
  lang: KioskLang,
): string {
  const s = scenarios[scenarioKey];
  const anchorCat = sku.category[lang];

  // categorias únicas das recs, preservando ordem
  const catList: string[] = [];
  for (const r of recs) {
    const c = r.category[lang];
    if (!catList.includes(c)) catList.push(c);
  }
  const cats = joinCats(catList, lang);

  const intro = s.scenarioIntro[lang]
    .replace('{anchorCat}', anchorCat)
    .replace('{events}', eventsFor(sku));

  const catReading = s.categoryReading[sku.categoryKey]?.[lang]?.replace('{name}', sku.name[lang]) ?? '';

  const kBase = scenarioKey === 'anon-fashion' ? 24 : 32;
  const rec = s.recsRationale[lang]
    .replace('{name}', sku.name[lang])
    .replace('{cats}', cats)
    .replace('{mult}', multFor(sku))
    .replace('{k}', kFor(sku, kBase));

  return [intro, catReading, rec].filter(Boolean).join(' ');
}

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
    kpiTicketUplift: 'Uplift no ticket',
    kpiCrossSell: 'Propensão cross-sell',
    kpiConfidence: 'Confiança',

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
    kpiTicketUplift: 'Ticket uplift',
    kpiCrossSell: 'Cross-sell propensity',
    kpiConfidence: 'Confidence',
  },
} as const;

export const currency = (v: number, lang: KioskLang) =>
  lang === 'pt' ? `R$ ${v.toFixed(2).replace('.', ',')}` : `$ ${v.toFixed(2)}`;

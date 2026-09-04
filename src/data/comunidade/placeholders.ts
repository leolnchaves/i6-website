/**
 * Imagens provisórias da página /community.
 *
 * Isoladas aqui de propósito: quando as fotos reais chegarem, basta trocar
 * `src` (e `alt`) sem tocar no markup das seções. `tilt` e `span` controlam a
 * colagem apenas a partir de md — abaixo desse breakpoint tudo empilha reto.
 */
import { getPublicAssetUrl } from '@/utils/assetUtils';

export interface MuralImage {
  id: string;
  src: string;
  /** rotação em graus, aplicada só em md+ */
  tilt: number;
  /** proporção do recorte */
  ratio: 'tall' | 'wide' | 'square';
  /** deslocamento vertical dentro da coluna (md+) */
  offset: 'none' | 'down' | 'up';
  /** enquadramento do object-cover (ex.: 'center 22%' para destacar rostos) */
  objectPosition?: string;
}

/** Recorte da colagem da abertura: posição absoluta (md+) já embutida. */
export interface OpeningImage extends MuralImage {
  /** descrição genérica da cena (imagens ilustrativas) */
  alt: string;
  /** classes de posição + tamanho, aplicadas só em md+ */
  place: string;
  /** opacidade da camada */
  opacity: string;
}

const PLACEHOLDER = getPublicAssetUrl('/placeholder.svg');

export const MURAL_IMAGES: MuralImage[] = [
  { id: 'm1', src: getPublicAssetUrl('/images/comunidade/mural-forecasting.jpg'), tilt: -2, ratio: 'tall', offset: 'none' },
  { id: 'm2', src: getPublicAssetUrl('/images/comunidade/mural-recommendation.jpg'), tilt: 2, ratio: 'wide', offset: 'down' },
  { id: 'm3', src: PLACEHOLDER, tilt: -1, ratio: 'square', offset: 'up' },
  { id: 'm4', src: getPublicAssetUrl('/images/comunidade/mural-whiteboard.jpg'), tilt: 3, ratio: 'tall', offset: 'down' },
  // Foto do time: recorte deslocado para cima para os rostos ficarem inteiros.
  { id: 'm5', src: getPublicAssetUrl('/images/comunidade/mural-team.jpg'), tilt: -2, ratio: 'wide', offset: 'none', objectPosition: 'center 22%' },
];

/**
 * Colagem da abertura — cinco recortes na metade direita e nas bordas,
 * sempre fora da caixa de texto do título.
 *
 * ATENÇÃO: estas imagens são ILUSTRATIVAS (geradas por IA), não registros de
 * eventos reais. Quando existirem fotos reais de encontros da comunidade,
 * basta trocar `src` e `alt` de cada item aqui — o markup não muda.
 */
export const OPENING_IMAGES: OpeningImage[] = [
  {
    id: 'o1',
    src: getPublicAssetUrl('/images/comunidade/community-whiteboard.jpg'),
    alt: 'Pessoas reunidas em frente a monitores com código na tela, ao lado de um quadro branco cheio de anotações',
    tilt: -5,
    ratio: 'tall',
    offset: 'none',
    place: 'right-[4%] top-10 h-[330px] w-[225px] rounded-[2rem]',
    opacity: 'opacity-[0.72]',
  },
  {
    id: 'o2',
    src: getPublicAssetUrl('/images/comunidade/community-desks.jpg'),
    alt: 'Mesas de trabalho com telas de código acesas em um ambiente amplo e escuro',
    tilt: 4,
    ratio: 'wide',
    offset: 'up',
    place: 'right-[28%] top-8 h-[165px] w-[250px] rounded-[1.75rem]',
    opacity: 'opacity-[0.55]',
  },
  {
    id: 'o3',
    src: getPublicAssetUrl('/images/comunidade/community-pair.jpg'),
    alt: 'Duas pessoas concentradas diante de um computador, uma delas de fones de ouvido',
    tilt: 7,
    ratio: 'square',
    offset: 'down',
    place: 'right-[16%] top-[62%] h-[180px] w-[180px] rounded-[1.75rem]',
    opacity: 'opacity-[0.62]',
  },
  {
    id: 'o4',
    src: getPublicAssetUrl('/images/comunidade/community-row.jpg'),
    alt: 'Fileira de pessoas de fones de ouvido programando lado a lado em uma mesa longa',
    tilt: 3,
    ratio: 'wide',
    offset: 'down',
    place: 'right-[5%] bottom-6 h-[160px] w-[240px] rounded-[1.75rem]',
    opacity: 'opacity-[0.68]',
  },
  {
    id: 'o5',
    src: getPublicAssetUrl('/images/comunidade/community-audience.jpg'),
    alt: 'Plateia em ambiente escuro acompanhando código projetado em uma tela grande',
    tilt: -6,
    ratio: 'tall',
    offset: 'up',
    place: 'right-[41%] bottom-6 h-[190px] w-[145px] rounded-[1.5rem]',
    opacity: 'opacity-[0.42]',
  },
];

/** Mini painel de código encaixado nos vãos da colagem (lg+). */
export interface OpeningCodeCard {
  id: string;
  place: string;
  tilt: number;
  opacity: string;
  title: string;
  lines: string[];
}

export const OPENING_CODE_CARDS: OpeningCodeCard[] = [
  {
    id: 'c1',
    place: 'right-[15%] top-[24%] w-[260px] rounded-[1.5rem]',
    tilt: -4,
    opacity: 'opacity-[0.92]',
    title: 'train.py',
    lines: ['# fit a decision model', 'model = i6.fit(events)', 'model.evaluate()'],
  },
  {
    id: 'c2',
    place: 'right-[2%] top-[60%] w-[240px] rounded-[1.5rem]',
    tilt: 5,
    opacity: 'opacity-[0.85]',
    title: 'deploy.sh',
    lines: ['i6 deploy --env prod', '# ready in 2 steps'],
  },
  {
    id: 'c3',
    place: 'right-[32%] top-[64%] w-[250px] rounded-[1.5rem]',
    tilt: -7,
    opacity: 'opacity-[0.8]',
    title: 'sdk.ts',
    lines: ['const rec = await i6.rank({', '  scope: "next_best_action",', '})'],
  },
];


export const EVENT_IMAGE = PLACEHOLDER;

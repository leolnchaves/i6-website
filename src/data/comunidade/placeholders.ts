/**
 * Imagens provisórias da página /comunidade.
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
}

/** Recorte da colagem da abertura: posição absoluta (md+) já embutida. */
export interface OpeningImage extends MuralImage {
  /** classes de posição + tamanho, aplicadas só em md+ */
  place: string;
  /** opacidade da camada */
  opacity: string;
}

const PLACEHOLDER = getPublicAssetUrl('/placeholder.svg');

export const MURAL_IMAGES: MuralImage[] = [
  { id: 'm1', src: PLACEHOLDER, tilt: -2, ratio: 'tall', offset: 'none' },
  { id: 'm2', src: PLACEHOLDER, tilt: 2, ratio: 'wide', offset: 'down' },
  { id: 'm3', src: PLACEHOLDER, tilt: -1, ratio: 'square', offset: 'up' },
  { id: 'm4', src: PLACEHOLDER, tilt: 3, ratio: 'tall', offset: 'down' },
];

/**
 * Colagem da abertura — cinco recortes na metade direita e nas bordas,
 * sempre fora da caixa de texto do título.
 */
export const OPENING_IMAGES: OpeningImage[] = [
  {
    id: 'o1',
    src: PLACEHOLDER,
    tilt: -5,
    ratio: 'tall',
    offset: 'none',
    place: 'right-[4%] top-10 h-[330px] w-[225px] rounded-[2rem]',
    opacity: 'opacity-[0.72]',
  },
  {
    id: 'o2',
    src: PLACEHOLDER,
    tilt: 4,
    ratio: 'wide',
    offset: 'up',
    place: 'right-[28%] top-8 h-[165px] w-[250px] rounded-[1.75rem]',
    opacity: 'opacity-[0.55]',
  },
  {
    id: 'o3',
    src: PLACEHOLDER,
    tilt: 7,
    ratio: 'square',
    offset: 'down',
    place: 'right-[16%] top-[62%] h-[180px] w-[180px] rounded-[1.75rem]',
    opacity: 'opacity-[0.62]',
  },
  {
    id: 'o4',
    src: PLACEHOLDER,
    tilt: 3,
    ratio: 'wide',
    offset: 'down',
    place: 'right-[5%] bottom-6 h-[160px] w-[240px] rounded-[1.75rem]',
    opacity: 'opacity-[0.68]',
  },
  {
    id: 'o5',
    src: PLACEHOLDER,
    tilt: -6,
    ratio: 'tall',
    offset: 'up',
    place: 'right-[41%] bottom-6 h-[190px] w-[145px] rounded-[1.5rem]',
    opacity: 'opacity-[0.5]',
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
    place: 'right-[30%] top-[44%] w-[250px] rounded-[1.5rem]',
    tilt: -7,
    opacity: 'opacity-[0.8]',
    title: 'sdk.ts',
    lines: ['const rec = await i6.rank({', '  scope: "next_best_action",', '})'],
  },
];


export const EVENT_IMAGE = PLACEHOLDER;

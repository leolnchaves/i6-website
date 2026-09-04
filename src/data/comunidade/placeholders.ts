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
    place: 'right-[4%] top-20 h-[290px] w-[185px] rounded-[2rem]',
    opacity: 'opacity-[0.72]',
  },
  {
    id: 'o2',
    src: PLACEHOLDER,
    tilt: 4,
    ratio: 'wide',
    offset: 'up',
    place: 'right-[24%] top-10 h-[130px] w-[210px] rounded-[1.5rem]',
    opacity: 'opacity-[0.55]',
  },
  {
    id: 'o3',
    src: PLACEHOLDER,
    tilt: 7,
    ratio: 'square',
    offset: 'down',
    place: 'right-[20%] top-[48%] h-[140px] w-[140px] rounded-[1.5rem]',
    opacity: 'opacity-[0.62]',
  },
  {
    id: 'o4',
    src: PLACEHOLDER,
    tilt: 3,
    ratio: 'wide',
    offset: 'down',
    place: 'right-[6%] bottom-8 h-[120px] w-[180px] rounded-[1.5rem]',
    opacity: 'opacity-[0.68]',
  },
  {
    id: 'o5',
    src: PLACEHOLDER,
    tilt: -6,
    ratio: 'tall',
    offset: 'up',
    place: 'right-[38%] bottom-4 h-[150px] w-[110px] rounded-[1.25rem]',
    opacity: 'opacity-[0.5]',
  },
];

export const EVENT_IMAGE = PLACEHOLDER;

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

const PLACEHOLDER = getPublicAssetUrl('/placeholder.svg');

export const MURAL_IMAGES: MuralImage[] = [
  { id: 'm1', src: PLACEHOLDER, tilt: -2, ratio: 'tall', offset: 'none' },
  { id: 'm2', src: PLACEHOLDER, tilt: 2, ratio: 'wide', offset: 'down' },
  { id: 'm3', src: PLACEHOLDER, tilt: -1, ratio: 'square', offset: 'up' },
  { id: 'm4', src: PLACEHOLDER, tilt: 3, ratio: 'tall', offset: 'down' },
];

export const OPENING_IMAGES: MuralImage[] = [
  { id: 'o1', src: PLACEHOLDER, tilt: -3, ratio: 'tall', offset: 'none' },
  { id: 'o2', src: PLACEHOLDER, tilt: 2, ratio: 'square', offset: 'down' },
];

export const EVENT_IMAGE = PLACEHOLDER;

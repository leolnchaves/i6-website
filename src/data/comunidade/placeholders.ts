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
    place: 'right-[5%] top-16 h-[250px] w-[170px] rounded-[2rem]',
    opacity: 'opacity-[0.72]',
  },
  {
    id: 'o2',
    src: PLACEHOLDER,
    tilt: 4,
    ratio: 'wide',
    offset: 'up',
    place: 'right-[27%] top-12 h-[125px] w-[190px] rounded-[1.5rem]',
    opacity: 'opacity-[0.55]',
  },
  {
    id: 'o3',
    src: PLACEHOLDER,
    tilt: 7,
    ratio: 'square',
    offset: 'down',
    place: 'right-[27%] top-[46%] h-[130px] w-[130px] rounded-[1.5rem]',
    opacity: 'opacity-[0.62]',
  },
  {
    id: 'o4',
    src: PLACEHOLDER,
    tilt: 3,
    ratio: 'wide',
    offset: 'down',
    place: 'right-[6%] bottom-10 h-[115px] w-[170px] rounded-[1.5rem]',
    opacity: 'opacity-[0.68]',
  },
  {
    id: 'o5',
    src: PLACEHOLDER,
    tilt: -6,
    ratio: 'tall',
    offset: 'up',
    place: 'right-[40%] bottom-8 h-[140px] w-[105px] rounded-[1.25rem]',
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
    place: 'right-[16%] top-[26%] w-[220px] rounded-[1.25rem]',
    tilt: -4,
    opacity: 'opacity-[0.92]',
    title: 'train.py',
    lines: ['# fit a decision model', 'model = i6.fit(events)', 'model.evaluate()'],
  },
  {
    id: 'c2',
    place: 'right-[4%] top-[54%] w-[195px] rounded-[1.25rem]',
    tilt: 5,
    opacity: 'opacity-[0.85]',
    title: 'deploy.sh',
    lines: ['i6 deploy --env prod', '# ready in 2 steps'],
  },
  {
    id: 'c3',
    place: 'right-[42%] top-[54%] w-[205px] rounded-[1.25rem]',
    tilt: -7,
    opacity: 'opacity-[0.8]',
    title: 'sdk.ts',
    lines: ['const rec = await i6.rank({', '  scope: "next_best_action",', '})'],
  },
];


export const EVENT_IMAGE = PLACEHOLDER;

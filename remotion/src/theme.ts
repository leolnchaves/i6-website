import { loadFont as loadDisplay } from '@remotion/google-fonts/Rubik';
import { loadFont as loadBody } from '@remotion/google-fonts/Inter';

const display = loadDisplay('normal', { weights: ['500', '700'], subsets: ['latin'] });
const body = loadBody('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });

export const FONT_DISPLAY = display.fontFamily;
export const FONT_BODY = body.fontFamily;

export const NAVY = '#0B1224';
export const NAVY_DEEP = '#070C18';
export const NAVY_SOFT = '#131C33';
export const CORAL = '#F4845F';
export const WHITE = '#FFFFFF';
export const MUTED = 'rgba(255,255,255,0.62)';
export const FAINT = 'rgba(255,255,255,0.32)';
export const LINE = 'rgba(255,255,255,0.10)';

export const EASE = [0.22, 1, 0.36, 1] as const;

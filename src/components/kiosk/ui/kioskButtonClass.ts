/**
 * Estilo único dos botões de ação do kiosk (fundo laranja sólido).
 * Tamanho/tipografia continuam sendo passados por cada chamada.
 */
export const KIOSK_BTN_BASE =
  'inline-flex items-center justify-center rounded-full bg-[#F4845F] text-white font-bold hover:bg-[#F4845F]/90 active:scale-[0.98] transition shadow-[0_0_30px_rgba(244,132,95,0.35)]';

export const KIOSK_BTN_DISABLED = 'bg-white/10 text-white/40 cursor-not-allowed shadow-none';

export const kioskBtn = (extra = '', disabled = false) =>
  `${KIOSK_BTN_BASE}${disabled ? ` ${KIOSK_BTN_DISABLED}` : ''} ${extra}`.trim();

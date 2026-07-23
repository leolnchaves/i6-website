import { memo, useCallback, useMemo, useState } from 'react';
import { Delete, ArrowBigUp, X } from 'lucide-react';

export type KeyboardLayout = 'text' | 'email';

interface Props {
  value: string;
  layout: KeyboardLayout;
  onChange: (next: string) => void;
  onClose: () => void;
  doneLabel: string;
  spaceLabel: string;
  suggestions?: string[];
  suggestionsLabel?: string;
  onSuggestionPick?: (suggestion: string) => void;
}

const ROWS_LOWER: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const ROWS_UPPER: string[][] = ROWS_LOWER.map((row) => row.map((k) => k.toUpperCase()));

const EMAIL_TOP_ROW = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const EMAIL_SYMBOLS = ['@', '.', '_', '-'];

const KioskOnScreenKeyboard = memo(
  ({
    value,
    layout,
    onChange,
    onClose,
    doneLabel,
    spaceLabel,
    suggestions,
    suggestionsLabel,
    onSuggestionPick,
  }: Props) => {
    const [shift, setShift] = useState(false);

    const rows = useMemo(() => (shift ? ROWS_UPPER : ROWS_LOWER), [shift]);

    const insert = useCallback(
      (ch: string) => {
        onChange(value + ch);
        if (shift && layout === 'text') setShift(false);
      },
      [onChange, value, shift, layout],
    );

    const backspace = useCallback(() => {
      onChange(value.slice(0, -1));
    }, [onChange, value]);

    const keyBase =
      'select-none h-[7vmin] min-w-[6.2vmin] px-[1.4vmin] rounded-[1.2vmin] text-[2.4vmin] font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 active:scale-[0.95] active:bg-[#F4845F]/50 transition-all flex items-center justify-center';

    return (
      <div
        className="relative w-full mt-[2vmin] rounded-3xl bg-[#0B1224]/95 backdrop-blur-xl border-2 border-[#F4845F]/40 shadow-[0_10px_60px_rgba(0,0,0,0.6)] px-[2vmin] pt-[2vmin] pb-[2.5vmin]"
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="On-screen keyboard"
      >
        <div className="max-w-[110vmin] mx-auto">
          {/* Suggestions row */}
          {suggestions && suggestions.length > 0 && (
            <div className="mb-[1.8vmin] flex items-center gap-[1.2vmin] flex-wrap">
              {suggestionsLabel && (
                <span className="text-[1.4vmin] uppercase tracking-[0.25em] text-[#F4845F] font-semibold flex-shrink-0">
                  {suggestionsLabel}
                </span>
              )}
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => onSuggestionPick?.(sug)}
                  className="px-[2vmin] h-[5.5vmin] rounded-full bg-[#F4845F]/15 border border-[#F4845F]/40 text-white text-[1.9vmin] font-medium hover:bg-[#F4845F]/25 active:scale-[0.96] transition-all"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Close button */}
          <div className="absolute top-[1vmin] right-[2vmin]">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close keyboard"
              className="w-[5vmin] h-[5vmin] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-[0.95] transition-all"
            >
              <X className="w-[2.4vmin] h-[2.4vmin]" />
            </button>
          </div>

          {/* Email-specific top row */}
          {layout === 'email' && (
            <div className="flex justify-center gap-[0.8vmin] mb-[0.8vmin] flex-wrap">
              {EMAIL_TOP_ROW.map((n) => (
                <button key={n} type="button" onClick={() => insert(n)} className={keyBase}>
                  {n}
                </button>
              ))}
              {EMAIL_SYMBOLS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => insert(s)}
                  className={`${keyBase} text-[#F4845F]`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Letter rows */}
          {rows.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-[0.8vmin] mb-[0.8vmin]">
              {ri === 2 && layout === 'text' && (
                <button
                  type="button"
                  onClick={() => setShift((s) => !s)}
                  aria-label="Shift"
                  className={`${keyBase} min-w-[9vmin] ${shift ? 'bg-[#F4845F]/40 border-[#F4845F]' : ''}`}
                >
                  <ArrowBigUp className="w-[3vmin] h-[3vmin]" />
                </button>
              )}
              {row.map((k) => (
                <button key={k} type="button" onClick={() => insert(k)} className={keyBase}>
                  {k}
                </button>
              ))}
              {ri === 2 && (
                <button
                  type="button"
                  onClick={backspace}
                  aria-label="Backspace"
                  className={`${keyBase} min-w-[9vmin]`}
                >
                  <Delete className="w-[3vmin] h-[3vmin]" />
                </button>
              )}
            </div>
          ))}

          {/* Bottom row: .com (email), space, done */}
          <div className="flex justify-center gap-[0.8vmin] mt-[0.4vmin]">
            {layout === 'email' && (
              <button
                type="button"
                onClick={() => insert('.com')}
                className={`${keyBase} min-w-[11vmin] text-[#F4845F]`}
              >
                .com
              </button>
            )}
            <button
              type="button"
              onClick={() => insert(' ')}
              className={`${keyBase} flex-1 max-w-[50vmin]`}
            >
              {spaceLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="select-none h-[7vmin] min-w-[12vmin] px-[2vmin] rounded-[1.2vmin] text-[2.2vmin] font-bold text-white bg-[#F4845F] hover:brightness-110 active:scale-[0.96] transition-all shadow-[0_0_20px_rgba(244,132,95,0.4)]"
            >
              {doneLabel}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

KioskOnScreenKeyboard.displayName = 'KioskOnScreenKeyboard';

export default KioskOnScreenKeyboard;

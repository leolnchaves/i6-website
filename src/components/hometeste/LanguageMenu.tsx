import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types/language';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const SHORT: Record<Language, string> = { pt: 'PT', en: 'EN', es: 'ES' };

/** Discreet globe button that opens a language list (no flags). */
const LanguageMenu = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Idioma"
        className={`flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-semibold transition-colors ${
          open
            ? 'border-[#F4845F]/60 text-[#F4845F] bg-white/[0.04]'
            : 'border-white/15 text-white/70 hover:text-[#F4845F] hover:border-[#F4845F]/40'
        }`}
      >
        <Globe size={15} strokeWidth={1.75} />
        <span className="tracking-wide">{SHORT[language]}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.6rem)] z-[60] min-w-[168px] overflow-hidden rounded-xl border border-white/20 bg-[#0B1224] shadow-[0_20px_40px_rgba(0,0,0,0.45)] py-1"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === language;
            return (
              <button
                key={l.code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setLanguage(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? 'text-[#F4845F] bg-[#F4845F]/10 font-semibold'
                    : 'text-white/75 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>{l.label}</span>
                {active && <Check size={15} className="flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageMenu;

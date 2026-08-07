import type { KioskLang } from '@/data/kiosk/config';

const flags: Record<KioskLang, JSX.Element> = {
  en: (
    <svg width="20" height="15" viewBox="0 0 7410 3900" aria-hidden>
      <rect width="7410" height="3900" fill="#b22234" />
      <path
        d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
        stroke="#fff"
        strokeWidth="300"
      />
      <rect width="2964" height="2100" fill="#3c3b6e" />
    </svg>
  ),
  pt: (
    <svg width="20" height="14" viewBox="0 0 720 504" aria-hidden>
      <rect width="720" height="504" fill="#009b3a" />
      <path d="M360,42 L660,252 L360,462 L60,252 Z" fill="#fedf00" />
      <circle cx="360" cy="252" r="90" fill="#002776" />
      <path d="M280,252 Q315,222 360,232 Q405,222 440,252" fill="none" stroke="#fff" strokeWidth="8" />
    </svg>
  ),
};

interface Props {
  lang: KioskLang;
  onChange: (lang: KioskLang) => void;
}

/** PT/EN toggle for the standalone /demo experience (touch-sized). */
const KioskLanguageToggle = ({ lang, onChange }: Props) => (
  <div className="flex items-center gap-[0.8vmin]">
    {(['pt', 'en'] as const).map((l) => (
      <button
        key={l}
        type="button"
        onClick={() => onChange(l)}
        aria-label={l === 'pt' ? 'Português' : 'English'}
        aria-pressed={lang === l}
        className={`flex items-center gap-[0.8vmin] px-[1.8vmin] py-[1.2vmin] rounded-full border text-[1.6vmin] font-semibold min-h-[6vmin] transition-colors ${
          lang === l
            ? 'bg-[#F4845F]/20 border-[#F4845F]/60 text-[#F4845F]'
            : 'bg-transparent border-white/25 text-white/70'
        }`}
      >
        <span className="flex items-center">{flags[l]}</span>
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

export default KioskLanguageToggle;

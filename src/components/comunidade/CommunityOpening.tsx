import { ArrowDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy, COMMUNITY_CONTACT_ANCHOR } from '@/data/comunidade/content';
import { OPENING_IMAGES, OPENING_CODE_CARDS } from '@/data/comunidade/placeholders';

/**
 * Abertura: tipografia gigante como elemento gráfico, com uma colagem de
 * recortes ao redor — sempre fora da caixa do texto. Abaixo de lg a colagem
 * sai do caminho e vira uma faixa horizontal sob os CTAs.
 */
const CommunityOpening = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).opening;
  const [imgA, imgB] = OPENING_IMAGES;
  const [codeA] = OPENING_CODE_CARDS;

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 sand-glow" />

      {/* Colagem decorativa — só lg+, dentro do overflow-hidden da seção */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {OPENING_IMAGES.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            style={{ animationDelay: `${i * 110}ms`, rotate: `${img.tilt}deg` }}
            className={`absolute object-cover ring-1 ring-border animate-sand-rise ${img.place} ${img.opacity}`}
          />
        ))}

        {OPENING_CODE_CARDS.map((card, i) => (
          <div
            key={card.id}
            style={{ animationDelay: `${550 + i * 120}ms`, rotate: `${card.tilt}deg` }}
            className={`absolute overflow-hidden border border-[#0B1224]/15 bg-[#0B1224] shadow-[var(--sand-shadow-lift)] animate-sand-rise ${card.place} ${card.opacity}`}
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F4845F]/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="ml-1 font-mono text-[11px] tracking-wide text-white/45">{card.title}</span>
            </div>
            <pre className="px-4 py-3.5 font-mono text-[12px] leading-[1.75] text-white/75">
              <code>
                {card.lines.map((line, j) => (
                  <span key={`${j}-${line}`} className={`block whitespace-pre ${line.startsWith('#') ? 'text-white/35' : ''}`}>
                    {line}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        ))}
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20 md:pt-44 md:pb-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">{copy.eyebrow}</p>

        <h1 className="mt-6 font-bold text-foreground leading-[0.95] tracking-[-0.03em] text-[clamp(2.6rem,8vw,6rem)]">
          <span className="block">{copy.titleTop}</span>
          <span className="relative inline-block">
            <span className="text-primary">{copy.titleAccent}</span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-primary/25"
            />
          </span>
          <span className="block md:pl-[8%]">{copy.titleBottom}</span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,32rem)_auto] md:items-end">
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{copy.sub}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href={COMMUNITY_CONTACT_ANCHOR}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] motion-reduce:hover:scale-100"
          >
            {copy.cta}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        </div>

        {/* Faixa de imagem abaixo de lg: nunca sobre o texto */}
        <div aria-hidden className="mt-12 flex items-end gap-3 lg:hidden">
          <img src={imgA.src} alt={imgA.alt} loading="lazy" className="h-40 flex-[2] rounded-2xl object-cover ring-1 ring-border" />
          <img src={imgB.src} alt={imgB.alt} loading="lazy" className="h-32 flex-1 rounded-2xl object-cover ring-1 ring-border" />
          <div className="h-36 flex-[1.4] overflow-hidden rounded-2xl border border-[#0B1224]/15 bg-[#0B1224]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F4845F]/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="ml-1 font-mono text-[10px] text-white/45">{codeA.title}</span>
            </div>
            <pre className="overflow-hidden px-3 py-2 font-mono text-[10px] leading-[1.6] text-white/75">
              <code>
                {codeA.lines.map((line, j) => (
                  <span key={`${j}-${line}`} className={`block truncate ${line.startsWith('#') ? 'text-white/35' : ''}`}>
                    {line}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>

        <p className="mt-12 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          <ArrowDown size={13} className="text-primary" />
          {copy.scrollHint}
        </p>
      </div>
    </section>
  );
};

export default CommunityOpening;

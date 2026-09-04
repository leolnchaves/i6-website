import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy, CONTACT_ANCHOR } from '@/data/i6Builders/content';

/**
 * Abertura editorial: título à esquerda, painel de código à direita.
 * Sem grade de cards — o painel escuro já sinaliza "plataforma para devs".
 */
const BuilderHero = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).hero;

  const [before, after] = copy.title.split(copy.highlight);

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 sand-glow" />
      <div className="relative container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div className="animate-sand-rise">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-5">{copy.eyebrow}</p>
            <h1 className="text-4xl md:text-[3.4rem] leading-[1.06] font-bold text-foreground">
              {before}
              <span className="text-primary">{copy.highlight}</span>
              {after}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">{copy.sub}</p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={CONTACT_ANCHOR}
                className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {copy.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-foreground/60">
                {copy.badges.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Painel de código — assinatura visual da página */}
          <div className="relative">
            <div className="overflow-hidden rounded-[calc(var(--radius)+6px)] border border-[#0B1224]/15 bg-[#0B1224] shadow-[var(--sand-shadow-lift)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
                <span aria-hidden className="h-2 w-2 rounded-full bg-[#F4845F]/80" />
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/20" />
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/20" />
                <span className="ml-2 font-mono text-[11px] tracking-wide text-white/45">{copy.codeTitle}</span>
              </div>
              <pre className="overflow-x-auto px-5 py-6 font-mono text-[12.5px] leading-[1.85] text-white/80">
                <code>
                  {copy.codeLines.map((line, i) => (
                    <span key={`${i}-${line}`} className="block whitespace-pre">
                      {line.startsWith('#') ? <span className="text-white/35">{line}</span> : line}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderHero;

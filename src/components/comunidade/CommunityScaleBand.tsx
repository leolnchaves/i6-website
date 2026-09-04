import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy } from '@/data/comunidade/content';
import { useRevealOnScroll, revealClass } from '@/hooks/useRevealOnScroll';

/**
 * Prova real de escala: faixa escura com rolagem horizontal contínua dos
 * setores em que a plataforma já roda em produção.
 *
 * A animação pausa em hover e quando qualquer elemento interno recebe foco de
 * teclado (`focus-within`), e é totalmente desligada por
 * prefers-reduced-motion (regra em index.css + `motion-reduce`).
 */
const CommunityScaleBand = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).scale;
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  const track = [...copy.sectors, ...copy.sectors];

  return (
    <section className="relative bg-[#0B1224] py-16 md:py-24 overflow-hidden">
      <div ref={ref} className={`container mx-auto px-6 ${revealClass(revealed)}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F4845F]">{copy.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-[2.8rem] font-bold leading-[1.08] text-white">{copy.title}</h2>
        <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-white/60">{copy.sub}</p>
      </div>

      {/* Faixa contínua */}
      <div
        className="group relative mt-10 md:mt-14 overflow-hidden"
        tabIndex={-1}
        aria-label={copy.sectors.join(', ')}
      >
        <div
          className="flex w-max items-center gap-10 md:gap-16 animate-community-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:px-6"
        >
          {track.map((sector, i) => (
            <span
              key={`${sector}-${i}`}
              className="flex shrink-0 items-center gap-10 md:gap-16 text-[clamp(1.6rem,4.4vw,3.2rem)] font-bold leading-none tracking-[-0.02em] text-white/85"
            >
              {sector}
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#F4845F]" />
            </span>
          ))}
        </div>
      </div>

      <p className="container mx-auto mt-10 px-6 max-w-xl text-xs md:text-sm text-white/45">{copy.note}</p>
    </section>
  );
};

export default CommunityScaleBand;

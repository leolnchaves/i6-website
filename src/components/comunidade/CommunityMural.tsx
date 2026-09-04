import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy } from '@/data/comunidade/content';
import { MURAL_IMAGES } from '@/data/comunidade/placeholders';
import { useRevealOnScroll, revealClass } from '@/hooks/useRevealOnScroll';

/**
 * Mural denso de arquétipos.
 *
 * md+  : colagem assimétrica em duas colunas irregulares, faixas de texto e
 *        recortes de imagem com rotação leve, sobreposição controlada.
 * < md : composição resolvida como pilha reta — imagem acima, texto abaixo,
 *        sem rotação, sem margem negativa e sem sobreposição. A seção usa
 *        overflow-hidden, então nada vaza pela borda nem gera scroll lateral.
 */
const CommunityMural = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).mural;
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div ref={ref} className={`container mx-auto px-6 ${revealClass(revealed)}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">{copy.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl md:text-[2.9rem] font-bold leading-[1.06] text-foreground">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">{copy.sub}</p>
      </div>

      {/* ---------- Colagem (md+) ---------- */}
      <div className="container mx-auto mt-14 hidden px-6 md:block">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {copy.archetypes.map((a, i) => {
            const spans = ['col-span-7', 'col-span-5', 'col-span-4', 'col-span-8', 'col-span-6', 'col-span-6', 'col-span-5', 'col-span-7'];
            const offsets = ['', 'mt-10', '-mt-4', 'mt-6', '', 'mt-12', '-mt-2', 'mt-8'];
            const tilts = ['md:-rotate-1', 'md:rotate-1', '', 'md:rotate-[0.6deg]', 'md:-rotate-[0.8deg]', '', 'md:rotate-1', 'md:-rotate-1'];
            const img = MURAL_IMAGES[i % MURAL_IMAGES.length];
            const withImage = i % 3 === 1;

            return (
              <div key={a.label} className={`${spans[i]} ${offsets[i]} ${tilts[i]}`}>
                <div className="relative">
                  {withImage && (
                    <img
                      src={img.src}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="mb-4 h-40 w-full rounded-[1.75rem] object-cover opacity-75 ring-1 ring-border"
                      style={{ transform: `rotate(${img.tilt}deg)` }}
                    />
                  )}
                  <span className="block text-[11px] font-mono text-primary/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 text-[clamp(1.3rem,2.4vw,2.1rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
                    {a.label}
                  </p>
                  <span aria-hidden className="mt-3 block h-px w-16 bg-primary/50" />
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{a.note}</p>
                  {i === 0 && (
                    <img
                      src={MURAL_IMAGES[0].src}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="mt-8 ml-14 h-52 w-[80%] max-w-md rounded-[1.75rem] object-cover opacity-75 ring-1 ring-border"
                      style={{ transform: `rotate(${MURAL_IMAGES[0].tilt}deg)` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- Pilha reta (< md) ---------- */}
      <div className="container mx-auto mt-10 px-6 md:hidden">
        <ul className="space-y-8">
          {copy.archetypes.map((a, i) => {
            const img = MURAL_IMAGES[i % MURAL_IMAGES.length];
            const withImage = i % 3 === 1;
            return (
              <li key={a.label} className={i % 2 === 1 ? 'pl-5 border-l border-primary/30' : ''}>
                {withImage && (
                  <img
                    src={img.src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="mb-3 h-32 w-full rounded-2xl object-cover opacity-75 ring-1 ring-border"
                  />
                )}
                <span className="block text-[11px] font-mono text-primary/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-1.5 text-xl font-bold leading-tight text-foreground">{a.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.note}</p>
                {i === 0 && (
                  <img
                    src={MURAL_IMAGES[0].src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="mt-4 h-32 w-full rounded-2xl object-cover opacity-75 ring-1 ring-border"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CommunityMural;

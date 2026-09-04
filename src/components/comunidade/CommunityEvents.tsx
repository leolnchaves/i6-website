import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy } from '@/data/comunidade/content';
import { useRevealOnScroll, revealClass } from '@/hooks/useRevealOnScroll';

/**
 * Cinco encontros em escada de largura total. O destaque do i6 Builder Summit
 * é só um traço vertical terracota + linha sutil, sem peso visual exagerado.
 * Sem datas, sem frequência, sem promessas de calendário.
 */
const CommunityEvents = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).events;
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  const indents = ['md:ml-0', 'md:ml-[12%]', 'md:ml-[28%]', 'md:ml-[44%]', 'md:ml-[56%]'];
  const sizes = [
    'text-[clamp(2rem,5.4vw,4.2rem)]',
    'text-[clamp(1.9rem,4.8vw,3.7rem)]',
    'text-[clamp(1.8rem,4.2vw,3.2rem)]',
    'text-[clamp(1.7rem,3.8vw,2.8rem)]',
    'text-[clamp(1.6rem,3.4vw,2.4rem)]',
  ];

  return (
    <section className="relative overflow-hidden bg-secondary/60 py-20 md:py-28">
      <div ref={ref} className={`container mx-auto px-6 ${revealClass(revealed)}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">{copy.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-[2.8rem] font-bold leading-[1.08] text-foreground">{copy.title}</h2>
        <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">{copy.sub}</p>

        <ol className="mt-14 space-y-14 md:space-y-16">
          {copy.items.map((item, i) => {
            const isHighlight = i === copy.items.length - 1;
            return (
              <li key={item.name} className={`relative ${indents[i]}`}>
                {isHighlight && (
                  <span
                    aria-hidden
                    className="absolute -left-4 top-1/2 hidden h-8 w-[3px] -translate-y-1/2 rounded-full bg-primary md:block"
                  />
                )}
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <span
                    className={`${sizes[i]} font-bold leading-none tracking-[-0.03em] ${
                      isHighlight ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  aria-hidden
                  className={`mt-5 block h-px w-full ${isHighlight ? 'max-w-2xl bg-primary/60' : 'max-w-xl bg-border'}`}
                />
                <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">{item.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default CommunityEvents;

import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy } from '@/data/comunidade/content';
import { useRevealOnScroll, revealClass } from '@/hooks/useRevealOnScroll';

/**
 * Eventos ditos com autoridade: composição escalonada em diagonal, cada peça
 * com peso tipográfico diferente. Sem cards, sem datas inventadas.
 */
const CommunityEvents = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).events;
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  const indents = ['md:ml-0', 'md:ml-[12%]', 'md:ml-[24%]'];
  const sizes = ['text-[clamp(2rem,5.4vw,4.2rem)]', 'text-[clamp(1.8rem,4.6vw,3.4rem)]', 'text-[clamp(1.7rem,4.2vw,3rem)]'];

  return (
    <section className="relative overflow-hidden bg-secondary/60 py-20 md:py-28">
      <div ref={ref} className={`container mx-auto px-6 ${revealClass(revealed)}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">{copy.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-[2.8rem] font-bold leading-[1.08] text-foreground">{copy.title}</h2>
        <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">{copy.sub}</p>

        <ol className="mt-14 space-y-14 md:space-y-16">
          {copy.items.map((item, i) => (
            <li key={item.name} className={indents[i]}>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span className={`${sizes[i]} font-bold leading-none tracking-[-0.03em] text-foreground`}>
                  {item.name}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {item.kicker}
                </span>
              </div>
              <span aria-hidden className="mt-5 block h-px w-full max-w-xl bg-border" />
              <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CommunityEvents;

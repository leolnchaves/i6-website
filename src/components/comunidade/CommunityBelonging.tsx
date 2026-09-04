import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { communityCopy } from '@/data/comunidade/content';
import { useRevealOnScroll, revealClass } from '@/hooks/useRevealOnScroll';

/**
 * Convite de pertencimento: bloco curto e frontal, tipografia grande e uma
 * lista sem moldura. Sem linguagem de fila de espera.
 */
const CommunityBelonging = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, communityCopy).belonging;
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden className="absolute inset-0 sand-glow opacity-70" />
      <div ref={ref} className={`relative container mx-auto px-6 ${revealClass(revealed)}`}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">{copy.eyebrow}</p>
            <h2 className="mt-4 text-[clamp(2rem,5.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
              {copy.title}
            </h2>
          </div>
          <div className="lg:pt-[1.75rem]">
            {copy.body.map((p) => (
              <p key={p} className="mb-4 text-base md:text-lg leading-relaxed text-muted-foreground">{p}</p>
            ))}
            <ul className="mt-6 space-y-2.5">
              {copy.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm font-medium text-foreground/75">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityBelonging;

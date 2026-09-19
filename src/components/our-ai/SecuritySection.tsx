import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalizedPath } from '@/utils/localizedPath';
import Reveal from '@/components/Reveal';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['security'];
}

const SecuritySection = ({ content }: Props) => {
  const localized = useLocalizedPath();
  return (
    <section id="governanca" aria-label="Governance, privacy, and security" className="border-t border-border/60 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">{content.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-foreground md:text-[2.5rem]">{content.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{content.lead}</p>
          <p className="mt-8 max-w-xl text-sm text-muted-foreground">{content.ctaQuestion}</p>
          <Link
            to={`${localized('/contact')}?intent=security#contact-form`}
            className="group mt-2.5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {content.ctaLink}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border/60 bg-card/30 p-6">
                <h3 className="font-display text-base font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;

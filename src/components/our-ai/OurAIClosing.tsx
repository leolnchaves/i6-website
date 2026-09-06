import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['closing'];
}

/** Fechamento próprio desta página — CTAFinal.tsx (compartilhado) não é usado. */
const OurAIClosing = memo(({ content }: Props) => {
  const localized = useLocalizedPath();

  return (
    <section className="container mx-auto px-6 pb-24 pt-8">
      <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-primary/25 bg-accent px-6 py-14 md:px-14 md:py-16">
        <div aria-hidden className="absolute inset-0 sand-glow" />
        <div className="relative max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] font-bold leading-[1.14] text-foreground">{content.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{content.lead}</p>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <Link
              to={localized('/contact')}
              className="group inline-flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/10"
            >
              {content.primary}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to={localized('/i6-builders')}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {content.secondary}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <a
              href="https://i6decision.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {content.tertiary}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
});

OurAIClosing.displayName = 'OurAIClosing';
export default OurAIClosing;

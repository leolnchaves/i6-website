import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['science'];
}

/** Base científica enxuta: 2-3 destaques reais + CTA para /i6-intelligence. */
const ScienceHighlights = memo(({ content }: Props) => {
  const localized = useLocalizedPath();

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-[2.4rem] font-bold leading-[1.14] text-foreground">{content.title}</h2>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">{content.lead}</p>
      </div>

      <ul className="mt-12 border-t border-border">
        {content.highlights.map((h) => (
          <li key={h.url + h.title} className="border-b border-border">
            <a
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2 py-6 transition-colors hover:bg-secondary/50 md:grid-cols-[17.5rem_1fr] md:gap-10"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                {h.badge}
              </span>
              <span>
                <span className="flex items-start gap-2 text-base font-semibold text-foreground">
                  {h.title}
                  <ArrowUpRight
                    size={15}
                    className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{h.venue}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a
          href={content.founder.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {content.founder.label}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        <Link
          to={localized('/i6-intelligence')}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {content.cta}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  );
});

ScienceHighlights.displayName = 'ScienceHighlights';
export default ScienceHighlights;

import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['research'];
}

const ResearchSection = memo(({ content }: Props) => {
  return (
    <section className="relative py-14 md:py-20 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-10 md:mb-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#F4845F] mb-3">
            {content.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            {content.title}
          </h2>
          <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-3xl">
            {content.lead}
          </p>
        </div>

        {/* Publications */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-xs uppercase tracking-[0.18em] text-white/40 mb-4">
            {content.publicationsLabel}
          </h3>
          <ul className="divide-y divide-white/10">
            {content.publications.map((p) => (
              <li key={p.url} className="py-5 group">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-[#F4845F] mb-1.5">
                      {p.badge}
                    </p>
                    <h4 className="text-base md:text-lg text-white font-semibold leading-snug group-hover:text-[#F4845F] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-sm text-white/60 italic mt-1 leading-relaxed">
                      {p.venue}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-white/70 group-hover:text-[#F4845F] transition-colors shrink-0 md:pt-6">
                    {content.openLabel}
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Talks */}
        <div className="border-t border-white/10 pt-6 mt-12">
          <h3 className="text-xs uppercase tracking-[0.18em] text-white/40 mb-4">
            {content.talksLabel}
          </h3>
          <ul className="divide-y divide-white/10">
            {content.talks.map((t) => (
              <li key={t.url} className="py-5 group">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-[#F4845F] mb-1.5">
                      PALESTRA · {t.venue}
                    </p>
                    <h4 className="text-base md:text-lg text-white font-semibold leading-snug group-hover:text-[#F4845F] transition-colors">
                      {t.title}
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-white/70 group-hover:text-[#F4845F] transition-colors shrink-0 md:pt-4">
                    {content.watchLabel}
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

ResearchSection.displayName = 'ResearchSection';
export default ResearchSection;

import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['reasoning'];
}

/**
 * Faixa grafite que funde balanceamento de diversidade e explicabilidade
 * numa narrativa técnica única — sem exemplos de vitrine de varejo.
 */
const ReasoningSection = memo(({ content }: Props) => (
  <section className="bg-[hsl(24_10%_14%)] py-16 md:py-24">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-[2.6rem] font-bold leading-[1.12] text-[hsl(36_43%_98%)]">
          {content.title}
        </h2>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-[hsl(36_20%_82%)]">{content.lead}</p>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] bg-[hsl(36_20%_82%/0.18)] md:grid-cols-2">
        {content.parts.map((part) => (
          <article key={part.index} className="bg-[hsl(24_10%_14%)] p-7 md:p-9">
            <p className="font-mono text-xs text-primary">{part.index}</p>
            <h3 className="mt-3 text-xl font-semibold text-[hsl(36_43%_98%)]">{part.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-[hsl(36_20%_82%/0.85)]">{part.description}</p>
            <ul className="mt-6 space-y-3 border-t border-[hsl(36_20%_82%/0.18)] pt-5">
              {part.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-[hsl(36_20%_82%/0.85)]">
                  <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
));

ReasoningSection.displayName = 'ReasoningSection';
export default ReasoningSection;

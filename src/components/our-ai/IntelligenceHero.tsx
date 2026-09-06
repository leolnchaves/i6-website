import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['hero'];
}

/** Abertura tipográfica: distingue esta camada do Builder Platform e da Decision Suite. */
const IntelligenceHero = memo(({ content }: Props) => (
  <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
    <div aria-hidden className="absolute inset-0 sand-glow" />
    <div className="container relative mx-auto px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
      <h1 className="mt-5 max-w-4xl text-4xl md:text-[3.4rem] font-bold leading-[1.06] text-foreground">
        {content.title}
      </h1>
      <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">{content.lead}</p>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border md:grid-cols-3">
        {content.layers.map((layer) => (
          <li
            key={layer.name}
            className={`p-6 ${layer.current ? 'bg-accent' : 'bg-card'}`}
          >
            <p
              className={`text-sm font-semibold ${
                layer.current ? 'text-accent-foreground' : 'text-foreground'
              }`}
            >
              {layer.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.role}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
));

IntelligenceHero.displayName = 'IntelligenceHero';
export default IntelligenceHero;

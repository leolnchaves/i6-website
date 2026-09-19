import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['engines'];
}

/** Três motores proprietários, um cartão claro por motor. */
const EnginesTrio = memo(({ content }: Props) => (
  <section className="container mx-auto px-6 py-16 md:py-24">
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
      <h2 className="mt-4 text-3xl md:text-[2.6rem] font-bold leading-[1.12] text-foreground">{content.title}</h2>
      <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
        <span className="block">{content.lead[0]}</span>
        <span className="block">{content.lead[1]}</span>
      </p>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {content.items.map((engine) => (
        <article key={engine.id} id={engine.id} className="sand-card sand-card-hover scroll-mt-28 p-7">
          <h3 className="text-xl font-semibold text-foreground">{engine.name}</h3>
          <p className="mt-1 text-sm font-medium text-primary">{engine.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{engine.description}</p>
          <ul className="mt-5 space-y-3 border-t border-border pt-5">
            {engine.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>

    <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">{content.note}</p>
  </section>
));

EnginesTrio.displayName = 'EnginesTrio';
export default EnginesTrio;

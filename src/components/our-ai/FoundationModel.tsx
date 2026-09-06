import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['foundation'];
}

/** Modelo fundacional: arquitetura, escala de treino e diversidade setorial. */
const FoundationModel = memo(({ content }: Props) => (
  <section className="container mx-auto px-6 py-16 md:py-24">
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
      <h2 className="mt-4 font-mono text-3xl md:text-[2.6rem] font-bold leading-[1.1] text-foreground">
        {content.name}
      </h2>
      <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">{content.description}</p>
    </div>

    <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
          {content.architectureTitle}
        </h3>
        <dl className="mt-5 border-t border-border">
          {content.architecture.map((a) => (
            <div key={a.term} className="border-b border-border py-5">
              <dt className="font-mono text-sm font-semibold text-accent-foreground">{a.term}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{content.statsTitle}</h3>
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border">
            {content.stats.map((s) => (
              <div key={s.label} className="bg-card p-5">
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{content.mixTitle}</h3>
          <ul className="mt-5 space-y-3">
            {content.mix.map((m) => (
              <li key={m.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  <span className="text-sm font-semibold text-foreground">{m.value}</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary/70" style={{ width: m.value }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-14 rounded-[var(--radius)] border border-border bg-secondary/60 p-7">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
        {content.references.title}
      </h3>
      <ul className="mt-5 grid gap-5 md:grid-cols-2">
        {content.references.items.map((r) => (
          <li key={r.paper}>
            <p className="text-sm font-semibold text-foreground">{r.paper}</p>
            <p className="mt-1 text-xs text-accent-foreground">{r.author}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.note}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
));

FoundationModel.displayName = 'FoundationModel';
export default FoundationModel;

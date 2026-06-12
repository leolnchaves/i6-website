import { memo } from 'react';
import { Layers, TrendingUp, DollarSign, MessageSquare } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['engines'];
  foundation: OurAIContent['thesis']['foundation'];
}

const ENGINE_ICONS = {
  i6recsys: Layers,
  i6previsio: TrendingUp,
  i6elasticprice: DollarSign,
  i6signal: MessageSquare,
} as const;

const EnginesGrid = memo(({ content, foundation }: Props) => {
  return (
    <section className="relative pt-6 pb-14 md:pt-8 md:pb-20 bg-[#0A101F]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-sm md:text-base text-white/55 leading-relaxed">{content.lead}</p>
        </div>

        {(() => {
          const signal = content.items.find((i) => i.id === 'i6signal');
          const engines = content.items.filter((i) => i.id !== 'i6signal');
          const renderCard = (eng: typeof content.items[number], emphasize = false) => {
            const Icon = ENGINE_ICONS[eng.id];
            return (
              <article
                key={eng.id}
                id={eng.id}
                className={`group border rounded-lg p-7 transition-all duration-300 scroll-mt-24 ${
                  emphasize
                    ? 'border-[#F4845F]/40 bg-gradient-to-r from-[#F4845F]/[0.06] via-white/[0.02] to-[#F4845F]/[0.06] hover:border-[#F4845F]/60'
                    : 'border-white/10 bg-white/[0.015] hover:border-[#F4845F]/40 hover:bg-white/[0.03]'
                }`}
                itemScope
                itemType="https://schema.org/SoftwareApplication"
              >
                <meta itemProp="applicationCategory" content="BusinessApplication" />
                <meta itemProp="operatingSystem" content="Cloud" />
                <div className="flex items-start gap-4 mb-4">
                  <div className={`shrink-0 w-10 h-10 rounded-md border flex items-center justify-center text-[#F4845F] transition-colors ${emphasize ? 'border-[#F4845F]/50' : 'border-white/10 group-hover:border-[#F4845F]/50'}`}>
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white" itemProp="name">{eng.name}</h3>
                    <p className="text-[11px] text-[#F4845F] uppercase tracking-wider font-semibold mt-0.5">
                      {eng.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed" itemProp="description">
                  {eng.description}
                </p>
              </article>
            );
          };

          return (
            <div>
              {/* Top layer — i6Signal */}
              {signal && (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F4845F]/80 text-center mb-3">
                    Camada conversacional
                  </p>
                  {renderCard(signal, true)}
                </div>
              )}

              {/* Connector — three lines descending from Signal to engines below */}
              <div aria-hidden className="grid grid-cols-3 gap-5 h-8 px-[12%] md:px-[18%]">
                <div className="flex justify-center"><span className="w-px h-full bg-gradient-to-b from-[#F4845F]/50 to-[#F4845F]/10" /></div>
                <div className="flex justify-center"><span className="w-px h-full bg-gradient-to-b from-[#F4845F]/50 to-[#F4845F]/10" /></div>
                <div className="flex justify-center"><span className="w-px h-full bg-gradient-to-b from-[#F4845F]/50 to-[#F4845F]/10" /></div>
              </div>

              {/* Foundation layer — 3 predictive engines */}
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 text-center mb-3">
                Motores preditivos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {engines.map((eng) => renderCard(eng))}
              </div>
            </div>
          );
        })()}

        {/* Foundation model card — same section as engines */}
        <div className="mt-8 border border-white/10 rounded-lg p-8 md:p-10 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F4845F] mb-2">
                {foundation.label}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
                {foundation.name}
              </h3>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-md">
              {foundation.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-6 border-t border-white/10">
            {foundation.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl md:text-2xl font-bold text-white mb-1 font-mono">{s.value}</div>
                <div className="text-[11px] text-white/45 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-6 border-t border-white/10">
            {foundation.mix.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1.5 text-xs">
                <span className="text-[#F4845F] font-semibold font-mono">{m.value}</span>
                <span className="text-white/45">{m.label}</span>
              </div>
            ))}
          </div>

          <details className="mt-6 pt-6 border-t border-white/10 group">
            <summary className="cursor-pointer text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45 hover:text-[#F4845F] transition-colors list-none flex items-center gap-2">
              <span className="inline-block w-2 h-px bg-current" />
              {foundation.references.title}
              <span className="ml-auto group-open:rotate-180 transition-transform text-xs">▾</span>
            </summary>
            <ul className="mt-4 space-y-3 text-xs text-white/55">
              {foundation.references.items.map((r) => (
                <li key={r.paper} className="leading-relaxed">
                  <span className="text-white/75 font-medium">{r.author}</span> — <em>{r.paper}</em>
                  <div className="text-white/40 italic mt-0.5">{r.note}</div>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Differentiators */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 text-center mb-5">
            {content.differentiators.title}
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {content.differentiators.items.map((d) => (
              <span
                key={d}
                className="text-xs md:text-sm text-white/65 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

EnginesGrid.displayName = 'EnginesGrid';
export default EnginesGrid;

import { memo } from 'react';
import { Layers, TrendingUp, DollarSign, MessageSquare } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['engines'];
}

const ENGINE_ICONS = {
  i6recsys: Layers,
  i6previsio: TrendingUp,
  i6elasticprice: DollarSign,
  i6signal: MessageSquare,
} as const;

const EnginesGrid = memo(({ content }: Props) => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A101F]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-sm md:text-base text-white/55 leading-relaxed">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.items.map((eng) => {
            const Icon = ENGINE_ICONS[eng.id];
            return (
              <article
                key={eng.id}
                id={eng.id}
                className="group border border-white/10 rounded-lg p-7 bg-white/[0.015] hover:border-[#F4845F]/40 hover:bg-white/[0.03] transition-all duration-300 scroll-mt-24"
                itemScope
                itemType="https://schema.org/SoftwareApplication"
              >
                <meta itemProp="applicationCategory" content="BusinessApplication" />
                <meta itemProp="operatingSystem" content="Cloud" />
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-10 h-10 rounded-md border border-white/10 flex items-center justify-center text-[#F4845F] group-hover:border-[#F4845F]/50 transition-colors">
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
          })}
        </div>

        {/* Differentiators */}
        <div className="mt-14 pt-10 border-t border-white/5">
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

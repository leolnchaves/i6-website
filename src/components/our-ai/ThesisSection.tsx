import { memo } from 'react';
import { Target, Filter, Compass } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['thesis'];
}

const icons = [Target, Filter, Compass];

const ThesisSection = memo(({ content }: Props) => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14 max-w-3xl mx-auto leading-tight">
          {content.title}
        </h2>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
          {content.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <div key={p.title} className="text-center md:text-left">
                <Icon size={22} strokeWidth={1.25} className="text-[#F4845F] mx-auto md:mx-0 mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{p.text}</p>
              </div>
            );
          })}
        </div>

        {/* Foundation model card */}
        <div className="border border-white/10 rounded-lg p-8 md:p-10 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F4845F] mb-2">
                {content.foundation.label}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
                {content.foundation.name}
              </h3>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-md">
              {content.foundation.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-6 border-t border-white/10">
            {content.foundation.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl md:text-2xl font-bold text-white mb-1 font-mono">{s.value}</div>
                <div className="text-[11px] text-white/45 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Mix */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-6 border-t border-white/10">
            {content.foundation.mix.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1.5 text-xs">
                <span className="text-[#F4845F] font-semibold font-mono">{m.value}</span>
                <span className="text-white/45">{m.label}</span>
              </div>
            ))}
          </div>

          {/* References - collapsible details */}
          <details className="mt-6 pt-6 border-t border-white/10 group">
            <summary className="cursor-pointer text-[11px] font-semibold tracking-[0.2em] uppercase text-white/45 hover:text-[#F4845F] transition-colors list-none flex items-center gap-2">
              <span className="inline-block w-2 h-px bg-current" />
              {content.foundation.references.title}
              <span className="ml-auto group-open:rotate-180 transition-transform text-xs">▾</span>
            </summary>
            <ul className="mt-4 space-y-3 text-xs text-white/55">
              {content.foundation.references.items.map((r) => (
                <li key={r.paper} className="leading-relaxed">
                  <span className="text-white/75 font-medium">{r.author}</span> — <em>{r.paper}</em>
                  <div className="text-white/40 italic mt-0.5">{r.note}</div>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
});

ThesisSection.displayName = 'ThesisSection';
export default ThesisSection;

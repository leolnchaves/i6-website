import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['dualValue'];
}

const DualValueSection = memo(({ content }: Props) => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14 max-w-3xl mx-auto leading-tight">
          {content.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-lg overflow-hidden">
          {content.columns.map((col, idx) => (
            <div key={col.title} className="bg-[#0B1224] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#F4845F] text-2xl font-mono font-bold">0{idx + 1}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white">{col.title}</h3>
              </div>
              <ul className="space-y-3 mb-8">
                {col.points.map((p) => (
                  <li key={p} className="text-sm text-white/60 leading-relaxed flex gap-3">
                    <span className="text-[#F4845F] mt-1.5 shrink-0 inline-block w-3 h-px bg-current" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-white/10">
                <code className="text-xs md:text-sm text-[#F4845F] font-mono leading-relaxed block">
                  {col.formula}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

DualValueSection.displayName = 'DualValueSection';
export default DualValueSection;

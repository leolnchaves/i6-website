import { memo } from 'react';
import { Target, Filter, Compass } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['thesis'];
}

const icons = [Target, Filter, Compass];

const ThesisSection = memo(({ content }: Props) => {
  return (
    <section className="relative py-14 md:py-20 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 max-w-3xl mx-auto leading-tight">
          {content.title}
        </h2>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
      </div>
    </section>
  );
});

ThesisSection.displayName = 'ThesisSection';
export default ThesisSection;

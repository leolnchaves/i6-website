import { memo } from 'react';
import { ShieldCheck, Lock, KeyRound, Maximize2, EyeOff } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['security'];
}

const ICONS = [EyeOff, ShieldCheck, Lock, KeyRound, Maximize2];

const SecuritySection = memo(({ content }: Props) => {
  return (
    <section className="relative py-14 md:py-20 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 max-w-3xl mx-auto leading-tight">
          {content.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-lg overflow-hidden">
          {content.pillars.map((p, idx) => {
            const Icon = ICONS[idx];
            return (
              <div key={p.title} className="bg-[#0B1224] p-6 md:p-7 text-center md:text-left">
                <Icon size={20} strokeWidth={1.3} className="text-[#F4845F] mx-auto md:mx-0 mb-4" />
                <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

SecuritySection.displayName = 'SecuritySection';
export default SecuritySection;

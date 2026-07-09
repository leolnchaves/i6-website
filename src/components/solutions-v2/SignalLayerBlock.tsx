import { memo } from 'react';
import { Sparkles } from 'lucide-react';
import { solutionsV2Content } from '@/data/solutionsV2/content';
import I6SignalDemo from '@/components/solutions/I6SignalDemo';

const SignalLayerBlock = memo(() => {
  const { signal } = solutionsV2Content;

  return (
    <section className="py-16 md:py-20 bg-[#0B1224] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
              {signal.eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {signal.title}
            </h2>
            <p className="text-base text-white/80 leading-snug mb-3">
              {signal.tagline}
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              {signal.description}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F4845F]/80 mb-3">
              {signal.examplesTitle}
            </p>
            <ul className="space-y-2">
              {signal.examples.map((ex) => (
                <li key={ex} className="flex items-start gap-2 text-sm text-white/75 leading-snug">
                  <Sparkles className="w-4 h-4 text-[#F4845F] mt-0.5 flex-shrink-0" />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <I6SignalDemo />
    </section>
  );
});

SignalLayerBlock.displayName = 'SignalLayerBlock';
export default SignalLayerBlock;

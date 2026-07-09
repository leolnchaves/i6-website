import { memo } from 'react';
import { Sparkles } from 'lucide-react';
import { solutionsV2Content } from '@/data/solutionsV2/content';
import I6SignalDemo from '@/components/solutions/I6SignalDemo';

const SignalLayerBlock = memo(() => {
  const { signal } = solutionsV2Content;

  return (
    <section className="py-16 md:py-20 bg-[#0B1224] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl mb-12">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
            {signal.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {signal.title}
          </h2>
          <p className="text-lg text-white/80 leading-snug mb-4">
            {signal.subtitle}
          </p>
          <p className="text-base text-white/60 leading-relaxed">
            {signal.description}
          </p>
        </div>
      </div>
      
      <I6SignalDemo />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-16">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#F4845F]/80 mb-6 text-center">
            {signal.examplesTitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
            {signal.examples.map((ex) => (
              <div key={ex} className="flex items-start gap-3 text-sm text-white/75 leading-snug">
                <Sparkles className="w-4 h-4 text-[#F4845F] mt-0.5 flex-shrink-0" />
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SignalLayerBlock.displayName = 'SignalLayerBlock';
export default SignalLayerBlock;

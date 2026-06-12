import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['hero'];
}

const OurAIHero = memo(({ content }: Props) => {
  return (
    <section className="relative w-full pt-28 pb-6 md:pt-36 md:pb-8 bg-[#0B1224] overflow-hidden">
      {/* Subtle signal wave SVG background */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 w-full h-32 md:h-48 opacity-[0.07]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 Q150,40 300,120 T600,120 T900,120 T1200,120"
          fill="none"
          stroke="#F4845F"
          strokeWidth="1"
        />
        <path
          d="M0,140 Q200,80 400,140 T800,140 T1200,140"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
        />
      </svg>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F4845F] mb-6">
          {content.eyebrow}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl text-white/70 font-light italic mb-4">
          {content.subtitle}
        </p>
      </div>
    </section>
  );
});

OurAIHero.displayName = 'OurAIHero';
export default OurAIHero;

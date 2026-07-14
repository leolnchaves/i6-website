import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from './BlogCard';
import type { Insight } from '@/hooks/useInsights';

interface Props {
  title: string;
  articles: Insight[];
}

/**
 * Horizontal rail: cards side-by-side with alternating heights for visual
 * rhythm, navigated by scroll buttons. Cards keep a fixed min-width so the
 * rail scrolls even when there are only a few items.
 */
const ThemeRail = ({ title, articles }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  if (articles.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            className="p-2 rounded-full border border-white/10 text-white/60 hover:text-[#F4845F] hover:border-[#F4845F]/40 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="p-2 rounded-full border border-white/10 text-white/60 hover:text-[#F4845F] hover:border-[#F4845F]/40 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {articles.map((a, i) => {
          // Alternate sizes for a masonry-like feel.
          const size: 'sm' | 'md' | 'lg' = i % 3 === 0 ? 'lg' : i % 3 === 1 ? 'md' : 'sm';
          const width =
            size === 'lg'
              ? 'w-[85vw] sm:w-[420px]'
              : size === 'md'
                ? 'w-[75vw] sm:w-[340px]'
                : 'w-[65vw] sm:w-[280px]';
          return (
            <div key={a.slug} className={`shrink-0 snap-start ${width}`}>
              <BlogCard article={a} size={size} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ThemeRail;

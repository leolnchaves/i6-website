import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { resolveCoverImage, type Insight } from '@/hooks/useInsights';

interface Props {
  title: string;
  articles: Insight[];
}

const CHUNK_SIZE = 3;

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

interface RowProps {
  article: Insight;
}

const EditorialRow = ({ article }: RowProps) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  const cover = resolveCoverImage(article.cover_image);

  return (
    <Link
      to={localized(`/i6-blog/${article.slug}`)}
      className="group flex gap-4 items-center py-3 first:pt-0 last:pb-0"
    >
      <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-white/5 relative">
        {cover ? (
          <img
            src={cover}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 80% at 30% 30%, rgba(244,132,95,0.25), transparent 70%), linear-gradient(135deg,#0B1224,#131a2f)',
            }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white group-hover:text-[#F4845F] transition-colors text-sm md:text-base line-clamp-2 mb-1.5">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-white/50 line-clamp-2 mb-2">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-[11px] text-white/40">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4845F]">
            {t('blog.badge')}
          </span>
          <span className="text-white/20">·</span>
          <time>
            {new Date(article.date).toLocaleDateString(
              language === 'pt' ? 'pt-BR' : 'en-US',
              { day: '2-digit', month: 'short', year: 'numeric' },
            )}
          </time>
          {article.read_time && (
            <>
              <span className="text-white/20">·</span>
              <span>
                {article.read_time} {t('blog.minRead')}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const ThemePanel = ({ articles }: { articles: Insight[] }) => {
  return (
    <div className="relative rounded-2xl p-[1px] overflow-hidden group h-full">
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 20% 0%, rgba(244,132,95,0.28) 0%, rgba(244,132,95,0.06) 40%, transparent 75%)',
        }}
      />
      <div className="relative h-full rounded-2xl border border-white/10 bg-[#0B1224]/80 backdrop-blur-sm group-hover:border-[#F4845F]/40 transition-colors p-5 md:p-6">
        <div className="flex flex-col divide-y divide-white/5">
          {articles.map((a) => (
            <EditorialRow key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ThemeRail = ({ title, articles }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: 'smooth' });
  };

  if (articles.length === 0) return null;

  const panels = chunk(articles, CHUNK_SIZE);
  const showNav = panels.length > 1;

  return (
    <section className="mt-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          <span className="block h-0.5 w-10 bg-[#F4845F] mt-2 rounded-full" />
        </div>
        {showNav && (
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
        )}
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {panels.map((group, idx) => (
          <div key={idx} className="shrink-0 snap-start w-[85vw] sm:w-[520px]">
            <ThemePanel articles={group} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThemeRail;

import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogArticles, type Insight } from '@/hooks/useInsights';
import BlogHero from '@/components/blog/BlogHero';
import RecentStrip from '@/components/blog/RecentStrip';
import BlogFilters from '@/components/blog/BlogFilters';
import ThemeRail from '@/components/blog/ThemeRail';

const Blog = () => {
  const { t, language } = useLanguage();
  const articles = useBlogArticles();

  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Hero: `is_default` wins; if several, the most recent (list is already
  // sorted desc). Fallback: newest article.
  const heroArticle: Insight | null = useMemo(() => {
    if (articles.length === 0) return null;
    const flagged = articles.find((a) => a.is_default);
    return flagged || articles[0];
  }, [articles]);

  // Recent = 5 latest, excluding the hero.
  const recent = useMemo(
    () => articles.filter((a) => a.slug !== heroArticle?.slug).slice(0, 5),
    [articles, heroArticle],
  );

  const themes = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.theme && set.add(a.theme));
    return Array.from(set);
  }, [articles]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (heroArticle && a.slug === heroArticle.slug) return false;
      if (activeTheme && a.theme !== activeTheme) return false;
      if (activeTag && !(a.tags || []).includes(activeTag)) return false;
      return true;
    });
  }, [articles, activeTheme, activeTag, heroArticle]);

  const byTheme = useMemo(() => {
    const map = new Map<string, Insight[]>();
    filtered.forEach((a) => {
      const key = a.theme || t('blog.themeFallback');
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    });
    return Array.from(map.entries());
  }, [filtered, t]);

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
        <title>{`${t('blog.pageTitle')} | infinity6`}</title>
        <meta name="description" content={t('blog.pageSubtitle')} />
      </Helmet>

      <section className="container mx-auto px-6 pt-32 pb-20">
        <header className="mb-10 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4845F]">
            {t('blog.badge')}
          </span>
          <h1 className="sr-only">{t('blog.pageTitle')}</h1>
          <p className="text-lg text-white/70 mt-3">{t('blog.pageSubtitle')}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {heroArticle && (
            <div className="lg:col-span-2">
              <BlogHero article={heroArticle} />
            </div>
          )}
          <div className="hidden lg:block lg:col-span-1">
            <RecentStrip articles={recent} layout="side" />
          </div>
        </div>

        {/* Mobile/tablet fallback: original horizontal strip below the hero */}
        <div className="lg:hidden">
          <RecentStrip articles={recent} layout="row" />
        </div>

        <BlogFilters
          themes={themes}
          tags={tags}
          activeTheme={activeTheme}
          activeTag={activeTag}
          onThemeChange={setActiveTheme}
          onTagChange={setActiveTag}
        />

        {byTheme.length === 0 && articles.length === 0 && (
          <p className="mt-16 text-white/50">{t('blog.empty')}</p>
        )}

        {byTheme.map(([theme, list]) => (
          <ThemeRail key={theme} title={theme} articles={list} />
        ))}
      </section>
    </>
  );
};

export default Blog;

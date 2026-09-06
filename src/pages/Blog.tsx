import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogArticles, type Insight } from '@/hooks/useInsights';
import BlogIntro from '@/components/blog/BlogIntro';
import BlogHero from '@/components/blog/BlogHero';
import BlogDivider from '@/components/blog/BlogDivider';
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

  const filterable = useMemo(
    () => articles.filter((a) => a.slug !== heroArticle?.slug),
    [articles, heroArticle],
  );

  const themes = useMemo(() => {
    const map = new Map<string, string>();
    filterable.forEach((a) => {
      if (!a.theme) return;
      const existing = map.get(a.theme);
      if (!existing || existing === a.theme) {
        map.set(a.theme, a.theme_label || existing || a.theme);
      }
    });
    return Array.from(map, ([value, label]) => ({ value, label }));
  }, [filterable]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    filterable.forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [filterable]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (heroArticle && a.slug === heroArticle.slug) return false;
      if (activeTheme && a.theme !== activeTheme) return false;
      if (activeTag && !(a.tags || []).includes(activeTag)) return false;
      return true;
    });
  }, [articles, activeTheme, activeTag, heroArticle]);

  const byTheme = useMemo(() => {
    const map = new Map<string, { label: string; items: Insight[] }>();
    filtered.forEach((a) => {
      const key = a.theme || '__none__';
      const label = a.theme_label || a.theme || t('blog.themeFallback');
      if (!map.has(key)) map.set(key, { label, items: [] });
      map.get(key)!.items.push(a);
    });
    return Array.from(map.values());
  }, [filtered, t]);

  const hasFilter = activeTheme !== null || activeTag !== null;

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en'} />
        <title>{`${t('blog.pageTitle')} | infinity6`}</title>
        <meta name="description" content={t('blog.pageSubtitle')} />
      </Helmet>

      <div className="theme-sand">
        <BlogIntro total={articles.length} />

        {heroArticle && <BlogHero article={heroArticle} />}

        {recent.length > 0 && (
          <>
            <BlogDivider to="graphite" />
            <RecentStrip articles={recent} />
            <BlogDivider to="sand" />
          </>
        )}

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-14 md:pt-16">
          <BlogFilters
            themes={themes}
            tags={tags}
            activeTheme={activeTheme}
            activeTag={activeTag}
            onThemeChange={setActiveTheme}
            onTagChange={setActiveTag}
            resultCount={filtered.length}
          />

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-lg text-foreground">{t('blog.empty')}</p>
              {hasFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTheme(null);
                    setActiveTag(null);
                  }}
                  className="mt-4 text-sm text-primary underline-offset-4 hover:underline"
                >
                  {t('blog.clearFilters')}
                </button>
              )}
            </div>
          )}

          {byTheme.map(({ label, items }) => (
            <ThemeRail key={label} title={label} articles={items} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Blog;

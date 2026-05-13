import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useInsight, resolveCoverImage } from '@/hooks/useInsights';

const BASE_URL = 'https://infinity6.ai';

const InsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const insight = useInsight(slug || '');

  if (!insight) return <Navigate to={localized('/insights')} replace />;
  if (insight.type !== 'article') {
    if (insight.external_url) {
      window.location.href = insight.external_url;
      return null;
    }
    return <Navigate to={localized('/insights')} replace />;
  }

  const cover = resolveCoverImage(insight.cover_image);
  const url = `${BASE_URL}/${language}/insights/${insight.slug}`;

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
        <title>{`${insight.title} | infinity6`}</title>
        <meta name="description" content={insight.excerpt} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/insights/${insight.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${BASE_URL}/pt/insights/${insight.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/insights/${insight.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={insight.title} />
        <meta property="og:description" content={insight.excerpt} />
        <meta property="og:url" content={url} />
        {cover && <meta property="og:image" content={cover.startsWith('http') ? cover : `${BASE_URL}${cover}`} />}
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: insight.title,
          description: insight.excerpt,
          datePublished: insight.date,
          author: { '@type': 'Organization', name: 'infinity6' },
          publisher: { '@type': 'Organization', name: 'infinity6', logo: { '@type': 'ImageObject', url: `${BASE_URL}/lovable-uploads/0fce52e4-a161-4d37-b3e4-f23f093b9b75.png` } },
          mainEntityOfPage: url,
          ...(cover ? { image: cover.startsWith('http') ? cover : `${BASE_URL}${cover}` } : {}),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${language}` },
            { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/${language}/insights` },
            { '@type': 'ListItem', position: 3, name: insight.title, item: url },
          ],
        })}</script>
      </Helmet>

      <article className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <Link to={localized('/insights')} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#F4845F] mb-8 transition-colors">
          <ArrowLeft size={16} /> {language === 'pt' ? 'Voltar para Insights' : 'Back to Insights'}
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-white/50 mb-4">
            <time>{new Date(insight.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
            {insight.read_time && <span>· {insight.read_time} min</span>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{insight.title}</h1>
          <p className="text-xl text-white/70">{insight.excerpt}</p>
        </header>

        {cover && (
          <img src={cover} alt={insight.title} className="w-full rounded-xl mb-10" />
        )}

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-[#F4845F] prose-strong:text-white prose-li:text-white/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{insight.content}</ReactMarkdown>
        </div>
      </article>
    </>
  );
};

export default InsightArticle;

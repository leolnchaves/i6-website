import { useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useInsight, resolveCoverImage } from '@/hooks/useInsights';
import { getPublicAssetUrl } from '@/utils/assetUtils';
import LeadGateForm from '@/components/insights/LeadGateForm';
import { Button } from '@/components/ui/button';

const BASE_URL = 'https://infinity6.ai';

const InsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const location = useLocation();
  const insight = useInsight(slug || '');

  // Determine the surrounding context:
  // - `/insights/<slug>` is the media listing context (i6 on Media, i6 Social)
  // - `/i6-intelligence/<slug>` is the intelligence context (i6 Article, i6 eBook)
  const inIntel = location.pathname.includes('/i6-intelligence/');
  const isIntelType = !!insight && (insight.type === 'i6 Article' || insight.type === 'i6 eBook');
  const backPath = inIntel ? '/i6-intelligence' : '/insights';
  const backLabel = language === 'pt'
    ? (inIntel ? 'Voltar para i6 Research' : 'Voltar para Insights')
    : (inIntel ? 'Back to i6 Research' : 'Back to Insights');

  // Clean up legacy unlock entries from older versions of the gate flow
  useEffect(() => {
    try {
      if (localStorage.getItem('i6_unlocked_insights') !== null) {
        localStorage.removeItem('i6_unlocked_insights');
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  useEffect(() => {
    if (insight && !insight.gated && insight.type !== 'i6 Article' && insight.external_url) {
      window.open(insight.external_url, '_blank', 'noopener,noreferrer');
    }
  }, [insight]);

  if (!insight) return <Navigate to={localized(backPath)} replace />;

  // Cross-listing redirects: i6 Article / i6 eBook belong under /i6-intelligence;
  // i6 on Media / i6 Social belong under /insights.
  if (isIntelType && !inIntel) {
    return <Navigate to={localized(`/i6-intelligence/${insight.slug}`)} replace />;
  }
  if (!isIntelType && inIntel) {
    return <Navigate to={localized(`/insights/${insight.slug}`)} replace />;
  }

  if (insight.type !== 'i6 Article' && !insight.gated) {
    if (!insight.external_url) {
      return <Navigate to={localized(backPath)} replace />;
    }
    return (
      <section className="container mx-auto px-6 pt-32 pb-20 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {insight.title}
        </h1>
        <p className="text-white/70 mb-8">
          {language === 'pt'
            ? 'Este conteúdo está hospedado em outro site. Abrimos em uma nova aba — se nada aconteceu, seu navegador pode ter bloqueado o popup.'
            : 'This content is hosted on another site. We opened it in a new tab — if nothing happened, your browser may have blocked the popup.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="bg-[#F4845F] hover:bg-[#F4845F]/90 text-white shadow-[0_0_20px_rgba(244,132,95,0.3)]"
          >
            <a href={insight.external_url} target="_blank" rel="noopener noreferrer">
              {language === 'pt' ? 'Abrir em nova aba' : 'Open in new tab'}
            </a>
          </Button>
          <Link
            to={localized(backPath)}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#F4845F] transition-colors"
          >
            <ArrowLeft size={16} /> {backLabel}
          </Link>
        </div>
      </section>
    );
  }

  const cover = resolveCoverImage(insight.cover_image);
  const canonicalBase = isIntelType ? 'i6-intelligence' : 'insights';
  const url = `${BASE_URL}/${language}/${canonicalBase}/${insight.slug}`;
  const isLocked = insight.gated === true;
  const pdfUrl = insight.asset_url
    ? (insight.asset_url.startsWith('http')
        ? insight.asset_url
        : getPublicAssetUrl(insight.asset_url.replace(/^\//, '')))
    : null;


  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
        <title>{`${insight.title} | infinity6`}</title>
        <meta name="description" content={insight.excerpt} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/${canonicalBase}/${insight.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${BASE_URL}/pt/${canonicalBase}/${insight.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/${canonicalBase}/${insight.slug}`} />

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
            { '@type': 'ListItem', position: 2, name: inIntel ? 'i6 Research' : 'Insights', item: `${BASE_URL}/${language}/${canonicalBase}` },
            { '@type': 'ListItem', position: 3, name: insight.title, item: url },
          ],
        })}</script>
      </Helmet>

      <article className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <Link to={localized(backPath)} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#F4845F] mb-8 transition-colors">
          <ArrowLeft size={16} /> {backLabel}
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

        {isLocked ? (
          <LeadGateForm
            kind="insight"
            title={insight.title}
            slug={insight.slug}
            id={insight.id}
            pdfUrl={pdfUrl}
          />
        ) : (
          <>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-[#F4845F] prose-strong:text-white prose-li:text-white/80 prose-img:rounded-xl prose-img:my-8 prose-img:w-full">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {insight.content}
              </ReactMarkdown>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default InsightArticle;

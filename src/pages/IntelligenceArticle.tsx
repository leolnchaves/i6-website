import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIntelligencePiece, resolveIntelligenceCover } from '@/hooks/useIntelligence';
import { getPublicAssetUrl } from '@/utils/assetUtils';
import LeadGateForm from '@/components/insights/LeadGateForm';

const BASE_URL = 'https://infinity6.ai';

// Extract FAQ Q&A pairs from markdown content for FAQPage schema
function extractFAQ(content: string): { q: string; a: string }[] {
  const faqHeadingRe = /^##\s+(?:Perguntas frequentes|FAQ)\s*$/im;
  const match = content.match(faqHeadingRe);
  if (!match) return [];
  const start = content.indexOf(match[0]) + match[0].length;
  const rest = content.slice(start);
  // FAQ section ends at next H2 or end of file
  const endIdx = rest.search(/\n##\s+/);
  const block = endIdx === -1 ? rest : rest.slice(0, endIdx);
  const pairs: { q: string; a: string }[] = [];
  // Q is **bold line ending with ?**; A is following line(s) until blank line
  const re = /\*\*([^*]+\?)\*\*\s*\n+([^\n][^\n]*(?:\n[^\n*][^\n]*)*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    pairs.push({ q: m[1].trim(), a: m[2].trim() });
  }
  return pairs;
}

const IntelligenceArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const piece = useIntelligencePiece(slug || '');

  // Unlock state for gated Research pieces. After the user submits the
  // lead-gate form, content is revealed inline AND the PDF is still
  // delivered by email via i6Hub. Persisted in localStorage per slug+lang
  // so refresh keeps the content unlocked.
  const unlockKey = piece ? `i6_unlocked_research:${piece.slug}:${piece.language}` : '';
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!unlockKey) return;
    try {
      setUnlocked(localStorage.getItem(unlockKey) === '1');
    } catch {
      /* localStorage unavailable */
    }
  }, [unlockKey]);

  if (!piece) return <Navigate to={localized('/i6-intelligence')} replace />;

  const cover = resolveIntelligenceCover(piece.cover_image);
  const url = `${BASE_URL}/${language}/i6-intelligence/${piece.slug}`;
  const faq = extractFAQ(piece.content);
  const isLocked = piece.gated === true && !unlocked;
  const pdfUrl = piece.asset_url
    ? (piece.asset_url.startsWith('http')
        ? piece.asset_url
        : getPublicAssetUrl(piece.asset_url.replace(/^\//, '')))
    : null;

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
        <title>{`${piece.title} | i6 Research`}</title>
        <meta name="description" content={piece.excerpt} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/i6-intelligence/${piece.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${BASE_URL}/pt/i6-intelligence/${piece.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/i6-intelligence/${piece.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={piece.title} />
        <meta property="og:description" content={piece.excerpt} />
        <meta property="og:url" content={url} />
        {cover && <meta property="og:image" content={cover.startsWith('http') ? cover : `${BASE_URL}${cover}`} />}
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: piece.title,
          description: piece.excerpt,
          datePublished: piece.date,
          inLanguage: language === 'pt' ? 'pt-BR' : 'en',
          author: { '@type': 'Organization', name: 'infinity6' },
          publisher: { '@type': 'Organization', name: 'infinity6' },
          mainEntityOfPage: url,
          isPartOf: { '@type': 'CreativeWork', name: 'i6 Research' },
          ...(cover ? { image: cover.startsWith('http') ? cover : `${BASE_URL}${cover}` } : {}),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${language}` },
            { '@type': 'ListItem', position: 2, name: 'i6 Research', item: `${BASE_URL}/${language}/i6-intelligence` },
            { '@type': 'ListItem', position: 3, name: piece.title, item: url },
          ],
        })}</script>
        {faq.length > 0 && !isLocked && (
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}</script>
        )}
      </Helmet>

      <article className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <Link
          to={localized('/i6-intelligence')}
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#F4845F] transition-colors mb-5"
        >
          <ArrowLeft size={16} /> {language === 'pt' ? 'Voltar para i6 Research' : 'Back to i6 Research'}
        </Link>

        <p className="text-xs uppercase tracking-[0.3em] text-[#F4845F] mb-4">infinity6 · Research</p>

        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden mb-12">
          <div className="relative h-[420px] md:h-[560px]">
            {cover && (
              <img
                src={cover}
                alt={piece.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* long vertical fade into navy at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1224]/40 to-[#0B1224]" />
            {/* subtle side fade so the image dissolves into the page sides too */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1224]/50 via-transparent to-[#0B1224]/50" />

            {/* Text anchored bottom-left, aligned with body container */}
            <div className="relative h-full container mx-auto max-w-3xl px-6 flex flex-col justify-end pb-8 md:pb-12">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-[1.1] tracking-tight">
                {piece.title}
              </h1>
              <p className="text-sm md:text-base text-white/85 mb-4 leading-relaxed max-w-2xl">
                {piece.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <time>
                  {new Date(piece.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                </time>
                {piece.read_time && <><span>·</span><span>{piece.read_time} min</span></>}
              </div>
            </div>
          </div>
        </div>

        {isLocked ? (
          <LeadGateForm
            kind="research"
            title={piece.title}
            slug={piece.slug}
            id={piece.id}
            pdfUrl={pdfUrl}
            onUnlock={() => setUnlocked(true)}
          />
        ) : (
          <>
            {pdfUrl && (
              <div className="mb-8">
                <Button
                  asChild
                  className="bg-[#F4845F] hover:bg-[#F4845F]/90 text-white shadow-[0_0_20px_rgba(244,132,95,0.3)]"
                >
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                    <Download className="w-4 h-4 mr-2" />
                    {language === 'pt' ? 'Baixar PDF' : 'Download PDF'}
                  </a>
                </Button>
              </div>
            )}

            <div className="prose prose-invert prose-headings:text-white prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-white/80 prose-li:text-white/80 prose-strong:text-white prose-a:text-[#F4845F] hover:prose-a:underline max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{piece.content}</ReactMarkdown>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 space-y-6">
              {/* Cross-links: related product (Solutions anchor) + related success story */}
              {(piece.related_product || piece.related_story_slug) && (
                <div className="flex flex-wrap gap-3">
                  {piece.related_product && (
                    <Link
                      to={localized(`/solutions#${piece.related_product}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F4845F]/40 text-[#F4845F] hover:bg-[#F4845F]/10 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      {language === 'pt' ? 'Ver a solução relacionada' : 'See the related solution'}
                    </Link>
                  )}
                  {piece.related_story_slug && (
                    <Link
                      to={localized(`/success-stories/${piece.related_story_slug}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      {language === 'pt' ? 'Ler o case relacionado' : 'Read the related case'}
                    </Link>
                  )}
                </div>
              )}

              <Link
                to={localized('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4845F] hover:bg-[#F4845F]/90 text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(244,132,95,0.3)]"
              >
                {language === 'pt' ? 'Colocar Dados em Movimento' : 'Put Data in Motion'}
              </Link>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default IntelligenceArticle;

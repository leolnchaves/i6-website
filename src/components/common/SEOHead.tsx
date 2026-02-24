import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { seoData } from '@/data/staticData/seoData';

interface SEOHeadProps {
  page: string;
  /** Optional JSON-LD structured data to inject */
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://www.infinity6.ai';
const OG_IMAGE = `${BASE_URL}/lovable-uploads/0fce52e4-a161-4d37-b3e4-f23f093b9b75.png`;

const SEOHead = ({ page, jsonLd }: SEOHeadProps) => {
  const { language } = useLanguage();
  const data = seoData[page]?.[language];

  if (!data) return null;

  const { title, description, keywords } = data;
  const canonicalPath = page === 'home' ? '/' : `/${page.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  const canonical = `${BASE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonical} />
      <meta httpEquiv="content-language" content={language === 'pt' ? 'pt-BR' : 'en'} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="infinity6" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;

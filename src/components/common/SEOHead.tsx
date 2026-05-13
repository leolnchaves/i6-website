import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { seoData } from '@/data/staticData/seoData';

interface SEOHeadProps {
  page: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://www.infinity6.ai';
const OG_IMAGE = `${BASE_URL}/lovable-uploads/0fce52e4-a161-4d37-b3e4-f23f093b9b75.png`;

const pagePath = (page: string): string => {
  if (page === 'home') return '';
  return `/${page.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
};

const SEOHead = ({ page, jsonLd }: SEOHeadProps) => {
  const { language } = useLanguage();
  const data = seoData[page]?.[language];

  if (!data) return null;

  const { title, description, keywords } = data;
  const path = pagePath(page);
  const canonical = `${BASE_URL}/${language}${path}`;
  const enUrl = `${BASE_URL}/en${path}`;
  const ptUrl = `${BASE_URL}/pt${path}`;

  return (
    <Helmet>
      <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates */}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="pt-BR" href={ptUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="infinity6" />
      <meta property="og:locale" content={language === 'pt' ? 'pt_BR' : 'en_US'} />

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

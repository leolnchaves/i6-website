import { memo, useMemo } from 'react';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import StaticSolutionsGrid from '@/components/solutions/StaticSolutionsGrid';
import I6SignalDemo from '@/components/solutions/I6SignalDemo';
import SolutionsFAQ from '@/components/solutions/SolutionsFAQ';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';
import SEOHead from '@/components/common/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionsFaqContent } from '@/data/staticData/solutionsFaqData';

const Solutions = memo(() => {
  const { language } = useLanguage();

  // Single source of truth: FAQ data drives both the visible accordion and FAQPage JSON-LD
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: solutionsFaqContent[language].faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }), [language]);

  return (
    <>
      <SEOHead page="solutions" jsonLd={jsonLd} />
      <SolutionsHero />
      <StaticSolutionsGrid />
      <I6SignalDemo />
      <SolutionsFAQ />
      <SolutionsCTA />
    </>
  );
});

Solutions.displayName = 'Solutions';

export default Solutions;

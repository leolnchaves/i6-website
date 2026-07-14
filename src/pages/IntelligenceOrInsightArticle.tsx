import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIntelligencePiece } from '@/hooks/useIntelligence';
import { useInsight } from '@/hooks/useInsights';
import IntelligenceArticle from './IntelligenceArticle';
import InsightArticle from './InsightArticle';

/**
 * Single page bound to `/i6-intelligence/:slug` that decides which underlying
 * article view to render based on where the slug actually lives:
 *
 *  - matches an i6 Research piece    → <IntelligenceArticle />
 *  - matches an Insight of type i6 Article / i6 eBook → <InsightArticle />
 *  - no match → redirect back to /i6-intelligence
 *
 * Keeps both content sources (Research markdown + Insights feed) under the
 * same `/i6-intelligence` URL space without merging their data models.
 */
const IntelligenceOrInsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const piece = useIntelligencePiece(slug || '');
  const insight = useInsight(slug || '');

  if (piece) {
    return <IntelligenceArticle />;
  }
  // i6 Article moved to /i6-blog — preserve old links with a redirect.
  if (insight && insight.type === 'i6 Article') {
    return <Navigate to={localized(`/i6-blog/${insight.slug}`)} replace />;
  }
  if (insight && insight.type === 'i6 eBook') {
    return <InsightArticle />;
  }
  // Avoid the no-op of returning Navigate when nothing matched yet during
  // initial render — useInsight / useIntelligencePiece are sync glob-based,
  // so a null here means truly not found.
  void language;
  return <Navigate to={localized('/i6-intelligence')} replace />;
};

export default IntelligenceOrInsightArticle;

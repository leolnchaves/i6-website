import { Navigate, useParams } from 'react-router-dom';
import SEOHead from '@/components/common/SEOHead';
import DocsShell from '@/components/docs/DocsShell';
import { useDocs } from '@/hooks/useDocs';
import { docsUi } from '@/data/docs/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';

const Docs = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = docsUi[language];
  const { sections, current, first, prev, next, related } = useDocs(slug);

  // /docs (no slug) or unknown slug -> first page in menu order
  if (!current) {
    if (first) return <Navigate to={localized(`/docs/${first.slug}`)} replace />;
    return (
      <>
        <SEOHead page="docs" />
        <div className="theme-sand">
          <div className="container mx-auto px-6 py-28 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">
              {copy.eyebrow}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{copy.empty}</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead page="docs" />
      <div className="theme-sand">
        <DocsShell
          sections={sections}
          current={current}
          prev={prev}
          next={next}
          copy={copy}
          localized={localized}
          related={related}
        />
      </div>
    </>
  );
};

export default Docs;


import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import SolutionsMetricsSection from '@/components/solutions/SolutionsMetricsSection';
import StaticSolutionsGrid from '@/components/solutions/StaticSolutionsGrid';
import ProcessFlow from '@/components/solutions/ProcessFlow';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';

const Solutions = memo(() => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <SolutionsHero />
      <SolutionsMetricsSection />
      <StaticSolutionsGrid />
      <ProcessFlow />
      <SolutionsCTA />
    </div>
  );
});

Solutions.displayName = 'Solutions';

export default Solutions;

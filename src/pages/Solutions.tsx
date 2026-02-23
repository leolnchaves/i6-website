
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeaderNovo from '@/components/hometeste/HeaderNovo';
import FooterNovo from '@/components/hometeste/FooterNovo';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import SolutionsMetricsSection from '@/components/solutions/SolutionsMetricsSection';
import StaticSolutionsGrid from '@/components/solutions/StaticSolutionsGrid';
import ProcessFlow from '@/components/solutions/ProcessFlow';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';

const Solutions = memo(() => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B1224]">
      <HeaderNovo />
      <SolutionsHero />
      <SolutionsMetricsSection />
      <StaticSolutionsGrid />
      <ProcessFlow />
      <SolutionsCTA />
      <FooterNovo />
    </div>
  );
});

Solutions.displayName = 'Solutions';

export default Solutions;

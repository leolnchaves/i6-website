
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeaderNovo from '@/components/hometeste/HeaderNovo';
import FooterNovo from '@/components/hometeste/FooterNovo';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import StaticSolutionsGrid from '@/components/solutions/StaticSolutionsGrid';
import ProcessFlow from '@/components/solutions/ProcessFlow';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';
import VerticalWaves from '@/components/solutions/VerticalWaves';

const Solutions = memo(() => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B1224] relative">
      <VerticalWaves />
      <div className="relative">
        <div className="relative z-[20]">
          <HeaderNovo />
        </div>
        <SolutionsHero />
        <div className="relative z-[10]">
          <StaticSolutionsGrid />
        </div>
        <ProcessFlow />
        <SolutionsCTA />
        <div className="relative z-[10]">
          <FooterNovo />
        </div>
      </div>
    </div>
  );
});

Solutions.displayName = 'Solutions';

export default Solutions;

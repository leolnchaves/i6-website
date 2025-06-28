
import { useLanguage } from '@/contexts/LanguageContext';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import CMSSolutionsGrid from '@/components/solutions/CMSSolutionsGrid';
import ProcessFlow from '@/components/solutions/ProcessFlow';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';

const Solutions = () => {
  console.log('Solutions page is rendering');
  
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <SolutionsHero />
      <CMSSolutionsGrid />
      <ProcessFlow />
      <SolutionsCTA />
    </div>
  );
};

export default Solutions;

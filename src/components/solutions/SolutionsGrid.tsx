
import { useLanguage } from '@/contexts/LanguageContext';
import { getSolutionsData } from '@/data/solutions/solutionsData';
import SolutionCard from './SolutionCard';

const SolutionsGrid = () => {
  const { t } = useLanguage();
  const solutions = getSolutionsData(t);

  // Map engines to solutions
  const solutionsWithEngines = solutions.map((solution, index) => {
    let engine = 'i6 RecSys'; // Default engine
    
    // Assign engines based on solution type
    if (solution.title.includes('Pricing') || solution.title.includes('Preço') || solution.title.includes('Smart Price')) {
      engine = 'i6 ElasticPrice';
    } else if (solution.title.includes('Forecasting') || solution.title.includes('Previsão') || solution.title.includes('Demand')) {
      engine = 'i6 Previsio';
    }
    
    return {
      ...solution,
      engine
    };
  });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {solutionsWithEngines.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              focus={solution.focus}
              description={solution.description}
              features={solution.features}
              outcome={solution.outcome}
              gradient={solution.gradient}
              bgColor={solution.bgColor}
              borderColor={solution.borderColor}
              engine={solution.engine}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;

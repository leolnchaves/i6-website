import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSolutionsMarkdown } from '@/hooks/useSolutionsMarkdown';
import ModernSolutionCard from './ModernSolutionCard';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Target, 
  Award, 
  Zap, 
  Building2, 
  Globe, 
  Rocket,
  Brain,
  ShoppingCart,
  LineChart,
  Lightbulb,
  LucideIcon
} from 'lucide-react';

// Moved outside component to prevent re-creation on each render
const iconMap: { [key: string]: LucideIcon } = {
  'trending-up': TrendingUp,
  'users': Users,
  'dollar-sign': DollarSign,
  'bar-chart-3': BarChart3,
  'target': Target,
  'award': Award,
  'zap': Zap,
  'building-2': Building2,
  'globe': Globe,
  'rocket': Rocket,
  'brain': Brain,
  'shopping-cart': ShoppingCart,
  'line-chart': LineChart,
  'lightbulb': Lightbulb,
};

// Engine-based color mapping to maintain design consistency
const engineColorMap: { [key: string]: string } = {
  'i6 RecSys': 'bg-blue-500/20',
  'i6 ElasticPrice': 'bg-orange-500/20', 
  'i6 Previsio': 'bg-gray-500/20'
};

const StaticSolutionsGrid = memo(() => {
  const { language } = useLanguage();
  
  // Use markdown content hook
  const { solutions, loading, error } = useSolutionsMarkdown();

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-gray-600">Error loading solutions: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12 max-w-7xl mx-auto">
          {solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon] || Building2;
            const bgColor = engineColorMap[solution.engine] || 'bg-blue-500/20';
            
            return (
              <ModernSolutionCard
                key={solution.id}
                icon={IconComponent}
                title={solution.title}
                focus={solution.target}
                description={solution.overview}
                features={solution.keyFeatures}
                outcome={solution.businessResults}
                engine={solution.engine}
                bgColor={bgColor}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});

StaticSolutionsGrid.displayName = 'StaticSolutionsGrid';

export default StaticSolutionsGrid;
import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionsCardsData } from '@/data/staticData/solutionsCards';
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

const StaticSolutionsGrid = memo(() => {
  const { language } = useLanguage();
  
  // Get static data based on language
  const cards = solutionsCardsData[language] || solutionsCardsData.en;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12 max-w-7xl mx-auto">
          {cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Building2;
            
            return (
              <ModernSolutionCard
                key={card.id}
                icon={IconComponent}
                title={card.title}
                focus={card.focus}
                description={card.description}
                features={card.features}
                outcome={card.outcome}
                engine={card.engine}
                bgColor={card.bgColor}
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
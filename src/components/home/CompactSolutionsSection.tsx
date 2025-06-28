
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSCompactSolutionsCards } from '@/hooks/useCMSCompactSolutionsCards';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import SolutionCard from './compact-solutions/SolutionCard';

// Icon mapping for dynamic icon rendering
const iconMap = {
  'target': Target,
  'users': Users,
  'cog': Cog,
  'trending-up': TrendingUp,
  'dollar-sign': DollarSign,
  'bar-chart-3': BarChart3,
};

const CompactSolutionsSection = () => {
  const { t, language } = useLanguage();
  const { cards, loading } = useCMSCompactSolutionsCards('home', language);

  console.log('CompactSolutionsSection - Total cards fetched:', cards.length);
  console.log('CompactSolutionsSection - Cards data:', cards);

  // Filter only active cards for display on the website
  const activeCards = cards.filter(card => card.is_active);
  console.log('CompactSolutionsSection - Active cards:', activeCards.length);

  // Fallback data for when CMS data is not available
  const fallbackSolutions = [
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: t('solutions.smartDiscovery.title'),
      description: t('solutions.smartDiscovery.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94',
      backgroundOpacity: undefined
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t('solutions.predictivePersonalization.title'),
      description: t('solutions.predictivePersonalization.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94',
      backgroundOpacity: undefined
    },
    {
      icon: <Cog className="w-6 h-6 text-white" />,
      title: t('solutions.industrialRecommendation.title'),
      description: t('solutions.industrialRecommendation.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94',
      backgroundOpacity: undefined
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: t('solutions.predictiveCampaign.title'),
      description: t('solutions.predictiveCampaign.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94',
      backgroundOpacity: undefined
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: t('solutions.smartPricing.title'),
      description: t('solutions.smartPricing.description'),
      engine: 'i6 ElasticPrice',
      backgroundColor: '#1E4A94',
      backgroundOpacity: undefined
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: t('solutions.demandForecasting.title'),
      description: t('solutions.demandForecasting.description'),
      engine: 'i6 Previsio',
      backgroundColor: '#1E4A94',
      backgroundOpacity: undefined
    }
  ];

  // Use CMS active cards if available, otherwise fallback to translations
  const solutionsToRender = activeCards.length > 0 ? activeCards.map(card => {
    const IconComponent = iconMap[card.icon_name as keyof typeof iconMap] || Target;
    return {
      icon: <IconComponent className="w-6 h-6 text-white" />,
      title: card.title,
      description: card.description,
      engine: card.engine_name,
      backgroundColor: card.background_color,
      backgroundOpacity: card.background_opacity
    };
  }) : fallbackSolutions;

  console.log('CompactSolutionsSection - Final solutions to render:', solutionsToRender.length);

  const handleSolutionsClick = () => {
    // Navigate to solutions page and scroll to top
    window.location.href = '/solutions';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutionsToRender.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              index={index}
              engine={solution.engine}
              backgroundColor={solution.backgroundColor}
              backgroundOpacity={solution.backgroundOpacity}
            />
          ))}
        </div>

        {/* Button to Solutions page */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
            onClick={handleSolutionsClick}
          >
            {t('solutions.viewAllSolutions')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompactSolutionsSection;


import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import { useCMSCompactSolutionsCards } from '@/hooks/useCMSCompactSolutionsCards';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import SolutionCard from './compact-solutions/SolutionCard';

const CompactSolutionsSection = () => {
  const { t, language } = useLanguage();
  const { content: pageContent, loading: contentLoading } = useCMSPageContent('home', language);
  const { cards, loading: cardsLoading } = useCMSCompactSolutionsCards('home', language);

  // Icon mapping
  const iconMap: { [key: string]: React.ReactNode } = {
    target: <Target className="w-6 h-6 text-white" />,
    users: <Users className="w-6 h-6 text-white" />,
    cog: <Cog className="w-6 h-6 text-white" />,
    'trending-up': <TrendingUp className="w-6 h-6 text-white" />,
    'dollar-sign': <DollarSign className="w-6 h-6 text-white" />,
    'bar-chart-3': <BarChart3 className="w-6 h-6 text-white" />,
  };

  // Fallback solutions for when CMS data is not available
  const fallbackSolutions = [
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: t('solutions.smartDiscovery.title'),
      description: t('solutions.smartDiscovery.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t('solutions.predictivePersonalization.title'),
      description: t('solutions.predictivePersonalization.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <Cog className="w-6 h-6 text-white" />,
      title: t('solutions.industrialRecommendation.title'),
      description: t('solutions.industrialRecommendation.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: t('solutions.predictiveCampaign.title'),
      description: t('solutions.predictiveCampaign.description'),
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: t('solutions.smartPricing.title'),
      description: t('solutions.smartPricing.description'),
      engine: 'i6 ElasticPrice',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: t('solutions.demandForecasting.title'),
      description: t('solutions.demandForecasting.description'),
      engine: 'i6 Previsio',
      backgroundColor: '#1E4A94'
    }
  ];

  // Use CMS cards if available and active, otherwise fallback to translation data
  const activeCMSCards = cards.filter(card => card.is_active);
  const solutionsToDisplay = activeCMSCards.length > 0 
    ? activeCMSCards.map(card => ({
        icon: iconMap[card.icon_name] || <Target className="w-6 h-6 text-white" />,
        title: card.title,
        description: card.description,
        engine: card.engine_name,
        backgroundColor: card.background_color || '#1E4A94'
      }))
    : fallbackSolutions;

  const handleSolutionsClick = () => {
    // Navigate to solutions page and scroll to top
    window.location.href = '/solutions';
  };

  if (contentLoading || cardsLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-2xl"></div>
                </div>
              ))}
            </div>
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
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutionsToDisplay.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              index={index}
              engine={solution.engine}
              backgroundColor={solution.backgroundColor}
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
            {pageContent?.['compactSolutions.viewAllSolutions'] || t('solutions.viewAllSolutions')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompactSolutionsSection;

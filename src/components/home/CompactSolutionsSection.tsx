
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSCompactSolutionsCards } from '@/hooks/useCMSCompactSolutionsCards';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import SolutionCard from './compact-solutions/SolutionCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const CompactSolutionsSection = () => {
  const { t, language } = useLanguage();
  const { cards, loading, error } = useCMSCompactSolutionsCards(language);

  // Mapeamento de nomes de ícones para componentes
  const iconMap = {
    'Target': <Target className="w-6 h-6 text-white" />,
    'Users': <Users className="w-6 h-6 text-white" />,
    'Cog': <Cog className="w-6 h-6 text-white" />,
    'TrendingUp': <TrendingUp className="w-6 h-6 text-white" />,
    'DollarSign': <DollarSign className="w-6 h-6 text-white" />,
    'BarChart3': <BarChart3 className="w-6 h-6 text-white" />,
  };

  const handleSolutionsClick = () => {
    // Navigate to solutions page and scroll to top
    window.location.href = '/solutions';
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading compact solutions cards:', error);
    // Se houver erro, mostrar cards de fallback (hardcoded)
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

    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {fallbackSolutions.map((solution, index) => (
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
              {t('solutions.viewAllSolutions')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Renderizar com dados do CMS
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card, index) => (
            <SolutionCard
              key={card.id}
              icon={iconMap[card.icon_name as keyof typeof iconMap] || <Target className="w-6 h-6 text-white" />}
              title={card.title}
              description={card.description}
              index={index}
              engine={card.engine}
              backgroundColor={card.background_color || '#1E4A94'}
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

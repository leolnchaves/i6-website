
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

  console.log('=== CompactSolutionsSection Render Debug ===');
  console.log('Current language:', language);
  console.log('Loading state:', loading);
  console.log('Error state:', error);
  console.log('Cards from CMS:', cards);
  console.log('Cards length:', cards?.length);

  // Mapeamento de nomes de ícones para componentes
  const iconMap = {
    'Target': <Target className="w-6 h-6 text-white" />,
    'Users': <Users className="w-6 h-6 text-white" />,
    'Cog': <Cog className="w-6 h-6 text-white" />,
    'TrendingUp': <TrendingUp className="w-6 h-6 text-white" />,
    'DollarSign': <DollarSign className="w-6 h-6 text-white" />,
    'BarChart3': <BarChart3 className="w-6 h-6 text-white" />,
  };

  // Cards de fallback (sempre usar as traduções como fallback)
  const fallbackSolutions = [
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: t('solutions.smartDiscovery.title') || 'Smart Discovery for Anonymous Visitors',
      description: t('solutions.smartDiscovery.description') || 'Turn anonymous traffic into engaged buyers with real-time recommendations.',
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t('solutions.predictivePersonalization.title') || 'Predictive Personalization for Identified Users',
      description: t('solutions.predictivePersonalization.description') || 'Deliver truly personalized experiences with predictive behavior analysis.',
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <Cog className="w-6 h-6 text-white" />,
      title: t('solutions.industrialRecommendation.title') || 'Industrial Recommendation Intelligence',
      description: t('solutions.industrialRecommendation.description') || 'Align commercial targets with intelligent recommendations.',
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: t('solutions.predictiveCampaign.title') || 'Predictive Campaign Targeting',
      description: t('solutions.predictiveCampaign.description') || 'Identify users most likely to convert with precision targeting.',
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: t('solutions.smartPricing.title') || 'Smart Price Optimization',
      description: t('solutions.smartPricing.description') || 'Dynamic pricing that adapts in real time to demand and behavior.',
      engine: 'i6 ElasticPrice',
      backgroundColor: '#1E4A94'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: t('solutions.demandForecasting.title') || 'Adaptive Demand Forecasting',
      description: t('solutions.demandForecasting.description') || 'Forecast demand with precision using self-adjusting models.',
      engine: 'i6 Previsio',
      backgroundColor: '#1E4A94'
    }
  ];

  const handleSolutionsClick = () => {
    window.location.href = '/solutions';
  };

  // Mostrar loading apenas se ainda estiver carregando
  if (loading) {
    console.log('Rendering loading state');
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

  // Determinar quais cards usar
  const usesCMSData = cards && cards.length > 0;
  const cardsToRender = usesCMSData ? cards : fallbackSolutions;

  console.log('=== Final Render Decision ===');
  console.log('usesCMSData:', usesCMSData);
  console.log('cardsToRender length:', cardsToRender.length);
  console.log('cardsToRender:', cardsToRender);

  // Mostrar erro se houver, mas ainda renderizar com fallback
  if (error) {
    console.warn('CMS Error (usando fallback):', error);
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {usesCMSData ? (
            // Renderizar com dados do CMS
            cards.map((card, index) => {
              console.log(`Rendering CMS card ${index + 1}:`, card);
              return (
                <SolutionCard
                  key={card.id}
                  icon={iconMap[card.icon_name as keyof typeof iconMap] || <Target className="w-6 h-6 text-white" />}
                  title={card.title}
                  description={card.description}
                  index={index}
                  engine={card.engine}
                  backgroundColor={card.background_color || '#1E4A94'}
                />
              );
            })
          ) : (
            // Renderizar com dados de fallback
            fallbackSolutions.map((solution, index) => {
              console.log(`Rendering fallback card ${index + 1}:`, solution.title);
              return (
                <SolutionCard
                  key={`fallback-${index}`}
                  icon={solution.icon}
                  title={solution.title}
                  description={solution.description}
                  index={index}
                  engine={solution.engine}
                  backgroundColor={solution.backgroundColor}
                />
              );
            })
          )}
        </div>

        {/* Button to Solutions page */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
            onClick={handleSolutionsClick}
          >
            {t('solutions.viewAllSolutions') || 'Ver Todas as Soluções'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompactSolutionsSection;

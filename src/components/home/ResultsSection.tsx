
import { TrendingUp, Shield, Award, Clock, Target, DollarSign, Eye, ShoppingCart, Search, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMarkdownResultsCards } from '@/hooks/useMarkdownResultsCards';
import ResultsHeader from './results/ResultsHeader';
import ResultCard from './results/ResultCard';
import ResultsBackground from './results/ResultsBackground';

// Icon mapping for dynamic icon rendering
const iconMap = {
  'trending-up': TrendingUp,
  'shield': Shield,
  'award': Award,
  'clock': Clock,
  'target': Target,
  'dollar-sign': DollarSign,
  'eye': Eye,
  'shopping-cart': ShoppingCart,
  'search': Search,
  'users': Users,
};

const ResultsSection = () => {
  const { scrollY } = useScrollAnimation();
  const { t, language } = useLanguage();
  
  // Usar o novo hook unificado do Markdown com fallback para Supabase
  const { cards, loading, error, isUsingFallback } = useMarkdownResultsCards('home', language);

  console.log('🔍 ResultsSection DEBUG:', {
    cardsLength: cards.length,
    cards,
    loading,
    error,
    isUsingFallback,
    language
  });

  // Fallback data for when no CMS or Markdown data is available
  const fallbackResults = [
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: t('results.conversionRate.title'),
      description: t('results.conversionRate.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: t('results.crmCost.title'), 
      description: t('results.crmCost.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-indigo-500" />,
      title: t('results.avgTicket.title'),
      description: t('results.avgTicket.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Eye className="w-8 h-8 text-red-500" />,
      title: t('results.bounceRate.title'),
      description: t('results.bounceRate.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: t('results.proposalEngagement.title'),
      description: t('results.proposalEngagement.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: t('results.realTimeRec.title'),
      description: t('results.realTimeRec.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Search className="w-8 h-8 text-teal-500" />,
      title: t('results.productDiscovery.title'),
      description: t('results.productDiscovery.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: t('results.dynamicPricing.title'),
      description: t('results.dynamicPricing.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: t('results.marketDemand.title'),
      description: t('results.marketDemand.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: t('results.rapidImplementation.title'),
      description: t('results.rapidImplementation.description'),
      backgroundColor: undefined,
      backgroundOpacity: undefined
    }
  ];

  // Use Markdown/CMS cards if available, otherwise fallback to translations
  const resultsToRender = cards.length > 0 ? cards.map(card => {
    const IconComponent = iconMap[card.iconName as keyof typeof iconMap] || TrendingUp;
    return {
      icon: <IconComponent className={`w-8 h-8`} style={{ color: card.iconColor }} />,
      title: card.title,
      description: card.description,
      backgroundColor: card.backgroundColor,
      backgroundOpacity: card.backgroundOpacity
    };
  }) : fallbackResults;

  console.log('📊 ResultsSection - Final render data:', {
    resultsToRenderLength: resultsToRender.length,
    usingFallback: cards.length === 0,
    loading
  });

  if (loading) {
    console.log('⏳ ResultsSection - Showing loading state');
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <ResultsBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ResultsHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xs text-blue-500">
              🔄 Carregando cards... (Debug: loading={loading ? 'true' : 'false'})
            </p>
          </div>
        </div>
      </section>
    );
  }

  console.log('✅ ResultsSection - Rendering main content');

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ResultsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ResultsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resultsToRender.map((result, index) => (
            <ResultCard
              key={index}
              icon={result.icon}
              title={result.title}
              description={result.description}
              index={index}
              backgroundColor={result.backgroundColor}
              backgroundOpacity={result.backgroundOpacity}
            />
          ))}
        </div>
        
        {/* Debug e status indicators */}
        <div className="text-center mt-8 space-y-2">
          {isUsingFallback && (
            <p className="text-xs text-blue-500">
              📄 Dados carregados do Supabase (fallback)
            </p>
          )}
          
          {cards.length === 0 && !loading && (
            <p className="text-xs text-orange-500">
              🌐 Usando dados das traduções (nenhum dado CMS/Markdown disponível)
            </p>
          )}
          
          <p className="text-xs text-gray-400">
            🔍 Debug: {cards.length} cards, loading={loading ? 'true' : 'false'}, fallback={isUsingFallback ? 'true' : 'false'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;

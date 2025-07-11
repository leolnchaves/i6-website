
import React from 'react';
import { TrendingUp, Shield, Award, Clock, Target, DollarSign, Eye, ShoppingCart, Search, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSResultsCards } from '@/hooks/useCMSResultsCards';
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
  const { cards, loading } = useCMSResultsCards('home', language);

  console.log('ResultsSection - Total cards fetched:', cards.length);
  console.log('ResultsSection - Cards data:', cards);

  // Filter only active cards for display on the website
  const activeCards = cards.filter(card => card.is_active);
  console.log('ResultsSection - Active cards:', activeCards.length);

  // Fallback data for when CMS data is not available
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

  // Use CMS active cards if available, otherwise fallback to translations
  const resultsToRender = activeCards.length > 0 ? activeCards.map(card => {
    const IconComponent = iconMap[card.icon_name as keyof typeof iconMap] || TrendingUp;
    return {
      icon: <IconComponent className="text-primary text-3xl" />,
      title: card.title,
      description: card.description,
      backgroundColor: card.background_color,
      backgroundOpacity: card.background_opacity
    };
  }) : fallbackResults.map(result => ({
    ...result,
    icon: React.cloneElement(result.icon as React.ReactElement, {
      className: "text-primary text-3xl"
    })
  }));

  console.log('ResultsSection - Final results to render:', resultsToRender.length);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ResultsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ResultsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default ResultsSection;


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

  // Fallback data for when CMS data is not available
  const fallbackResults = [
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: t('results.conversionRate.title'),
      description: t('results.conversionRate.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: t('results.crmCost.title'), 
      description: t('results.crmCost.description')
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-indigo-500" />,
      title: t('results.avgTicket.title'),
      description: t('results.avgTicket.description')
    },
    {
      icon: <Eye className="w-8 h-8 text-red-500" />,
      title: t('results.bounceRate.title'),
      description: t('results.bounceRate.description')
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: t('results.proposalEngagement.title'),
      description: t('results.proposalEngagement.description')
    },
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: t('results.realTimeRec.title'),
      description: t('results.realTimeRec.description')
    },
    {
      icon: <Search className="w-8 h-8 text-teal-500" />,
      title: t('results.productDiscovery.title'),
      description: t('results.productDiscovery.description')
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: t('results.dynamicPricing.title'),
      description: t('results.dynamicPricing.description')
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: t('results.marketDemand.title'),
      description: t('results.marketDemand.description')
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: t('results.rapidImplementation.title'),
      description: t('results.rapidImplementation.description')
    }
  ];

  // Use CMS cards if available, otherwise fallback to translations
  const resultsToRender = cards.length > 0 ? cards.map(card => {
    const IconComponent = iconMap[card.icon_name as keyof typeof iconMap] || TrendingUp;
    return {
      icon: <IconComponent className={`w-8 h-8`} style={{ color: card.icon_color }} />,
      title: card.title,
      description: card.description,
      backgroundColor: card.background_color,
      backgroundOpacity: card.background_opacity
    };
  }) : fallbackResults;

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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;

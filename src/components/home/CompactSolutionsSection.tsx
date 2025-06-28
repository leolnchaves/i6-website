
import { Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ArrowRight, Zap, Star, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSCompactSolutionsCardsFrontend } from '@/hooks/useCMSCompactSolutionsCardsFrontend';
import CompactSolutionsHeader from './compact-solutions/CompactSolutionsHeader';
import SolutionCard from './compact-solutions/SolutionCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Icon mapping for dynamic icon rendering
const iconMap = {
  'Target': Target,
  'Users': Users,
  'Cog': Cog,
  'TrendingUp': TrendingUp,
  'DollarSign': DollarSign,
  'BarChart3': BarChart3,
  'Zap': Zap,
  'Star': Star,
  'Heart': Heart,
  'Shield': Shield,
};

const CompactSolutionsSection = () => {
  const { t, language } = useLanguage();
  const { cards, loading } = useCMSCompactSolutionsCardsFrontend('home', language);

  console.log('CompactSolutionsSection - Total cards fetched:', cards.length);
  console.log('CompactSolutionsSection - Cards data:', cards);

  // Filter only active cards for display on the website
  const activeCards = cards.filter(card => card.is_active);
  console.log('CompactSolutionsSection - Active cards:', activeCards.length);

  // Fallback data for when CMS data is not available
  const fallbackCards = [
    {
      id: '1',
      title: 'Smart Discovery for Anonymous Visitors',
      description: 'Turn anonymous traffic into engaged buyers with real-time intelligent recommendations.',
      icon: 'Target',
      engine: 'i6 RecSys',
      backgroundColor: '#1E4A94'
    },
    {
      id: '2',
      title: 'Predictive Personalization',
      description: 'Deliver truly personalized experiences based on individual behavior and preferences.',
      icon: 'Users',
      engine: 'i6 RecSys',
      backgroundColor: '#2D5A87'
    },
    {
      id: '3',
      title: 'Industrial Recommendation Intelligence',
      description: 'Align commercial targets with intelligent recommendations in real time.',
      icon: 'Cog',
      engine: 'i6 RecSys',
      backgroundColor: '#3A6B7A'
    },
    {
      id: '4',
      title: 'Predictive Campaign Targeting',
      description: 'Identify users most likely to convert before campaigns begin.',
      icon: 'TrendingUp',
      engine: 'i6 RecSys',
      backgroundColor: '#477C6D'
    },
    {
      id: '5',
      title: 'Smart Price Optimization',
      description: 'Dynamic pricing that adapts in real time to demand and behavior.',
      icon: 'DollarSign',
      engine: 'i6 ElasticPrice',
      backgroundColor: '#548D60'
    },
    {
      id: '6',
      title: 'Adaptive Demand Forecasting',
      description: 'Forecast demand with precision based on trends and behaviors.',
      icon: 'BarChart3',
      engine: 'i6 Previsio',
      backgroundColor: '#619E53'
    }
  ];

  const handleSolutionsClick = () => {
    window.location.href = '/solutions';
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CompactSolutionsHeader />
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  // Use CMS active cards if available, otherwise fallback to static data
  const cardsToRender = activeCards.length > 0 ? activeCards.map(card => {
    const IconComponent = iconMap[card.icon_name as keyof typeof iconMap] || Target;
    return {
      id: card.id,
      title: card.title,
      description: card.description,
      icon: <IconComponent className="w-6 h-6 text-white" />,
      engine: card.engine_name,
      backgroundColor: card.background_color
    };
  }) : fallbackCards.map(card => ({
    id: card.id,
    title: card.title,
    description: card.description,
    icon: iconMap[card.icon as keyof typeof iconMap] ? React.createElement(iconMap[card.icon as keyof typeof iconMap], { className: "w-6 h-6 text-white" }) : <Target className="w-6 h-6 text-white" />,
    engine: card.engine,
    backgroundColor: card.backgroundColor
  }));

  console.log('CompactSolutionsSection - Final cards to render:', cardsToRender.length);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CompactSolutionsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cardsToRender.map((card, index) => (
            <SolutionCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index}
              engine={card.engine}
              backgroundColor={card.backgroundColor}
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

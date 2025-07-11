
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
      icon: <TrendingUp className="text-primary text-3xl" />,
      title: "Conversion Rate Optimization",
      description: "Advanced AI algorithms boost conversion rates through intelligent customer behavior analysis and personalized recommendations",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <DollarSign className="text-primary text-3xl" />,
      title: "CRM Cost Reduction", 
      description: "Streamlined operations and automated processes significantly reduce operational expenses while maintaining service quality",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Award className="text-primary text-3xl" />,
      title: "Average Ticket Enhancement",
      description: "Substantial increase in average ticket value through AI-guided cross-selling with diversity balancing",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Eye className="text-primary text-3xl" />,
      title: "Bounce Rate Optimization",
      description: "Significant reduction of bounce rate in digital funnels through AI-driven user experience optimization",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Target className="text-primary text-3xl" />,
      title: "Enhanced Proposal Engagement",
      description: "Data-driven insights and AI-powered personalization dramatically improve proposal success rates",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Clock className="text-primary text-3xl" />,
      title: "Real-Time Recommendations",
      description: "Predictive behavior recommendations with equal precision for logged users (with history) and anonymous users (without history)",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Search className="text-primary text-3xl" />,
      title: "Relevant Product Discovery",
      description: "AI-powered product complementarity discovery based on navigation behavior patterns and user preferences",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <TrendingUp className="text-primary text-3xl" />,
      title: "Dynamic Pricing Intelligence",
      description: "Self-reinforcing pricing model adjusting prices based on demand, where adjustments increase either demand or margin, feeding back into the system",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Target className="text-primary text-3xl" />,
      title: "Market Demand Forecasting",
      description: "AI-powered forecast precision directing production plans and commercial goals, optimizing stock breaks and turnover",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <ShoppingCart className="text-primary text-3xl" />,
      title: "Assortment Optimization",
      description: "Personalized product mix recommendations tailored to each POS profile, increasing sell-out efficiency and profitability",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <TrendingUp className="text-primary text-3xl" />,
      title: "Channel Conversion Intelligence",
      description: "Optimized product and offer targeting for each sales channel (WhatsApp, marketplace, rep), maximizing conversion rates and ROI",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Shield className="text-primary text-3xl" />,
      title: "AI-Guided Retention Offers",
      description: "Behavioral-based offer personalization for churn recovery and financial reactivation, increasing acceptance while reducing discounts",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Users className="text-primary text-3xl" />,
      title: "Cross-Sell Journey Prediction",
      description: "AI engines anticipate the next best product for each consumer, increasing LTV through timing, context, and affinity",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Award className="text-primary text-3xl" />,
      title: "Sales Team Empowerment",
      description: "AI suggestions and gamified metrics improve rep performance and execution with real-time actionability and visibility",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Clock className="text-primary text-3xl" />,
      title: "Rapid Implementation",
      description: "100% API-first and cloud-native AI solutions deliver measurable outcomes in weeks, not months",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {resultsToRender.slice(0, 15).map((result, index) => (
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

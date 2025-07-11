
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
      description: "Boost conversions with advanced AI that understands behavior and delivers precise recommendations.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <DollarSign className="text-primary text-3xl" />,
      title: "CRM Cost Reduction", 
      description: "Automate processes and cut operational costs without losing service quality.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Award className="text-primary text-3xl" />,
      title: "Average Ticket Enhancement",
      description: "Increase average ticket with smart, balanced cross-sell strategies.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Eye className="text-primary text-3xl" />,
      title: "Bounce Rate Optimization",
      description: "Reduce bounce rates through real-time, AI-optimized digital experiences.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Target className="text-primary text-3xl" />,
      title: "Enhanced Proposal Engagement",
      description: "Improve proposal success with AI-powered personalization and insights.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Clock className="text-primary text-3xl" />,
      title: "Real-Time Recommendations",
      description: "Predictive recommendations for both logged-in and anonymous users.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Search className="text-primary text-3xl" />,
      title: "Relevant Product Discovery",
      description: "Uncover complementary products based on browsing and preferences.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <TrendingUp className="text-primary text-3xl" />,
      title: "Dynamic Pricing Intelligence",
      description: "Continuously adjust prices to boost demand or margin with smart AI.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Target className="text-primary text-3xl" />,
      title: "Market Demand Forecasting",
      description: "Guide production and goals with precise, AI-driven demand forecasts.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <ShoppingCart className="text-primary text-3xl" />,
      title: "Channel Conversion Intelligence",
      description: "Target the right product and offer per channel to boost conversions and ROI.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Shield className="text-primary text-3xl" />,
      title: "AI-Guided Retention Offers",
      description: "Recover churned users with personalized offers that drive acceptance and reduce discounts.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Users className="text-primary text-3xl" />,
      title: "Cross-Sell Journey Prediction",
      description: "Predict the next best product using context, timing, and affinity to grow LTV.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <ShoppingCart className="text-primary text-3xl" />,
      title: "Assortment Optimization",
      description: "Boost sell-out and profitability with AI-driven product mix tailored to each POS profile.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Award className="text-primary text-3xl" />,
      title: "Sales Team Empowerment",
      description: "Enhance rep performance with real-time AI suggestions and gamified insights.",
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Clock className="text-primary text-3xl" />,
      title: "Rapid Implementation",
      description: "Deliver measurable results in weeks with API-first, cloud-native AI.",
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 max-w-7xl mx-auto items-stretch">
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

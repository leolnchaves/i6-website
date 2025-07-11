
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
      title: "Growth Acceleration",
      description: "Accelerate commercial performance with AI that predicts behavior, drives conversions, and increases ticket size.",
      solutions: [
        "Conversion Rate Optimization",
        "Average Ticket Enhancement", 
        "Channel Conversion Intelligence",
        "Cross-Sell Journey Prediction",
        "Enhanced Proposal Engagement"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Target className="text-primary text-3xl" />,
      title: "Hyperpersonalization Intelligence",
      description: "Deliver relevant, contextual, and real-time experiences that engage deeply and convert better, at every touchpoint.",
      solutions: [
        "Real-Time Recommendations",
        "Relevant Product Discovery",
        "Bounce Rate Optimization", 
        "AI-Guided Retention Offers"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <DollarSign className="text-primary text-3xl" />,
      title: "Supply & Profitability Optimization",
      description: "Balance pricing, demand and assortment to reduce stockouts, improve turnover, and grow margins with precision.",
      solutions: [
        "Dynamic Pricing Intelligence",
        "Market Demand Forecasting",
        "Assortment Optimization"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Award className="text-primary text-3xl" />,
      title: "Cost & Commercial Efficiency",
      description: "Reduce costs, streamline operations, and empower sales teams with AI built for fast, scalable execution.",
      solutions: [
        "CRM Cost Reduction",
        "Sales Team Empowerment",
        "Rapid Implementation"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    }
  ];

  // Always use fallback results with 4 category cards for now
  const resultsToRender = fallbackResults.map(result => ({
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {resultsToRender.map((result, index) => (
            <ResultCard
              key={index}
              icon={result.icon}
              title={result.title}
              description={result.description}
              solutions={result.solutions}
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

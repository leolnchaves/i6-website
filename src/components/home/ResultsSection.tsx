
import React from 'react';
import { TrendingUp, Award, Target, DollarSign } from 'lucide-react';

import ResultsHeader from './results/ResultsHeader';
import ResultCard from './results/ResultCard';
import ResultsBackground from './results/ResultsBackground';


const ResultsSection = () => {

  // Static results data - 4 main value propositions
  const staticResults = [
    {
      icon: <TrendingUp className="text-primary text-3xl" />,
      title: "Growth Acceleration",
      description: "Accelerate performance with AI that boosts conversions, ticket size and ROI across channels.",
      solutions: [
        "Increase conversions by matching the right offer to the right customer",
        "Grow ticket size with smart, contextual cross-sell",
        "Maximize ROI by adapting to each sales channel",
        "Boost LTV by anticipating next-best purchases",
        "Improve proposal win rates with personalized timing and content"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Target className="text-primary text-3xl" />,
      title: "Hyperpersonalization Intelligence",
      description: "Engage users with real-time, contextual experiences that convert better.",
      solutions: [
        "Reduce bounce rate with behavior-based journeys",
        "Help users find relevant products faster",
        "Personalize offers even for anonymous visitors",
        "Recover churned users with smart, timely offers"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <DollarSign className="text-primary text-3xl" />,
      title: "Supply & Profitability Optimization",
      description: "Align pricing, demand, and assortment to improve margin, turnover and sell-out.",
      solutions: [
        "Increase margin or demand with dynamic pricing",
        "Forecast demand to avoid stockouts and excess",
        "Boost sell-out with smart, localized assortment"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    },
    {
      icon: <Award className="text-primary text-3xl" />,
      title: "Cost & Commercial Efficiency",
      description: "Cut costs and scale smarter with fast, AI-powered execution.",
      solutions: [
        "Reduce CRM and operational expenses with automation",
        "Improve sales team performance with AI and gamification",
        "Launch and scale in weeks with plug-and-play AI"
      ],
      backgroundColor: undefined,
      backgroundOpacity: undefined
    }
  ];


  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ResultsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ResultsHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {staticResults.map((result, index) => (
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

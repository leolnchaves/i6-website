
import React from 'react';
import StatCard from './stats/StatCard';
import StatsBackground from './stats/StatsBackground';
import { useHomeContent } from '@/hooks/useHomeContent';

const StatsSection = () => {
  const { getStatsContent } = useHomeContent();
  const statsData = getStatsContent();

  return (
    <section 
      className="relative py-20 bg-gray-50 overflow-hidden"
      data-testid="stats-section"
    >
      <StatsBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Proven Results Across Industries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI solutions have delivered measurable impact for companies worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(statsData).map(([key, stat]) => (
            <StatCard
              key={key}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

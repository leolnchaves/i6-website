import React, { memo, useCallback } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import LazyImage from '../optimized/LazyImage';

interface StoryCardData {
  id: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
  logo?: string;
}

interface StoryCardProps {
  story: StoryCardData;
  onClick: (story: StoryCardData) => void;
  language: string;
}

const StoryCard: React.FC<StoryCardProps> = memo(({ story, onClick, language }) => {
  const handleClick = useCallback(() => onClick(story), [story, onClick]);

  return (
    <div
      className="group overflow-hidden cursor-pointer rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* Hover gradient bar */}
      <div className="h-0 bg-[#F4845F] group-hover:h-1 transition-all duration-500"></div>

      <div className="p-6 relative">
        {/* Image */}
        <div className="w-full h-32 bg-white/5 rounded-lg mb-4 overflow-hidden">
          <LazyImage
            src={story.image_url}
            alt={story.company_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Industry tag */}
        <div className="flex items-center mb-3">
          <Building2 className="w-3 h-3 text-white/40 mr-2" />
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {story.industry}
          </span>
        </div>

        {/* Quote */}
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white/90 transition-colors duration-300">
          {story.customer_quote}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {story.challenge.length > 100 ? `${story.challenge.substring(0, 100)}...` : story.challenge}
        </p>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-xl font-semibold text-[#F4845F] mb-1">{story.metric1_value}</div>
            <div className="text-xs text-white/50 font-medium">{story.metric1_label}</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-xl font-semibold text-[#F4845F] mb-1">{story.metric2_value}</div>
            <div className="text-xs text-white/50 font-medium">{story.metric2_label}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            {story.logo && (
              <img
                src={story.logo}
                alt={`${story.company_name} logo`}
                className="w-8 h-8 object-contain brightness-0 invert opacity-60"
              />
            )}
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-300 mr-3">
              {language === 'en' ? 'Explore Details' : 'Ver Detalhes'}
            </span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 group-hover:bg-[#F4845F]/20 border border-transparent group-hover:border-[#F4845F]/30 transition-all duration-500">
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-[#F4845F] transition-all duration-500 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

StoryCard.displayName = 'StoryCard';

export default StoryCard;

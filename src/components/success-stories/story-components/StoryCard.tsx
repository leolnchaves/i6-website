import React, { memo, useCallback } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import LazyImage from '../optimized/LazyImage';
import { getPublicAssetUrl } from '@/utils/assetUtils';

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
  const handleClick = useCallback(() => {
    onClick(story);
  }, [story, onClick]);

  return (
    <Card 
      className="group overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 bg-white"
      onClick={handleClick}
    >
      {/* Hidden gradient bar - only appears on hover */}
      <div className="h-0 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 group-hover:h-1 transition-all duration-500"></div>
      
      <CardContent className="p-6 relative">
        {/* Image placeholder */}
        <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 overflow-hidden">
          <LazyImage 
            src={story.image_url}
            alt={story.company_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Industry tag */}
        <div className="flex items-center mb-3">
          <Building2 className="w-3 h-3 text-gray-500 mr-2" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {story.industry}
          </span>
        </div>

        {/* Quote */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
          {story.customer_quote}
        </h3>

        {/* Brief description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {story.challenge.length > 100 ? `${story.challenge.substring(0, 100)}...` : story.challenge}
        </p>

        {/* Key metrics - uniform background */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xl font-semibold text-gray-700 mb-1">
              {story.metric1_value}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {story.metric1_label}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xl font-semibold text-gray-700 mb-1">
              {story.metric2_value}
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {story.metric2_label}
            </div>
          </div>
        </div>

        {/* Explore details with company logo and modern arrow */}
        <div className="flex items-center justify-between">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {story.logo && (
              <img 
                src={story.logo}
                alt={`${story.company_name} logo`}
                className="w-8 h-8 object-contain"
              />
            )}
          </div>
          
          {/* Details section */}
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300 mr-3">
              {language === 'en' ? 'Explore Details' : 'Ver Detalhes'}
            </span>
            <div className="relative overflow-hidden">
              {/* Background that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
              {/* Arrow container */}
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 group-hover:bg-transparent transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-all duration-500 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StoryCard.displayName = 'StoryCard';

export default StoryCard;
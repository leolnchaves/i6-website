import React, { useState, useEffect } from 'react';
import { X, ArrowRight, User, Building2, Quote, Target, TrendingUp, Zap, Shield, Users, ShoppingCart, DollarSign, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesCardsData } from '@/data/staticData/successStoriesCardsData';
import { useCompanyDetails } from './hooks/useCompanyDetails';
import { useSolutionsMapping } from './hooks/useSolutionsMapping';
import EmptyState from './story-components/EmptyState';
import StoryCard from './story-components/StoryCard';

interface ModernStoriesGridProps {
  selectedSegment?: string | null;
}

interface StoryCard {
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
}

const ModernStoriesGrid: React.FC<ModernStoriesGridProps> = ({ selectedSegment }) => {
  const { language } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<StoryCard | null>(null);
  const { getCompanyDetails } = useCompanyDetails();
  const { getImplementedSolutions } = useSolutionsMapping();

  // Get static data
  const cards = successStoriesCardsData[language] || successStoriesCardsData.en;

  // Filter cards based on selected segment
  const filteredCards = selectedSegment 
    ? cards.filter(card => card.industry === selectedSegment)
    : cards;

  const handleCardClick = (story: StoryCard) => {
    setSelectedStory(story);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
    document.body.style.overflow = 'unset';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (filteredCards.length === 0) {
    return <EmptyState selectedSegment={selectedSegment} language={language} />;
  }

  return (
    <>
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onClick={handleCardClick}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] relative shadow-xl animate-modal-enter overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient bar on top - matching the card design */}
            <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500"></div>
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200"
              onClick={handleCloseModal}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Header with company info and logo */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-4">
                  <div className="flex items-center mb-3">
                    <Building2 className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedStory.industry}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                    {selectedStory.company_name}
                  </h1>

                  {/* About text - directly below company name */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {getCompanyDetails(selectedStory).about}
                  </p>
                </div>
                
                {/* Client Logo - smaller and positioned in header */}
                <div className="flex-shrink-0 mr-8">
                  <img 
                    src={getCompanyDetails(selectedStory).logo}
                    alt={`${selectedStory.company_name} logo`}
                    className="w-10 h-10 rounded-lg object-contain border border-gray-200 bg-white p-1"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Challenge' : 'Desafio'}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedStory.challenge}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Solution' : 'Solução'}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedStory.solution}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric1_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric1_label}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric2_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric2_label}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric3_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric3_label}
                  </div>
                </div>
              </div>

              {/* Implemented Solutions Mini-Cards */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h2 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  {language === 'en' ? 'Implemented Solutions' : 'Soluções Implementadas'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getImplementedSolutions(selectedStory).map((solution, index) => {
                    const IconComponent = solution.icon;
                    return (
                      <div key={index} className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-200 min-h-[40px]">
                        <div className={`w-6 h-6 rounded ${solution.color} flex items-center justify-center mr-2 flex-shrink-0`}>
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <span className="font-medium text-gray-900 text-xs leading-tight">
                          {solution.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernStoriesGrid;
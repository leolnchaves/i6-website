import React, { useState, memo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesCardsData } from '@/data/staticData/successStoriesCardsData';
import { useCompanyDetails } from './hooks/useCompanyDetails';
import { useSolutionsMapping } from './hooks/useSolutionsMapping';
import EmptyState from './story-components/EmptyState';
import StoryCard from './story-components/StoryCard';
import StoryModal from './story-components/StoryModal';

interface ModernStoriesGridProps {
  selectedSegment?: string | null;
}

interface StoryData {
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

const ModernStoriesGrid: React.FC<ModernStoriesGridProps> = memo(({ selectedSegment }) => {
  const { language } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const { getCompanyDetails } = useCompanyDetails();
  const { getImplementedSolutions } = useSolutionsMapping();

  // Get static data
  const cards = successStoriesCardsData[language] || successStoriesCardsData.en;

  // Filter cards based on selected segment
  const filteredCards = selectedSegment 
    ? cards.filter(card => card.industry === selectedSegment)
    : cards;

  const handleCardClick = useCallback((story: StoryData) => {
    setSelectedStory(story);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedStory(null);
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

      <StoryModal
        selectedStory={selectedStory}
        onClose={handleCloseModal}
        language={language}
        getCompanyDetails={getCompanyDetails}
        getImplementedSolutions={getImplementedSolutions}
      />
    </>
  );
});

ModernStoriesGrid.displayName = 'ModernStoriesGrid';

export default ModernStoriesGrid;
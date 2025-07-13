import React, { useState, memo, useCallback, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesMarkdown } from '@/hooks/useSuccessStoriesMarkdown';
import EmptyState from './story-components/EmptyState';
import { LazyStoryCard, LazyStoryModal } from './optimized/LazyComponents';
import InViewSection from './optimized/InViewSection';
import { useImageCache } from './optimized/useImageCache';

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
  solutions: string[];
}

const ModernStoriesGrid: React.FC<ModernStoriesGridProps> = memo(({ selectedSegment }) => {
  const { language } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const { preloadImage } = useImageCache({ maxAge: 24 * 60 * 60 * 1000, maxSize: 100 });

  // Use markdown content hook
  const { stories, loading, error } = useSuccessStoriesMarkdown();

  // Filter cards based on selected segment
  const filteredCards = selectedSegment 
    ? stories.filter(story => story.segment === selectedSegment)
    : stories;

  const handleCardClick = useCallback((story: StoryData) => {
    setSelectedStory(story);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedStory(null);
  }, []);

  // Pré-carregar imagens quando o componente monta
  useEffect(() => {
    const imageUrls = filteredCards.map(story => story.image);
    imageUrls.forEach(url => preloadImage(url));
  }, [filteredCards, preloadImage]);

  if (loading) {
    return (
      <InViewSection className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </InViewSection>
    );
  }

  if (error) {
    return (
      <InViewSection className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-gray-600">Error loading success stories: {error}</p>
          </div>
        </div>
      </InViewSection>
    );
  }

  if (filteredCards.length === 0) {
    return <EmptyState selectedSegment={selectedSegment} language={language} />;
  }

  return (
    <>
      <InViewSection className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((story) => (
              <LazyStoryCard
                key={story.id}
                story={{
                  id: story.id,
                  industry: story.segment,
                  company_name: story.client,
                  challenge: story.challenge,
                  solution: story.solution,
                  metric1_value: story.metric1.split(' ')[0],
                  metric1_label: story.metric1.split(' ').slice(1).join(' '),
                  metric2_value: story.metric2.split(' ')[0],
                  metric2_label: story.metric2.split(' ').slice(1).join(' '),
                  metric3_value: story.metric3.split(' ')[0],
                  metric3_label: story.metric3.split(' ').slice(1).join(' '),
                  customer_quote: story.quote,
                  customer_name: story.customerName,
                  customer_title: story.customerTitle,
                  image_url: story.image,
                  solutions: story.solutions
                }}
                onClick={handleCardClick}
                language={language}
              />
            ))}
          </div>
        </div>
      </InViewSection>

      <LazyStoryModal
        selectedStory={selectedStory}
        onClose={handleCloseModal}
        language={language}
        getCompanyDetails={(story: any) => ({
          about: stories.find(s => s.id === story.id)?.description || '',
          logo: stories.find(s => s.id === story.id)?.logo || ''
        })}
        getImplementedSolutions={(story: any) => {
          const storyData = stories.find(s => s.id === story.id);
          if (!storyData?.solutions) return [];
          
          // Return simple solution objects with just names
          return storyData.solutions.map((solutionName: string) => ({
            name: solutionName
          }));
        }}
      />
    </>
  );
});

ModernStoriesGrid.displayName = 'ModernStoriesGrid';

export default ModernStoriesGrid;
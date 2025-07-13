import { memo, useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesCardsData } from '@/data/staticData/successStoriesCardsData';
import StoryCard from './StoryCard';
import StoryModal from './StoryModal';

interface ModernStoriesGridProps {
  selectedSegment?: string | null;
}

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
}

const ModernStoriesGrid = memo(({ selectedSegment }: ModernStoriesGridProps) => {
  const { language } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<StoryCardData | null>(null);

  // Memoize cards data to prevent recalculation
  const cards = useMemo(() => 
    successStoriesCardsData[language] || successStoriesCardsData.en, 
    [language]
  );

  // Memoize filtered cards
  const filteredCards = useMemo(() => {
    return selectedSegment 
      ? cards.filter(card => card.industry === selectedSegment)
      : cards;
  }, [cards, selectedSegment]);

  const handleCardClick = (story: StoryCardData) => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (filteredCards.length === 0) {
    return (
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {selectedSegment 
                ? (language === 'en' 
                    ? `No success stories found for "${selectedSegment}"`
                    : `Nenhum case de sucesso encontrado para "${selectedSegment}"`)
                : (language === 'en' 
                    ? 'No success stories available'
                    : 'Nenhum case de sucesso disponível')
              }
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {selectedSegment 
                ? (language === 'en' 
                    ? 'Try selecting a different segment or view all stories.'
                    : 'Tente selecionar um segmento diferente ou veja todos os cases.')
                : (language === 'en' 
                    ? 'Success stories will be displayed here when available.'
                    : 'Os cases de sucesso serão exibidos aqui quando estiverem disponíveis.')
              }
            </p>
          </div>
        </div>
      </section>
    );
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
});

ModernStoriesGrid.displayName = 'ModernStoriesGrid';

export default ModernStoriesGrid;
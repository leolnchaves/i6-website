
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSuccessStoriesCards } from '@/hooks/useCMSSuccessStoriesCards';
import { useCMSContent } from '@/hooks/useCMSContent';

interface SegmentFilterProps {
  onSegmentChange: (segment: string | null) => void;
  selectedSegment: string | null;
}

const SegmentFilter: React.FC<SegmentFilterProps> = ({ onSegmentChange, selectedSegment }) => {
  const { language } = useLanguage();
  const { pages, fetchPages } = useCMSContent();
  const { cards, fetchCards } = useCMSSuccessStoriesCards();
  const [pageId, setPageId] = useState<string>('');
  const [availableSegments, setAvailableSegments] = useState<string[]>([]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    if (pages.length > 0) {
      const successStoriesPage = pages.find(p => p.slug === 'success-stories');
      if (successStoriesPage) {
        setPageId(successStoriesPage.id);
        fetchCards(successStoriesPage.id, language);
      }
    }
  }, [pages, language, fetchCards]);

  // Extract unique industries from cards
  useEffect(() => {
    if (cards.length > 0) {
      const uniqueIndustries = [...new Set(cards.map(card => card.industry))].sort();
      setAvailableSegments(uniqueIndustries);
    }
  }, [cards]);

  const handleSegmentClick = (segment: string) => {
    if (selectedSegment === segment) {
      onSegmentChange(null); // Deselect if already selected
    } else {
      onSegmentChange(segment);
    }
  };

  if (availableSegments.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 relative">
      {/* Scroll arrow identical to HOME */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="relative group">
          {/* Glowing circle background */}
          <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-sm opacity-50"></div>
            {/* Modern chevron down icon */}
            <svg className="w-5 h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Filtrar por Segmento</h3>
          <p className="text-gray-600">Escolha um segmento para ver cases específicos da indústria</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant={selectedSegment === null ? "default" : "outline"}
            onClick={() => onSegmentChange(null)}
            className="mb-2"
          >
            Todos os Segmentos
          </Button>
          
          {availableSegments.map((segment) => (
            <Button
              key={segment}
              variant={selectedSegment === segment ? "default" : "outline"}
              onClick={() => handleSegmentClick(segment)}
              className="mb-2"
            >
              {segment}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SegmentFilter;

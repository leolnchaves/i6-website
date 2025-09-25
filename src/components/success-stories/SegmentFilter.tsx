
import React, { useState, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesMarkdown } from '@/hooks/useSuccessStoriesMarkdown';

interface SegmentFilterProps {
  onSegmentChange: (segment: string | null) => void;
  selectedSegment: string | null;
}

const SegmentFilter: React.FC<SegmentFilterProps> = memo(({ onSegmentChange, selectedSegment }) => {
  const { language } = useLanguage();
  const [availableSegments, setAvailableSegments] = useState<string[]>([]);
  const { stories, loading } = useSuccessStoriesMarkdown();

  // Extract unique segments from markdown data
  useEffect(() => {
    if (stories.length > 0) {
      const uniqueSegments = [...new Set(stories.map(story => story.segment))].sort();
      setAvailableSegments(uniqueSegments);
    }
  }, [stories]);

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
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Explore by Industry' : 'Explore por Indústria'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' ? 'Find success stories tailored to your market context.' : 'Encontre casos de sucesso adaptados ao contexto do seu mercado.'}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant={selectedSegment === null ? "default" : "outline"}
            onClick={() => onSegmentChange(null)}
            className="mb-2"
          >
            {language === 'en' ? 'All Industries' : 'Todos os Segmentos'}
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
});

SegmentFilter.displayName = 'SegmentFilter';

export default SegmentFilter;

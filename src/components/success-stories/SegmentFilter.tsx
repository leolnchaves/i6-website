
import React, { useState, useEffect, memo } from 'react';
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

  useEffect(() => {
    if (stories.length > 0) {
      const uniqueSegments = [...new Set(stories.map(story => story.segment))].sort();
      setAvailableSegments(uniqueSegments);
    }
  }, [stories]);

  const handleSegmentClick = (segment: string) => {
    onSegmentChange(selectedSegment === segment ? null : segment);
  };

  if (availableSegments.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-lg text-white/60">
            {language === 'en' ? 'Movement intelligence adapted to the dynamics of each market.' : 'Inteligência de movimento adaptada às dinâmicas de cada mercado.'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onSegmentChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              selectedSegment === null
                ? 'bg-[#F4845F] border-[#F4845F] text-white'
                : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {language === 'en' ? 'All Industries' : 'Todos os Segmentos'}
          </button>

          {availableSegments.map((segment) => (
            <button
              key={segment}
              onClick={() => handleSegmentClick(segment)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedSegment === segment
                  ? 'bg-[#F4845F] border-[#F4845F] text-white'
                  : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {segment}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

SegmentFilter.displayName = 'SegmentFilter';

export default SegmentFilter;

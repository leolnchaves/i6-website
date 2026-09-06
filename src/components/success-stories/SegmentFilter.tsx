import React, { useState, useEffect, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesMarkdown } from '@/hooks/useSuccessStoriesMarkdown';
import { successStoriesData } from '@/data/staticData/successStoriesData';

interface SegmentFilterProps {
  onSegmentChange: (segment: string | null) => void;
  selectedSegment: string | null;
}

/**
 * Mecânica preservada: segmentos derivados dos cases publicados, clique no
 * segmento ativo limpa o filtro. Apenas o tratamento visual muda (etiquetas
 * arredondadas em areia/terracota, faixa rolável no celular).
 */
const SegmentFilter: React.FC<SegmentFilterProps> = memo(({ onSegmentChange, selectedSegment }) => {
  const { language } = useLanguage();
  const [availableSegments, setAvailableSegments] = useState<string[]>([]);
  const { stories } = useSuccessStoriesMarkdown();
  const copy = (successStoriesData[language] || successStoriesData.en).listing;

  useEffect(() => {
    if (stories.length > 0) {
      const uniqueSegments = [...new Set(stories.map(story => story.segment))].filter(Boolean).sort();
      setAvailableSegments(uniqueSegments);
    }
  }, [stories]);

  const handleSegmentClick = (segment: string) => {
    onSegmentChange(selectedSegment === segment ? null : segment);
  };

  if (availableSegments.length === 0) return null;

  const chip = 'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300';
  const active = 'bg-primary border-primary text-primary-foreground';
  const idle = 'bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground';

  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-2 md:flex-wrap">
        <button
          type="button"
          onClick={() => onSegmentChange(null)}
          aria-pressed={selectedSegment === null}
          className={`${chip} ${selectedSegment === null ? active : idle}`}
        >
          {copy.filterAll}
        </button>

        {availableSegments.map((segment) => (
          <button
            key={segment}
            type="button"
            onClick={() => handleSegmentClick(segment)}
            aria-pressed={selectedSegment === segment}
            className={`${chip} ${selectedSegment === segment ? active : idle}`}
          >
            {segment}
          </button>
        ))}
      </div>
    </div>
  );
});

SegmentFilter.displayName = 'SegmentFilter';

export default SegmentFilter;

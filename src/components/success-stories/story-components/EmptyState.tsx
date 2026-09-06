import React, { memo } from 'react';
import { successStoriesData } from '@/data/staticData/successStoriesData';
import type { Language } from '@/types/language';

interface EmptyStateProps {
  selectedSegment: string | null;
  language: Language;
}

const EmptyState: React.FC<EmptyStateProps> = memo(({ selectedSegment, language }) => {
  const copy = (successStoriesData[language] || successStoriesData.en).listing;

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="sand-card mx-auto max-w-xl p-10 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            {selectedSegment
              ? `${copy.emptyTitleSegment} — ${selectedSegment}`
              : copy.emptyTitleAll}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {selectedSegment ? copy.emptyBodySegment : copy.emptyBodyAll}
          </p>
        </div>
      </div>
    </section>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;

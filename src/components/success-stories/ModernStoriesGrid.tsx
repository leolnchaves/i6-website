import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesMarkdown } from '@/hooks/useSuccessStoriesMarkdown';
import EmptyState from './story-components/EmptyState';
import StoryCard from './story-components/StoryCard';

interface ModernStoriesGridProps {
  selectedSegment?: string | null;
}

const ModernStoriesGrid: React.FC<ModernStoriesGridProps> = memo(({ selectedSegment }) => {
  const { language } = useLanguage();
  const { stories, loading, error } = useSuccessStoriesMarkdown();

  const filteredCards = selectedSegment
    ? stories.filter(story => story.segment === selectedSegment)
    : stories;

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto flex justify-center px-6">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          {error}
        </div>
      </section>
    );
  }

  if (filteredCards.length === 0) {
    return <EmptyState selectedSegment={selectedSegment ?? null} language={language} />;
  }

  return (
    <section className="pb-16 pt-4 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((story) => (
            <StoryCard
              key={story.id}
              language={language}
              story={{
                slug: story.slug,
                segment: story.segment,
                title: story.title,
                description: story.description,
                metric1: story.metric1,
                image: story.image,
                logo: story.logo,
                clientAnon: story.clientAnon,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

ModernStoriesGrid.displayName = 'ModernStoriesGrid';

export default ModernStoriesGrid;

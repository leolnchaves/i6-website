import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import { successStoriesData } from '@/data/staticData/successStoriesData';
import type { Language } from '@/types/language';

export interface StoryCardData {
  slug: string;
  segment: string;
  title: string;
  description?: string;
  /** métrica de maior destaque — string única "valor + rótulo" */
  metric1?: string;
  image?: string;
  logo?: string;
  clientAnon?: boolean;
}

interface StoryCardProps {
  story: StoryCardData;
  language: Language;
  /** compact = usado em "outros cases" na página de detalhe */
  variant?: 'default' | 'compact';
}

/** Divide "+23% de ticket médio" em valor e rótulo. */
const splitMetric = (raw: string) => {
  const trimmed = raw.trim();
  const value = trimmed.split(' ')[0];
  const label = trimmed.split(' ').slice(1).join(' ');
  return { value, label };
};

const hasMetric = (m?: string) => !!m && m.trim() !== '' && m.trim() !== '-';

const StoryCard: React.FC<StoryCardProps> = memo(({ story, language, variant = 'default' }) => {
  const localized = useLocalizedPath();
  const copy = (successStoriesData[language] || successStoriesData.en).listing;
  const href = localized(`/success-stories/${story.slug}`);
  const metric = hasMetric(story.metric1) ? splitMetric(story.metric1 as string) : null;
  const compact = variant === 'compact';

  return (
    <Link
      to={href}
      className="group sand-card sand-card-hover flex h-full flex-col overflow-hidden p-6"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {story.segment}
      </p>

      {/* Elemento dominante: métrica 1 — ou o título, quando não houver métrica */}
      {metric ? (
        <div className={compact ? 'mt-3' : 'mt-5'}>
          <p
            className={`font-display font-bold leading-[0.95] tracking-tight text-primary ${
              compact ? 'text-3xl' : 'text-[2.6rem] md:text-5xl'
            }`}
          >
            {metric.value}
          </p>
          {metric.label && (
            <p className="mt-2 text-sm leading-snug text-muted-foreground">{metric.label}</p>
          )}
        </div>
      ) : (
        <p
          className={`font-display font-bold leading-[1.1] tracking-tight text-foreground ${
            compact ? 'mt-3 text-xl' : 'mt-5 text-2xl md:text-3xl'
          }`}
        >
          {story.title}
        </p>
      )}

      <div className={`${compact ? 'mt-4' : 'mt-6'} h-px w-full bg-border transition-colors duration-500 group-hover:bg-primary/50`} />

      {/* Papel de suporte */}
      {metric && (
        <h3
          className={`mt-4 font-semibold leading-snug text-foreground ${
            compact ? 'text-sm' : 'text-base md:text-lg min-h-[3.5rem]'
          }`}
        >
          {story.title}
        </h3>
      )}

      {!compact && (
        <>
          <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {story.description}
          </p>

          {story.image && (
            <div className="relative mt-5 h-20 overflow-hidden rounded-lg bg-muted">
              <img
                src={story.image}
                alt={story.title}
                loading="lazy"
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {!story.clientAnon && story.logo && (
                <span className="absolute bottom-2 right-2 rounded-md bg-card/90 px-2 py-1">
                  <img
                    src={story.logo}
                    alt=""
                    aria-hidden
                    className="h-4 w-auto object-contain"
                  />
                </span>
              )}
            </div>
          )}
        </>
      )}

      <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-foreground/70 transition-colors duration-300 group-hover:text-primary">
        {copy.readCase}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
});

StoryCard.displayName = 'StoryCard';

export default StoryCard;

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import { getPublicAssetUrl } from '@/utils/assetUtils';
import type { SuccessStoryItem } from '@/hooks/useSuccessStoriesMarkdown';

const i6Logo = getPublicAssetUrl('content/logos/infinity6_CMYK_color_symbol_72dpi.png');

interface RelatedStoryMiniCardProps {
  story: SuccessStoryItem;
  language: 'pt' | 'en';
}

const RelatedStoryMiniCard: React.FC<RelatedStoryMiniCardProps> = memo(({ story, language }) => {
  const localized = useLocalizedPath();
  const href = localized(`/success-stories/${story.slug}`);

  const logoUrl = story.clientAnon ? i6Logo : story.logo;

  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#F4845F]/40 transition-all duration-500 h-full"
    >
      {/* Logo area */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-center h-16">
        <img
          src={logoUrl}
          alt={story.clientAnon ? 'infinity6' : story.client}
          className="max-h-10 max-w-[120px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-white/10" />

      {/* Title */}
      <div className="px-5 pt-4 pb-3 flex-1">
        <h4 className="text-sm font-semibold text-white group-hover:text-[#F4845F] transition-colors duration-300 line-clamp-2 leading-snug">
          {story.title}
        </h4>
      </div>

      {/* Metrics */}
      <div className="px-5 pb-4 space-y-2">
        {story.metric1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F4845F]">
              {story.metric1.split(' ')[0]}
            </span>
            <span className="text-[11px] text-white/60 leading-tight">
              {story.metric1.split(' ').slice(1).join(' ')}
            </span>
          </div>
        )}
        {story.metric2 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F4845F]">
              {story.metric2.split(' ')[0]}
            </span>
            <span className="text-[11px] text-white/60 leading-tight">
              {story.metric2.split(' ').slice(1).join(' ')}
            </span>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="px-5 pb-5 pt-2 mt-auto flex items-center justify-between">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">
          {language === 'pt' ? 'Ler case completo' : 'Read full case'}
        </span>
        <ArrowRight
          size={14}
          className="text-white/40 group-hover:text-[#F4845F] group-hover:translate-x-1 transition-all duration-300"
        />
      </div>
    </Link>
  );
});

RelatedStoryMiniCard.displayName = 'RelatedStoryMiniCard';

export default RelatedStoryMiniCard;

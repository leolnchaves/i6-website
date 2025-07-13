import React, { Suspense, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Skeleton que mantém exatamente o mesmo layout
const StoryCardSkeleton = memo(() => (
  <Card className="border border-gray-200 shadow-sm bg-white">
    <div className="h-0 bg-gray-200"></div>
    <CardContent className="p-6 relative">
      {/* Image skeleton */}
      <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>

      {/* Industry tag skeleton */}
      <div className="flex items-center mb-3">
        <div className="w-3 h-3 bg-gray-200 rounded mr-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>

      {/* Company name skeleton */}
      <div className="h-6 bg-gray-200 rounded mb-3 w-3/4 animate-pulse"></div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>

      {/* Metrics skeleton */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="h-6 bg-gray-200 rounded mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="h-6 bg-gray-200 rounded mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>

      {/* Explore details skeleton */}
      <div className="flex items-center justify-end">
        <div className="h-4 bg-gray-200 rounded w-20 mr-3 animate-pulse"></div>
        <div className="w-12 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
));

const StoryModalSkeleton = memo(() => (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] relative shadow-xl overflow-hidden">
      {/* Gradient bar skeleton */}
      <div className="h-1 bg-gray-200"></div>
      
      {/* Close button skeleton */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>

      {/* Header skeleton */}
      <div className="p-6 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded mb-3 w-2/3 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-16 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-16 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="h-6 bg-gray-200 rounded mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="h-4 bg-gray-200 rounded mb-3 w-32 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
));

// Wrapper com Suspense para lazy loading
interface LazyStoryCardProps {
  story: any;
  onClick: (story: any) => void;
  language: string;
}

interface LazyStoryModalProps {
  selectedStory: any;
  onClose: () => void;
  language: string;
  getCompanyDetails: (story: any) => any;
  getImplementedSolutions: (story: any) => any;
}

export const LazyStoryCard: React.FC<LazyStoryCardProps> = memo((props) => {
  const StoryCard = React.lazy(() => import('../story-components/StoryCard'));
  
  return (
    <Suspense fallback={<StoryCardSkeleton />}>
      <StoryCard {...props} />
    </Suspense>
  );
});

export const LazyStoryModal: React.FC<LazyStoryModalProps> = memo((props) => {
  const StoryModal = React.lazy(() => import('../story-components/StoryModal'));
  
  if (!props.selectedStory) return null;
  
  return (
    <Suspense fallback={<StoryModalSkeleton />}>
      <StoryModal {...props} />
    </Suspense>
  );
});

LazyStoryCard.displayName = 'LazyStoryCard';
LazyStoryModal.displayName = 'LazyStoryModal';
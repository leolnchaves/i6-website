
import { useLanguage } from '@/contexts/LanguageContext';
import FeaturedStoriesHeader from './featured-stories/FeaturedStoriesHeader';
import FeaturedStoryCard from './featured-stories/FeaturedStoryCard';
import ViewAllButton from './featured-stories/ViewAllButton';
import { createStoriesData } from './featured-stories/storiesData';

const FeaturedStoriesSection = () => {
  const { t } = useLanguage();
  const stories = createStoriesData(t);

  // Transform the results to include icon components
  const storiesWithIcons = stories.map(story => ({
    ...story,
    results: story.results.map(result => ({
      ...result,
      icon: <result.icon className="w-4 h-4" />
    }))
  }));

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FeaturedStoriesHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {storiesWithIcons.map((story, index) => (
            <FeaturedStoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        <ViewAllButton />
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;

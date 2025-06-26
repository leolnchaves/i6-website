
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedStoriesHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">
        <span className="block">Real AI Impact</span>
        <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
          Driving Business Growth
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {t('home.featuredStories.description')}
      </p>
    </div>
  );
};

export default FeaturedStoriesHeader;

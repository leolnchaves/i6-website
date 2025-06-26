
import { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface Result {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface Story {
  id: number;
  company: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  quote: string;
  author: string;
  results: Result[];
  videoThumbnail: string;
  videoUrl: string;
  color: string;
}

interface FeaturedStoryCardProps {
  story: Story;
  index: number;
}

const FeaturedStoryCard = ({ story, index }: FeaturedStoryCardProps) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden bg-white relative ${
        isHovered ? 'transform scale-105 z-20' : 'transform scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <img 
            src={story.videoThumbnail}
            alt={story.company}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

          {/* Industry Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {story.industry}
            </span>
          </div>
        </div>

        {/* Content Container - Always visible */}
        <div className="p-6 relative min-h-[200px]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h3>
          <p className="text-gray-600 mb-4">{story.description}</p>
          
          {/* Conditional Content Based on Hover State */}
          {isHovered ? (
            // Expanded content when hovered
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{t('successStories.common.challenge')}</h4>
                <p className="text-gray-600 text-sm">{story.challenge}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{t('successStories.common.solution')}</h4>
                <p className="text-gray-600 text-sm">{story.solution}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <Quote className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-gray-800 italic text-sm mb-2">"{story.quote}"</p>
                <p className="text-gray-600 text-xs font-medium">— {story.author}</p>
              </div>
              
              {/* Results */}
              <div className="grid grid-cols-3 gap-2">
                {story.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-sm font-bold text-blue-600">{result.value}</div>
                    <div className="text-xs text-gray-600">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Default content - Results and Learn More Link
            <>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {story.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-sm font-bold text-blue-600">{result.value}</div>
                    <div className="text-xs text-gray-600">{result.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                <span>{t('home.featuredStories.learnMore')}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedStoryCard;


import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const StoriesGrid = () => {
  const { t } = useLanguage();

  const stories = [
    {
      company: t('successStories.stories.techcorp.company'),
      industry: t('successStories.stories.techcorp.industry'),
      challenge: t('successStories.stories.techcorp.challenge'),
      solution: t('successStories.stories.techcorp.solution'),
      results: [
        { metric: t('successStories.common.downtimeReduction'), value: "75%" },
        { metric: t('successStories.common.costSavings'), value: "$2.3M" },
        { metric: t('successStories.common.efficiencyIncrease'), value: "40%" }
      ],
      quote: t('successStories.stories.techcorp.quote'),
      author: t('successStories.stories.techcorp.author'),
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      video: null
    },
    {
      company: t('successStories.stories.financeflow.company'),
      industry: t('successStories.stories.financeflow.industry'),
      challenge: t('successStories.stories.financeflow.challenge'),
      solution: t('successStories.stories.financeflow.solution'),
      results: [
        { metric: t('successStories.common.fraudDetection'), value: "99.2%" },
        { metric: t('successStories.common.falsePositives'), value: "-85%" },
        { metric: t('successStories.common.processingSpeed'), value: "10x" }
      ],
      quote: t('successStories.stories.financeflow.quote'),
      author: t('successStories.stories.financeflow.author'),
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      video: null
    },
    {
      company: t('successStories.stories.retailmax.company'),
      industry: t('successStories.stories.retailmax.industry'),
      challenge: t('successStories.stories.retailmax.challenge'),
      solution: t('successStories.stories.retailmax.solution'),
      results: [
        { metric: t('successStories.common.revenueGrowth'), value: "45%" },
        { metric: t('successStories.common.customerRetention'), value: "+60%" },
        { metric: t('successStories.common.inventoryTurnover'), value: "3x" }
      ],
      quote: t('successStories.stories.retailmax.quote'),
      author: t('successStories.stories.retailmax.author'),
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      video: null
    }
  ];

  return (
    <section className="py-20 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {stories.map((story, index) => (
            <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white/95 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {story.industry}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{story.company}</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('successStories.common.challenge')}</h3>
                      <p className="text-gray-600">{story.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('successStories.common.solution')}</h3>
                      <p className="text-gray-600">{story.solution}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {story.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-100">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{result.value}</div>
                          <div className="text-sm text-gray-600">{result.metric}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6 border border-blue-100">
                      <Quote className="w-8 h-8 text-blue-600 mb-4" />
                      <p className="text-gray-800 italic mb-4">"{story.quote}"</p>
                      <p className="text-gray-600 font-medium">— {story.author}</p>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="h-full min-h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesGrid;

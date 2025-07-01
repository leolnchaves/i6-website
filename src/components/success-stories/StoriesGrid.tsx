
import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSuccessStoriesCards } from '@/hooks/useCMSSuccessStoriesCards';
import { useCMSContent } from '@/hooks/useCMSContent';

interface StoriesGridProps {
  selectedSegment?: string | null;
}

const StoriesGrid: React.FC<StoriesGridProps> = ({ selectedSegment }) => {
  const { language, t } = useLanguage();
  const { pages, fetchPages } = useCMSContent();
  const { cards, loading, fetchCards } = useCMSSuccessStoriesCards();
  const [pageId, setPageId] = useState<string>('');

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    if (pages.length > 0) {
      const successStoriesPage = pages.find(p => p.slug === 'success-stories');
      if (successStoriesPage) {
        setPageId(successStoriesPage.id);
        fetchCards(successStoriesPage.id, language);
      }
    }
  }, [pages, language, fetchCards]);

  // Filter cards based on selected segment
  const filteredCards = selectedSegment 
    ? cards.filter(card => card.industry === selectedSegment)
    : cards;

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 md:space-y-16">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="border-0 shadow-2xl overflow-hidden bg-white animate-pulse">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:grid lg:grid-cols-2">
                    <div className="p-6 md:p-12">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mb-4"></div>
                      <div className="h-6 md:h-8 bg-gray-300 rounded mb-4"></div>
                      <div className="space-y-4 mb-6">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-3 md:p-4 bg-gray-200 rounded-lg">
                            <div className="h-5 md:h-6 bg-gray-300 rounded mb-1"></div>
                            <div className="h-3 md:h-4 bg-gray-300 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-64 md:h-96 bg-gray-300"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (filteredCards.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {selectedSegment 
                ? `Nenhum case de sucesso encontrado para "${selectedSegment}"`
                : 'Nenhum case de sucesso disponível'
              }
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {selectedSegment 
                ? 'Tente selecionar um segmento diferente ou veja todos os cases.'
                : 'Os cases de sucesso serão exibidos aqui quando forem adicionados no CMS.'
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-16">
          {filteredCards.map((story, index) => (
            <Card key={story.id} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className={`flex flex-col lg:grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`p-6 md:p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {story.industry}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{story.company_name}</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{t('successStories.common.challenge')}</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{story.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{t('successStories.common.solution')}</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{story.solution}</p>
                    </div>

                    {/* Responsive metrics grid - stacked on mobile, 3 columns on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="text-center p-4 md:p-4 rounded-lg shadow-sm border border-gray-200 min-h-[80px] flex flex-col justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                        <div className="text-xl md:text-2xl font-bold mb-1 break-words" style={{ color: '#2563eb' }}>{story.metric1_value}</div>
                        <div className="text-xs md:text-sm text-gray-600 leading-tight">{story.metric1_label}</div>
                      </div>
                      <div className="text-center p-4 md:p-4 rounded-lg shadow-sm border border-gray-200 min-h-[80px] flex flex-col justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                        <div className="text-xl md:text-2xl font-bold mb-1 break-words" style={{ color: '#2563eb' }}>{story.metric2_value}</div>
                        <div className="text-xs md:text-sm text-gray-600 leading-tight">{story.metric2_label}</div>
                      </div>
                      <div className="text-center p-4 md:p-4 rounded-lg shadow-sm border border-gray-200 min-h-[80px] flex flex-col justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                        <div className="text-xl md:text-2xl font-bold mb-1 break-words" style={{ color: '#2563eb' }}>{story.metric3_value}</div>
                        <div className="text-xs md:text-sm text-gray-600 leading-tight">{story.metric3_label}</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-6 rounded-lg border border-blue-100">
                      <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-3 md:mb-4" />
                      <p className="text-sm md:text-base text-gray-800 italic mb-3 md:mb-4 leading-relaxed">"{story.customer_quote}"</p>
                      <p className="text-sm md:text-base text-gray-600 font-medium">— {story.customer_name}, {story.customer_title}</p>
                    </div>
                  </div>

                  <div className={`order-first lg:order-none ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="h-64 md:h-full md:min-h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={story.image_url} 
                        alt={story.company_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop';
                        }}
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


import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSuccessStoriesCards } from '@/hooks/useCMSSuccessStoriesCards';
import { useCMSContent } from '@/hooks/useCMSContent';

const StoriesGrid = () => {
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

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="border-0 shadow-2xl overflow-hidden bg-white animate-pulse">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-12">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mb-4"></div>
                      <div className="h-8 bg-gray-300 rounded mb-4"></div>
                      <div className="space-y-4 mb-6">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-4 bg-gray-200 rounded-lg">
                            <div className="h-6 bg-gray-300 rounded mb-1"></div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-96 bg-gray-300"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cards.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nenhum case de sucesso disponível</h2>
            <p className="text-gray-600">Os cases de sucesso serão exibidos aqui quando forem adicionados no CMS.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {cards.map((story, index) => (
            <Card key={story.id} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {story.industry}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{story.company_name}</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('successStories.common.challenge')}</h3>
                      <p className="text-gray-600">{story.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('successStories.common.solution')}</h3>
                      <p className="text-gray-600">{story.solution}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{story.metric1_value}</div>
                        <div className="text-sm text-gray-600">{story.metric1_label}</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{story.metric2_value}</div>
                        <div className="text-sm text-gray-600">{story.metric2_label}</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{story.metric3_value}</div>
                        <div className="text-sm text-gray-600">{story.metric3_label}</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6 border border-blue-100">
                      <Quote className="w-8 h-8 text-blue-600 mb-4" />
                      <p className="text-gray-800 italic mb-4">"{story.customer_quote}"</p>
                      <p className="text-gray-600 font-medium">— {story.customer_name}, {story.customer_title}</p>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="h-full min-h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
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

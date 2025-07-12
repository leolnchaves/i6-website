import React, { useState, useEffect } from 'react';
import { X, ArrowRight, User, Building2, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSSuccessStoriesCards } from '@/hooks/useCMSSuccessStoriesCards';
import { useCMSContent } from '@/hooks/useCMSContent';

interface ModernStoriesGridProps {
  selectedSegment?: string | null;
}

interface StoryCard {
  id: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
}

const ModernStoriesGrid: React.FC<ModernStoriesGridProps> = ({ selectedSegment }) => {
  const { language } = useLanguage();
  const { pages, fetchPages } = useCMSContent();
  const { cards, loading, fetchCards } = useCMSSuccessStoriesCards();
  const [pageId, setPageId] = useState<string>('');
  const [selectedStory, setSelectedStory] = useState<StoryCard | null>(null);

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

  const handleCardClick = (story: StoryCard) => {
    setSelectedStory(story);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
    document.body.style.overflow = 'unset';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-2 bg-gray-300"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2 w-20"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-16 bg-gray-300 rounded mb-6"></div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="h-12 bg-gray-300 rounded"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-300 rounded"></div>
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
    <>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((story) => (
              <Card 
                key={story.id} 
                className="group overflow-hidden cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
                onClick={() => handleCardClick(story)}
              >
                {/* Gradient bar on top - with hover effect */}
                <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 group-hover:h-2 transition-all duration-300"></div>
                
                <CardContent className="p-6 relative">
                  {/* Industry tag */}
                  <div className="flex items-center mb-4">
                    <Building2 className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                      {story.industry}
                    </span>
                  </div>

                  {/* Company name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {story.company_name}
                  </h3>

                  {/* Brief description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {story.challenge.length > 120 ? `${story.challenge.substring(0, 120)}...` : story.challenge}
                  </p>

                  {/* Key metrics - only show 2 main ones */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {story.metric1_value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {story.metric1_label}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {story.metric2_value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {story.metric2_label}
                      </div>
                    </div>
                  </div>

                  {/* Customer info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{story.customer_name}</p>
                        <p className="text-xs text-gray-500">{story.customer_title}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-modal-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 rounded-full w-10 h-10 bg-white/90 hover:bg-white"
              onClick={handleCloseModal}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Header with company info */}
            <div className="p-8 pb-4">
              <div className="flex items-center mb-4">
                <Building2 className="w-5 h-5 text-orange-500 mr-3" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                  {selectedStory.industry}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-blue-500 hover:bg-blue-50"
                >
                  Compartilhar
                </Button>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedStory.company_name}
              </h1>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              {/* Challenge & Solution */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Desafio</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedStory.challenge}
                </p>
                
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Solução</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedStory.solution}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {selectedStory.metric1_value}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {selectedStory.metric1_label}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {selectedStory.metric2_value}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {selectedStory.metric2_label}
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {selectedStory.metric3_value}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {selectedStory.metric3_label}
                  </div>
                </div>
              </div>

              {/* Customer quote */}
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-8 rounded-xl border border-orange-200">
                <Quote className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-lg text-gray-800 italic leading-relaxed mb-4">
                  "{selectedStory.customer_quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedStory.customer_name}</p>
                    <p className="text-gray-600">{selectedStory.customer_title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernStoriesGrid;
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
      <section className="py-6 md:py-8 bg-gray-50">
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
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
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
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((story) => (
              <Card 
                key={story.id} 
                className="group overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 bg-white"
                onClick={() => handleCardClick(story)}
              >
                {/* Hidden gradient bar - only appears on hover */}
                <div className="h-0 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 group-hover:h-1 transition-all duration-500"></div>
                
                <CardContent className="p-6 relative">
                  {/* Image placeholder */}
                  <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop&auto=format"
                      alt={story.company_name}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Industry tag */}
                  <div className="flex items-center mb-3">
                    <Building2 className="w-3 h-3 text-gray-500 mr-2" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {story.industry}
                    </span>
                  </div>

                  {/* Company name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {story.company_name}
                  </h3>

                  {/* Brief description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {story.challenge.length > 100 ? `${story.challenge.substring(0, 100)}...` : story.challenge}
                  </p>

                  {/* Key metrics - uniform background */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-semibold text-gray-700 mb-1">
                        {story.metric1_value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {story.metric1_label}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-xl font-semibold text-gray-700 mb-1">
                        {story.metric2_value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {story.metric2_label}
                      </div>
                    </div>
                  </div>

                  {/* Explore details with modern arrow - inspired by hero button */}
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300 mr-3">Explore Details</span>
                    <div className="relative overflow-hidden">
                      {/* Background that appears on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
                      {/* Arrow container */}
                      <div className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 group-hover:bg-transparent transition-all duration-500">
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-all duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>
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
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] relative shadow-xl animate-modal-enter overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient bar on top - matching the card design */}
            <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500"></div>
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200"
              onClick={handleCloseModal}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Header with company info */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center mb-3">
                <Building2 className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {selectedStory.industry}
                </span>
              </div>
              
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {selectedStory.company_name}
              </h1>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">Desafio</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedStory.challenge}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">Solução</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedStory.solution}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-2xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric1_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric1_label}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-2xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric2_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric2_label}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-2xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric3_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric3_label}
                  </div>
                </div>
              </div>

              {/* Customer testimonial or alternative content */}
              {selectedStory.customer_quote && selectedStory.customer_quote.trim() ? (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <Quote className="w-6 h-6 text-gray-400 mb-3" />
                  <p className="text-gray-800 italic leading-relaxed mb-4">
                    "{selectedStory.customer_quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{selectedStory.customer_name}</p>
                      <p className="text-gray-600 text-xs">{selectedStory.customer_title}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Random selection between two different alternative layouts
                Math.random() > 0.5 ? (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Implementação Rápida</h3>
                        <p className="text-sm text-gray-600">Solução implementada em menos de 4 semanas com suporte completo</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <ArrowRight className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">ROI Comprovado</h3>
                        <p className="text-sm text-gray-600">Retorno sobre investimento mensurável desde o primeiro mês</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Projeto Concluído com Sucesso</h3>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        Esta implementação demonstra nossa capacidade de entregar soluções que geram impacto real e resultados mensuráveis para nossos clientes.
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Projeto Ativo</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Suporte Contínuo</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernStoriesGrid;
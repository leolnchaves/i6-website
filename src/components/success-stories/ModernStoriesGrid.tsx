import React, { useState, useEffect } from 'react';
import { X, ArrowRight, User, Building2, Quote, Target, TrendingUp, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { successStoriesCardsData } from '@/data/staticData/successStoriesCardsData';

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
  const [selectedStory, setSelectedStory] = useState<StoryCard | null>(null);

  // Function to get company details based on industry/company
  const getCompanyDetails = (story: StoryCard) => {
    const companyProfiles = {
      'TechRetail Inc.': {
        about: language === 'en' 
          ? 'Leading e-commerce platform with over 10 million users worldwide. Winner of Best Digital Innovation Award 2023.'
          : 'Plataforma de e-commerce líder com mais de 10 milhões de usuários mundialmente. Vencedor do Prêmio de Melhor Inovação Digital 2023.',
        logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=120&h=120&fit=crop&auto=format'
      },
      'Industrial Solutions Co.': {
        about: language === 'en'
          ? 'Fortune 500 manufacturing company with 25+ years of industry leadership. ISO 9001 certified with global operations.'
          : 'Empresa de manufatura Fortune 500 com mais de 25 anos de liderança na indústria. Certificada ISO 9001 com operações globais.',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=120&fit=crop&auto=format'
      },
      'MedTech Innovations': {
        about: language === 'en'
          ? 'Premier healthcare technology provider serving 500+ hospitals across North America. FDA approved solutions.'
          : 'Principal provedor de tecnologia em saúde atendendo mais de 500 hospitais na América do Norte. Soluções aprovadas pela FDA.',
        logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=120&h=120&fit=crop&auto=format'
      },
      'Capital Banking Group': {
        about: language === 'en'
          ? 'Top-tier financial institution with $50B+ in assets. Recognized for digital transformation excellence and security innovation.'
          : 'Instituição financeira de primeira linha com mais de $50B em ativos. Reconhecida pela excelência em transformação digital e inovação em segurança.',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop&auto=format'
      },
      'Global Shipping Solutions': {
        about: language === 'en'
          ? 'International logistics leader handling 1M+ shipments annually. Green Supply Chain Award recipient.'
          : 'Líder em logística internacional processando mais de 1M de remessas anualmente. Recipiente do Prêmio Green Supply Chain.',
        logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&h=120&fit=crop&auto=format'
      },
      'NextGen Motors': {
        about: language === 'en'
          ? 'Innovative automotive manufacturer with focus on electric vehicles. Named Sustainability Leader 2023.'
          : 'Fabricante automotivo inovador com foco em veículos elétricos. Nomeado Líder em Sustentabilidade 2023.',
        logo: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=120&h=120&fit=crop&auto=format'
      }
    };

    return companyProfiles[story.company_name as keyof typeof companyProfiles] || {
      about: language === 'en' 
        ? 'Industry-leading company recognized for innovation and excellence in their sector.'
        : 'Empresa líder da indústria reconhecida pela inovação e excelência em seu setor.',
      logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=120&h=120&fit=crop&auto=format'
    };
  };

  // Function to get implemented solutions based on industry
  const getImplementedSolutions = (story: StoryCard) => {
    const solutionsByIndustry = {
      'E-commerce': [
        { icon: Target, name: language === 'en' ? 'Smart Recommendations' : 'Recomendações Inteligentes', color: 'bg-blue-100 text-blue-600' },
        { icon: TrendingUp, name: language === 'en' ? 'Predictive Analytics' : 'Analytics Preditivo', color: 'bg-green-100 text-green-600' },
        { icon: User, name: language === 'en' ? 'Customer Journey' : 'Jornada do Cliente', color: 'bg-purple-100 text-purple-600' }
      ],
      'Manufacturing': [
        { icon: Shield, name: language === 'en' ? 'Predictive Maintenance' : 'Manutenção Preditiva', color: 'bg-orange-100 text-orange-600' },
        { icon: Zap, name: language === 'en' ? 'IoT Monitoring' : 'Monitoramento IoT', color: 'bg-yellow-100 text-yellow-600' },
        { icon: TrendingUp, name: language === 'en' ? 'Quality Control AI' : 'IA de Controle de Qualidade', color: 'bg-red-100 text-red-600' }
      ],
      'Healthcare': [
        { icon: User, name: language === 'en' ? 'Patient Flow Optimization' : 'Otimização de Fluxo de Pacientes', color: 'bg-teal-100 text-teal-600' },
        { icon: Target, name: language === 'en' ? 'Resource Allocation' : 'Alocação de Recursos', color: 'bg-indigo-100 text-indigo-600' },
        { icon: TrendingUp, name: language === 'en' ? 'Demand Forecasting' : 'Previsão de Demanda', color: 'bg-pink-100 text-pink-600' }
      ],
      'Finance': [
        { icon: Shield, name: language === 'en' ? 'Fraud Detection' : 'Detecção de Fraudes', color: 'bg-red-100 text-red-600' },
        { icon: Target, name: language === 'en' ? 'Risk Assessment' : 'Avaliação de Riscos', color: 'bg-orange-100 text-orange-600' },
        { icon: Zap, name: language === 'en' ? 'Real-time Monitoring' : 'Monitoramento em Tempo Real', color: 'bg-blue-100 text-blue-600' }
      ],
      'Logistics': [
        { icon: Target, name: language === 'en' ? 'Route Optimization' : 'Otimização de Rotas', color: 'bg-green-100 text-green-600' },
        { icon: TrendingUp, name: language === 'en' ? 'Demand Forecasting' : 'Previsão de Demanda', color: 'bg-blue-100 text-blue-600' },
        { icon: Zap, name: language === 'en' ? 'Smart Delivery' : 'Entrega Inteligente', color: 'bg-purple-100 text-purple-600' }
      ],
      'Automotive': [
        { icon: Shield, name: language === 'en' ? 'Quality Inspection' : 'Inspeção de Qualidade', color: 'bg-red-100 text-red-600' },
        { icon: Target, name: language === 'en' ? 'Computer Vision' : 'Visão Computacional', color: 'bg-blue-100 text-blue-600' },
        { icon: TrendingUp, name: language === 'en' ? 'Defect Prevention' : 'Prevenção de Defeitos', color: 'bg-green-100 text-green-600' }
      ]
    };

    return solutionsByIndustry[story.industry as keyof typeof solutionsByIndustry] || [
      { icon: Target, name: language === 'en' ? 'AI Solution' : 'Solução de IA', color: 'bg-blue-100 text-blue-600' },
      { icon: TrendingUp, name: language === 'en' ? 'Analytics' : 'Analytics', color: 'bg-green-100 text-green-600' },
      { icon: Zap, name: language === 'en' ? 'Automation' : 'Automação', color: 'bg-purple-100 text-purple-600' }
    ];
  };

  // Get static data
  const cards = successStoriesCardsData[language] || successStoriesCardsData.en;

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

  if (filteredCards.length === 0) {
    return (
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {selectedSegment 
                ? (language === 'en' 
                    ? `No success stories found for "${selectedSegment}"`
                    : `Nenhum case de sucesso encontrado para "${selectedSegment}"`)
                : (language === 'en' 
                    ? 'No success stories available'
                    : 'Nenhum case de sucesso disponível')
              }
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {selectedSegment 
                ? (language === 'en' 
                    ? 'Try selecting a different segment or view all stories.'
                    : 'Tente selecionar um segmento diferente ou veja todos os cases.')
                : (language === 'en' 
                    ? 'Success stories will be displayed here when added in the CMS.'
                    : 'Os cases de sucesso serão exibidos aqui quando forem adicionados no CMS.')
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
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300 mr-3">
                      {language === 'en' ? 'Explore Details' : 'Ver Detalhes'}
                    </span>
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

            {/* Header with company info and logo */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <Building2 className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedStory.industry}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                    {selectedStory.company_name}
                  </h1>

                  {/* About Section - moved closer to company name */}
                  <div>
                    <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                      {language === 'en' ? 'About' : 'Sobre'}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {getCompanyDetails(selectedStory).about}
                    </p>
                  </div>
                </div>
                
                {/* Client Logo - smaller and positioned in header */}
                <div className="ml-6 flex-shrink-0">
                  <img 
                    src={getCompanyDetails(selectedStory).logo}
                    alt={`${selectedStory.company_name} logo`}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Challenge' : 'Desafio'}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedStory.challenge}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Solution' : 'Solução'}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedStory.solution}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric1_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric1_label}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric2_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric2_label}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xl font-semibold text-gray-700 mb-1">
                    {selectedStory.metric3_value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {selectedStory.metric3_label}
                  </div>
                </div>
              </div>

              {/* Implemented Solutions Mini-Cards */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                  {language === 'en' ? 'Implemented Solutions' : 'Soluções Implementadas'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getImplementedSolutions(selectedStory).map((solution, index) => {
                    const IconComponent = solution.icon;
                    return (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                        <div className={`w-10 h-10 rounded-lg ${solution.color} flex items-center justify-center mb-3`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm mb-1">
                          {solution.name}
                        </h3>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span className="text-xs text-gray-500">
                            {language === 'en' ? 'Active' : 'Ativo'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
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
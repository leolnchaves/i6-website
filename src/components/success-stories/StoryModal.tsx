import { memo, useEffect, useMemo } from 'react';
import { X, Building2, User, Quote, Target, Users, ShoppingCart, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface StoryModalProps {
  story: StoryCard;
  onClose: () => void;
}

// Memoized static data outside component
const iconMap = {
  'users': Users,
  'shopping-cart': ShoppingCart,
  'building-2': Building2,
  'target': Target,
  'dollar-sign': DollarSign,
  'bar-chart-3': BarChart3
};

const companyProfiles = {
  'TechRetail Inc.': {
    about: {
      en: 'Leading e-commerce platform with over 10 million users worldwide. Winner of Best Digital Innovation Award 2023.',
      pt: 'Plataforma de e-commerce líder com mais de 10 milhões de usuários mundialmente. Vencedor do Prêmio de Melhor Inovação Digital 2023.'
    },
    logo: '/lovable-uploads/adce63e2-028d-4bad-988c-cf439d1dd41c.png'
  },
  'Industrial Solutions Co.': {
    about: {
      en: 'Fortune 500 manufacturing company with 25+ years of industry leadership. ISO 9001 certified with global operations.',
      pt: 'Empresa de manufatura Fortune 500 com mais de 25 anos de liderança na indústria. Certificada ISO 9001 com operações globais.'
    },
    logo: '/lovable-uploads/adce63e2-028d-4bad-988c-cf439d1dd41c.png'
  },
  'MedTech Innovations': {
    about: {
      en: 'Premier healthcare technology provider serving 500+ hospitals across North America. FDA approved solutions.',
      pt: 'Principal provedor de tecnologia em saúde atendendo mais de 500 hospitais na América do Norte. Soluções aprovadas pela FDA.'
    },
    logo: '/lovable-uploads/adce63e2-028d-4bad-988c-cf439d1dd41c.png'
  },
  'Capital Banking Group': {
    about: {
      en: 'Top-tier financial institution with $50B+ in assets. Recognized for digital transformation excellence and security innovation.',
      pt: 'Instituição financeira de primeira linha com mais de $50B em ativos. Reconhecida pela excelência em transformação digital e inovação em segurança.'
    },
    logo: '/lovable-uploads/adce63e2-028d-4bad-988c-cf439d1dd41c.png'
  },
  'Global Shipping Solutions': {
    about: {
      en: 'International logistics leader handling 1M+ shipments annually. Green Supply Chain Award recipient.',
      pt: 'Líder em logística internacional processando mais de 1M de remessas anualmente. Recipiente do Prêmio Green Supply Chain.'
    },
    logo: '/lovable-uploads/adce63e2-028d-4bad-988c-cf439d1dd41c.png'
  },
  'NextGen Motors': {
    about: {
      en: 'Innovative automotive manufacturer with focus on electric vehicles. Named Sustainability Leader 2023.',
      pt: 'Fabricante automotivo inovador com foco em veículos elétricos. Nomeado Líder em Sustentabilidade 2023.'
    },
    logo: '/lovable-uploads/adce63e2-028d-4bad-988c-cf439d1dd41c.png'
  }
};

const solutionsByIndustry = {
  'E-commerce': [
    { 
      icon: iconMap['users'], 
      name: { en: 'Smart Discovery for Anonymous Visitors', pt: 'Descoberta Inteligente para Visitantes Anônimos' }, 
      color: 'bg-slate-100 text-slate-700' 
    },
    { 
      icon: iconMap['shopping-cart'], 
      name: { en: 'Predictive Personalization', pt: 'Personalização Preditiva' }, 
      color: 'bg-gray-100 text-gray-700' 
    },
    { 
      icon: iconMap['target'], 
      name: { en: 'Predictive Campaign Targeting', pt: 'Segmentação Preditiva de Campanha' }, 
      color: 'bg-stone-100 text-stone-700' 
    }
  ],
  'Manufacturing': [
    { 
      icon: iconMap['building-2'], 
      name: { en: 'Industrial Recommendation Intelligence', pt: 'Inteligência de Recomendação Industrial' }, 
      color: 'bg-slate-100 text-slate-700' 
    },
    { 
      icon: iconMap['bar-chart-3'], 
      name: { en: 'Adaptive Demand Forecasting', pt: 'Previsão Adaptativa de Demanda' }, 
      color: 'bg-gray-100 text-gray-700' 
    },
    { 
      icon: iconMap['dollar-sign'], 
      name: { en: 'Smart Price Optimization', pt: 'Otimização Inteligente de Preços' }, 
      color: 'bg-stone-100 text-stone-700' 
    }
  ],
  'Healthcare': [
    { 
      icon: iconMap['bar-chart-3'], 
      name: { en: 'Adaptive Demand Forecasting', pt: 'Previsão Adaptativa de Demanda' }, 
      color: 'bg-slate-100 text-slate-700' 
    },
    { 
      icon: iconMap['target'], 
      name: { en: 'Predictive Campaign Targeting', pt: 'Segmentação Preditiva de Campanha' }, 
      color: 'bg-gray-100 text-gray-700' 
    },
    { 
      icon: iconMap['shopping-cart'], 
      name: { en: 'Predictive Personalization', pt: 'Personalização Preditiva' }, 
      color: 'bg-stone-100 text-stone-700' 
    }
  ],
  'Finance': [
    { 
      icon: iconMap['target'], 
      name: { en: 'Predictive Campaign Targeting', pt: 'Segmentação Preditiva de Campanha' }, 
      color: 'bg-slate-100 text-slate-700' 
    },
    { 
      icon: iconMap['shopping-cart'], 
      name: { en: 'Predictive Personalization', pt: 'Personalização Preditiva' }, 
      color: 'bg-gray-100 text-gray-700' 
    },
    { 
      icon: iconMap['users'], 
      name: { en: 'Smart Discovery for Anonymous Visitors', pt: 'Descoberta Inteligente para Visitantes Anônimos' }, 
      color: 'bg-stone-100 text-stone-700' 
    }
  ],
  'Logistics': [
    { 
      icon: iconMap['bar-chart-3'], 
      name: { en: 'Adaptive Demand Forecasting', pt: 'Previsão Adaptativa de Demanda' }, 
      color: 'bg-slate-100 text-slate-700' 
    },
    { 
      icon: iconMap['building-2'], 
      name: { en: 'Industrial Recommendation Intelligence', pt: 'Inteligência de Recomendação Industrial' }, 
      color: 'bg-gray-100 text-gray-700' 
    },
    { 
      icon: iconMap['dollar-sign'], 
      name: { en: 'Smart Price Optimization', pt: 'Otimização Inteligente de Preços' }, 
      color: 'bg-stone-100 text-stone-700' 
    }
  ],
  'Automotive': [
    { 
      icon: iconMap['building-2'], 
      name: { en: 'Industrial Recommendation Intelligence', pt: 'Inteligência de Recomendação Industrial' }, 
      color: 'bg-slate-100 text-slate-700' 
    },
    { 
      icon: iconMap['bar-chart-3'], 
      name: { en: 'Adaptive Demand Forecasting', pt: 'Previsão Adaptativa de Demanda' }, 
      color: 'bg-gray-100 text-gray-700' 
    },
    { 
      icon: iconMap['dollar-sign'], 
      name: { en: 'Smart Price Optimization', pt: 'Otimização Inteligente de Preços' }, 
      color: 'bg-stone-100 text-stone-700' 
    }
  ]
};

const StoryModal = memo(({ story, onClose }: StoryModalProps) => {
  const { language } = useLanguage();

  const companyDetails = useMemo(() => {
    const profile = companyProfiles[story.company_name as keyof typeof companyProfiles];
    return profile || {
      about: {
        en: 'Industry-leading company recognized for innovation and excellence in their sector.',
        pt: 'Empresa líder da indústria reconhecida pela inovação e excelência em seu setor.'
      },
      logo: '/lovable-uploads/adce63e2-028d-4bad-988c-cf439d1dd41c.png'
    };
  }, [story.company_name]);

  const implementedSolutions = useMemo(() => {
    return solutionsByIndustry[story.industry as keyof typeof solutionsByIndustry] || [
      { icon: iconMap['users'], name: { en: 'Smart Discovery for Anonymous Visitors', pt: 'Descoberta Inteligente para Visitantes Anônimos' }, color: 'bg-slate-100 text-slate-700' },
      { icon: iconMap['shopping-cart'], name: { en: 'Predictive Personalization', pt: 'Personalização Preditiva' }, color: 'bg-gray-100 text-gray-700' },
      { icon: iconMap['target'], name: { en: 'Predictive Campaign Targeting', pt: 'Segmentação Preditiva de Campanha' }, color: 'bg-stone-100 text-stone-700' }
    ];
  }, [story.industry]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
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
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(85vh-4px)]">
          {/* Header with company info and logo */}
          <div className="p-6 pb-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-4">
                <div className="flex items-center mb-3">
                  <Building2 className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {story.industry}
                  </span>
                </div>
                
                <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                  {story.company_name}
                </h1>

                {/* About text - directly below company name */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {companyDetails.about[language]}
                </p>
              </div>
              
              {/* Client Logo - smaller and positioned in header */}
              <div className="flex-shrink-0 mr-8">
                <img 
                  src={companyDetails.logo}
                  alt={`${story.company_name} logo`}
                  className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-2"
                />
              </div>
            </div>
          </div>

          {/* Content sections in two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Challenge section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  {language === 'en' ? 'Challenge' : 'Desafio'}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">{story.challenge}</p>
              </div>

              {/* Solution section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  {language === 'en' ? 'Solution' : 'Solução'}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">{story.solution}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Metrics section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  {language === 'en' ? 'Results' : 'Resultados'}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700 mb-1">
                      {story.metric1_value}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {story.metric1_label}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700 mb-1">
                      {story.metric2_value}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {story.metric2_label}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-700 mb-1">
                      {story.metric3_value}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">
                      {story.metric3_label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Implemented Solutions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  {language === 'en' ? 'Solutions Implemented' : 'Soluções Implementadas'}
                </h2>
                <div className="space-y-3">
                  {implementedSolutions.map((solution, index) => {
                    const IconComponent = solution.icon;
                    return (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${solution.color}`}>
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {solution.name[language]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Quote section */}
          <div className="border-t border-gray-100 p-6">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 relative">
              <Quote className="w-8 h-8 text-gray-400 mb-4" />
              <blockquote className="text-gray-700 italic text-base leading-relaxed mb-4">
                "{story.customer_quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{story.customer_name}</div>
                  <div className="text-xs text-gray-600">{story.customer_title}</div>
                  <div className="text-xs text-gray-500">{story.company_name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

StoryModal.displayName = 'StoryModal';

export default StoryModal;
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ModernSolutionCardProps {
  icon: LucideIcon;
  title: string;
  focus: string;
  description: string;
  features: string[];
  outcome: string;
  engine: string;
  bgColor: string;
  index: number;
}

const ModernSolutionCard = ({ 
  icon: Icon, 
  title, 
  focus, 
  description, 
  features, 
  outcome, 
  engine, 
  bgColor, 
  index
}: ModernSolutionCardProps) => {
  const { language } = useLanguage();
  
  // Static translations
  const translations = {
    en: {
      overview: 'Overview',
      keyFeatures: 'Key Features',
      additionalFeatures: 'additional features',
      businessOutcome: 'Business Outcome'
    },
    pt: {
      overview: 'Visão Geral',
      keyFeatures: 'Características Principais',
      additionalFeatures: 'características adicionais',
      businessOutcome: 'Resultado de Negócio'
    }
  };
  
  const t = translations[language] || translations.en;
  return (
    <Card className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden min-h-[400px]">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Side - Dark (Product Info) */}
        <div className="lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            {/* Engine Badge */}
            <div className="mb-6">
              <Badge 
                variant="secondary" 
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-sm px-3 py-1"
              >
                {engine}
              </Badge>
            </div>

            {/* Central Icon and Info */}
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
              {/* Icon */}
              <div 
                className="p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: bgColor }}
              >
                <Icon className="w-16 h-16 text-white" />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <p className="text-sm text-gray-300 uppercase tracking-wider font-medium">
                  {focus}
                </p>
                
                {/* Title */}
                <h2 className="text-2xl font-bold leading-tight">
                  {title}
                </h2>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-8 left-6 w-1 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - White (Details) */}
        <div className="lg:w-3/5 bg-white">
          <CardContent className="p-8 h-full flex flex-col">
            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                {t.overview}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                {t.keyFeatures}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
                {features.length > 4 && (
                  <div className="text-center">
                    <span className="text-xs text-gray-500">
                      +{features.length - 4} {t.additionalFeatures}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Business Outcome */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                {t.businessOutcome}
              </h3>
              <div className="relative p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-200/60 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5 rounded-lg"></div>
                <div className="relative flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {outcome}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ModernSolutionCard;
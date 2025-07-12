import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LucideIcon, ArrowRight } from 'lucide-react';

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
  onViewDetails: () => void;
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
  index,
  onViewDetails
}: ModernSolutionCardProps) => {
  const isReversed = index % 2 === 1;

  // Imagens para os cards baseadas nos GIFs existentes
  const placeholderImages = [
    '/solution-Anonymous-Visitors.gif',
    '/solucao-Identified-Users.gif',
    '/solucao-Industrial-Intelligence.gif',
    '/solucao-Predictive-Campaign.gif',
    '/solucao-Smart-Price.gif',
    '/solucao-Adaptive-Demand.gif',
  ];

  const imageUrl = placeholderImages[index % placeholderImages.length];

  // Esquema de cores baseado no índice
  const getColorScheme = (cardIndex: number) => {
    if (cardIndex === 0 || cardIndex === 1 || cardIndex === 3) {
      return { 
        accent: 'text-orange-600', 
        gradient: 'from-orange-400/20 to-red-400/20',
        border: 'border-orange-200'
      };
    } else {
      return { 
        accent: 'text-blue-600', 
        gradient: 'from-blue-400/20 to-purple-400/20',
        border: 'border-blue-200'
      };
    }
  };
  
  const colorScheme = getColorScheme(index);

  return (
    <Card className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 ${colorScheme.border} overflow-hidden`}>
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[200px]`}>
        {/* Visual Side */}
        <div className="md:w-2/5 relative overflow-hidden bg-gray-50">
          {/* Background Pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient}`}></div>
          
          {/* GIF Image */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img 
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Engine Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant="secondary" 
              className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-sm"
            >
              {engine}
            </Badge>
          </div>
        </div>

        {/* Content Side */}
        <div className="md:w-3/5">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <span className={`${colorScheme.accent} text-xs font-medium tracking-wider uppercase mb-2 block`}>
                {focus}
              </span>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {description.length > 120 ? `${description.substring(0, 120)}...` : description}
              </p>
            </div>

            {/* Key Features (resumidas) */}
            <div className="mb-6 flex-1">
              <div className="grid grid-cols-2 gap-2">
                {features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-start text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">
                      {feature.length > 25 ? `${feature.substring(0, 25)}...` : feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-gray-100">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onViewDetails}
                className={`${colorScheme.accent} hover:bg-gray-50 font-medium group/btn w-full justify-between`}
              >
                <span>Explorar Solução</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ModernSolutionCard;
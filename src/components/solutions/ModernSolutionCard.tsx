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

  // Esquema de cores baseado no índice
  const getColorScheme = (cardIndex: number) => {
    if (cardIndex === 0 || cardIndex === 1 || cardIndex === 3) {
      return { 
        accent: 'text-orange-600', 
        gradient: 'from-orange-400/30 to-red-400/30',
        border: 'border-orange-200'
      };
    } else {
      return { 
        accent: 'text-blue-600', 
        gradient: 'from-blue-400/30 to-purple-400/30',
        border: 'border-blue-200'
      };
    }
  };
  
  const colorScheme = getColorScheme(index);

  return (
    <Card className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 ${colorScheme.border} overflow-hidden`}>
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[180px]`}>
        {/* Visual Side */}
        <div className="md:w-2/5 relative overflow-hidden">
          {/* Modern gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient}`}></div>
          
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:15px_15px]"></div>
          </div>

          {/* Central icon with modern styling */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-300"
              style={{ backgroundColor: bgColor }}
            >
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Floating elements for visual interest */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute top-1/3 left-4 w-1 h-1 bg-white/40 rounded-full"></div>

          {/* Engine Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant="secondary" 
              className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-sm text-xs"
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
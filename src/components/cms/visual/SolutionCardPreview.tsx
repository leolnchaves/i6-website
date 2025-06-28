
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Target, 
  Award, 
  Zap, 
  Building2, 
  Globe, 
  Rocket,
  Brain,
  ShoppingCart,
  LineChart,
  Lightbulb
} from 'lucide-react';

interface SolutionCardPreviewProps {
  title: string;
  focus: string;
  description: string;
  features: string[];
  outcome: string;
  engine: string;
  gradient: string;
  bg_color: string;
  border_color: string;
  icon: string;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'trending-up': TrendingUp,
  'users': Users,
  'dollar-sign': DollarSign,
  'bar-chart-3': BarChart3,
  'target': Target,
  'award': Award,
  'zap': Zap,
  'building-2': Building2,
  'globe': Globe,
  'rocket': Rocket,
  'brain': Brain,
  'shopping-cart': ShoppingCart,
  'line-chart': LineChart,
  'lightbulb': Lightbulb,
};

const SolutionCardPreview: React.FC<SolutionCardPreviewProps> = ({
  title,
  focus,
  description,
  features,
  outcome,
  engine,
  gradient,
  bg_color,
  border_color,
  icon,
}) => {
  const IconComponent = iconMap[icon] || Building2;

  // Define engine colors for consistent styling
  const getEngineColors = (engine: string) => {
    switch (engine) {
      case 'i6 RecSys':
        return {
          iconColor: 'text-blue-600',
          badgeColor: 'bg-blue-100 text-blue-700',
          buttonGradient: 'from-blue-500 to-blue-600'
        };
      case 'i6 ElasticPrice':
        return {
          iconColor: 'text-green-600',
          badgeColor: 'bg-green-100 text-green-700',
          buttonGradient: 'from-green-500 to-green-600'
        };
      case 'i6 Previsio':
        return {
          iconColor: 'text-gray-600',
          badgeColor: 'bg-gray-100 text-gray-700',
          buttonGradient: 'from-gray-500 to-gray-600'
        };
      default:
        return {
          iconColor: 'text-blue-600',
          badgeColor: 'bg-blue-100 text-blue-700',
          buttonGradient: 'from-blue-500 to-blue-600'
        };
    }
  };

  const engineColors = getEngineColors(engine);

  return (
    <div className="w-full max-w-md">
      <Card className={`border shadow-sm ${bg_color} ${border_color}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
              <IconComponent className={`w-5 h-5 ${engineColors.iconColor}`} />
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0">
              {/* Engine badge */}
              <div className="mb-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${engineColors.badgeColor}`}>
                  {engine}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                {title || 'Título do Card'}
              </h3>
              
              {/* Focus */}
              <p className="text-xs text-gray-600 mb-2 font-medium">
                {focus || 'Foco da solução'}
              </p>
              
              {/* Description */}
              <p className="text-gray-700 text-xs leading-relaxed mb-3">
                {description || 'Descrição da solução...'}
              </p>
              
              {/* Features */}
              <div className="space-y-1 mb-3">
                {(features?.length > 0 ? features.slice(0, 2) : ['Feature exemplo']).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Business Outcomes */}
              <div className="rounded-lg p-2 mb-3 bg-white/60 border border-gray-200/50">
                <h4 className="font-semibold text-gray-900 mb-1 text-xs">
                  Resultados:
                </h4>
                <p className="text-gray-700 text-xs">{outcome || 'Resultados esperados...'}</p>
              </div>
              
              {/* Learn More Button */}
              <Button 
                size="sm"
                className={`bg-gradient-to-r ${engineColors.buttonGradient} hover:opacity-90 text-white transition-all duration-300 shadow-sm hover:shadow-md text-xs`}
              >
                Saiba Mais
                <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolutionCardPreview;

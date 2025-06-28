
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
  // Get icon background color based on selected bg_color
  const getIconBgColor = (bgColor: string) => {
    if (bgColor.includes('gray')) return 'rgba(107, 114, 128, 0.15)';
    if (bgColor.includes('orange')) return 'rgba(251, 146, 60, 0.15)';
    if (bgColor.includes('blue')) return 'rgba(59, 130, 246, 0.15)';
    if (bgColor.includes('green')) return 'rgba(34, 197, 94, 0.15)';
    if (bgColor.includes('purple')) return 'rgba(147, 51, 234, 0.15)';
    if (bgColor.includes('pink')) return 'rgba(236, 72, 153, 0.15)';
    return 'rgba(107, 114, 128, 0.15)'; // default gray
  };

  // Get engine badge background color based on selected bg_color
  const getBadgeBgColor = (bgColor: string) => {
    if (bgColor.includes('gray')) return 'rgba(107, 114, 128, 0.2)';
    if (bgColor.includes('orange')) return 'rgba(251, 146, 60, 0.2)';
    if (bgColor.includes('blue')) return 'rgba(59, 130, 246, 0.2)';
    if (bgColor.includes('green')) return 'rgba(34, 197, 94, 0.2)';
    if (bgColor.includes('purple')) return 'rgba(147, 51, 234, 0.2)';
    if (bgColor.includes('pink')) return 'rgba(236, 72, 153, 0.2)';
    return 'rgba(107, 114, 128, 0.2)'; // default gray
  };

  const iconBgColor = getIconBgColor(bg_color);
  const badgeBgColor = getBadgeBgColor(bg_color);
  const IconComponent = iconMap[icon] || Building2;

  return (
    <div className="w-full max-w-md">
      <Card 
        className={`border shadow-sm ${bg_color} ${border_color} h-full`}
      >
        <CardContent className="p-4 h-full">
          <div className="flex items-start gap-3 h-full">
            {/* Icon */}
            <div 
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: iconBgColor }}
            >
              <IconComponent className="w-5 h-5 text-gray-700" />
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0 flex flex-col h-full">
              {/* Engine badge */}
              <div className="mb-2">
                <span 
                  className="inline-block px-2 py-1 rounded-full text-xs font-medium text-gray-600"
                  style={{ backgroundColor: badgeBgColor }}
                >
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
              <div className="space-y-1 mb-3 flex-grow">
                {(features?.length > 0 ? features.slice(0, 2) : ['Feature exemplo']).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Business Outcomes */}
              <div 
                className="rounded-lg p-2"
                style={{ backgroundColor: badgeBgColor }}
              >
                <h4 className="font-semibold text-gray-900 mb-1 text-xs">
                  Resultados:
                </h4>
                <p className="text-gray-700 text-xs">{outcome || 'Resultados esperados...'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolutionCardPreview;


import { CheckCircle, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  focus: string;
  description: string;
  features: string[];
  outcome: string;
  gradient: string;
  bgColor: string;
  borderColor: string;
  engine: string;
}

const SolutionCard = ({
  icon: Icon,
  title,
  focus,
  description,
  features,
  outcome,
  gradient,
  bgColor,
  borderColor,
  engine
}: SolutionCardProps) => {

  // Get icon and badge background color based on selected bgColor from CMS
  const getIconBgColor = (bgColor: string) => {
    if (bgColor.includes('gray')) return 'rgba(107, 114, 128, 0.15)';
    if (bgColor.includes('orange')) return 'rgba(251, 146, 60, 0.15)';
    if (bgColor.includes('blue')) return 'rgba(59, 130, 246, 0.15)';
    if (bgColor.includes('green')) return 'rgba(34, 197, 94, 0.15)';
    if (bgColor.includes('purple')) return 'rgba(147, 51, 234, 0.15)';
    if (bgColor.includes('pink')) return 'rgba(236, 72, 153, 0.15)';
    return 'rgba(107, 114, 128, 0.15)'; // default gray
  };

  // Get badge background color based on selected bgColor from CMS
  const getBadgeBgColor = (bgColor: string) => {
    if (bgColor.includes('gray')) return 'rgba(107, 114, 128, 0.2)';
    if (bgColor.includes('orange')) return 'rgba(251, 146, 60, 0.2)';
    if (bgColor.includes('blue')) return 'rgba(59, 130, 246, 0.2)';
    if (bgColor.includes('green')) return 'rgba(34, 197, 94, 0.2)';
    if (bgColor.includes('purple')) return 'rgba(147, 51, 234, 0.2)';
    if (bgColor.includes('pink')) return 'rgba(236, 72, 153, 0.2)';
    return 'rgba(107, 114, 128, 0.2)'; // default gray
  };

  const iconBgColor = getIconBgColor(bgColor);
  const badgeBgColor = getBadgeBgColor(bgColor);

  return (
    <Card 
      className={`border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${bgColor} ${borderColor} h-full`}
    >
      <CardContent className="p-6 h-full">
        <div className="flex items-start gap-4 h-full">
          {/* Icon section */}
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="w-6 h-6 text-gray-700" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {title}
            </h3>
            
            {/* Focus */}
            <p className="text-sm text-gray-600 mb-3 font-medium">
              {focus}
            </p>
            
            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {description}
            </p>
            
            {/* Features */}
            <div className="space-y-2 mb-4 flex-grow">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Business Outcomes */}
            <div 
              className="rounded-lg p-3"
              style={{ backgroundColor: badgeBgColor }}
            >
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                Business Outcomes:
              </h4>
              <p className="text-gray-700 text-sm">{outcome}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;

import { CheckCircle, ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  // Define button gradient based on engine (keeping this for button styling)
  const getButtonGradient = (engine: string) => {
    switch (engine) {
      case 'i6 RecSys':
        return 'from-blue-500/80 to-blue-600/80';
      case 'i6 ElasticPrice':
        return 'from-green-500/80 to-green-600/80';
      case 'i6 Previsio':
        return 'from-gray-500/80 to-gray-600/80';
      default:
        return 'from-blue-500/80 to-blue-600/80';
    }
  };

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

  const buttonGradient = getButtonGradient(engine);
  const iconBgColor = getIconBgColor(bgColor);
  const badgeBgColor = getBadgeBgColor(bgColor);

  return (
    <Card 
      className={`border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${bgColor} ${borderColor}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon section */}
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
          
          {/* Content section */}
          <div className="flex-1 min-w-0">
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
            <div className="space-y-2 mb-4">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Business Outcomes */}
            <div 
              className="rounded-lg p-3 mb-4"
              style={{ backgroundColor: badgeBgColor }}
            >
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                {t('solutions.businessOutcomes')}:
              </h4>
              <p className="text-gray-700 text-sm">{outcome}</p>
            </div>
            
            {/* Learn More Button */}
            <Button 
              className={`bg-gradient-to-r ${buttonGradient} hover:opacity-90 text-white transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              {t('solutions.learnMore')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;

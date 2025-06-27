
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

  // Define colors based on engine
  const getEngineColors = (engine: string) => {
    switch (engine) {
      case 'i6 RecSys':
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.08)', // Blue with low opacity
          borderColor: 'rgba(59, 130, 246, 0.2)',
          iconBgColor: 'rgba(59, 130, 246, 0.15)',
          buttonGradient: 'from-blue-500/80 to-blue-600/80'
        };
      case 'i6 ElasticPrice':
        return {
          backgroundColor: 'rgba(34, 197, 94, 0.08)', // Green with low opacity
          borderColor: 'rgba(34, 197, 94, 0.2)',
          iconBgColor: 'rgba(34, 197, 94, 0.15)',
          buttonGradient: 'from-green-500/80 to-green-600/80'
        };
      case 'i6 Previsio':
        return {
          backgroundColor: 'rgba(107, 114, 128, 0.08)', // Gray with low opacity
          borderColor: 'rgba(107, 114, 128, 0.2)',
          iconBgColor: 'rgba(107, 114, 128, 0.15)',
          buttonGradient: 'from-gray-500/80 to-gray-600/80'
        };
      default:
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
          iconBgColor: 'rgba(59, 130, 246, 0.15)',
          buttonGradient: 'from-blue-500/80 to-blue-600/80'
        };
    }
  };

  const colors = getEngineColors(engine);

  return (
    <Card 
      className="border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      style={{ 
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon section */}
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: colors.iconBgColor }}
          >
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
          
          {/* Content section */}
          <div className="flex-1 min-w-0">
            {/* Engine badge */}
            <div className="mb-2">
              <span 
                className="inline-block px-2 py-1 rounded-full text-xs font-medium text-gray-600"
                style={{ backgroundColor: colors.iconBgColor }}
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
              style={{ backgroundColor: colors.iconBgColor }}
            >
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                {t('solutions.businessOutcomes')}:
              </h4>
              <p className="text-gray-700 text-sm">{outcome}</p>
            </div>
            
            {/* Learn More Button */}
            <Button 
              className={`bg-gradient-to-r ${colors.buttonGradient} hover:opacity-90 text-white transition-all duration-300 shadow-sm hover:shadow-md`}
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

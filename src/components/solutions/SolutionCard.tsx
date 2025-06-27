
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
  borderColor
}: SolutionCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className={`border-2 ${borderColor} ${bgColor} shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden h-full flex flex-col`}>
      <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
      <CardHeader className="p-4 flex-1 flex flex-col">
        <div className="flex items-start mb-3">
          <div className="mr-3 mt-1">
            <Icon className="w-8 h-8 text-blue-700" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base font-bold text-gray-900 mb-2 leading-tight">
              {title}
            </CardTitle>
            <div className="text-xs text-gray-600 font-medium mb-2 bg-white/60 rounded-full px-2 py-1 inline-block">
              {focus}
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="space-y-1 mb-4 flex-1">
          {features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center">
              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700 text-xs">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-white/70 rounded-lg p-3 mt-auto mb-4">
          <h4 className="font-semibold text-gray-900 mb-1 text-xs">{t('solutions.businessOutcomes')}:</h4>
          <p className="text-gray-700 text-xs">{outcome}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Button className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white transition-all duration-300 shadow-md hover:shadow-lg text-sm py-2`}>
          {t('solutions.learnMore')}
          <ArrowRight className="ml-2 w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;

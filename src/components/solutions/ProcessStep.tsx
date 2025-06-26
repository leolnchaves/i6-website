
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProcessStepProps {
  step: {
    key: string;
    titleKey: string;
    subtitle: string;
    descriptionKey: string;
    color: string;
  };
  index: number;
  isLast: boolean;
}

const ProcessStep = ({ step, index, isLast }: ProcessStepProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center relative flex-1">
      {/* Step Number Circle */}
      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-base shadow-lg mb-6`}>
        {String(index + 1).padStart(2, '0')}
      </div>
      
      {/* Step Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-xs text-center border border-gray-100 h-[240px] flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-bold text-gray-900 text-base mb-3 leading-tight">
            {t(step.titleKey)}
          </h3>
          <div className="text-xs text-gray-600 mb-3 font-medium bg-gray-50 rounded-full px-3 py-1 inline-block">
            {step.subtitle}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {t(step.descriptionKey)}
          </p>
        </div>
      </div>
      
      {/* Arrow (except for last item) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 -right-8 transform -translate-y-1/2 z-10">
          <div className="bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessStep;

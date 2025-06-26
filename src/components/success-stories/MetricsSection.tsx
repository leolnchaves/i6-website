
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MetricsSection = () => {
  const { t } = useLanguage();

  const metrics = [
    { icon: <TrendingUp className="w-8 h-8" />, value: "150%", label: t('successStories.metrics.avgROI') },
    { icon: <Users className="w-8 h-8" />, value: "500+", label: t('successStories.metrics.companiesServed') },
    { icon: <DollarSign className="w-8 h-8" />, value: "$50M+", label: t('successStories.metrics.costSavings') }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center bg-gray-50 rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center text-blue-600 mb-4">
                {metric.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

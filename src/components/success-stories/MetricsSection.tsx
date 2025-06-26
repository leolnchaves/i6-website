
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
    <section className="py-16 bg-gradient-to-br from-gray-800 via-blue-800 to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex justify-center text-blue-400 mb-4">
                {metric.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-gray-300">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

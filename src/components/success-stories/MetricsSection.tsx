
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
  Rocket 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesContent } from '@/hooks/useSuccessStoriesContent';

const iconMap = {
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
};

const MetricsSection = () => {
  const { language } = useLanguage();
  const { getMetricsContent, loading } = useSuccessStoriesContent(language);
  
  const metricsContent = getMetricsContent();

  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || TrendingUp;
    return <IconComponent className="w-8 h-8" />;
  };

  const metrics = [
    { 
      icon: getIconComponent(metricsContent.avgROIIcon), 
      value: metricsContent.avgROI, 
      label: metricsContent.avgROILabel 
    },
    { 
      icon: getIconComponent(metricsContent.companiesServedIcon), 
      value: metricsContent.companiesServed, 
      label: metricsContent.companiesServedLabel 
    },
    { 
      icon: getIconComponent(metricsContent.costSavingsIcon), 
      value: metricsContent.costSavings, 
      label: metricsContent.costSavingsLabel 
    }
  ];

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="text-center rounded-lg p-8 border border-gray-200 animate-pulse" style={{ backgroundColor: '#f3f4f6' }}>
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#f3f4f6' }}>
              <div className="flex justify-center mb-4" style={{ color: '#2563eb' }}>
                {metric.icon}
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#2563eb' }}>{metric.value}</div>
              <div className="text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

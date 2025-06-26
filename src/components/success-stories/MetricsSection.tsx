
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const MetricsSection = () => {
  const metrics = [
    { icon: <TrendingUp className="w-8 h-8" />, value: "150%", label: "Average ROI" },
    { icon: <Users className="w-8 h-8" />, value: "500+", label: "Companies Served" },
    { icon: <DollarSign className="w-8 h-8" />, value: "$50M+", label: "Cost Savings Generated" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
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

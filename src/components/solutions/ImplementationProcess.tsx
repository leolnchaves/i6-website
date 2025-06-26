
import { useLanguage } from '@/contexts/LanguageContext';
import ProcessStep from './ProcessStep';
import SandboxEnvironment from './SandboxEnvironment';

const ImplementationProcess = () => {
  const { t } = useLanguage();

  const processSteps = [
    {
      key: "discovery",
      titleKey: "solutions.process.discovery.title",
      subtitle: "Business Requirement Analysis",
      descriptionKey: "solutions.process.discovery.description",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "data",
      titleKey: "solutions.process.strategy.title",
      subtitle: "Secure Data Processing",
      descriptionKey: "solutions.process.strategy.description",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "training",
      titleKey: "solutions.process.implementation.title",
      subtitle: "Business-Oriented Training",
      descriptionKey: "solutions.process.implementation.description",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "testing",
      titleKey: "solutions.process.optimization.title",
      subtitle: "Precision & Backtest Analysis",
      descriptionKey: "solutions.process.optimization.description",
      color: "from-slate-400 to-slate-500"
    },
    {
      key: "integration",
      titleKey: "solutions.process.implementation.title",
      subtitle: "Active Digital Channel Integration",
      descriptionKey: "solutions.process.implementation.description",
      color: "from-amber-600 to-amber-700"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('solutions.process.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            {t('solutions.process.description')}
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-6">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.key}
                step={step}
                index={index}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
          
          <SandboxEnvironment />
        </div>
      </div>
    </section>
  );
};

export default ImplementationProcess;

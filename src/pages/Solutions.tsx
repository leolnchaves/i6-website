
import { CheckCircle, ArrowRight, Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Solutions = () => {
  console.log('Solutions page is rendering');
  
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Target className="w-8 h-8 text-blue-700" />,
      titleKey: 'solutions.aiAnalytics.title',
      focus: 'Focus: B2B, B2C',
      descriptionKey: 'solutions.aiAnalytics.description',
      features: [
        t('solutions.aiAnalytics.feature1'),
        t('solutions.aiAnalytics.feature2'),
        t('solutions.aiAnalytics.feature3'),
        t('solutions.aiAnalytics.feature4')
      ],
      outcome: 'Unlocks product discovery and boosts engagement with zero historical data.',
      gradient: "from-gray-600/80 to-blue-700/80",
      bgColor: "bg-gray-100/60",
      borderColor: "border-gray-300/60"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-700" />,
      titleKey: 'solutions.processAutomation.title',
      focus: 'Focus: B2B, B2C, B2B2C, D2C',
      descriptionKey: 'solutions.processAutomation.description',
      features: [
        t('solutions.processAutomation.feature1'),
        t('solutions.processAutomation.feature2'),
        t('solutions.processAutomation.feature3'),
        t('solutions.processAutomation.feature4')
      ],
      outcome: 'Increases customer lifetime value with intelligent, behavior-based personalization.',
      gradient: "from-orange-600/80 to-red-600/80",
      bgColor: "bg-orange-100/60",
      borderColor: "border-orange-300/60"
    },
    {
      icon: <Cog className="w-8 h-8 text-blue-700" />,
      titleKey: 'solutions.dataIntelligence.title',
      focus: 'Focus: B2B, B2B2C',
      descriptionKey: 'solutions.dataIntelligence.description',
      features: [
        t('solutions.dataIntelligence.feature1'),
        t('solutions.dataIntelligence.feature2'),
        t('solutions.dataIntelligence.feature3'),
        t('solutions.dataIntelligence.feature4')
      ],
      outcome: 'Drives product relevance and sell-out, aligned with revenue and margin goals.',
      gradient: "from-blue-600/80 to-gray-700/80",
      bgColor: "bg-blue-100/60",
      borderColor: "border-blue-300/60"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-gray-700" />,
      titleKey: 'solutions.cloudIntegration.title',
      focus: 'Focus: B2C',
      descriptionKey: 'solutions.cloudIntegration.description',
      features: [
        t('solutions.cloudIntegration.feature1'),
        t('solutions.cloudIntegration.feature2'),
        t('solutions.cloudIntegration.feature3'),
        t('solutions.cloudIntegration.feature4')
      ],
      outcome: 'Maximizes ROI by targeting the right customer at the right time.',
      gradient: "from-gray-600/80 to-blue-600/80",
      bgColor: "bg-gray-100/60",
      borderColor: "border-gray-300/60"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-orange-700" />,
      titleKey: 'solutions.cloudIntegration.title',
      focus: 'Focus: B2B, B2C, B2B2C, D2C',
      descriptionKey: 'solutions.cloudIntegration.description',
      features: [
        t('solutions.cloudIntegration.feature1'),
        t('solutions.cloudIntegration.feature2'),
        t('solutions.cloudIntegration.feature3'),
        t('solutions.cloudIntegration.feature4')
      ],
      outcome: 'Improves margin, sales velocity, and competitiveness through intelligent pricing.',
      gradient: "from-orange-600/80 to-gray-600/80",
      bgColor: "bg-orange-100/60",
      borderColor: "border-orange-300/60"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-700" />,
      titleKey: 'solutions.cloudIntegration.title',
      focus: 'Focus: B2B, B2C',
      descriptionKey: 'solutions.cloudIntegration.description',
      features: [
        t('solutions.cloudIntegration.feature1'),
        t('solutions.cloudIntegration.feature2'),
        t('solutions.cloudIntegration.feature3'),
        t('solutions.cloudIntegration.feature4')
      ],
      outcome: 'Enhances demand planning accuracy and agility in fast-changing markets.',
      gradient: "from-blue-600/80 to-gray-700/80",
      bgColor: "bg-blue-100/60",
      borderColor: "border-blue-300/60"
    }
  ];

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block mb-2">{t('solutions.hero.title')}</span>
              <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
                {t('solutions.hero.subtitle')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {t('solutions.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className={`border-2 ${solution.borderColor} ${solution.bgColor} shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden flex flex-col`}>
                <div className={`h-1 bg-gradient-to-r ${solution.gradient}`}></div>
                <CardHeader className="p-4 flex-grow">
                  <div className="flex items-start mb-3">
                    <div className="mr-3 mt-1">
                      {solution.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                        {t(solution.titleKey)}
                      </CardTitle>
                      <div className="text-xs text-gray-600 font-medium mb-2 bg-white/60 rounded-full px-2 py-1 inline-block">
                        {solution.focus}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {t(solution.descriptionKey)}
                  </p>
                  
                  <div className="space-y-1 mb-4">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1 text-xs">Business Outcomes:</h4>
                    <p className="text-gray-700 text-xs">{solution.outcome}</p>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 mt-auto">
                  <Button className={`w-full bg-gradient-to-r ${solution.gradient} hover:opacity-90 text-white transition-all duration-300 shadow-md hover:shadow-lg text-sm py-2`}>
                    {t('solutions.learnMore')}
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
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
                <div key={step.key} className="flex flex-col items-center relative flex-1">
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
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-8 transform -translate-y-1/2 z-10">
                      <div className="bg-white rounded-full p-2 shadow-md">
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Integrated Sandbox Environment Section */}
            <div className="mt-20">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
                
                {/* Sandbox Environment Card */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold mb-2">
                        Sandbox Environment & Consulting Support Included
                      </h3>
                      <p className="text-orange-100 text-lg">
                        Complete testing environment with expert guidance throughout your journey
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20">
                        <span className="font-bold text-lg">Risk-Free Testing Environment</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20">
                        <span className="font-bold text-lg">Expert Consulting & Support</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20">
                        <span className="font-bold text-lg">30-Day Concrete Results</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('solutions.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('solutions.cta.description')}
          </p>
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            {t('solutions.cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Solutions;

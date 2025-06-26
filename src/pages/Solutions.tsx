
import { CheckCircle, ArrowRight, Cpu, Database, Cloud, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Solutions = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: t('solutions.aiAnalytics.title'),
      description: t('solutions.aiAnalytics.description'),
      features: [
        t('solutions.aiAnalytics.feature1'),
        t('solutions.aiAnalytics.feature2'),
        t('solutions.aiAnalytics.feature3'),
        t('solutions.aiAnalytics.feature4')
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Cpu className="w-12 h-12 text-purple-600" />,
      title: t('solutions.processAutomation.title'),
      description: t('solutions.processAutomation.description'),
      features: [
        t('solutions.processAutomation.feature1'),
        t('solutions.processAutomation.feature2'),
        t('solutions.processAutomation.feature3'),
        t('solutions.processAutomation.feature4')
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-12 h-12 text-green-600" />,
      title: t('solutions.dataIntelligence.title'),
      description: t('solutions.dataIntelligence.description'),
      features: [
        t('solutions.dataIntelligence.feature1'),
        t('solutions.dataIntelligence.feature2'),
        t('solutions.dataIntelligence.feature3'),
        t('solutions.dataIntelligence.feature4')
      ],
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <Cloud className="w-12 h-12 text-orange-600" />,
      title: t('solutions.cloudIntegration.title'),
      description: t('solutions.cloudIntegration.description'),
      features: [
        t('solutions.cloudIntegration.feature1'),
        t('solutions.cloudIntegration.feature2'),
        t('solutions.cloudIntegration.feature3'),
        t('solutions.cloudIntegration.feature4')
      ],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const processSteps = [
    { 
      step: "01", 
      title: t('solutions.process.discovery.title'), 
      description: t('solutions.process.discovery.description')
    },
    { 
      step: "02", 
      title: t('solutions.process.strategy.title'), 
      description: t('solutions.process.strategy.description')
    },
    { 
      step: "03", 
      title: t('solutions.process.implementation.title'), 
      description: t('solutions.process.implementation.description')
    },
    { 
      step: "04", 
      title: t('solutions.process.optimization.title'), 
      description: t('solutions.process.optimization.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark Blue Background */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

      {/* Solutions Grid - Light Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden bg-white">
                <div className={`h-2 bg-gradient-to-r ${solution.gradient}`}></div>
                <CardHeader className="p-8">
                  <div className="flex items-center mb-4">
                    {solution.icon}
                    <CardTitle className="text-2xl font-bold text-gray-900 ml-4">
                      {solution.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600 text-lg">
                    {solution.description}
                  </p>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-3 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${solution.gradient} hover:opacity-90 transition-opacity`}>
                    {t('solutions.learnMore')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Light Background */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('solutions.process.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('solutions.process.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            {t('solutions.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('solutions.cta.description')}
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
            {t('solutions.cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Solutions;

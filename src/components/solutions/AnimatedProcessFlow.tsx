import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProcessSteps } from '@/data/solutions/processData';
import { CheckCircle, Circle, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SandboxEnvironment from './SandboxEnvironment';

const AnimatedProcessFlow = () => {
  const { t } = useLanguage();
  const processSteps = getProcessSteps(t);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Move to next step
            setCurrentStep(current => {
              const next = (current + 1) % processSteps.length;
              return next;
            });
            return 0;
          }
          return prev + 2; // 2% every 100ms = 5 seconds per step
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, processSteps.length]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setProgress(0);
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setProgress(0);
    }
  };

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white border-green-500';
      case 'active': return 'bg-primary text-white border-primary';
      default: return 'bg-gray-200 text-gray-500 border-gray-300';
    }
  };

  const getConnectorColor = (index: number) => {
    return index < currentStep ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-orange-500"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-blue-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('solutions.process.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('solutions.process.subtitle')}
          </p>
          
          {/* Animation Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              onClick={toggleAnimation}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pausar Demonstração' : 'Iniciar Demonstração'}
            </Button>
            <div className="text-sm text-gray-600">
              Passo {currentStep + 1} de {processSteps.length}
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Desktop Horizontal Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gray-300 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((currentStep + progress / 100) / (processSteps.length - 1)) * 100}%` 
                  }}
                ></div>
              </div>

              {/* Steps */}
              <div className="flex justify-between relative">
                {processSteps.map((step, index) => {
                  const status = getStepStatus(index);
                  return (
                    <div 
                      key={step.key}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => handleStepClick(index)}
                    >
                      {/* Step Circle */}
                      <div className={`
                        w-16 h-16 rounded-full border-4 flex items-center justify-center
                        transition-all duration-300 shadow-lg group-hover:scale-110
                        ${getStepColor(status)}
                      `}>
                        {status === 'completed' ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : (
                          <span className="text-lg font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        )}
                      </div>

                      {/* Step Info */}
                      <div className="mt-4 text-center max-w-xs">
                        <h3 className={`
                          font-semibold text-sm mb-1 transition-colors
                          ${status === 'active' ? 'text-primary' : 'text-gray-700'}
                        `}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium bg-gray-100 rounded-full px-3 py-1">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Layout */}
          <div className="lg:hidden space-y-6">
            {processSteps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <div key={step.key} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-12 h-12 rounded-full border-3 flex items-center justify-center
                      transition-all duration-300 shadow-md
                      ${getStepColor(status)}
                    `}>
                      {status === 'completed' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="text-sm font-bold">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className={`w-1 h-12 mt-2 transition-colors ${getConnectorColor(index)}`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <h3 className={`
                      font-semibold mb-1 transition-colors
                      ${status === 'active' ? 'text-primary' : 'text-gray-700'}
                    `}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{step.subtitle}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Details */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${getStepColor(getStepStatus(currentStep))}
                  `}>
                    <span className="text-lg font-bold">
                      {String(currentStep + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {processSteps[currentStep].title}
                    </h3>
                    <p className="text-primary font-medium">
                      {processSteps[currentStep].subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {processSteps[currentStep].description}
                  </p>
                  
                  {/* Progress Bar for Current Step */}
                  {isPlaying && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progresso do Step</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-green-500 h-2 rounded-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center">
                      <div className={`
                        w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold
                        ${processSteps[currentStep].color.replace('from-slate-400 to-slate-500', 'from-primary to-primary')} bg-gradient-to-br
                      `}>
                        {String(currentStep + 1).padStart(2, '0')}
                      </div>
                    </div>
                    {isPlaying && (
                      <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completeness Indicator */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Progresso da Implementação
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Completude Geral</span>
                <span>{Math.round(((currentStep + progress / 100) / processSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-primary h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((currentStep + progress / 100) / processSteps.length) * 100}%` 
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                {currentStep === processSteps.length - 1 && progress === 100 
                  ? 'Implementação Completa! 🎉' 
                  : `Próximo: ${processSteps[Math.min(currentStep + 1, processSteps.length - 1)]?.title || 'Finalizado'}`
                }
              </div>
            </div>
          </div>
        </div>

        {/* Sandbox Environment */}
        <SandboxEnvironment />
      </div>
    </section>
  );
};

export default AnimatedProcessFlow;
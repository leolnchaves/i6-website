import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProcessSteps } from '@/data/solutions/processData';
import { Play, Pause } from 'lucide-react';
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
          return prev + 1; // 1% every 100ms = 10 seconds per step
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
      case 'active': return 'bg-orange-500 text-white border-orange-500';
      default: return 'bg-gray-300 text-gray-600 border-gray-300';
    }
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
        <div className="text-center mb-12">
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
          </div>
        </div>

        {/* Horizontal Steps */}
        <div className="max-w-6xl mx-auto mb-8">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-green-500 rounded-full transition-all duration-500"
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
                      className="flex flex-col items-center cursor-pointer group max-w-[180px]"
                      onClick={() => handleStepClick(index)}
                    >
                      {/* Step Circle */}
                      <div className={`
                        w-12 h-12 rounded-full border-3 flex items-center justify-center
                        transition-all duration-300 shadow-lg group-hover:scale-110 z-10 bg-white
                        ${status === 'active' ? 'border-orange-500 text-orange-500' : 
                          status === 'completed' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-400'}
                      `}>
                        <span className="text-sm font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Step Title */}
                      <div className="mt-4 text-center">
                        <h3 className={`
                          font-semibold text-sm leading-tight transition-colors
                          ${status === 'active' ? 'text-orange-500' : 
                            status === 'completed' ? 'text-green-600' : 'text-gray-600'}
                        `}>
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto gap-4 pb-4">
              {processSteps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div 
                    key={step.key}
                    className="flex flex-col items-center cursor-pointer group min-w-[120px] flex-shrink-0"
                    onClick={() => handleStepClick(index)}
                  >
                    <div className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center
                      transition-all duration-300 shadow-md group-hover:scale-110 bg-white
                      ${status === 'active' ? 'border-orange-500 text-orange-500' : 
                        status === 'completed' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-400'}
                    `}>
                      <span className="text-xs font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className={`
                      mt-2 font-medium text-xs text-center leading-tight transition-colors
                      ${status === 'active' ? 'text-orange-500' : 
                        status === 'completed' ? 'text-green-600' : 'text-gray-600'}
                    `}>
                      {step.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Step Detail Card */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="border-0 shadow-xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Left side - Content */}
                <div className="flex-1 p-8 lg:p-12">
                  <div className="flex items-start gap-6">
                    {/* Large Step Number Circle */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold">
                            {String(currentStep + 1).padStart(2, '0')}
                          </div>
                        </div>
                        {isPlaying && (
                          <div className="absolute inset-0 rounded-full border-4 border-orange-300/50 animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {processSteps[currentStep].title}
                      </h3>
                      <p className="text-orange-500 font-semibold text-lg mb-6">
                        {processSteps[currentStep].subtitle}
                      </p>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {processSteps[currentStep].description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {isPlaying && (
                    <div className="mt-8 space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progresso da Etapa</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side - Visual Element */}
                <div className="lg:w-80 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center mb-4 relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                        {String(currentStep + 1).padStart(2, '0')}
                      </div>
                      {isPlaying && (
                        <>
                          <div className="absolute inset-0 rounded-full border-4 border-orange-400/30 animate-ping"></div>
                          <div className="absolute inset-0 rounded-full border-2 border-orange-400/50 animate-pulse"></div>
                        </>
                      )}
                    </div>
                    <div className="text-orange-600 text-sm font-medium">
                      Etapa {currentStep + 1} de {processSteps.length}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
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
                  className="bg-gradient-to-r from-orange-500 to-green-500 h-3 rounded-full transition-all duration-500"
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
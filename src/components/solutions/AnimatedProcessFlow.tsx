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
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  // Define tasks for each step (only 3 tasks per step)
  const getStepTasks = (stepKey: string) => {
    const tasks = {
      discovery: [
        "Analyzing business requirements and objectives",
        "Identifying key stakeholders and decision makers", 
        "Mapping current processes and pain points"
      ],
      data: [
        "Collecting data samples from multiple sources",
        "Implementing data anonymization protocols",
        "Ensuring GDPR and privacy compliance"
      ],
      training: [
        "Preprocessing and cleaning collected data",
        "Training AI models with optimal parameters",
        "Cross-validation and performance testing"
      ],
      testing: [
        "Running comprehensive model validation tests",
        "A/B testing with controlled user groups",
        "Performance benchmarking against baselines"
      ],
      integration: [
        "Seamless deployment across your digital ecosystem",
        "API integration with existing systems",
        "Real-time monitoring and alerting setup"
      ]
    };
    return tasks[stepKey as keyof typeof tasks] || [];
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Check if we're on the last step
            if (currentStep === processSteps.length - 1) {
              // Stop the demo at 100% completion
              setIsPlaying(false);
              return 100;
            } else {
              // Move to next step
              setCurrentStep(current => {
                const next = current + 1;
                setCurrentTaskIndex(0); // Reset task index for new step
                return next;
              });
              return 0;
            }
          }
          return prev + 2; // 2% every 100ms = 5 seconds per step
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, processSteps.length, currentStep]);

  // Calculate which tasks should be completed based on progress
  const getCompletedTasksCount = () => {
    const totalTasks = getStepTasks(processSteps[currentStep].key).length;
    return Math.floor((progress / 100) * totalTasks);
  };

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
          <div className="hidden lg:block">
            <div className="relative px-12">

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
                      {/* Step Circle with Progress */}
                      <div className="relative w-12 h-12">
                        {/* Progress Ring Background */}
                        <svg className="absolute inset-0 w-12 h-12 transform -rotate-90">
                          {/* Background circle - always visible */}
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          {/* Progress circle for active step */}
                          {status === 'active' && (
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 20}`}
                              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                              className="transition-all duration-500 ease-out"
                            />
                          )}
                          {/* Full circle for completed steps */}
                          {status === 'completed' && (
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                              strokeDasharray={`${2 * Math.PI * 20}`}
                              strokeDashoffset="0"
                            />
                          )}
                        </svg>
                        
                        {/* Step number circle */}
                        <div className={`
                          absolute inset-0 w-12 h-12 rounded-full flex items-center justify-center
                          transition-all duration-300 shadow-lg group-hover:scale-110 bg-white
                          ${status === 'active' ? 'text-green-600' : 
                            status === 'completed' ? 'text-green-600' : 'text-gray-400'}
                        `}>
                          <span className="text-sm font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
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
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="border-0 shadow-xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row min-h-[300px]">
                {/* Left side - Compact Content */}
                <div className="lg:w-1/2 p-6">
                  <div className="flex items-start gap-4">
                    {/* Large Step Number Circle */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold">
                            {String(currentStep + 1).padStart(2, '0')}
                          </div>
                        </div>
                         {isPlaying && (
                           <>
                             <div className="absolute inset-0 rounded-full border-4 border-orange-400/30 animate-ping"></div>
                             <div className="absolute inset-0 rounded-full border-2 border-orange-400/50 animate-pulse"></div>
                           </>
                         )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {processSteps[currentStep].title}
                      </h3>
                      <p className="text-orange-500 font-semibold text-sm">
                        {processSteps[currentStep].subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {isPlaying && (
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Progresso da Etapa</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      {/* Weekly Timeline */}
                      <div className="pt-2">
                        <div className="flex justify-between items-center text-xs">
                          {[
                            { label: 'Semana 1', step: 0 },
                            { label: 'Semana 2', step: 1 },
                            { label: 'Semana 3', step: 2 },
                            { label: 'Semana 4', step: 3 },
                            { label: 'Mês 2 a 4', step: 4 }
                          ].map((week, index) => {
                            const isCompleted = currentStep > week.step || (currentStep === week.step && progress === 100);
                            const isActive = currentStep === week.step;
                            
                            return (
                              <div 
                                key={index} 
                                className={`text-center transition-all duration-300 ${
                                  isCompleted 
                                    ? 'text-green-600 font-semibold' 
                                    : isActive 
                                    ? 'text-orange-600 font-medium' 
                                    : 'text-gray-400'
                                }`}
                              >
                                {week.label}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Timeline line */}
                        <div className="mt-2 relative">
                          <div className="w-full h-0.5 bg-gray-300 rounded"></div>
                          <div 
                            className="absolute top-0 h-0.5 bg-gradient-to-r from-orange-500 to-green-500 rounded transition-all duration-500"
                            style={{ 
                              width: `${((currentStep + (progress / 100)) / 5) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side - Task Display */}
                <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col justify-center">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Tarefas em Execução
                    </h4>
                    
                    {/* Current Tasks Display */}
                    <div className="space-y-3">
                      {getStepTasks(processSteps[currentStep].key).map((task, index) => {
                        const completedTasks = getCompletedTasksCount();
                        const isCompleted = index < completedTasks;
                        const isActive = index === completedTasks && progress < 100;

                        return (
                          <div 
                            key={index}
                            className={`
                              flex items-start gap-3 p-3 rounded-lg transition-all duration-500
                              ${isActive && isPlaying 
                                ? 'bg-orange-100 border-l-4 border-orange-500 transform translate-x-2' 
                                : isCompleted
                                ? 'bg-green-50 border-l-4 border-green-500'
                                : 'bg-white border-l-4 border-gray-200 opacity-60'
                              }
                            `}
                          >
                            <div className={`
                              w-2 h-2 rounded-full mt-2 flex-shrink-0
                              ${isActive && isPlaying 
                                ? 'bg-orange-500 animate-pulse' 
                                : isCompleted
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                              }
                            `}></div>
                            <p className={`
                              text-sm leading-relaxed
                              ${isActive && isPlaying 
                                ? 'text-orange-700 font-medium' 
                                : isCompleted
                                ? 'text-green-700'
                                : 'text-gray-500'
                              }
                            `}>
                              {task}
                            </p>
                          </div>
                        );
                      })}
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
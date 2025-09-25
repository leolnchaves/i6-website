import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { processStepsData } from '@/data/solutions/processDataStatic';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SandboxEnvironment from './SandboxEnvironment';

const AnimatedProcessFlow = () => {
  const { language } = useLanguage();
  const processSteps = processStepsData[language] || processStepsData.en;
  
  // Static translations
  const translations = {
    en: {
      title: 'AI Implementation Journey',
      subtitle: 'Risk-free testing. Concrete potential in 30 days.',
      startDemo: 'Start Demo',
      pauseDemo: 'Pause Demo'
    },
    pt: {
      title: 'Jornada de Implementação de IA',
      subtitle: 'Testes sem risco. Potencial concreto em 30 dias.',
      startDemo: 'Inicie a Demo',
      pauseDemo: 'Pausar Demo'
    }
  };
  
  const t = translations[language] || translations.en;
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  
  // Performance optimization refs
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define tasks for each step (only 3 tasks per step) with translations
  const getStepTasks = (stepKey: string) => {
    const tasksEn = {
      discovery: [
        "Analyzing business requirements",
        "Mapping goals and strategic angle",
        "Creating an isolated and secure environment"
      ],
      data: [
        "Analyzing data structure",
        "Collecting data samples from multiple sources",
        "Implementing data anonymization protocols"
      ],
      training: [
        "Preprocessing and cleaning collected data",
        "Training AI models with optimal parameters",
        "Cross-validation and backtest testing"
      ],
      testing: [
        "Running comprehensive model validation tests",
        "Creating potential and scalable results analysis",
        "Performance benchmarking against baselines"
      ],
      integration: [
        "Seamless integration across your digital ecosystem",
        "**Fast value capture with trained models**",
        "Real-time monitoring and alerting setup"
      ]
    };
    
    const tasksPt = {
      discovery: [
        "Analisando requisitos de negócio",
        "Mapeando objetivos e ângulo estratégico",
        "Criando ambiente isolado e seguro"
      ],
      data: [
        "Analisando estrutura de dados",
        "Coletando amostras de dados de múltiplas fontes",
        "Implementando protocolos de anonimização de dados"
      ],
      training: [
        "Pré-processando e limpando dados coletados",
        "Treinando modelos de IA com parâmetros ótimos",
        "Validação cruzada e testes de backtest"
      ],
      testing: [
        "Executando testes abrangentes de validação de modelo",
        "Criando análise de resultados potenciais e escaláveis",
        "Benchmarking de performance contra baselines"
      ],
      integration: [
        "Integração perfeita em seu ecossistema digital",
        "**Captura rápida de valor com modelos treinados**",
        "Configuração de monitoramento e alertas em tempo real"
      ]
    };
    
    const tasks = language === 'pt' ? tasksPt : tasksEn;
    return tasks[stepKey as keyof typeof tasks] || [];
  };

  // Optimized animation function using requestAnimationFrame
  const animate = useCallback(() => {
    if (!isVisibleRef.current || !isPlaying) {
      animationFrameRef.current = undefined;
      return;
    }

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;
    
    // Only update if enough time has passed (targeting ~10fps for smooth animation)
    if (deltaTime >= 100) {
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
        return prev + 1.4; // 1.4% per update = ~7.1 seconds per step
      });
      
      lastTimeRef.current = currentTime;
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isPlaying, processSteps.length, currentStep]);

  useEffect(() => {
    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
        if (isVisibleRef.current && isPlaying && !animationFrameRef.current) {
          // Resume animation when becomes visible
          lastTimeRef.current = performance.now();
          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    if (isPlaying && isVisibleRef.current) {
      lastTimeRef.current = performance.now();
      animate();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, [isPlaying, animate]);

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
    if (index === currentStep) {
      // If demo is finished (not playing and progress is 100%), mark as completed
      if (!isPlaying && progress === 100) return 'completed';
      return 'active';
    }
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
    <section ref={containerRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t.subtitle}
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
              {isPlaying ? t.pauseDemo : t.startDemo}
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
                          { label: 'Semana 1', steps: [0, 1] }, // Steps 1 e 2
                          { label: 'Semana 2', steps: [2] },    // Step 3 (parte 1)
                          { label: 'Semana 3', steps: [2] },    // Step 3 (parte 2)
                          { label: 'Semana 4', steps: [3] },    // Step 4
                          { label: '3 Meses', steps: [4] }      // Step 5
                        ].map((week, index) => {
                          let isCompleted = false;
                          let isActive = false;
                          
                          if (index === 0) { // Semana 1
                            isCompleted = currentStep > 1 || (currentStep === 1 && progress === 100);
                            isActive = currentStep <= 1;
                          } else if (index === 1) { // Semana 2 
                            isCompleted = currentStep > 2 || (currentStep === 2 && progress >= 50);
                            isActive = currentStep === 2 && progress < 50;
                          } else if (index === 2) { // Semana 3
                            isCompleted = currentStep > 2 || (currentStep === 2 && progress === 100);
                            isActive = currentStep === 2 && progress >= 50;
                          } else if (index === 3) { // Semana 4
                            isCompleted = currentStep > 3 || (currentStep === 3 && progress === 100);
                            isActive = currentStep === 3;
                          } else { // 3 Meses
                            isCompleted = currentStep > 4 || (currentStep === 4 && progress === 100);
                            isActive = currentStep === 4;
                          }
                          
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
                            width: `${(() => {
                              if (currentStep === 0) return (progress / 100) * 20; // 20% for step 1
                              if (currentStep === 1) return 20 + (progress / 100) * 20; // 40% total for steps 1-2
                              if (currentStep === 2) return 40 + (progress / 100) * 40; // 80% total for steps 1-3
                              if (currentStep === 3) return 80 + (progress / 100) * 10; // 90% total for steps 1-4
                              if (currentStep === 4) return 90 + (progress / 100) * 10; // 100% total
                              return 100;
                            })()}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
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


        {/* Sandbox Environment */}
        <SandboxEnvironment />
      </div>
    </section>
  );
};

export default AnimatedProcessFlow;
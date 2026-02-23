import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { processStepsData } from '@/data/solutions/processDataStatic';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SandboxEnvironment from './SandboxEnvironment';

const AnimatedProcessFlow = () => {
  const { language } = useLanguage();
  const processSteps = processStepsData[language] || processStepsData.en;
  
  const translations = {
    en: {
      title: 'AI Implementation Journey',
      subtitle: 'Risk-free testing. Concrete potential in 30 days.',
      startDemo: 'Start Demo',
      pauseDemo: 'Pause Demo',
      stepProgress: 'Step Progress',
      tasksRunning: 'Tasks Running'
    },
    pt: {
      title: 'Jornada de Implementação de IA',
      subtitle: 'Testes sem risco. Potencial concreto em 30 dias.',
      startDemo: 'Inicie a Demo',
      pauseDemo: 'Pausar Demo',
      stepProgress: 'Progresso da Etapa',
      tasksRunning: 'Tarefas em Execução'
    }
  };
  
  const t = translations[language] || translations.en;
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

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
        "**Fast value capture with business-trained models**",
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
        "**Captura rápida de valor com modelos treinados para negócio**",
        "Configuração de monitoramento e alertas em tempo real"
      ]
    };
    
    const tasks = language === 'pt' ? tasksPt : tasksEn;
    return tasks[stepKey as keyof typeof tasks] || [];
  };

  const animate = useCallback(() => {
    if (!isVisibleRef.current || !isPlaying) {
      animationFrameRef.current = undefined;
      return;
    }

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;
    
    if (deltaTime >= 100) {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentStep === processSteps.length - 1) {
            setIsPlaying(false);
            return 100;
          } else {
            setCurrentStep(current => {
              const next = current + 1;
              setCurrentTaskIndex(0);
              return next;
            });
            return 0;
          }
        }
        return prev + 1.4;
      });
      
      lastTimeRef.current = currentTime;
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isPlaying, processSteps.length, currentStep]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
        if (isVisibleRef.current && isPlaying && !animationFrameRef.current) {
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
      if (!isPlaying && progress === 100) return 'completed';
      return 'active';
    }
    return 'pending';
  };

  return (
    <section ref={containerRef} className="py-20 bg-[#0B1224] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            {t.subtitle}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              onClick={toggleAnimation}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-[#F4845F]/50 text-[#F4845F] hover:bg-[#F4845F]/10 hover:text-[#F4845F] bg-transparent"
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
              <div className="flex justify-between relative">
                {processSteps.map((step, index) => {
                  const status = getStepStatus(index);
                  return (
                    <div 
                      key={step.key}
                      className="flex flex-col items-center cursor-pointer group max-w-[180px]"
                      onClick={() => handleStepClick(index)}
                    >
                      <div className="relative w-12 h-12">
                        <svg className="absolute inset-0 w-12 h-12 transform -rotate-90">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                          {status === 'active' && (
                            <circle cx="24" cy="24" r="20" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 20}`}
                              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                              className="transition-all duration-500 ease-out"
                            />
                          )}
                          {status === 'completed' && (
                            <circle cx="24" cy="24" r="20" fill="none" stroke="#10b981" strokeWidth="2"
                              strokeDasharray={`${2 * Math.PI * 20}`} strokeDashoffset="0"
                            />
                          )}
                        </svg>
                        
                        <div className={`
                          absolute inset-0 w-12 h-12 rounded-full flex items-center justify-center
                          transition-all duration-300 shadow-lg group-hover:scale-110 bg-white/5 border border-white/10
                          ${status === 'active' ? 'text-[#F4845F]' : 
                            status === 'completed' ? 'text-green-400' : 'text-white/30'}
                        `}>
                          <span className="text-sm font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <h3 className={`
                          font-semibold text-sm leading-tight transition-colors
                          ${status === 'active' ? 'text-[#F4845F]' : 
                            status === 'completed' ? 'text-green-400' : 'text-white/40'}
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
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4 pb-4">
              {processSteps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div 
                    key={step.key}
                    className="flex flex-col items-center cursor-pointer group min-w-[100px] sm:min-w-[120px] flex-shrink-0"
                    onClick={() => handleStepClick(index)}
                  >
                    <div className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center
                      transition-all duration-300 shadow-md group-hover:scale-110 bg-white/5
                      ${status === 'active' ? 'border-[#F4845F] text-[#F4845F]' : 
                        status === 'completed' ? 'border-green-400 text-green-400' : 'border-white/20 text-white/30'}
                    `}>
                      <span className="text-xs font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className={`
                      mt-2 font-medium text-xs text-center leading-tight transition-colors
                      ${status === 'active' ? 'text-[#F4845F]' : 
                        status === 'completed' ? 'text-green-400' : 'text-white/40'}
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
          <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[300px]">
              {/* Left side */}
              <div className="lg:w-1/2 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-[#F4845F]/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#F4845F] flex items-center justify-center text-white text-lg font-bold">
                          {String(currentStep + 1).padStart(2, '0')}
                        </div>
                      </div>
                       {isPlaying && (
                         <>
                           <div className="absolute inset-0 rounded-full border-4 border-[#F4845F]/30 animate-ping"></div>
                           <div className="absolute inset-0 rounded-full border-2 border-[#F4845F]/50 animate-pulse"></div>
                         </>
                       )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {processSteps[currentStep].title}
                    </h3>
                    <p className="text-[#F4845F] font-semibold text-sm">
                      {processSteps[currentStep].subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-xs text-white/40">
                    <span>{t.stepProgress}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#F4845F] to-[#E8764A] h-2 rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Weekly Timeline */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs">
                      {[
                        { label: language === 'pt' ? 'Semana 1' : 'Week 1', steps: [0, 1] },
                        { label: language === 'pt' ? 'Semana 2' : 'Week 2', steps: [2] },
                        { label: language === 'pt' ? 'Semana 3' : 'Week 3', steps: [2] },
                        { label: language === 'pt' ? 'Semana 4' : 'Week 4', steps: [3] },
                        { label: language === 'pt' ? '3 Meses' : '3 Months', steps: [4] }
                      ].map((week, index) => {
                        let isCompleted = false;
                        let isActive = false;
                        
                        if (index === 0) {
                          isCompleted = currentStep > 1 || (currentStep === 1 && progress === 100);
                          isActive = currentStep <= 1;
                        } else if (index === 1) {
                          isCompleted = currentStep > 2 || (currentStep === 2 && progress >= 50);
                          isActive = currentStep === 2 && progress < 50;
                        } else if (index === 2) {
                          isCompleted = currentStep > 2 || (currentStep === 2 && progress === 100);
                          isActive = currentStep === 2 && progress >= 50;
                        } else if (index === 3) {
                          isCompleted = currentStep > 3 || (currentStep === 3 && progress === 100);
                          isActive = currentStep === 3;
                        } else {
                          isCompleted = currentStep > 4 || (currentStep === 4 && progress === 100);
                          isActive = currentStep === 4;
                        }
                        
                        return (
                          <div 
                            key={index} 
                            className={`text-center transition-all duration-300 ${
                              isCompleted 
                                ? 'text-green-400 font-semibold' 
                                : isActive 
                                ? 'text-[#F4845F] font-medium' 
                                : 'text-white/30'
                            }`}
                          >
                            {week.label}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-2 relative">
                      <div className="w-full h-0.5 bg-white/10 rounded"></div>
                      <div 
                        className="absolute top-0 h-0.5 bg-gradient-to-r from-[#F4845F] to-green-400 rounded transition-all duration-500"
                        style={{ 
                          width: `${(() => {
                            if (currentStep === 0) return (progress / 100) * 20;
                            if (currentStep === 1) return 20 + (progress / 100) * 20;
                            if (currentStep === 2) return 40 + (progress / 100) * 40;
                            if (currentStep === 3) return 80 + (progress / 100) * 10;
                            if (currentStep === 4) return 90 + (progress / 100) * 10;
                            return 100;
                          })()}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Tasks */}
              <div className="lg:w-1/2 bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-center">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white/80 mb-4">
                    {t.tasksRunning}
                  </h4>
                  
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
                              ? 'bg-[#F4845F]/10 border-l-4 border-[#F4845F] transform translate-x-2' 
                              : isCompleted
                              ? 'bg-green-500/10 border-l-4 border-green-400'
                              : 'bg-white/5 border-l-4 border-white/10 opacity-60'
                            }
                          `}
                        >
                          <div className={`
                            w-2 h-2 rounded-full mt-2 flex-shrink-0
                            ${isActive && isPlaying 
                              ? 'bg-[#F4845F] animate-pulse' 
                              : isCompleted
                              ? 'bg-green-400'
                              : 'bg-white/20'
                            }
                          `}></div>
                          <p className={`
                            text-sm leading-relaxed
                            ${isActive && isPlaying 
                              ? 'text-[#F4845F] font-medium' 
                              : isCompleted
                              ? 'text-green-400'
                              : 'text-white/40'
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
          </div>
        </div>

        {/* Sandbox Environment */}
        <SandboxEnvironment />
      </div>
    </section>
  );
};

export default AnimatedProcessFlow;

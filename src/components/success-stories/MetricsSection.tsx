
import React from 'react';
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
  Rocket,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSuccessStoriesContent } from '@/hooks/useSuccessStoriesContent';
import { useState, useEffect, useRef } from 'react';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const metricsContent = getMetricsContent();

  const getIconComponent = (iconName: string, className: string = "w-10 h-10") => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || TrendingUp;
    return <IconComponent className={className} />;
  };

  const metrics = [
    { 
      icon: getIconComponent(metricsContent.avgROIIcon), 
      value: metricsContent.avgROI, 
      label: metricsContent.avgROILabel,
      gradient: "from-blue-500 to-purple-600"
    },
    { 
      icon: getIconComponent(metricsContent.companiesServedIcon), 
      value: metricsContent.companiesServed, 
      label: metricsContent.companiesServedLabel,
      gradient: "from-emerald-500 to-cyan-600"
    },
    { 
      icon: getIconComponent(metricsContent.costSavingsIcon), 
      value: metricsContent.costSavings, 
      label: metricsContent.costSavingsLabel,
      gradient: "from-orange-500 to-pink-600"
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (metrics.length > 1 && !isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % metrics.length);
      }, 4000);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, [metrics.length, isPaused]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + metrics.length) % metrics.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % metrics.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-4 mx-auto w-64 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded mx-auto w-96 animate-pulse" />
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-64 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-pulse">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 bg-gray-300 rounded-2xl" />
                <div className="h-12 bg-gray-300 rounded w-32" />
                <div className="h-4 bg-gray-300 rounded w-40" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] animate-pulse" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-200/30 rounded-full blur-xl animate-float-slow" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Resultados Comprovados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Números que refletem o impacto real das nossas soluções de IA
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative flex justify-center items-center">
          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Metrics cards container */}
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex justify-center px-4"
              >
                <div className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  index === currentSlide ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                }`}>
                  {/* Main card */}
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 w-80 h-64">
                    {/* Gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5 rounded-3xl`} />
                    
                    {/* Icon with gradient background */}
                    <div className="relative flex justify-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {React.cloneElement(metric.icon, { 
                          className: "w-8 h-8 text-white drop-shadow-sm" 
                        })}
                      </div>
                    </div>

                    {/* Value */}
                    <div className={`text-4xl md:text-5xl font-bold text-center mb-3 bg-gradient-to-br ${metric.gradient} bg-clip-text text-transparent`}>
                      {metric.value}
                    </div>

                    {/* Label */}
                    <div className="text-gray-600 text-center text-lg font-medium leading-tight">
                      {metric.label}
                    </div>

                    {/* Subtle glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
                  </div>

                  {/* Floating accent */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${metric.gradient} rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {metrics.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

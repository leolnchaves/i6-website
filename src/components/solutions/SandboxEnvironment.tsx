
import { useLanguage } from '@/contexts/LanguageContext';
import { sandboxEnvironmentData } from '@/data/staticData/sandboxEnvironmentData';

const SandboxEnvironment = () => {
  const { language } = useLanguage();
  const content = sandboxEnvironmentData[language] || sandboxEnvironmentData.en;

  return (
    <div className="mt-20">
      <div className="relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        <div className="bg-white/5 border border-[#F4845F]/30 rounded-2xl p-4 md:p-8 shadow-2xl text-white relative overflow-hidden max-w-4xl mx-auto backdrop-blur-sm">
          <div className="relative z-10">
            <div className="text-center flex flex-col items-center justify-center">
              <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-center leading-tight text-white">
                {content.title}
              </h3>
              <p className="text-white/60 text-sm md:text-lg leading-relaxed">
                {content.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxEnvironment;

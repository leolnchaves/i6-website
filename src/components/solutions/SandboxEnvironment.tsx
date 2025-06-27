
import { useLanguage } from '@/contexts/LanguageContext';

const SandboxEnvironment = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-20">
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
        
        {/* Sandbox Environment Card - Increased size to match flow cards */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">
                {t('solutions.sandbox.title')}
              </h3>
              <p className="text-orange-100 text-lg leading-relaxed">
                {t('solutions.sandbox.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxEnvironment;

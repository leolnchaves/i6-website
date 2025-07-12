import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PartnersSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Client logos with the provided images
  const partners = [
    { name: 'HERING', logo: '/lovable-uploads/3615160d-7cc4-4b8a-8a81-ea7cabb7739f.png' },
    { name: 'EMS', logo: '/lovable-uploads/58e286a1-1e55-47cc-8524-dc041be15b81.png' },
    { name: 'LEGRAND', logo: '/lovable-uploads/373196c0-5b6e-4e60-80c3-a1da99265d12.png' },
    { name: 'COGNA', logo: '/lovable-uploads/534d8da1-8e73-4707-9c28-3bb33e0fdfb6.png' },
    { name: 'ACHĒ', logo: '/lovable-uploads/a78ba018-aaab-423f-ac52-89f6cf1ff6ef.png' },
    { name: 'NATURA&CO', logo: '/lovable-uploads/c8169903-2836-45f3-830c-db6dc7e8ac9e.png' },
    { name: 'JEQUITI', logo: '/lovable-uploads/05313f6e-5f31-4189-8824-1615d0b72bfc.png' },
    { name: 'EMBRAER', logo: '/lovable-uploads/6d813ac5-011f-4bff-b35a-6eed9b162869.png' },
    { name: 'BANCO XYZ', logo: '/lovable-uploads/78e4760f-4843-4f50-b0b1-f93b9cf828f2.png' },
    { name: 'FINANCORP', logo: '/lovable-uploads/8c0acc2d-915a-484e-b83e-c82c3de47aa5.png' }
  ];

  // Auto-rotate partners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [partners.length]);

  // Calculate opacity based on position relative to current index
  const getOpacity = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    const normalizedDistance = Math.min(distance, partners.length - distance);
    
    if (normalizedDistance === 0) return 1;
    if (normalizedDistance === 1) return 0.7;
    if (normalizedDistance === 2) return 0.4;
    return 0.15;
  };

  // Get scale based on position
  const getScale = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    const normalizedDistance = Math.min(distance, partners.length - distance);
    
    if (normalizedDistance === 0) return 1.1;
    if (normalizedDistance === 1) return 1;
    return 0.9;
  };

  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side - Title with inspired design */}
          <div className="lg:w-2/5 text-center lg:text-left">
            <div className="relative">
              {/* Background accent */}
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl blur-xl"></div>
              
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
                  <span className="block text-xl lg:text-2xl font-normal mb-2 text-slate-300">
                    OUR
                  </span>
                  <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    PARTNERS
                  </span>
                </h2>
                
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-orange-500 mb-5"></div>
                
                <p className="text-slate-300 text-base leading-relaxed">
                  Transforming businesses through strategic partnerships and 
                  innovative solutions that deliver exceptional results.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Partners Grid with Carousel Effect */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {partners.slice(0, 9).map((partner, index) => {
                const opacity = getOpacity(index);
                const scale = getScale(index);
                
                return (
                  <div
                    key={partner.name}
                    className="aspect-square flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-700 ease-out hover:bg-white/20 cursor-pointer"
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                    }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className={`object-contain transition-all duration-500 filter brightness-0 invert ${
                        partner.name === 'NATURA&CO' ? 'max-h-8 max-w-20' : 'max-h-10 max-w-24'
                      }`}
                      style={{
                        opacity: opacity * 0.9 + 0.1
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Carousel Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {partners.slice(0, 9).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
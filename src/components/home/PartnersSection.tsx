import { useState } from 'react';
import { usePartnersContent } from '@/hooks/usePartnersContent';
import { useLanguage } from '@/contexts/LanguageContext';

const PartnersSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { partners, loading, error } = usePartnersContent();
  const { t } = useLanguage();

  // Show loading state
  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-slate-300">Loading partners...</div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-red-400">Error loading partners: {error}</div>
        </div>
      </section>
    );
  }

  // Double the array for seamless loop
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Left Side - Title */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="relative">
              {/* Background accent */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-xl blur-xl"></div>
              
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  <span className="block text-lg lg:text-xl font-normal mb-1 text-slate-300">
                    {t('partners.our')}
                  </span>
                  <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    {t('partners.title')}
                  </span>
                </h2>
                
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-orange-500 mb-4"></div>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t('partners.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Horizontal Carousel */}
          <div className="lg:w-2/3 w-full overflow-hidden">
            <div 
              className="flex items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className={`flex animate-marquee ${isPaused ? 'paused' : ''}`}
                style={{
                  width: `${doubledPartners.length * 220}px`,
                  animationDuration: `${doubledPartners.length * 1.5}s`
                }}
              >
                {doubledPartners.map((partner, index) => {
                  // Calculate opacity based on position in the visible area
                  const position = (index * 220) % (partners.length * 220);
                  const centerPosition = (partners.length * 220) / 2;
                  const distance = Math.abs(position - centerPosition);
                  const maxDistance = centerPosition;
                  const opacity = Math.max(0.2, 1 - (distance / maxDistance) * 0.8);
                  
                  return (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex-shrink-0 w-52 h-20 mx-4 flex items-center justify-center transition-all duration-500 cursor-pointer"
                      style={{ opacity }}
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 w-full h-full flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all duration-300">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className={`object-contain transition-all duration-300 ${
                            partner.name === 'HERING' ? 'max-h-12 max-w-36' : 'max-h-10 max-w-28'
                          } filter brightness-0 invert opacity-90 contrast-125`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PartnersSection = () => {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  // Client logos with the new provided images
  const partners = [
    { name: 'HERING', logo: '/lovable-uploads/43902e38-173c-4443-972d-3508bb019fc8.png' },
    { name: 'EMS', logo: '/lovable-uploads/1a970fd6-baf7-4b71-9a57-dc12e859a375.png' },
    { name: 'LEGRAND', logo: '/lovable-uploads/504b43c1-3a9d-4fa6-99be-bf71d174de88.png' },
    { name: 'COGNA', logo: '/lovable-uploads/ee66fac8-ae04-45ec-be82-6097d7dd55d5.png' },
    { name: 'ACHĒ', logo: '/lovable-uploads/522cea43-2fde-45f7-89d1-d982e9dee4a5.png' },
    { name: 'NATURA&CO', logo: '/lovable-uploads/2297d479-bfa8-46e6-8035-5b475ee4bccd.png' },
    { name: 'JEQUITI', logo: '/lovable-uploads/5b025329-71fc-4701-8319-566e1d2cc76e.png' },
    { name: 'EMBRAER', logo: '/lovable-uploads/e5e13c1d-3ce5-472b-89e6-0b434fd4bf79.png' },
    { name: 'PARTNER 1', logo: '/lovable-uploads/cdaaa3c2-99d2-4768-b24c-525ef004fefa.png' },
    { name: 'PARTNER 2', logo: '/lovable-uploads/c8e82ae8-631b-4310-9884-36f98d8aa8b3.png' },
    { name: 'PARTNER 3', logo: '/lovable-uploads/45f18a3e-3b8d-4e93-adcd-606703504921.png' },
    { name: 'PARTNER 4', logo: '/lovable-uploads/68330096-86f5-4324-bed5-4b1ca5dee086.png' },
    { name: 'PARTNER 5', logo: '/lovable-uploads/0752a9be-6f61-4536-aa89-dc6c72014ce5.png' },
    { name: 'PARTNER 6', logo: '/lovable-uploads/56b298ad-94ca-4837-a424-3f110bdecc55.png' }
  ];

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
                    OUR
                  </span>
                  <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    PARTNERS
                  </span>
                </h2>
                
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-orange-500 mb-4"></div>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  Transforming businesses through strategic partnerships and 
                  innovative solutions.
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
                  animationDuration: `${doubledPartners.length * 2.5}s`
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
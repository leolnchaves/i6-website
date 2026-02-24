
import React, { memo, useMemo, useCallback } from 'react';
import { Mail, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import worldMapImage from '@/assets/images/world-map.png';

const WorldMap = memo(() => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { isVisible, elementRef } = useIntersectionObserver();
  const { isLoaded: imageLoaded } = useImagePreloader(worldMapImage, isVisible);

  const content = useMemo(() => ({
    pt: {
      title: "Nossa Presença Global",
      description: "Clique em cada localização para ver informações detalhadas de contato.",
      headquarters: "Sede",
      brazil: "Brasil",
      hoverTip: "Passe o mouse sobre as localizações para mais informações"
    },
    en: {
      title: "Our Global Presence", 
      description: "Click on each location to see detailed contact information.",
      headquarters: "Headquarters",
      brazil: "Brazil",
      hoverTip: "Hover over locations for more information"
    }
  }), []);

  const text = useMemo(() => content[language], [language]);

  const positions = useMemo(() => ({
    campinas: isMobile ? { top: '68%', left: '35%' } : { top: '68%', left: '32%' }
  }), [isMobile]);

  const locations = useMemo(() => [
    {
      id: 'campinas',
      city: 'Campinas',
      state: 'São Paulo', 
      country: text.brazil,
      flag: '🇧🇷',
      type: text.headquarters,
      unitName: 'infinity6 LATAM',
      position: positions.campinas,
      address: 'Av. Antônio Artioli, 570 - Sala 134 / Prédio A\nCEP 13049-900\nCampinas, SP - Brasil',
      email: 'partner@infinity6.ai'
    }
  ], [text.brazil, text.headquarters, positions.campinas]);

  const handleLocationClick = useCallback((locationId: string) => {
    console.log('Location clicked:', locationId);
  }, []);

  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
          {text.title}
        </h3>
        <p className="text-white/60 mb-6 text-sm sm:text-base">
          {text.description}
        </p>
        
        <TooltipProvider>
          <div ref={elementRef} className="relative w-full h-64 sm:h-80 lg:h-96 bg-white/5 rounded-lg overflow-hidden border border-white/10">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                <div className="text-white/40 text-sm">Loading map...</div>
              </div>
            )}
            
            {isVisible && (
              <img 
                src={worldMapImage}
                alt="World Map"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            )}
            
            {locations.map((location) => (
              <Tooltip key={location.id}>
                <TooltipTrigger asChild>
                  <button
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#F4845F]/50 rounded-lg"
                    style={{ top: location.position.top, left: location.position.left }}
                    onClick={() => handleLocationClick(location.id)}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-2 min-w-[90px] sm:min-w-[110px]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm">{location.flag}</span>
                        <div className="text-left">
                          <div className="font-semibold text-white text-xs leading-tight">{location.city}</div>
                          <div className="text-xs text-white/60 leading-tight">{location.state}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-2.5 h-2.5 text-[#F4845F]" />
                        <span className="text-xs font-medium text-[#F4845F]">{location.type}</span>
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs p-3 sm:p-4 bg-[#0B1224] border border-white/10 shadow-xl">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{location.flag}</span>
                        <div>
                          <h4 className="font-bold text-white text-sm sm:text-base">{location.city}, {location.state}</h4>
                          <p className="text-xs text-white/60">{location.country}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-[#F4845F]" />
                        <span className="text-sm font-medium text-[#F4845F]">{location.type}</span>
                      </div>
                      <p className="text-sm font-semibold text-white mb-3">{location.unitName}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-white/60 space-y-2 pt-2 border-t border-white/10">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5 text-white/40" />
                        <div className="whitespace-pre-line">{location.address}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 flex-shrink-0 text-white/40" />
                        <span className="break-all">{location.email}</span>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        
        <p className="text-sm text-white/40 mt-4 text-center">
          {text.hoverTip}
        </p>
      </CardContent>
    </Card>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;


import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const WorldMap = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Posições responsivas baseadas no tamanho da tela
  const getResponsivePositions = () => {
    if (isMobile) {
      return {
        campinas: { top: '68%', left: '32%' },
        dover: { top: '35%', left: '22%' },
        milan: { top: '30%', left: '53%' }
      };
    }
    return {
      campinas: { top: '65%', left: '35%' },
      dover: { top: '38%', left: '24%' },
      milan: { top: '32%', left: '51%' }
    };
  };

  const positions = getResponsivePositions();

  const locations = [
    {
      id: 'campinas',
      name: 'Campinas, BR',
      type: t('contact.map.headquarters'),
      position: positions.campinas,
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai'
    },
    {
      id: 'dover',
      name: 'Dover, DE',
      type: t('contact.map.branchOffice'),
      position: positions.dover,
      address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai'
    },
    {
      id: 'milan',
      name: 'Milan, IT',
      type: t('contact.map.branchOffice'),
      position: positions.milan,
      address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItaly',
      phone: '+39 02 1234 5678',
      email: 'italia@infinity6.ai'
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t('contact.map.title')}
        </h3>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          {t('contact.map.description')}
        </p>
        
        <TooltipProvider>
          <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src="/lovable-uploads/d9d6ba9c-61ec-4d42-8e89-f0451e01621f.png"
              alt="World Map"
              className="w-full h-full object-contain"
            />
            
            {locations.map((location) => (
              <Tooltip key={location.id}>
                <TooltipTrigger asChild>
                  <button
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-full"
                    style={{
                      top: location.position.top,
                      left: location.position.left,
                    }}
                  >
                    <div className="relative">
                      <MapPin className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-red-500 drop-shadow-lg`} />
                      <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-red-500 rounded-full animate-pulse`}></div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="max-w-xs p-3 sm:p-4 bg-white border shadow-xl"
                >
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{location.name}</h4>
                      <p className="text-xs sm:text-sm text-blue-600">{location.type}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      <div className="whitespace-pre-line mb-2">{location.address}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span className="break-all">{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="break-all">{location.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default WorldMap;

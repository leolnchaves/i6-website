
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, X } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CookieDetailsModal } from './CookieDetailsModal';

const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll, setShowBanner } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-fade-in">
        <Card className="bg-white/95 backdrop-blur-sm border shadow-lg p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                Configurações de Cookies
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Usamos cookies para melhorar sua experiência e analisar o uso do site. 
                Você pode personalizar suas preferências a qualquer momento.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-600 shrink-0 ml-2"
              onClick={() => setShowBanner(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                onClick={acceptAll}
                size="sm"
                className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90"
              >
                Aceitar Todos
              </Button>
              <Button
                onClick={rejectAll}
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
              >
                Apenas Essenciais
              </Button>
            </div>
            
            <Button
              onClick={() => setShowDetails(true)}
              variant="ghost"
              size="sm"
              className="text-xs h-7 text-gray-600 hover:text-gray-800"
            >
              <Settings className="h-3 w-3 mr-1" />
              Personalizar
            </Button>
          </div>
          
          <div className="text-[10px] text-gray-500 pt-1 border-t">
            <p>Em conformidade com LGPD e GDPR</p>
          </div>
        </Card>
      </div>

      <CookieDetailsModal 
        open={showDetails} 
        onOpenChange={setShowDetails}
      />
    </>
  );
};

export default CookieBanner;

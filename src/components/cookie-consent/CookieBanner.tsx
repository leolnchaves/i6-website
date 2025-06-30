
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, Shield, CheckCircle } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const CookieBanner = () => {
  const { showBanner, acceptAll, acceptNecessary, showDetails } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm">
      <Card className="mx-auto max-w-6xl bg-white/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl overflow-hidden">
        <div className="relative">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl"></div>
          
          <div className="relative bg-white/95 m-0.5 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Controle seus Cookies
                  </h3>
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
                  Você pode escolher quais categorias aceitar. Cookies necessários são sempre ativados para garantir 
                  o funcionamento do site.
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Conforme LGPD e GDPR</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex flex-col gap-2 min-w-0">
                <Button
                  onClick={acceptAll}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                >
                  Aceitar Todos
                </Button>
                
                <Button
                  onClick={showDetails}
                  variant="outline"
                  className="border-gray-300 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 whitespace-nowrap"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Personalizar
                </Button>
                
                <Button
                  onClick={acceptNecessary}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300 text-sm whitespace-nowrap"
                >
                  Apenas Necessários
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;

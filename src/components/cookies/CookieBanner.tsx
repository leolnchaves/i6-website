
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { CookieConsent } from '@/types/cookies';

const CookieBanner = () => {
  const { showBanner, consent, saveConsent, setShowBanner } = useCookieConsent();
  const { t } = useLanguage();
  
  // Local state for cookie preferences
  const [preferences, setPreferences] = useState<CookieConsent>(consent);

  if (!showBanner) return null;

  const handleToggleChange = (category: keyof CookieConsent, value: boolean) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleAcceptAll = () => {
    const allAccepted: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(allAccepted);
  };

  const handleSaveSelection = () => {
    saveConsent(preferences);
  };

  const handleRejectAll = () => {
    const onlyEssential: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveConsent(onlyEssential);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-fade-in">
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-1">
              Usamos Cookies
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Nós e terceiros usamos cookies e outras tecnologias de rastreamento para melhorar sua experiência de navegação, análise de sessão, serviços de hospedagem e para entender de onde vêm nossos visitantes.
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
        
        {/* Cookie Categories with Toggles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700">Marketing</span>
            <Switch
              checked={preferences.marketing}
              onCheckedChange={(checked) => handleToggleChange('marketing', checked)}
              className="data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700">Funcional</span>
            <Switch
              checked={preferences.preferences}
              onCheckedChange={(checked) => handleToggleChange('preferences', checked)}
              className="data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700">Essencial</span>
            <Switch
              checked={true}
              disabled={true}
              className="data-[state=checked]:bg-gray-600 opacity-75"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            onClick={handleAcceptAll}
            size="sm"
            className="w-full text-xs h-8 bg-gray-800 hover:bg-gray-700 text-white"
          >
            Aceitar Todos
          </Button>
          
          <Button
            onClick={handleSaveSelection}
            size="sm"
            variant="outline"
            className="w-full text-xs h-8 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Gravar Seleção
          </Button>
          
          <Button
            onClick={handleRejectAll}
            size="sm"
            variant="outline"
            className="w-full text-xs h-8 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Rejeitar Todos
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;

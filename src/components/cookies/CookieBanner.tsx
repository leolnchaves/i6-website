
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
    <div className="fixed bottom-4 right-4 z-50 max-w-xs animate-fade-in">
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg p-3 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <h3 className="font-semibold text-xs text-gray-900 mb-1">
              Cookies
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              Usamos cookies para melhorar sua experiência.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-gray-400 hover:text-gray-600 shrink-0"
            onClick={() => setShowBanner(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Compact Cookie Categories */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700">Marketing</span>
            <Switch
              checked={preferences.marketing}
              onCheckedChange={(checked) => handleToggleChange('marketing', checked)}
              className="scale-75 data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700">Funcional</span>
            <Switch
              checked={preferences.preferences}
              onCheckedChange={(checked) => handleToggleChange('preferences', checked)}
              className="scale-75 data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700">Essencial</span>
            <Switch
              checked={true}
              disabled={true}
              className="scale-75 data-[state=checked]:bg-gray-600 opacity-75"
            />
          </div>
        </div>
        
        {/* Compact Action Buttons */}
        <div className="flex flex-col gap-1 pt-1">
          <Button
            onClick={handleAcceptAll}
            size="sm"
            className="w-full text-xs h-7 bg-gray-800 hover:bg-gray-700 text-white"
          >
            Aceitar Todos
          </Button>
          
          <div className="flex gap-1">
            <Button
              onClick={handleSaveSelection}
              size="sm"
              variant="outline"
              className="flex-1 text-xs h-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Gravar
            </Button>
            
            <Button
              onClick={handleRejectAll}
              size="sm"
              variant="outline"
              className="flex-1 text-xs h-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Rejeitar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;

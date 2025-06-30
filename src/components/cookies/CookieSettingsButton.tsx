
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const CookieSettingsButton = () => {
  const { setShowBanner } = useCookieConsent();

  return (
    <Button
      onClick={() => setShowBanner(true)}
      variant="ghost"
      size="sm"
      className="fixed bottom-4 left-4 z-40 bg-white/80 backdrop-blur-sm border shadow-sm hover:bg-white/90"
    >
      <Settings className="h-4 w-4 mr-2" />
      Cookies
    </Button>
  );
};

export default CookieSettingsButton;

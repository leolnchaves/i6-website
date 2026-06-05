import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const CookieSettingsButton = () => {
  const { setShowBanner, showBanner } = useCookieConsent();

  if (showBanner) return null;

  return (
    <Button
      onClick={() => setShowBanner(true)}
      variant="ghost"
      size="sm"
      className="fixed bottom-4 left-4 z-40 bg-[#0B1224]/80 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-[#0B1224] hover:text-[#F4845F] shadow-lg"
    >
      <Settings className="h-4 w-4 mr-2" />
      Cookies
    </Button>
  );
};

export default CookieSettingsButton;

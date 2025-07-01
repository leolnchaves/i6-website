
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';

const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll, setShowBanner } = useCookieConsent();
  const { t } = useLanguage();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-fade-in">
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-1">
              {t('cookies.banner.title')}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('cookies.banner.description')}
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
          <Button
            onClick={acceptAll}
            size="sm"
            className="w-full text-xs h-8 bg-primary hover:bg-primary/90"
          >
            {t('cookies.banner.acceptAll')}
          </Button>
          
          <Button
            onClick={rejectAll}
            size="sm"
            className="w-full text-xs h-8 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 hover:border-red-300 transition-colors"
          >
            {t('cookies.banner.rejectAll')}
          </Button>
        </div>
        
        <div className="text-[10px] text-gray-500 pt-1 border-t">
          <p>{t('cookies.banner.compliance')}</p>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;

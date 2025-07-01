
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookieDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CookieDetailsModal = ({ open, onOpenChange }: CookieDetailsModalProps) => {
  const { acceptAll, rejectAll } = useCookieConsent();
  const { t } = useLanguage();

  const handleAcceptAll = () => {
    acceptAll();
    onOpenChange(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {t('cookies.banner.title')}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            {t('cookies.banner.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          <Button
            onClick={handleAcceptAll}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            {t('cookies.banner.acceptAll')}
          </Button>
          
          <Button
            onClick={handleRejectAll}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 hover:border-red-300 transition-colors"
          >
            {t('cookies.banner.rejectAll')}
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 mt-4 pt-3 border-t">
          <p>{t('cookies.banner.compliance')}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

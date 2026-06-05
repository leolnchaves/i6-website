import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookieDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CookieDetailsModal = ({ open, onOpenChange }: CookieDetailsModalProps) => {
  const { acceptAdditional, continueEssential, openPreferences } = useCookieConsent();
  const { language } = useLanguage();

  const t = language === 'pt'
    ? {
        title: 'Cookies',
        body: 'Usamos cookies essenciais e de análise anônimos para que o site funcione e medir desempenho. Aceita também cookies adicionais de marketing e preferências?',
        acceptAdditional: 'Aceitar adicionais',
        continueEssential: 'Rejeitar adicionais',
        granular: 'Ajustar preferências',
      }
    : {
        title: 'Cookies',
        body: 'We use essential and anonymous analytics cookies so the site works and we can measure performance. Do you also accept additional marketing and preferences cookies?',
        acceptAdditional: 'Accept additional',
        continueEssential: 'Reject additional',
        granular: 'Adjust preferences',
      };

  const handleAccept = () => {
    acceptAdditional();
    onOpenChange(false);
  };

  const handleEssential = () => {
    continueEssential();
    onOpenChange(false);
  };

  const handleGranular = () => {
    onOpenChange(false);
    openPreferences();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0B1224] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-base font-semibold">{t.title}</DialogTitle>
          <DialogDescription className="text-white/70 text-sm mt-2">
            {t.body}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <Button
            onClick={handleAccept}
            className="w-full bg-[#F4845F] hover:bg-[#F4845F]/90 text-white font-semibold border border-[#F4845F]/50 shadow-[0_0_20px_rgba(244,132,95,0.3)]"
          >
            {t.acceptAdditional}
          </Button>
          <Button
            onClick={handleEssential}
            variant="outline"
            className="w-full border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
          >
            {t.continueEssential}
          </Button>
        </div>

        <div className="text-xs text-white/60 mt-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={handleGranular}
            className="text-[#F4845F] hover:underline"
          >
            {t.granular}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

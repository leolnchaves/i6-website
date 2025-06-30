
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';
import { cookieCategories, CookieConsent } from '@/types/cookies';

interface CookieDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CookieDetailsModal = ({ open, onOpenChange }: CookieDetailsModalProps) => {
  const { consent, saveConsent, updateConsent, acceptAll, rejectAll } = useCookieConsent();
  const { t } = useLanguage();
  const [tempConsent, setTempConsent] = useState<CookieConsent>(consent);

  const handleSave = () => {
    saveConsent(tempConsent);
    onOpenChange(false);
  };

  const handleCategoryChange = (category: keyof CookieConsent, value: boolean) => {
    if (category === 'essential') return;
    setTempConsent(prev => ({
      ...prev,
      [category]: value
    }));
  };

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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('cookies.modal.title')}</DialogTitle>
          <DialogDescription>
            {t('cookies.modal.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {cookieCategories.map((category) => (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label 
                    htmlFor={category.id} 
                    className="text-sm font-medium"
                  >
                    {t(`cookies.categories.${category.id}.name`)}
                  </Label>
                  {category.required && (
                    <Badge variant="secondary" className="text-xs">
                      {t('cookies.modal.required')}
                    </Badge>
                  )}
                </div>
                <Switch
                  id={category.id}
                  checked={tempConsent[category.id]}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                  disabled={category.required}
                />
              </div>
              
              <p className="text-sm text-gray-600">
                {t(`cookies.categories.${category.id}.description`)}
              </p>
              
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-700">{t('cookies.modal.cookiesUsed')}:</p>
                <div className="flex flex-wrap gap-1">
                  {category.cookies.map((cookie) => (
                    <Badge key={cookie} variant="outline" className="text-xs">
                      {cookie}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
            </div>
          ))}

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h4 className="text-sm font-medium">{t('cookies.modal.privacyTitle')}</h4>
            <p className="text-xs text-gray-600">
              {t('cookies.modal.privacyDescription')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleRejectAll} variant="outline" className="flex-1">
              {t('cookies.modal.rejectAll')}
            </Button>
            <Button onClick={handleSave} variant="secondary" className="flex-1">
              {t('cookies.modal.savePreferences')}
            </Button>
            <Button onClick={handleAcceptAll} className="flex-1">
              {t('cookies.modal.acceptAll')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

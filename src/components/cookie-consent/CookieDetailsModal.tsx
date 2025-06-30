import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Cookie, BarChart3, Target, Settings2, Info } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CookiePreferences } from '@/types/cookieConsent';

const CookieDetailsModal = () => {
  const { 
    showDetails, 
    hideDetails, 
    preferences, 
    savePreferences, 
    cookieCategories 
  } = useCookieConsent();

  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(preferences);

  const handleToggle = (category: string, enabled: boolean) => {
    setTempPreferences(prev => ({
      ...prev,
      [category]: enabled,
    }));
  };

  const handleSavePreferences = () => {
    savePreferences({
      ...tempPreferences,
      timestamp: Date.now(),
    });
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'necessary':
        return <Shield className="w-5 h-5 text-green-600" />;
      case 'analytics':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'marketing':
        return <Target className="w-5 h-5 text-purple-600" />;
      case 'preferences':
        return <Settings2 className="w-5 h-5 text-orange-600" />;
      default:
        return <Cookie className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={showDetails} onOpenChange={(open) => !open && hideDetails()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">
                Configurações de Cookies
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Personalize suas preferências de cookies
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Privacy Notice */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">
                  Sua Privacidade é Nossa Prioridade
                </p>
                <p className="text-blue-800 leading-relaxed">
                  Respeitamos sua privacidade e seguimos rigorosamente as diretrizes da LGPD e GDPR. 
                  Seus dados são processados de forma transparente e segura.
                </p>
              </div>
            </div>
          </Card>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {cookieCategories.map((category) => (
              <Card key={category.id} className="p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getCategoryIcon(category.id)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {category.name}
                        </h4>
                        {category.required && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            Obrigatório
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <Switch
                    checked={tempPreferences[category.id as keyof CookiePreferences] as boolean}
                    onCheckedChange={(checked) => handleToggle(category.id, checked)}
                    disabled={category.required}
                    className="flex-shrink-0"
                  />
                </div>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Legal Information */}
          <div className="space-y-3 text-xs text-gray-500">
            <p>
              <strong>LGPD:</strong> Seus dados são processados com base no seu consentimento e nos termos da Lei Geral de Proteção de Dados.
            </p>
            <p>
              <strong>GDPR:</strong> Para usuários da União Europeia, aplicamos os princípios do Regulamento Geral sobre a Proteção de Dados.
            </p>
            <p>
              Você pode alterar suas preferências a qualquer momento ou retirar seu consentimento. 
              Para mais informações, consulte nossa Política de Privacidade.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSavePreferences}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Salvar Preferências
            </Button>
            <Button
              onClick={hideDetails}
              variant="outline"
              className="border-gray-300 hover:border-orange-300 hover:bg-orange-50"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookieDetailsModal;

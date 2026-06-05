import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';

const CookieBanner = () => {
  const { showBanner, acceptAdditional, continueEssential } = useCookieConsent();
  const { language } = useLanguage();
  const localized = useLocalizedPath();

  if (!showBanner) return null;

  const t = language === 'pt'
    ? {
        title: 'Cookies',
        body: 'Usamos cookies essenciais e de análise anônimos para que o site funcione e medir desempenho. Aceita também cookies adicionais de marketing e preferências?',
        privacy: 'Política de Privacidade',
        preferences: 'Preferências',
        continueEssential: 'Continuar sem',
        acceptAdditional: 'Aceitar adicionais',
      }
    : {
        title: 'Cookies',
        body: 'We use essential and anonymous analytics cookies so the site works and we can measure performance. Do you also accept additional marketing and preferences cookies?',
        privacy: 'Privacy Policy',
        preferences: 'Preferences',
        continueEssential: 'Continue without',
        acceptAdditional: 'Accept additional',
      };

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 max-w-md animate-fade-in"
    >
      <div className="rounded-2xl border border-white/10 bg-[#0B1224]/95 backdrop-blur-md shadow-2xl p-5">
        <h3 className="text-white text-sm font-semibold mb-2">{t.title}</h3>
        <p className="text-white/70 text-xs leading-relaxed mb-3">{t.body}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs">
          <Link
            to={localized('/privacy-policy')}
            className="text-[#F4845F] hover:underline"
          >
            {t.privacy}
          </Link>
          <Link
            to={localized('/cookie-settings')}
            className="text-white/60 hover:text-white/90 hover:underline"
          >
            {t.preferences}
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={continueEssential}
            variant="outline"
            size="sm"
            className="flex-1 border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
          >
            {t.continueEssential}
          </Button>
          <Button
            onClick={acceptAdditional}
            size="sm"
            className="flex-1 bg-[#F4845F] hover:bg-[#F4845F]/90 text-white font-semibold border border-[#F4845F]/50 shadow-[0_0_20px_rgba(244,132,95,0.3)]"
          >
            {t.acceptAdditional}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

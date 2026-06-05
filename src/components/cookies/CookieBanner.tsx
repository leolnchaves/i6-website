import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { CookieConsent } from '@/types/cookies';
import { useEffect, useState } from 'react';

const CookieBanner = () => {
  const {
    showBanner,
    bannerExpanded,
    setBannerExpanded,
    acceptAdditional,
    continueEssential,
    acceptAll,
    rejectAll,
    saveConsent,
    consent,
  } = useCookieConsent();
  const { language } = useLanguage();
  const localized = useLocalizedPath();

  const [local, setLocal] = useState<CookieConsent>(consent);
  useEffect(() => setLocal(consent), [consent]);

  if (!showBanner) return null;

  const t = language === 'pt'
    ? {
        title: 'Cookies',
        body: 'Usamos cookies essenciais e de análise anônimos para que o site funcione e medir desempenho. Aceita também cookies adicionais de marketing e preferências?',
        privacy: 'Política de Privacidade',
        preferences: 'Preferências',
        continueEssential: 'Rejeitar adicionais',
        acceptAdditional: 'Aceitar adicionais',
        prefsTitle: 'Preferências de Cookies',
        prefsSubtitle: 'Escolha quais categorias você permite.',
        essential: 'Essenciais',
        essentialDesc: 'Funcionamento do site e métricas anônimas de primeira parte (legítimo interesse). Sempre ativos.',
        analytics: 'Análise (GA4)',
        analyticsDesc: 'Envio anônimo para Google Analytics 4 (terceira parte).',
        marketing: 'Marketing',
        marketingDesc: 'Mensurar campanhas e personalizar conteúdo.',
        prefs: 'Preferências',
        prefsDesc: 'Lembrar idioma, layout e ajustes de interface.',
        save: 'Salvar preferências',
        acceptAll: 'Aceitar tudo',
        onlyEssential: 'Apenas essenciais',
        back: 'Voltar',
      }
    : {
        title: 'Cookies',
        body: 'We use essential and anonymous analytics cookies so the site works and we can measure performance. Do you also accept additional marketing and preferences cookies?',
        privacy: 'Privacy Policy',
        preferences: 'Preferences',
        continueEssential: 'Reject additional',
        acceptAdditional: 'Accept additional',
        prefsTitle: 'Cookie Preferences',
        prefsSubtitle: 'Choose which categories you allow.',
        essential: 'Essential',
        essentialDesc: 'Site functionality and anonymous first-party metrics (legitimate interest). Always on.',
        analytics: 'Analytics (GA4)',
        analyticsDesc: 'Anonymous data sent to Google Analytics 4 (third party).',
        marketing: 'Marketing',
        marketingDesc: 'Measure campaigns and personalize content.',
        prefs: 'Preferences',
        prefsDesc: 'Remember language, layout and UI tweaks.',
        save: 'Save preferences',
        acceptAll: 'Accept all',
        onlyEssential: 'Essential only',
        back: 'Back',
      };

  const rows: Array<{ key: keyof CookieConsent; label: string; desc: string; locked?: boolean }> = [
    { key: 'essential', label: t.essential, desc: t.essentialDesc, locked: true },
    { key: 'analytics', label: t.analytics, desc: t.analyticsDesc },
    { key: 'marketing', label: t.marketing, desc: t.marketingDesc },
    { key: 'preferences', label: t.prefs, desc: t.prefsDesc },
  ];

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 animate-fade-in ${
        bannerExpanded ? 'md:max-w-lg' : 'max-w-md'
      }`}
    >
      <div className="rounded-2xl border border-white/10 bg-[#0B1224]/95 backdrop-blur-md shadow-2xl p-5 max-h-[85vh] overflow-y-auto">
        {!bannerExpanded ? (
          <>
            <h3 className="text-white text-sm font-semibold mb-2">{t.title}</h3>
            <p className="text-white/70 text-xs leading-relaxed mb-3">{t.body}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs">
              <Link to={localized('/privacy-policy')} className="text-[#F4845F] hover:underline">
                {t.privacy}
              </Link>
              <button
                type="button"
                onClick={() => setBannerExpanded(true)}
                className="text-white/60 hover:text-white/90 hover:underline"
              >
                {t.preferences}
              </button>
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
          </>
        ) : (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white text-sm font-semibold">{t.prefsTitle}</h3>
                <p className="text-white/60 text-xs mt-1">{t.prefsSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setBannerExpanded(false)}
                className="text-white/50 hover:text-white text-xs ml-3"
              >
                ← {t.back}
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-semibold mb-0.5">{row.label}</div>
                    <div className="text-white/60 text-[11px] leading-relaxed">{row.desc}</div>
                  </div>
                  <Switch
                    checked={local[row.key]}
                    disabled={row.locked}
                    onCheckedChange={(v) =>
                      !row.locked && setLocal((prev) => ({ ...prev, [row.key]: v }))
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => saveConsent(local)}
                size="sm"
                className="w-full bg-[#F4845F] hover:bg-[#F4845F]/90 text-white font-semibold border border-[#F4845F]/50 shadow-[0_0_20px_rgba(244,132,95,0.3)]"
              >
                {t.save}
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={acceptAll}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {t.acceptAll}
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {t.onlyEssential}
                </Button>
              </div>
              <Link
                to={localized('/privacy-policy')}
                className="text-[#F4845F] hover:underline text-[11px] text-center mt-1"
              >
                {t.privacy}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;

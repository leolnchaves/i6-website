import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePolicyDrawer } from '@/components/policy/PolicyDrawer';
import { CookieConsent } from '@/types/cookies';
import { useEffect, useState } from 'react';

const CookieBanner = () => {
  const {
    showBanner,
    bannerExpanded,
    setBannerExpanded,
    acceptAll,
    rejectAll,
    saveConsent,
    consent,
  } = useCookieConsent();
  const { language } = useLanguage();
  const { openPolicy } = usePolicyDrawer();

  const [local, setLocal] = useState<CookieConsent>(consent);
  useEffect(() => setLocal(consent), [consent]);

  if (!showBanner) return null;

  const t = language === 'pt'
    ? {
        title: 'Cookies e privacidade',
        body: 'Usamos dados anônimos da sua visita para entender como o site é usado e melhorar sua experiência.',
        privacy: 'Política de Privacidade',
        customize: 'Personalizar',
        ok: 'OK',
        onlyEssential: 'Apenas essenciais',
        prefsTitle: 'Preferências de Cookies',
        prefsSubtitle: 'Escolha quais categorias você permite.',
        essential: 'Essenciais',
        essentialDesc: 'Funcionamento do site e métricas anônimas de primeira parte (legítimo interesse).',
        alwaysActive: 'Sempre ativo',
        analytics: 'Análise (GA4)',
        analyticsDesc: 'Envio anônimo para Google Analytics 4 (terceira parte).',
        marketing: 'Marketing',
        marketingDesc: 'Mensurar campanhas e personalizar conteúdo.',
        prefs: 'Preferências',
        prefsDesc: 'Lembrar idioma, layout e ajustes de interface.',
        save: 'Salvar preferências',
        acceptAll: 'Aceitar todos',
        back: 'Voltar',
      }
    : language === 'es'
    ? {
        title: 'Cookies y privacidad',
        body: 'Usamos datos anónimos de tu visita para entender cómo se usa el sitio y mejorar tu experiencia.',
        privacy: 'Política de Privacidad',
        customize: 'Personalizar',
        ok: 'OK',
        onlyEssential: 'Solo esenciales',
        prefsTitle: 'Preferencias de Cookies',
        prefsSubtitle: 'Elige qué categorías permites.',
        essential: 'Esenciales',
        essentialDesc: 'Funcionamiento del sitio y métricas anónimas propias (interés legítimo).',
        alwaysActive: 'Siempre activo',
        analytics: 'Análisis (GA4)',
        analyticsDesc: 'Envío anónimo a Google Analytics 4 (tercero).',
        marketing: 'Marketing',
        marketingDesc: 'Medir campañas y personalizar contenido.',
        prefs: 'Preferencias',
        prefsDesc: 'Recordar idioma, layout y ajustes de interfaz.',
        save: 'Guardar preferencias',
        acceptAll: 'Aceptar todas',
        back: 'Volver',
      }
    : {
        title: 'Cookies and privacy',
        body: 'We use anonymous visit data to understand how the site is used and improve your experience.',
        privacy: 'Privacy Policy',
        customize: 'Customize',
        ok: 'OK',
        onlyEssential: 'Essential only',
        prefsTitle: 'Cookie Preferences',
        prefsSubtitle: 'Choose which categories you allow.',
        essential: 'Essential',
        essentialDesc: 'Site functionality and anonymous first-party metrics (legitimate interest).',
        alwaysActive: 'Always active',
        analytics: 'Analytics (GA4)',
        analyticsDesc: 'Anonymous data sent to Google Analytics 4 (third party).',
        marketing: 'Marketing',
        marketingDesc: 'Measure campaigns and personalize content.',
        prefs: 'Preferences',
        prefsDesc: 'Remember language, layout and UI tweaks.',
        save: 'Save preferences',
        acceptAll: 'Accept all',
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

            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <Button
                onClick={rejectAll}
                variant="outline"
                size="sm"
                className="flex-1 border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
              >
                {t.onlyEssential}
              </Button>
              <Button
                onClick={acceptAll}
                size="sm"
                className="flex-1 bg-[#F4845F] hover:bg-[#F4845F]/90 text-white font-semibold border border-[#F4845F]/50 shadow-[0_0_20px_rgba(244,132,95,0.3)]"
              >
                {t.ok}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px]">
              <button
                type="button"
                onClick={() => setBannerExpanded(true)}
                className="text-white/60 hover:text-white/90 hover:underline"
              >
                {t.customize}
              </button>
              <button type="button" onClick={() => openPolicy('privacy')} className="text-[#F4845F] hover:underline">
                {t.privacy}
              </button>
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
                    <div className="flex items-center gap-2 text-white text-xs font-semibold mb-0.5">
                      {row.label}
                      {row.locked && (
                        <span className="text-[10px] uppercase tracking-wide text-white/50 border border-white/15 rounded-full px-2 py-0.5">
                          {t.alwaysActive}
                        </span>
                      )}
                    </div>
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
              <button
                type="button"
                onClick={() => openPolicy('privacy')}
                className="text-[#F4845F] hover:underline text-[11px] text-center mt-1"
              >
                {t.privacy}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { CookieConsent } from '@/types/cookies';

const CookieSettings = () => {
  const { consent, saveConsent, acceptAll, rejectAll } = useCookieConsent();
  const { language } = useLanguage();
  const localized = useLocalizedPath();

  const [local, setLocal] = useState<CookieConsent>(consent);

  useEffect(() => {
    setLocal(consent);
  }, [consent]);

  const t = language === 'pt'
    ? {
        title: 'Preferências de Cookies',
        subtitle: 'Controle quais categorias de cookies você permite no infinity6.ai',
        essential: 'Essenciais',
        essentialDesc: 'Necessários para o funcionamento do site. Sempre ativos.',
        analytics: 'Análise (anônima)',
        analyticsDesc: 'Métricas anônimas de uso para melhorarmos a experiência. Base legal: legítimo interesse.',
        marketing: 'Marketing',
        marketingDesc: 'Cookies para mensurar campanhas e personalizar conteúdo.',
        preferences: 'Preferências',
        preferencesDesc: 'Lembrar idioma, layout e ajustes de interface.',
        save: 'Salvar preferências',
        acceptAll: 'Aceitar tudo',
        onlyEssential: 'Apenas essenciais',
        backPrivacy: 'Política de Privacidade',
        meta: 'Preferências de Cookies | infinity6',
        metaDesc: 'Gerencie suas preferências de cookies no infinity6.ai',
      }
    : {
        title: 'Cookie Preferences',
        subtitle: 'Choose which cookie categories you allow on infinity6.ai',
        essential: 'Essential',
        essentialDesc: 'Required for the site to work. Always on.',
        analytics: 'Analytics (anonymous)',
        analyticsDesc: 'Anonymous usage metrics so we can improve the experience. Legal basis: legitimate interest.',
        marketing: 'Marketing',
        marketingDesc: 'Cookies to measure campaigns and personalize content.',
        preferences: 'Preferences',
        preferencesDesc: 'Remember language, layout and UI tweaks.',
        save: 'Save preferences',
        acceptAll: 'Accept all',
        onlyEssential: 'Essential only',
        backPrivacy: 'Privacy Policy',
        meta: 'Cookie Preferences | infinity6',
        metaDesc: 'Manage your cookie preferences on infinity6.ai',
      };

  const rows: Array<{ key: keyof CookieConsent; label: string; desc: string; locked?: boolean }> = [
    { key: 'essential', label: t.essential, desc: t.essentialDesc, locked: true },
    { key: 'analytics', label: t.analytics, desc: t.analyticsDesc },
    { key: 'marketing', label: t.marketing, desc: t.marketingDesc },
    { key: 'preferences', label: t.preferences, desc: t.preferencesDesc },
  ];

  return (
    <>
      <Helmet>
        <title>{t.meta}</title>
        <meta name="description" content={t.metaDesc} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t.title}</h1>
        <p className="text-white/70 text-sm sm:text-base mb-10">{t.subtitle}</p>

        <div className="space-y-3 mb-8">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold mb-1">{row.label}</div>
                <div className="text-white/60 text-xs leading-relaxed">{row.desc}</div>
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

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => saveConsent(local)}
            className="flex-1 bg-[#F4845F] hover:bg-[#F4845F]/90 text-white font-semibold border border-[#F4845F]/50 shadow-[0_0_20px_rgba(244,132,95,0.3)]"
          >
            {t.save}
          </Button>
          <Button
            onClick={acceptAll}
            variant="outline"
            className="flex-1 border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
          >
            {t.acceptAll}
          </Button>
          <Button
            onClick={rejectAll}
            variant="outline"
            className="flex-1 border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
          >
            {t.onlyEssential}
          </Button>
        </div>

        <div className="mt-8 text-xs">
          <Link to={localized('/privacy-policy')} className="text-[#F4845F] hover:underline">
            {t.backPrivacy}
          </Link>
        </div>
      </section>
    </>
  );
};

export default CookieSettings;

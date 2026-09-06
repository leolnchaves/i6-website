import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIsMobile } from '@/hooks/use-mobile';
import logoFooter from '@/assets/images/logo-footer.png';
import { useCallback } from 'react';

const FooterNovo = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const localized = useLocalizedPath();
  const isMobile = useIsMobile();

  const handleNav = useCallback(
    (href: string) => {
      navigate(href);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  const desc =
    language === 'pt' ? (
      <>
        Decida <span className="font-bold text-white">antes</span> do mercado.
        <br />
        Transformamos comportamento vivo em crescimento previsível.
      </>
    ) : language === 'es' ? (
      <>
        Decide <span className="font-bold text-white">antes</span> que el mercado.
        <br />
        Convertimos el comportamiento vivo en crecimiento previsible.
      </>
    ) : (
      <>
        Decide <span className="font-bold text-white">before</span> the market.
        <br />
        We turn live behavior into predictable growth.
      </>
    );

  const copyright =
    language === 'pt'
      ? '© 2025 Infinity6.ai. Todos os direitos reservados.'
      : language === 'es'
        ? '© 2025 Infinity6.ai. Todos los derechos reservados.'
        : '© 2025 Infinity6.ai. All rights reserved.';

  const navLinks: { to: string; label: string; external?: boolean }[] = [
    { to: 'https://www.i6decision.ai', label: 'i6 Decision Suite', external: true },
    { to: localized('/our-ai'), label: t('header.solutions.proprietaryAi') },
    { to: localized('/success-stories'), label: t('header.successStories') },
    { to: localized('/contact'), label: t('header.contact') },
  ];

  const partnersLinks: { to: string; label: string; external?: boolean }[] = [
    { to: localized('/i6-builders'), label: t('header.partners.builder') },
    { to: localized('/community'), label: t('header.partners.community') },
    { to: localized('/docs'), label: t('header.partners.docs') },
  ];


  return (
    <footer className="bg-[#0B1224] text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img src={logoFooter} alt="Infinity6" className="h-8 w-auto mb-4" loading="lazy" />
            <p className={`text-white/40 max-w-md whitespace-pre-line mb-6 ${isMobile ? 'text-[11px] leading-tight tracking-tight' : 'text-sm'}`}>{desc}</p>

            <div className="flex gap-4 mb-6">
              <a href="https://www.linkedin.com/company/infinity6" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F4845F] transition-colors">
                <Linkedin size={22} />
              </a>
              <a href="https://www.youtube.com/@infinity6ai" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F4845F] transition-colors">
                <Youtube size={22} />
              </a>
            </div>

            <div className="flex gap-4 text-xs">
              <Link to={localized('/privacy-policy')} onClick={() => handleNav(localized('/privacy-policy'))} className="text-white/30 hover:text-[#F4845F] transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to={localized('/ethics-policy')} onClick={() => handleNav(localized('/ethics-policy'))} className="text-white/30 hover:text-[#F4845F] transition-colors">
                {t('footer.ethics')}
              </Link>
            </div>
            <p className="text-white/30 text-xs mt-3">{copyright}</p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/60 uppercase tracking-wider">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  {l.external ? (
                    <a href={l.to} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} onClick={() => handleNav(l.to)} className="text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Development Partners */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/60 uppercase tracking-wider">
              {t('header.partners')}
            </h3>
            <ul className="space-y-2">
              {partnersLinks.map((l) => (
                <li key={l.to}>
                  {l.external ? (
                    <a href={l.to} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} onClick={() => handleNav(l.to)} className="text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/60 uppercase tracking-wider">{t('footer.contact')}</h3>
            <a href="mailto:decida@infinity6.ai" className="text-white/40 hover:text-[#F4845F] transition-colors text-sm hover:underline">
              decida@infinity6.ai
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterNovo;

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
    language === 'pt'
      ? 'Tecnologia que conecta dados e decisões em tempo real.\nCresça com velocidade, escale com precisão.'
      : 'Technology that connects data and decisions in real time.\nGrow faster, scale smarter.';

  const copyright =
    language === 'pt'
      ? '© 2025 Infinity6.ai. Todos os direitos reservados.'
      : '© 2025 Infinity6.ai. All rights reserved.';

  const navLinks: { to: string; label: string; external?: boolean }[] = [
    { to: localized('/'), label: t('header.home') },
    { to: localized('/solutions'), label: t('header.solutions') },
    { to: localized('/success-stories'), label: t('header.successStories') },
    { to: 'https://huggingface.co/infinity6', label: t('header.community'), external: true },
    { to: localized('/contact'), label: t('header.contact') },
  ];

  return (
    <footer className="bg-[#0B1224] text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
              <a href="https://huggingface.co/infinity6" target="_blank" rel="noopener noreferrer" aria-label="infinity6 on Hugging Face" className="text-white/40 hover:text-[#F4845F] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M12.48 2.27c-.5.77-1.1 1.7-1.73 2.69-.63-.99-1.23-1.92-1.73-2.69-.5.77-1.1 1.7-1.73 2.69-.63-.99-1.23-1.92-1.73-2.69C4.8 4.23 3.78 6.1 3.78 8.1c0 4.55 3.66 8.25 8.17 8.25 4.51 0 8.17-3.7 8.17-8.25 0-2-1.02-3.87-2.58-4.83-.5.77-1.1 1.7-1.73 2.69-.63-.99-1.23-1.92-1.73-2.69-.5.77-1.1 1.7-1.73 2.69-.63-.99-1.23-1.92-1.73-2.69-.5.77-1.1 1.7-1.73 2.69z" />
                </svg>
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

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/60 uppercase tracking-wider">{t('footer.contact')}</h3>
            <a href="mailto:movimento@infinity6.ai" className="text-white/40 hover:text-[#F4845F] transition-colors text-sm hover:underline">
              movimento@infinity6.ai
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterNovo;

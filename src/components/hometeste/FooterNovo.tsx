import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIsMobile } from '@/hooks/use-mobile';
import logoFooter from '@/assets/images/logo-footer.png';
import { useCallback } from 'react';
import { SUITE_URL } from '@/components/home-v3/product/suiteContent';

type SocialIconProps = { size?: number };

const TikTokIcon = ({ size = 22 }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const HuggingFaceIcon = ({ size = 22 }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624" />
  </svg>
);



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
    { to: SUITE_URL, label: 'i6 Decision Suite', external: true },
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
              <span className="text-white/40 hover:text-[#F4845F] transition-colors" aria-hidden="true">
                <Instagram size={22} />
              </span>
              <span className="text-white/40 hover:text-[#F4845F] transition-colors" aria-hidden="true">
                <TikTokIcon size={22} />
              </span>
              <a href="https://huggingface.co/infinity6" target="_blank" rel="noopener noreferrer" aria-label="Hugging Face" className="text-white/40 hover:text-[#F4845F] transition-colors">
                <HuggingFaceIcon size={22} />
              </a>
            </div>

            <div className="flex gap-4 text-xs">
              <button type="button" onClick={() => openPolicy('privacy')} className="text-white/30 hover:text-[#F4845F] transition-colors">
                {t('footer.privacy')}
              </button>
              <button type="button" onClick={() => openPolicy('ethics')} className="text-white/30 hover:text-[#F4845F] transition-colors">
                {t('footer.ethics')}
              </button>
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
                    <a href={l.to} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
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
                    <a href={l.to} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
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
            <div className="flex flex-col gap-2">
              <Link to={localized('/contact')} onClick={() => handleNav(localized('/contact'))} className="text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                {t('footer.faleConosco')}
              </Link>
              <a href="mailto:decida@infinity6.ai" className="text-white/40 hover:text-[#F4845F] transition-colors text-sm hover:underline">
                decida@infinity6.ai
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterNovo;

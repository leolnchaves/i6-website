import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DirectContactStrip = memo(() => {
  const { language } = useLanguage();

  const label = language === 'pt' ? 'Já nos conhece?' : 'Already know us?';
  const email = 'performance@infinity6.ai';
  const aria = language === 'pt'
    ? `Enviar e-mail para ${email}`
    : `Send email to ${email}`;

  return (
    <section className="pt-2 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-white/55">
          <span className="mr-2">{label}</span>
          <a
            href={`mailto:${email}`}
            aria-label={aria}
            className="text-white/75 hover:text-[#F4845F] underline underline-offset-4 decoration-white/20 hover:decoration-[#F4845F] transition-colors"
          >
            {email}
          </a>
        </p>
      </div>
    </section>
  );
});

DirectContactStrip.displayName = 'DirectContactStrip';

export default DirectContactStrip;

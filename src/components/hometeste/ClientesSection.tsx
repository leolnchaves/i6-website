import { usePartnersContent } from '@/hooks/usePartnersContent';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientesSection = () => {
  const { partners, loading } = usePartnersContent();
  const { language } = useLanguage();

  const title = language === 'pt'
   ? 'Líderes que transformam antecipação em vantagem'
   : 'Leaders who turn anticipation into advantage';

  if (loading || partners.length === 0) return null;

  const renderGroup = (keyPrefix: string) => (
    <div className="flex items-center gap-20 shrink-0" aria-hidden={keyPrefix === 'b' ? true : undefined}>
      {partners.map((p, i) => (
        <img
          key={`${keyPrefix}-${p.name}-${i}`}
          src={`${import.meta.env.BASE_URL}${p.logo.startsWith('/') ? p.logo.slice(1) : p.logo}`}
          alt={p.name}
          className="h-8 sm:h-10 w-auto max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity shrink-0"
          loading="lazy"
        />
      ))}
    </div>
  );

  return (
    <section className="py-10 md:py-14 bg-slate-50">
      <div className="container mx-auto px-6 mb-10">
        <p className="text-center text-sm uppercase tracking-widest text-slate-500">
          {title}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        <div className="flex items-center gap-20 w-max animate-marquee motion-safe:animate-marquee" style={{ animationDuration: '35s' }}>
          {renderGroup('a')}
          {renderGroup('b')}
        </div>
      </div>
    </section>
  );
};

export default ClientesSection;

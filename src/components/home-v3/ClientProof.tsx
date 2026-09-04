import { usePartnersContent } from '@/hooks/usePartnersContent';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientProof = () => {
  const { partners, loading } = usePartnersContent();
  const { language } = useLanguage();

  const title =
    language === 'pt'
      ? 'Líderes que transformam antecipação em vantagem'
      : language === 'es'
        ? 'Líderes que convierten la anticipación en ventaja'
        : 'Leaders who turn anticipation into advantage';

  if (loading || partners.length === 0) return null;

  const renderGroup = (keyPrefix: string) => (
    <div className="flex items-center gap-16 shrink-0" aria-hidden={keyPrefix === 'b' ? true : undefined}>
      {partners.map((p, i) => (
        <img
          key={`${keyPrefix}-${p.name}-${i}`}
          src={`${import.meta.env.BASE_URL}${p.logo.startsWith('/') ? p.logo.slice(1) : p.logo}`}
          alt={p.name}
          className="h-7 sm:h-9 w-auto max-w-[120px] object-contain opacity-45 hover:opacity-90 transition-opacity shrink-0"
          loading="lazy"
        />
      ))}
    </div>
  );

  return (
    <section className="py-12 border-y border-border bg-secondary/40">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-8 px-6">
        {title}
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10" />
        <div
          className="flex items-center gap-16 w-max animate-marquee"
          style={{ animationDuration: '38s' }}
        >
          {renderGroup('a')}
          {renderGroup('b')}
        </div>
      </div>
    </section>
  );
};

export default ClientProof;

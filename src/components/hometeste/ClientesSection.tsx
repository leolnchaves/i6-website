import { usePartnersContent } from '@/hooks/usePartnersContent';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientesSection = () => {
  const { partners, loading } = usePartnersContent();
  const { language } = useLanguage();

  const title = language === 'pt'
    ? 'Empresas que já se movimentam com a gente'
    : 'Companies already moving with us';

  if (loading || partners.length === 0) return null;

  // duplicate for seamless marquee
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 md:py-20 bg-[#0B1224]">
      <div className="container mx-auto px-6 mb-10">
        <p className="text-center text-sm uppercase tracking-widest text-white/40">
          {title}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B1224] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B1224] to-transparent z-10" />

        <div className="flex items-center gap-16 animate-marquee motion-safe:animate-marquee" style={{ animationDuration: '35s' }}>
          {doubled.map((p, i) => (
            <img
              key={`${p.name}-${i}`}
              src={`${import.meta.env.BASE_URL}${p.logo.startsWith('/') ? p.logo.slice(1) : p.logo}`}
              alt={p.name}
              className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-90 transition-opacity shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientesSection;

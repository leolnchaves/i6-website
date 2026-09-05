import { MapPin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { contactCopy, CONTACT_EMAIL } from '@/data/contact/content';

/**
 * Presença da infinity6 em desenho próprio: ondas suaves, anéis difusos
 * e um ponto pulsante na sede. Os traços de expansão são puramente
 * decorativos — não apontam para nenhum país ou região real.
 */
const ContactMap = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, contactCopy).map;

  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold leading-[1.14] text-foreground md:text-[2.4rem]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              {copy.description}
            </p>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                {copy.hqLabel}
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {copy.city}, {copy.region} — {copy.country}
              </p>
              <p className="mt-2 flex items-start gap-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                {copy.address}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-foreground underline decoration-primary/40 decoration-1 underline-offset-4 transition-colors hover:text-primary"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Mapa-múndi real, recolorido pelos tokens do tema */}
          <div className="sand-card overflow-hidden p-6 sm:p-8">
            <div
              role="img"
              aria-label={copy.title}
              className="relative w-full"
              style={{ aspectRatio: '1280 / 640' }}
            >
              {/* Continentes */}
              <div className="absolute inset-0 bg-foreground/[0.13]" style={maskStyle} />
              {/* Realce da América do Sul */}
              <div
                className="absolute inset-0 bg-primary/25"
                style={{ ...maskStyle, clipPath: 'inset(48% 66% 0% 17%)' }}
              />

              {/* Marcador de Campinas */}
              <div
                className="absolute"
                style={{ left: `${CAMPINAS.x}%`, top: `${CAMPINAS.y}%` }}
              >
                <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                  <span className="block h-16 w-16 rounded-full bg-primary/10 motion-safe:animate-pulse" />
                </span>
                <span className="absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40" />
                <span className="absolute left-0 top-0 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/20" />
                <span className="absolute left-4 top-0 -translate-y-1/2 whitespace-nowrap">
                  <span className="block text-sm font-semibold leading-tight text-foreground">
                    {copy.city}
                  </span>
                  <span className="block text-xs leading-tight text-muted-foreground">
                    {copy.country}
                  </span>
                </span>
              </div>

              <p className="absolute bottom-0 left-0 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {copy.nextLabel}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMap;

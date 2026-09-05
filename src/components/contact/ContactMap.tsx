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

          {/* Composição abstrata */}
          <div className="sand-card overflow-hidden p-6 sm:p-8">
            <svg
              viewBox="0 0 640 400"
              role="img"
              aria-label={copy.title}
              className="h-auto w-full"
            >
              <defs>
                <radialGradient id="cm-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cm-wave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--border))" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Ondas suaves de fundo */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path
                  key={i}
                  d={`M-20 ${120 + i * 34} C 130 ${74 + i * 34}, 240 ${172 + i * 34}, 350 ${132 + i * 34} S 540 ${70 + i * 34}, 660 ${118 + i * 34}`}
                  fill="none"
                  stroke="url(#cm-wave)"
                  strokeWidth={i === 3 ? 1.4 : 1}
                  opacity={i === 3 ? 0.9 : 0.45}
                />
              ))}

              {/* Halo e anéis difusos ao redor da sede */}
              <circle cx="330" cy="234" r="150" fill="url(#cm-glow)" />
              {[46, 84, 122].map((r, i) => (
                <circle
                  key={r}
                  cx="330"
                  cy="234"
                  r={r}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeOpacity={0.26 - i * 0.07}
                  strokeWidth="1"
                />
              ))}

              {/* Traços decorativos de expansão: simétricos, sem direção geográfica */}
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 330 + Math.cos(rad) * 52;
                const y1 = 234 + Math.sin(rad) * 52;
                const x2 = 330 + Math.cos(rad) * 118;
                const y2 = 234 + Math.sin(rad) * 118;
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(var(--primary))"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Ponto da sede */}
              <circle cx="330" cy="234" r="16" fill="hsl(var(--primary))" opacity="0.16">
                <animate attributeName="r" values="16;26;16" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.18;0.02;0.18" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="234" r="7" fill="hsl(var(--primary))" />
              <circle cx="330" cy="234" r="13" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1" />

              <text
                x="356"
                y="230"
                style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, fill: 'hsl(var(--foreground))' }}
              >
                {copy.city}
              </text>
              <text
                x="356"
                y="248"
                style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              >
                {copy.country}
              </text>

              <text
                x="24"
                y="372"
                style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.16em', fill: 'hsl(var(--muted-foreground))' }}
              >
                {copy.nextLabel.toUpperCase()}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;

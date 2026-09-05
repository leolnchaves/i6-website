import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { contactCopy } from '@/data/contact/content';

/**
 * Triagem: três atalhos para quem já sabe o destino, e uma nota que
 * devolve o leitor ao formulário. Texto simples, sem cartões.
 */
const ContactTriage = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const copy = pickLang(language, contactCopy).triage;

  return (
    <nav aria-label={copy.title} className="mt-10 border-t border-border pt-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {copy.title}
      </p>

      <ul className="mt-4 space-y-2">
        {copy.links.map((link) => (
          <li key={link.label}>
            <Link
              to={localized(link.to)}
              className="group inline-flex items-center gap-2 text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm text-muted-foreground">{copy.footnote}</p>
    </nav>
  );
};

export default ContactTriage;

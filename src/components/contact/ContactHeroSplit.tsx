import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactForm from '@/components/contact/ContactForm';
import ContactTriage from '@/components/contact/ContactTriage';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { contactCopy, CONTACT_EMAIL, CONTACT_INTENTS } from '@/data/contact/content';

/**
 * Abertura de /contact: headline editorial + triagem à esquerda,
 * cartão do formulário à direita (painel navy, para o formulário
 * existente permanecer legível sem alteração de estilo interno).
 */
const ContactHeroSplit = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, contactCopy).hero;
  const [before, after] = copy.title.split(copy.highlight);

  // Atalhos de pré-preenchimento via ?intent=<id> (hoje: "security", vindo do
  // CTA de Governança em /our-ai). Intent desconhecido é ignorado.
  const [searchParams] = useSearchParams();
  const intentId = searchParams.get('intent') ?? '';
  const intent = Object.prototype.hasOwnProperty.call(CONTACT_INTENTS, intentId)
    ? CONTACT_INTENTS[intentId as keyof typeof CONTACT_INTENTS]
    : undefined;
  // Objeto memoizado: sem referência estável, cada render recriaria as props e
  // poderia reaplicar o prefill por cima do que o usuário já digitou.
  const intentProps = useMemo(() => {
    if (!intent) return {};
    return {
      prefill: { subject: intent.subject, message: pickLang(language, intent.message) },
      // Campo extra no payload do lead — presente só quando veio de um atalho.
      extraFields: { intent: intentId },
    };
  }, [intent, intentId, language]);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pb-24">
      <div className="sand-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Coluna editorial */}
          <div className="lg:pt-6">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="text-3xl font-bold leading-[1.1] text-foreground md:text-[3rem] [text-wrap:balance]">
              {before}
              <span className="text-primary">{copy.highlight}</span>
              {after}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {copy.sub}
            </p>

            <ContactTriage />
          </div>

          {/* Formulário */}
          <div id="contact-form" className="scroll-mt-28">
            <ContactForm {...intentProps} />

            <p className="mt-4 text-sm text-muted-foreground">
              {copy.directPrefix}{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-foreground underline decoration-primary/40 decoration-1 underline-offset-4 transition-colors hover:text-primary"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSplit;

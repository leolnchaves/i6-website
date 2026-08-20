import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/contact/ContactForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOutreachToken } from '@/hooks/useOutreachToken';

const SUBJECT_VALUES = ['general', 'demo', 'partnership', 'support'] as const;

/** Mapeia o assunto vindo do HUB (rótulo livre) para uma das opções fixas do form. */
const normalizeSubject = (raw?: string | null): string => {
  if (!raw) return '';
  const k = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if ((SUBJECT_VALUES as readonly string[]).includes(k)) return k;
  if (k.includes('parceria') || k.includes('partner')) return 'partnership';
  if (k.includes('demo')) return 'demo';
  if (k.includes('suporte') || k.includes('support')) return 'support';
  if (k.includes('geral') || k.includes('general') || k.includes('consulta')) return 'general';
  return '';
};

const COPY = {
  pt: {
    kicker: 'infinity6',
    title: 'Vamos transformar seus dados em decisões',
    subtitle: 'Conte seu objetivo ou desafio estratégico — respondemos rápido.',
    redirecting: 'Redirecionando...',
  },
  en: {
    kicker: 'infinity6',
    title: "Let's turn your data into decisions",
    subtitle: 'Tell us your strategic goal or challenge — we reply fast.',
    redirecting: 'Redirecting...',
  },
} as const;

const GoLanding = () => {
  const { token } = useParams<{ token: string }>();
  const { language } = useLanguage();
  const { status, sendId, destinationUrl, landing } = useOutreachToken(token);
  const copy = COPY[language];

  useEffect(() => {
    if (status === 'redirect' && destinationUrl) {
      window.location.replace(destinationUrl);
    }
  }, [status, destinationUrl]);

  const defaultValues = useMemo(
    () => ({
      name: landing?.name || '',
      email: landing?.email || '',
      company: '',
      subject: normalizeSubject(landing?.subject),
      message: landing?.message || '',
    }),
    [landing],
  );

  const extraFields = useMemo(
    () => (sendId ? { outreach_send_id: sendId } : undefined),
    [sendId],
  );

  const head = (
    <Helmet>
      <title>{landing?.title || copy.title} | infinity6</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );

  if (status === 'loading' || status === 'redirect') {
    return (
      <>
        {head}
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <LoadingSpinner />
          {status === 'redirect' && <p className="text-white/50 text-sm">{copy.redirecting}</p>}
        </div>
      </>
    );
  }

  return (
    <>
      {head}
      <section className="pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#F4845F] text-sm tracking-[0.2em] uppercase mb-3">{copy.kicker}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {landing?.title || copy.title}
            </h1>
            <p className="mt-3 text-base text-white/60">
              {landing?.subtitle || copy.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ContactForm
              key={sendId || 'generic'}
              defaultValues={defaultValues}
              leadSource="go-landing"
              extraFields={extraFields}
              hideCompany
              compact
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default GoLanding;

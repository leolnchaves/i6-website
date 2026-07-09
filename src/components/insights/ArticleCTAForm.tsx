import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';

import { APPS_SCRIPT_URL, SHARED_FORM_TOKEN, HONEYPOT_FIELD } from '@/lib/leadFormConfig';
import { getLeadContext, getLeadContextFields, formatLeadContextForMessage, trackEvent } from '@/lib/tracker';
import { TRACKER_EVENTS } from '@/lib/tracker-events';

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  [HONEYPOT_FIELD]: z.string().max(0).optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

interface ArticleCTAFormProps {
  kind: 'insight' | 'research';
  title: string;
  slug: string;
  id?: string;
  ctaText: string;
}

/**
 * End-of-article lead capture (name + email) for NON-gated i6 Articles and
 * i6 Research. Reuses the same Apps Script endpoint and tracking pipeline
 * as LeadGateForm, but presented as an inline CTA rather than a content lock.
 */
const ArticleCTAForm = ({ kind, title, slug, id, ctaText }: ArticleCTAFormProps) => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const t = language === 'pt'
    ? {
        name: 'Nome',
        email: 'Email',
        cta: 'Enviar',
        sending: 'Enviando...',
        successTitle: 'Tudo certo',
        successMsg: 'Obrigado! Recebemos seu contato e em breve retornamos.',
        successHelp: 'Qualquer dúvida, ',
        successHelpLink: 'entre em contato',
        successHelpTail: '.',
        error: 'Não foi possível enviar. Tente novamente',
        privacy: 'Ao enviar, você concorda com nossa',
        privacyLink: 'Política de Privacidade',
        invalidName: 'Informe seu nome',
        invalidEmail: 'Email inválido',
      }
    : {
        name: 'Name',
        email: 'Email',
        cta: 'Send',
        sending: 'Sending...',
        successTitle: 'All set',
        successMsg: "Thanks! We got your message and will get back to you shortly.",
        successHelp: 'Any questions, ',
        successHelpLink: 'get in touch',
        successHelpTail: '.',
        error: 'Could not submit. Please try again',
        privacy: 'By submitting, you agree to our',
        privacyLink: 'Privacy Policy',
        invalidName: 'Enter your name',
        invalidEmail: 'Invalid email',
      };

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (data[HONEYPOT_FIELD]) {
        setSubmitted(true);
        return;
      }
      setSubmitting(true);

      try {
        const basePath = kind === 'research' ? 'i6-intelligence' : 'insights';
        const url = `https://infinity6.ai/${language}/${basePath}/${slug}`;
        const ctx = getLeadContext();
        const tag = kind === 'research' ? '[Lead Research CTA]' : '[Lead Insights CTA]';
        const idLabel = kind === 'research' ? 'Research' : 'Insight';
        const origin = kind === 'research' ? 'article-cta-research' : 'article-cta-insights';
        const message = [
          tag,
          `${idLabel}: ${title}`,
          `Slug: ${slug}`,
          `ID: ${id || '-'}`,
          `URL: ${url}`,
          `Idioma: ${language}`,
          `Origem: ${origin}`,
          '',
          formatLeadContextForMessage(ctx),
        ].join('\n');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', title);
        formData.append('message', message);
        formData.append('subscription', `${kind}:${slug}`);
        formData.append('insight_id', id || '');
        formData.append('token', SHARED_FORM_TOKEN);
        Object.entries(getLeadContextFields()).forEach(([k, v]) => formData.append(k, v));

        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        trackEvent(
          kind === 'research' ? TRACKER_EVENTS.RESEARCH_CTA_SUBMITTED : TRACKER_EVENTS.INSIGHT_CTA_SUBMITTED,
          {
            [`${kind}_id`]: id,
            [`${kind}_slug`]: slug,
            language,
          },
        );

        setSubmitted(true);
      } catch (err) {
        console.error('ArticleCTAForm submit error:', err);
        toast({ title: t.error, variant: 'destructive' });
      } finally {
        setSubmitting(false);
      }
    },
    [id, slug, title, language, kind, t.error, toast],
  );

  if (submitted) {
    return (
      <div className="my-10 p-8 md:p-10 rounded-2xl border border-[#F4845F]/30 bg-gradient-to-br from-white/5 to-[#F4845F]/5 backdrop-blur-sm text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F4845F]/15 border border-[#F4845F]/30 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#F4845F]" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2">{t.successTitle}</h3>
        <p className="text-white/70 max-w-md mx-auto">{t.successMsg}</p>
        <p className="text-white/70 max-w-md mx-auto mt-4">
          {t.successHelp}
          <Link to={localized('/contact')} className="text-[#F4845F] hover:underline">
            {t.successHelpLink}
          </Link>
          {t.successHelpTail}
        </p>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 md:p-10 rounded-2xl border border-[#F4845F]/30 bg-gradient-to-br from-white/5 to-[#F4845F]/5 backdrop-blur-sm">
      <div className="mb-6 text-white text-lg md:text-xl leading-relaxed [&_strong]:text-[#F4845F] [&_p]:mb-2 [&_p:last-child]:mb-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          }}
        >
          {ctaText}
        </ReactMarkdown>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Honeypot */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="cta-website">Website</label>
          <input
            id="cta-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register(HONEYPOT_FIELD as keyof FormData)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cta-name" className="text-white/80">{t.name}</Label>
            <Input
              id="cta-name"
              {...register('name')}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#F4845F]"
              disabled={submitting}
            />
            {errors.name && <p className="text-xs text-red-400">{t.invalidName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-email" className="text-white/80">{t.email}</Label>
            <Input
              id="cta-email"
              type="email"
              {...register('email')}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#F4845F]"
              disabled={submitting}
            />
            {errors.email && <p className="text-xs text-red-400">{t.invalidEmail}</p>}
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#F4845F] hover:bg-[#F4845F]/90 text-white font-semibold border border-[#F4845F]/50 shadow-[0_0_20px_rgba(244,132,95,0.3)] hover:shadow-[0_0_30px_rgba(244,132,95,0.5)] transition-all"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> {t.sending}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Send className="w-4 h-4" /> {t.cta}
            </span>
          )}
        </Button>

        <p className="text-xs text-white/50 text-center">
          {t.privacy}{' '}
          <Link to={localized('/privacy-policy')} className="text-[#F4845F] hover:underline">
            {t.privacyLink}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ArticleCTAForm;

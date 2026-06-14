import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export type LeadGateKind = 'insight' | 'research';

interface LeadGateFormProps {
  /**
   * - 'insight'  → /insights/<slug>; after submit shows "we emailed it" screen.
   * - 'research' → /i6-intelligence/<slug>; after submit calls `onUnlock`
   *                so the article body is revealed inline. PDF is still
   *                sent by i6Hub via email and lead is registered.
   */
  kind: LeadGateKind;
  title: string;
  slug: string;
  id?: string;
  pdfUrl?: string | null;
  onUnlock?: () => void;
}

const LeadGateForm = ({ kind, title, slug, id, pdfUrl, onUnlock }: LeadGateFormProps) => {
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
        title: 'Conteúdo exclusivo',
        subtitle: 'Para receber este conteúdo, deixe seu nome e email',
        name: 'Nome',
        email: 'Email',
        cta: 'Receber por email',
        sending: 'Enviando...',
        successTitle: 'Tudo certo',
        successMsgBefore: 'Obrigado! Já estamos enviando o material para o seu email. Ele deve chegar em alguns minutos — se não aparecer na caixa de entrada, dá uma olhadinha na pasta de ',
        successMsgStrong: 'SPAM',
        successMsgAfter: '.',
        successHelp: 'Qualquer problema, ',
        successHelpLink: 'entre em contato',
        successHelpTail: ' que respondemos o mais rápido possível.',
        error: 'Não foi possível enviar. Tente novamente',
        privacy: 'Ao enviar, você concorda com nossa',
        privacyLink: 'Política de Privacidade',
        invalidName: 'Informe seu nome',
        invalidEmail: 'Email inválido',
      }
    : {
        title: 'Exclusive content',
        subtitle: 'To receive this content, leave your name and email',
        name: 'Name',
        email: 'Email',
        cta: 'Receive by email',
        sending: 'Sending...',
        successTitle: 'All set',
        successMsgBefore: "Thanks! We're sending the material to your inbox right now. It should arrive in a few minutes — if you don't see it, please check your ",
        successMsgStrong: 'Spam',
        successMsgAfter: ' folder.',
        successHelp: 'Any issues, ',
        successHelpLink: 'get in touch',
        successHelpTail: " and we'll reply as soon as possible.",
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
        const tag = kind === 'research' ? '[Lead Research]' : '[Lead Insights]';
        const idLabel = kind === 'research' ? 'Research' : 'Insight';
        const origin = kind === 'research' ? 'lead-gate-research' : 'lead-gate-insights';
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
        // Anexa todos os campos de tracking planos (anonymous_id, session_id,
        // first/last touch, journey, language, user_agent, etc.)
        Object.entries(getLeadContextFields()).forEach(([k, v]) => formData.append(k, v));

        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        if (kind === 'research') {
          trackEvent(TRACKER_EVENTS.RESEARCH_UNLOCKED, {
            research_id: id,
            research_slug: slug,
            language,
          });
        } else {
          trackEvent(TRACKER_EVENTS.INSIGHT_DOWNLOAD_COMPLETED, {
            insight_id: id,
            insight_slug: slug,
            language,
          });
        }

        if (kind === 'research' && onUnlock) {
          try {
            localStorage.setItem(`i6_unlocked_research:${slug}:${language}`, '1');
          } catch {
            /* localStorage unavailable */
          }
          onUnlock();
          return;
        }

        setSubmitted(true);
      } catch (err) {
        console.error('LeadGateForm submit error:', err);
        toast({ title: t.error, variant: 'destructive' });
      } finally {
        setSubmitting(false);
      }
    },
    [id, slug, title, language, pdfUrl, kind, onUnlock, t.error, toast],
  );


  if (submitted) {
    return (
      <div className="my-10 p-8 md:p-10 rounded-2xl border border-[#F4845F]/30 bg-gradient-to-br from-white/5 to-[#F4845F]/5 backdrop-blur-sm text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F4845F]/15 border border-[#F4845F]/30 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#F4845F]" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">{t.successTitle}</h2>
        <p className="text-white/70 max-w-md mx-auto">
          {t.successMsgBefore}
          <strong className="text-white">{t.successMsgStrong}</strong>
          {t.successMsgAfter}
        </p>
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
    <div className="my-10 p-8 md:p-10 rounded-2xl border border-[#F4845F]/30 bg-gradient-to-br from-white/5 to-[#F4845F]/5 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-[#F4845F]/15 border border-[#F4845F]/30 flex items-center justify-center">
          <Lock className="w-4 h-4 text-[#F4845F]" />
        </div>
        <h2 className="text-2xl font-semibold text-white">{t.title}</h2>
      </div>
      <p className="text-white/70 mb-6">{t.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <input type="hidden" name="insight_id" value={id ?? ''} readOnly />

        {/* Honeypot: hidden from humans (CSS + aria), bots fill it */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="lead-website">Website</label>
          <input
            id="lead-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register(HONEYPOT_FIELD as keyof FormData)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-name" className="text-white/80">{t.name}</Label>
          <Input
            id="lead-name"
            {...register('name')}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#F4845F]"
            disabled={submitting}
          />
          {errors.name && <p className="text-xs text-red-400">{t.invalidName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-email" className="text-white/80">{t.email}</Label>
          <Input
            id="lead-email"
            type="email"
            {...register('email')}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#F4845F]"
            disabled={submitting}
          />
          {errors.email && <p className="text-xs text-red-400">{t.invalidEmail}</p>}
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
            t.cta
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

export default LeadGateForm;

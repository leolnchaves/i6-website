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


const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  [HONEYPOT_FIELD]: z.string().max(0).optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

interface LeadGateFormProps {
  insightTitle: string;
  insightSlug: string;
  insightId?: string;
  pdfUrl?: string;
}

const LeadGateForm = ({ insightTitle, insightSlug, insightId, pdfUrl }: LeadGateFormProps) => {
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
        successTitle: 'Pedido recebido',
        successMsg: 'Recebemos seu pedido. Em instantes você receberá o material no email informado',
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
        successTitle: 'Request received',
        successMsg: "We received your request. You'll receive the material at the provided email shortly",
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
        const url = `https://infinity6.ai/${language}/insights/${insightSlug}`;
        const message = [
          '[Lead Insights]',
          `Insight: ${insightTitle}`,
          `Slug: ${insightSlug}`,
          `ID: ${insightId || '-'}`,
          `URL: ${url}`,
          `Idioma: ${language}`,
          `PDF: ${pdfUrl || '-'}`,
          'Origem: lead-gate-insights',
        ].join('\n');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', insightTitle);
        formData.append('message', message);
        formData.append('subscription', `insight:${insightSlug}`);
        formData.append('insight_id', insightId || '');
        formData.append('token', SHARED_FORM_TOKEN);

        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        setSubmitted(true);
      } catch (err) {
        console.error('LeadGateForm submit error:', err);
        toast({ title: t.error, variant: 'destructive' });
      } finally {
        setSubmitting(false);
      }
    },
    [insightId, insightSlug, insightTitle, language, pdfUrl, t.error, toast],
  );


  if (submitted) {
    return (
      <div className="my-10 p-8 md:p-10 rounded-2xl border border-[#F4845F]/30 bg-gradient-to-br from-white/5 to-[#F4845F]/5 backdrop-blur-sm text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F4845F]/15 border border-[#F4845F]/30 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#F4845F]" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">{t.successTitle}</h2>
        <p className="text-white/70 max-w-md mx-auto">{t.successMsg}</p>
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" name="insight_id" value={insightId ?? ''} readOnly />

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

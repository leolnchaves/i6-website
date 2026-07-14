import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, Send } from 'lucide-react';
import { APPS_SCRIPT_URL, SHARED_FORM_TOKEN, HONEYPOT_FIELD } from '@/lib/leadFormConfig';
import { getLeadContext, getLeadContextFields, formatLeadContextForMessage, trackEvent } from '@/lib/tracker';
import { TRACKER_EVENTS } from '@/lib/tracker-events';
import type { KioskLang, QuizContent } from '@/data/kiosk/config';

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  [HONEYPOT_FIELD]: z.string().max(0).optional().or(z.literal('')),
});
type FormData = z.infer<typeof schema>;

interface Props {
  lang: KioskLang;
  content: QuizContent;
  solutionId: string;
  solutionTitle: string;
  ebookTitle: string;
}

const EbookCTA = ({ lang, content, solutionId, solutionTitle, ebookTitle }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const t = content.ebook;

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (data[HONEYPOT_FIELD]) {
        setSubmitted(true);
        return;
      }
      setSubmitting(true);
      setError(false);
      try {
        const ctx = getLeadContext();
        const message = [
          '[Lead Kiosk eBook]',
          `Solução: ${solutionTitle}`,
          `SolutionId: ${solutionId}`,
          `eBook: ${ebookTitle}`,
          `Idioma: ${lang}`,
          `Origem: kiosk`,
          '',
          formatLeadContextForMessage(ctx),
        ].join('\n');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', ebookTitle);
        formData.append('message', message);
        formData.append('subscription', `i6-kiosk:${solutionId}`);
        formData.append('token', SHARED_FORM_TOKEN);
        Object.entries(getLeadContextFields()).forEach(([k, v]) => formData.append(k, v));

        await fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: formData });

        trackEvent(TRACKER_EVENTS.KIOSK_EBOOK_REQUESTED, {
          solution_id: solutionId,
          language: lang,
        });

        setSubmitted(true);
      } catch (e) {
        setError(true);
      } finally {
        setSubmitting(false);
      }
    },
    [ebookTitle, lang, solutionId, solutionTitle],
  );

  return (
    <div className="w-full rounded-3xl border-2 border-[#F4845F] bg-gradient-to-br from-[#F4845F]/20 to-[#F4845F]/5 p-[4vmin] shadow-[0_0_40px_rgba(244,132,95,0.25)]">
      <div className="flex flex-col gap-[3vmin]">
        {/* Top: copy */}
        <div className="min-w-0">
          <p className="text-[1.7vmin] tracking-[0.3em] uppercase font-semibold text-[#F4845F] mb-[1vmin]">
            {t.eyebrow}
          </p>
          <h3 className="text-[3vmin] font-bold text-white leading-tight mb-[0.8vmin]">
            {t.title(ebookTitle)}
          </h3>
          <p className="text-[2vmin] text-white/75">{t.subtitle}</p>
        </div>

        {/* Bottom: inline form or success */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-start gap-[1.5vmin] w-full"
          >
            <div className="flex flex-col flex-1 min-w-0">
              <input
                type="text"
                placeholder={t.nameLabel}
                autoComplete="off"
                inputMode="text"
                aria-label={t.nameLabel}
                {...register('name')}
                className="w-[26vmin] rounded-2xl bg-white/5 border-2 border-white/10 text-white text-[2vmin] px-[2.5vmin] py-[2.2vmin] focus:border-[#F4845F] focus:outline-none placeholder:text-white/40"
              />
              {errors.name && (
                <span className="mt-[0.5vmin] text-[1.4vmin] text-[#F4845F]">{t.invalidName}</span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder={t.emailLabel}
                autoComplete="off"
                inputMode="email"
                aria-label={t.emailLabel}
                {...register('email')}
                className="w-[32vmin] rounded-2xl bg-white/5 border-2 border-white/10 text-white text-[2vmin] px-[2.5vmin] py-[2.2vmin] focus:border-[#F4845F] focus:outline-none placeholder:text-white/40"
              />
              {errors.email && (
                <span className="mt-[0.5vmin] text-[1.4vmin] text-[#F4845F]">{t.invalidEmail}</span>
              )}
            </div>

            {/* Honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register(HONEYPOT_FIELD)}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={submitting}
              aria-label={t.submit}
              className="flex-shrink-0 h-[8vmin] px-[4vmin] rounded-full text-[2.2vmin] font-bold bg-[#F4845F] text-white shadow-[0_0_30px_rgba(244,132,95,0.5)] disabled:opacity-60 flex items-center justify-center gap-[1.5vmin]"
            >
              {submitting ? (
                <Loader2 className="w-[3vmin] h-[3vmin] animate-spin" />
              ) : (
                <>
                  <Send className="w-[2.6vmin] h-[2.6vmin]" strokeWidth={2.5} />
                  <span>{t.submit}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex-shrink-0 flex items-center gap-[2vmin] rounded-2xl bg-[#F4845F]/10 border-2 border-[#F4845F]/50 px-[3vmin] py-[2.5vmin]">
            <CheckCircle2 className="w-[5vmin] h-[5vmin] text-[#F4845F] flex-shrink-0" />
            <div>
              <p className="text-[2.2vmin] font-bold text-white leading-tight">{t.successTitle}</p>
              <p className="text-[1.6vmin] text-white/70 leading-tight mt-[0.4vmin]">{t.successBody}</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-[2vmin] text-[1.7vmin] text-[#F4845F] text-right">{t.error}</p>
      )}
    </div>
  );
};

export default EbookCTA;

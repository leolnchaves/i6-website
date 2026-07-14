import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, Download, X } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const t = content.ebook;

  const onOpen = () => {
    setOpen(true);
    setSubmitted(false);
    setError(false);
    reset();
  };
  const onClose = () => setOpen(false);

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
    <>
      {/* Trigger card */}
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left rounded-3xl border-2 border-[#F4845F] bg-gradient-to-br from-[#F4845F]/20 to-[#F4845F]/5 p-[4vmin] min-h-[16vmin] flex items-center justify-between gap-[3vmin] shadow-[0_0_40px_rgba(244,132,95,0.25)]"
      >
        <div>
          <p className="text-[1.7vmin] tracking-[0.3em] uppercase font-semibold text-[#F4845F] mb-[1vmin]">
            {t.eyebrow}
          </p>
          <h3 className="text-[3vmin] font-bold text-white leading-tight mb-[0.8vmin]">
            {t.title(ebookTitle)}
          </h3>
          <p className="text-[2vmin] text-white/75">{t.subtitle}</p>
        </div>
        <span className="flex-shrink-0 w-[10vmin] h-[10vmin] rounded-2xl bg-[#F4845F] flex items-center justify-center shadow-[0_0_30px_rgba(244,132,95,0.5)]">
          <Download className="w-[5vmin] h-[5vmin] text-white" strokeWidth={2.5} />
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-[4vmin] bg-[#0B1224]/90 backdrop-blur-sm">
          <div className="relative w-full max-w-[90vw] rounded-3xl bg-[#0B1224] border-2 border-[#F4845F]/40 p-[5vmin] shadow-2xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-[3vmin] right-[3vmin] w-[8vmin] h-[8vmin] rounded-full bg-white/10 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-[4vmin] h-[4vmin] text-white" />
            </button>

            {!submitted ? (
              <>
                <p className="text-[1.7vmin] tracking-[0.3em] uppercase font-semibold text-[#F4845F] mb-[1.5vmin]">
                  {t.eyebrow}
                </p>
                <h3 className="text-[3.4vmin] font-bold text-white leading-tight mb-[1vmin]">
                  {t.title(ebookTitle)}
                </h3>
                <p className="text-[2.2vmin] text-white/70 mb-[4vmin]">{t.subtitle}</p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2.5vmin]">
                  <div>
                    <label className="block text-[1.8vmin] font-semibold text-white/80 mb-[1vmin]">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      inputMode="text"
                      {...register('name')}
                      className="w-full rounded-2xl bg-white/5 border-2 border-white/10 text-white text-[2.4vmin] px-[3vmin] py-[2.5vmin] focus:border-[#F4845F] focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-[1vmin] text-[1.8vmin] text-[#F4845F]">{t.invalidName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[1.8vmin] font-semibold text-white/80 mb-[1vmin]">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      inputMode="email"
                      {...register('email')}
                      className="w-full rounded-2xl bg-white/5 border-2 border-white/10 text-white text-[2.4vmin] px-[3vmin] py-[2.5vmin] focus:border-[#F4845F] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-[1vmin] text-[1.8vmin] text-[#F4845F]">{t.invalidEmail}</p>
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
                    className="mt-[2vmin] w-full rounded-full px-[6vmin] py-[3.5vmin] text-[3vmin] font-bold bg-[#F4845F] text-white shadow-[0_0_40px_rgba(244,132,95,0.5)] disabled:opacity-60 flex items-center justify-center gap-[2vmin]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-[3vmin] h-[3vmin] animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      t.submit
                    )}
                  </button>

                  {error && (
                    <p className="text-center text-[2vmin] text-[#F4845F]">{t.error}</p>
                  )}
                  <p className="text-center text-[1.6vmin] text-white/50">{t.privacy}</p>
                </form>
              </>
            ) : (
              <div className="text-center py-[4vmin]">
                <div className="mx-auto w-[14vmin] h-[14vmin] rounded-full bg-[#F4845F]/15 border-2 border-[#F4845F]/60 flex items-center justify-center mb-[3vmin]">
                  <CheckCircle2 className="w-[8vmin] h-[8vmin] text-[#F4845F]" />
                </div>
                <h4 className="text-[3.6vmin] font-bold text-white mb-[2vmin]">
                  {t.successTitle}
                </h4>
                <p className="text-[2.2vmin] text-white/80 mb-[2vmin]">{t.successBody}</p>
                <p className="text-[1.9vmin] text-white/55">{t.successFooter}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EbookCTA;

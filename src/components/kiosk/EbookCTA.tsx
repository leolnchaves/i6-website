import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, Send } from 'lucide-react';
import { SHARED_FORM_TOKEN, HONEYPOT_FIELD } from '@/lib/leadFormConfig';
import { getLeadContext, getLeadContextFields, formatLeadContextForMessage, trackEvent } from '@/lib/tracker';
import { trackKioskEvent } from '@/lib/kioskTracker';
import { enqueueLead, postLead } from '@/lib/leadQueue';
import { TRACKER_EVENTS } from '@/lib/tracker-events';
import type { KioskLang, QuizContent, RouteId } from '@/data/kiosk/config';
import { kioskBtn } from '@/components/kiosk/ui/kioskButtonClass';


const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  [HONEYPOT_FIELD]: z.string().max(0).optional().or(z.literal('')),
});
type FormData = z.infer<typeof schema>;

const EBOOK_CONSUMER_INTELLIGENCE_IDS = [
  'predictive-personalization',
  'smart-discovery',
  'predictive-campaign-targeting',
];
const EBOOK_CONSUMER_INTELLIGENCE_SUBSCRIPTION =
  'insight:ebook-inteligencia-do-consumidor-orientada-a-decisao';
const EBOOK_CONSUMER_INTELLIGENCE_INSIGHT_ID = '03a13a3b-9b6b-4804-8c04-7418a04bd3c1';

const EBOOK_PRICING_IDS = [
  'price-to-margin',
  'price-to-conversion',
  'price-to-turnover',
];
const EBOOK_PRICING_SUBSCRIPTION = 'insight:ebook-pricing-orientado-a-resultados';
const EBOOK_PRICING_INSIGHT_ID = 'a4012048-aa04-465b-b89a-7c7104d6fc18';

interface Props {
  lang: KioskLang;
  content: QuizContent;
  route: RouteId | null;
  solutionId: string;
  solutionTitle: string;
  ebookTitle: string;
}

const EbookCTA = ({ lang, content, route, solutionId, solutionTitle, ebookTitle }: Props) => {
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

        const fields: Record<string, string> = {
          name: data.name,
          email: data.email,
          company: ebookTitle,
          message,
          subscription: 'i6-website',
          token: SHARED_FORM_TOKEN,
          ...getLeadContextFields(),
        };

        if (EBOOK_CONSUMER_INTELLIGENCE_IDS.includes(solutionId)) {
          fields.subscription = EBOOK_CONSUMER_INTELLIGENCE_SUBSCRIPTION;
          fields.reason = 'kiosk-demo';
          fields.insight_id = EBOOK_CONSUMER_INTELLIGENCE_INSIGHT_ID;
          fields.utm_source = 'kiosk';
          fields.utm_medium = 'totem';
          fields.utm_campaign = 'evento-forum-ecommerce-brasil-2026';
          fields.user_agent = 'kiosk-app/1.0';
        }

        if (EBOOK_PRICING_IDS.includes(solutionId)) {
          fields.subscription = EBOOK_PRICING_SUBSCRIPTION;
          fields.reason = 'kiosk-demo';
          fields.insight_id = EBOOK_PRICING_INSIGHT_ID;
          fields.utm_source = 'kiosk';
          fields.utm_medium = 'totem';
          fields.utm_campaign = 'evento-forum-ecommerce-brasil-2026';
          fields.user_agent = 'kiosk-app/1.0';
        }

        // 1) Caminho principal: envio online, como sempre.
        const sent = await postLead(fields);
        // 2) Fallback: rede indisponível/lenta → grava local e reenvia depois.
        if (!sent) enqueueLead(fields);

        trackEvent(TRACKER_EVENTS.KIOSK_EBOOK_REQUESTED, {
          solution_id: solutionId,
          language: lang,
        });
        if (route) trackKioskEvent(`ebook:${route}`);

        setSubmitted(true);
      } catch (e) {
        // Nunca mostrar erro ao visitante do totem.
        setSubmitted(true);
      } finally {
        setSubmitting(false);
      }
    },
    [ebookTitle, lang, route, solutionId, solutionTitle],
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
                autoComplete="name"
                aria-label={t.nameLabel}
                {...register('name')}
                className="w-full rounded-2xl bg-white/5 border-2 border-white/10 text-white text-[2vmin] px-[2.5vmin] py-[2.2vmin] focus:border-[#F4845F] focus:outline-none placeholder:text-white/40"
              />
              {errors.name && (
                <span className="mt-[0.5vmin] text-[1.4vmin] text-[#F4845F]">{t.invalidName}</span>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <input
                type="email"
                placeholder={t.emailLabel}
                autoComplete="email"
                inputMode="email"
                aria-label={t.emailLabel}
                {...register('email')}
                className="w-full rounded-2xl bg-white/5 border-2 border-white/10 text-white text-[2vmin] px-[2.5vmin] py-[2.2vmin] focus:border-[#F4845F] focus:outline-none placeholder:text-white/40"
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
              className={kioskBtn('flex-shrink-0 h-[8vmin] px-[4vmin] text-[2.2vmin] disabled:opacity-60 gap-[1.5vmin]')}
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

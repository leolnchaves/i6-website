
import React, { memo, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { APPS_SCRIPT_URL, SHARED_FORM_TOKEN, HONEYPOT_FIELD, normalizeLeadFields, type LeadSource } from '@/lib/leadFormConfig';
import { getLeadContext, getLeadContextFields, formatLeadContextForMessage, trackEvent } from '@/lib/tracker';
import { TRACKER_EVENTS } from '@/lib/tracker-events';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  [HONEYPOT_FIELD]?: string;
}

/**
 * Variantes do formulário.
 *
 * 'default'   → /contact (comportamento histórico, sem mudanças)
 * 'community' → /community (assunto fixo oculto, e-mail simples, mensagem obrigatória)
 * 'builders'  → /i6-builders (assunto fixo oculto, empresa obrigatória, mensagem obrigatória)
 */
export type ContactFormVariant = 'default' | 'community' | 'builders';

/**
 * Valores de assunto usados na triagem interna. Propositalmente NÃO traduzidos:
 * são chaves de classificação na planilha / i6 HUB, iguais nos 3 idiomas.
 */
const FIXED_SUBJECT: Record<Exclude<ContactFormVariant, 'default'>, string> = {
  community: 'Interesse — Comunidade',
  builders: 'Interesse — i6 Builders',
};

/** Rótulos de triagem (campo `reason` da planilha). Fixos em PT nos 3 idiomas. */
const SUBJECT_REASON_PT: Record<string, string> = {
  sales_suite: 'Vendas — i6 Decision Suite',
  partnerships: 'Parcerias',
  press: 'Imprensa',
  other: 'Outro',
};

const VARIANT_REASON: Record<Exclude<ContactFormVariant, 'default'>, string> = {
  builders: 'i6 Builders',
  community: 'i6 Community',
};

export interface ContactFormProps {
  /** Valores iniciais (ex.: go-landing já chega com nome/e-mail/empresa). */
  defaultValues?: Partial<FormData>;
  /**
   * Pré-preenchimento aplicado UMA vez ao montar (ex.: atalho ?intent=security
   * vindo de /our-ai). Diferente de defaultValues: o reset() pós-envio volta aos
   * defaultValues, então com prefill o formulário continua limpando os campos.
   */
  prefill?: Partial<Pick<FormData, 'subject' | 'message'>>;
  /** Origem do lead enviada ao HUB. Default: contact-form */
  leadSource?: LeadSource;
  /** Campos extras no payload (ex.: outreach_send_id) */
  extraFields?: Record<string, string | undefined>;
  /** Oculta o campo Empresa (ex.: landing /go) */
  hideCompany?: boolean;
  /** Oculta o campo Assunto visualmente, mas mantém o valor no envio (ex.: landing /go) */
  hideSubject?: boolean;
  /** Layout compacto para caber sem scroll */
  compact?: boolean;
  /** Conjunto de campos/textos por página */
  variant?: ContactFormVariant;
}

const ContactForm = memo(({
  defaultValues,
  prefill,
  leadSource = 'contact-form',
  extraFields,
  hideCompany = false,
  hideSubject = false,
  compact = false,
  variant = 'default',
}: ContactFormProps = {}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormData>({ defaultValues: defaultValues as FormData | undefined });

  
  // Static content - memoized for stability
  const content = useMemo(() => ({
    pt: {
      title1: "Comece a Movimentar",
      title2: "Seus Resultados",
      subtitle: "Fale conosco e compartilhe seu objetivo ou desafio estratégico.",
      name: "Nome completo",
      email: "Email profissional",
      emailSimple: "E-mail",
      company: "Empresa",
      phone: "Telefone",
      subject: "Assunto",
      subjectOptions: { salesSuite: "Vendas — i6 Decision Suite", partnerships: "Parcerias", press: "Imprensa", other: "Outro" },
      message: "Mensagem",
      messageMinChar: "(mínimo 10 caracteres)",
      messagePlaceholder: "Descreva como podemos ajudar seu negócio...",
      messagePlaceholderCommunity: "Conte um pouco sobre você...",
      messageDescriptionDefault: "Descreva seu objetivo, desafio ou dúvida. Quanto mais contexto, melhor podemos direcionar sua conversa.",
      messageDescriptionCommunity: "Conte um pouco do seu histórico, por que você quer fazer parte da comunidade e o que espera encontrar aqui.",
      messageDescriptionBuilders: "Descreva sua empresa, o produto que já tem ou pretende construir usando os modelos da i6 Builder, e um panorama rápido da capacidade técnica do time. Conte também o que espera alcançar aplicando os modelos da Infinity6 no seu produto.",
      sendButton: "Enviar Mensagem",
      sending: "Enviando...",
      successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      errors: { nameRequired: "Preencha este campo.", emailRequired: "Preencha este campo.", emailInvalid: "Preencha este campo.", companyRequired: "Preencha este campo.", subjectRequired: "Preencha este campo.", messageRequired: "Preencha este campo.", messageMinLength: "Preencha este campo." }
    },
    en: {
      title1: "Start Moving",
      title2: "Your Results",
      subtitle: "Talk to us and share your strategic goal or challenge.",
      name: "Full name",
      email: "Professional email",
      emailSimple: "Email",
      company: "Company",
      phone: "Phone",
      subject: "Subject",
      subjectOptions: { salesSuite: "Sales — i6 Decision Suite", partnerships: "Partnerships", press: "Press", other: "Other" },
      message: "Message",
      messageMinChar: "(minimum 10 characters)",
      messagePlaceholder: "Describe how we can help your business...",
      messagePlaceholderCommunity: "Tell us a bit about yourself...",
      messageDescriptionDefault: "Describe your goal, challenge or question. The more context you provide, the better we can guide the conversation.",
      messageDescriptionCommunity: "Tell us a bit about your background, why you want to join the community, and what you're hoping to find here.",
      messageDescriptionBuilders: "Describe your company, the product you already have or want to build using i6 Builder's models, and a quick overview of your team's technical capability. Also tell us what you're hoping to achieve by applying Infinity6's models to your product.",
      sendButton: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully! We will contact you soon.",
      errors: { nameRequired: "Please fill out this field.", emailRequired: "Please fill out this field.", emailInvalid: "Please fill out this field.", companyRequired: "Please fill out this field.", subjectRequired: "Please fill out this field.", messageRequired: "Please fill out this field.", messageMinLength: "Please fill out this field." }
    },
    es: {
      title1: "Empieza a Mover",
      title2: "Tus Resultados",
      subtitle: "Habla con nosotros y comparte tu objetivo o desafío estratégico.",
      name: "Nombre completo",
      email: "Correo electrónico profesional",
      emailSimple: "Correo electrónico",
      company: "Empresa",
      phone: "Teléfono",
      subject: "Asunto",
      subjectOptions: { salesSuite: "Ventas — i6 Decision Suite", partnerships: "Alianzas", press: "Prensa", other: "Otro" },
      message: "Mensaje",
      messageMinChar: "(mínimo 10 caracteres)",
      messagePlaceholder: "Describe cómo podemos ayudar a tu negocio...",
      messagePlaceholderCommunity: "Cuéntanos un poco sobre ti...",
      messageDescriptionDefault: "Describe tu objetivo, desafío o duda. Cuanto más contexto nos des, mejor podremos orientar la conversación.",
      messageDescriptionCommunity: "Cuéntanos un poco sobre tu trayectoria, por qué quieres unirte a la comunidad y qué esperas encontrar aquí.",
      messageDescriptionBuilders: "Describe tu empresa, el producto que ya tienes o quieres construir usando los modelos de i6 Builder, y un panorama rápido de la capacidad técnica de tu equipo. Cuéntanos también qué esperas lograr aplicando los modelos de Infinity6 en tu producto.",
      sendButton: "Enviar Mensaje",
      sending: "Enviando...",
      successMessage: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      errors: { nameRequired: "Completa este campo.", emailRequired: "Completa este campo.", emailInvalid: "Completa este campo.", companyRequired: "Completa este campo.", subjectRequired: "Completa este campo.", messageRequired: "Completa este campo.", messageMinLength: "Completa este campo." }
    }
  }), []);

  const isFixedSubject = variant !== 'default';
  const fixedSubjectValue = isFixedSubject ? FIXED_SUBJECT[variant] : undefined;
  const subjectHidden = hideSubject || isFixedSubject;
  const companyRequired = variant === 'builders';

  // Assunto fixo das variantes entra no estado do form desde a montagem
  useEffect(() => {
    if (fixedSubjectValue) setValue('subject', fixedSubjectValue);
  }, [fixedSubjectValue, setValue]);

  // Aplica o prefill do atalho (?intent=...) apenas uma vez no mount. O objeto
  // chega memoizado do pai; deps vazias garantem que edições do usuário não
  // sejam sobrescritas e que o reset() pós-envio continue limpando os campos.
  useEffect(() => {
    if (prefill?.subject) setValue('subject', prefill.subject);
    if (prefill?.message) setValue('message', prefill.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(async (data: FormData) => {
    // Honeypot: silently drop bot submissions
    if (data[HONEYPOT_FIELD]) {
      setIsSuccess(true);
      reset();
      return;
    }
    setIsSubmitting(true);
    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'hidden_iframe';
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = APPS_SCRIPT_URL;
      form.target = 'hidden_iframe';
      form.style.display = 'none';

      const ctx = getLeadContext();
      const enrichedMessage = [data.message, '', formatLeadContextForMessage(ctx)].join('\n');

      // Todos os campos exigidos pelo i6 HUB vão sempre como string (vazia
      // quando não se aplicam) — campos ausentes viravam null no payload do
      // Apps Script e o HUB rejeitava com invalid_payload.
      const normalized = normalizeLeadFields(
        {
          name: data.name,
          email: data.email,
          company: data.company || '',
          message: enrichedMessage,
          subscription: fixedSubjectValue ?? data.subject,
          reason: isFixedSubject ? VARIANT_REASON[variant as Exclude<ContactFormVariant, 'default'>] : (SUBJECT_REASON_PT[data.subject] ?? ''),
          token: SHARED_FORM_TOKEN,
          ...getLeadContextFields(),
          ...(extraFields || {}),
        },
        leadSource,
      );


      const fields = Object.entries(normalized).map(([name, value]) => ({ name, value }));

      fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      trackEvent(TRACKER_EVENTS.CONTACT_FORM_SUBMITTED, { subject: fixedSubjectValue ?? data.subject });

      setIsSuccess(true);
      toast({
        title: (content[language] ?? content.pt).successMessage,
        description: "",
      });
      reset();
      if (fixedSubjectValue) setValue('subject', fixedSubjectValue);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [reset, toast, language, leadSource, extraFields, content, fixedSubjectValue, setValue]);

  const text = useMemo(() => content[language] ?? content.pt, [content, language]);

  const emailLabel = variant === 'community' ? text.emailSimple : text.email;
  const messageDescription =
    variant === 'community' ? text.messageDescriptionCommunity
    : variant === 'builders' ? text.messageDescriptionBuilders
    : text.messageDescriptionDefault;
  const messagePlaceholder =
    variant === 'community' ? text.messagePlaceholderCommunity : text.messagePlaceholder;

  return (
    <Card className="sand-card h-full flex flex-col">
      <CardContent className={`${compact ? 'p-4' : 'p-8'} flex-1 flex flex-col`}>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={`${compact ? 'space-y-3' : 'space-y-6'} flex-1 flex flex-col`} noValidate>
          {/* Honeypot */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register(HONEYPOT_FIELD as keyof FormData)}
            />
          </div>
          <div className={`${compact ? '' : 'flex-1'} ${compact ? 'space-y-3' : 'space-y-6'}`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'gap-3' : 'gap-6'}`}>
              <div>
                <Label htmlFor="name" className={`font-medium text-foreground block ${compact ? 'text-xs mb-1' : 'text-sm mb-2'}`}>
                  {text.name} *
                </Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", { required: text.errors.nameRequired })}
                  className={`w-full bg-secondary/60 border rounded-[calc(var(--radius)-4px)] text-foreground placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/30 focus:border-primary/40 ${
                    compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'
                  } ${errors.name ? 'border-destructive/60' : 'border-border'}`}
                />
              </div>
              <div>
                <Label htmlFor="email" className={`font-medium text-foreground block ${compact ? 'text-xs mb-1' : 'text-sm mb-2'}`}>
                  {emailLabel} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: text.errors.emailRequired, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: text.errors.emailInvalid } })}
                  className={`w-full bg-secondary/60 border rounded-[calc(var(--radius)-4px)] text-foreground placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/30 focus:border-primary/40 ${
                    compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'
                  } ${errors.email ? 'border-destructive/60' : 'border-border'}`}
                />
              </div>
            </div>

            {!hideCompany && (
              <div>
                <Label htmlFor="company" className="text-sm font-medium text-foreground mb-2 block">
                  {text.company}{companyRequired ? ' *' : ''}
                </Label>
                <Input
                  id="company"
                  type="text"
                  {...register("company", companyRequired ? { required: text.errors.companyRequired } : {})}
                  className={`w-full px-4 py-2 bg-secondary/60 border rounded-[calc(var(--radius)-4px)] text-foreground placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/30 focus:border-primary/40 ${
                    errors.company ? 'border-destructive/60' : 'border-border'
                  }`}
                />
              </div>
            )}

            {subjectHidden ? (
              <input type="hidden" {...register("subject")} />
            ) : (
              <div>
                <Label htmlFor="subject" className={`font-medium text-foreground block ${compact ? 'text-xs mb-1' : 'text-sm mb-2'}`}>
                  {text.subject} *
                </Label>
                <select
                  id="subject"
                  {...register("subject", { required: text.errors.subjectRequired })}
                  className={`w-full bg-secondary/60 border rounded-[calc(var(--radius)-4px)] text-foreground focus:ring-2 focus:ring-ring/30 focus:border-primary/40 ${
                    compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'
                  } ${errors.subject ? 'border-destructive/60' : 'border-border'}`}
                >
                  <option value="">{text.subject}</option>
                  <option value="sales_suite">{text.subjectOptions.salesSuite}</option>
                  <option value="partnerships">{text.subjectOptions.partnerships}</option>
                  <option value="press">{text.subjectOptions.press}</option>
                  <option value="other">{text.subjectOptions.other}</option>
                </select>
              </div>
            )}

            <div className={`${compact ? '' : 'flex-1'} flex flex-col`}>
              <Label htmlFor="message" className={`font-medium text-foreground block ${compact ? 'text-xs mb-1' : 'text-sm mb-1'}`}>
                {text.message} * <span className="text-muted-foreground font-normal">{text.messageMinChar}</span>
              </Label>
              {messageDescription && (
                <p
                  id="message-description"
                  className={`text-muted-foreground leading-relaxed ${compact ? 'text-[11px] mb-2' : 'text-sm mb-3'}`}
                >
                  {messageDescription}
                </p>
              )}
              <Textarea
                id="message"
                aria-describedby={messageDescription ? "message-description" : undefined}
                placeholder={messagePlaceholder}
                {...register("message", { required: text.errors.messageRequired, minLength: { value: 10, message: text.errors.messageMinLength } })}
                className={`w-full bg-secondary/60 border rounded-[calc(var(--radius)-4px)] text-foreground placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/30 focus:border-primary/40 resize-none ${
                  compact ? '' : 'flex-1'
                } ${
                  compact ? 'px-3 py-1.5 min-h-[72px] text-sm' : 'px-4 py-2 min-h-[120px]'
                } ${errors.message ? 'border-destructive/60' : 'border-border'}`}
              />
            </div>

            {isSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-[calc(var(--radius)-4px)] p-4 text-emerald-700">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {text.successMessage}
                </div>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full bg-primary text-primary-foreground border border-transparent hover:brightness-[1.06] shadow-[var(--sand-shadow-soft)] mt-auto transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              compact ? 'text-base py-2' : 'text-lg py-3'
            }`}
          >
            {isSubmitting ? text.sending : text.sendButton}
            <Send className={`ml-2 w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
          </Button>

        </form>
      </CardContent>
    </Card>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;

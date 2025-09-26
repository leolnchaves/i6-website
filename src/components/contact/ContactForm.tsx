
import React, { memo, useCallback, useMemo, useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm = memo(() => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();
  
  // Static content for PT/EN - memoized for stability
  const content = useMemo(() => ({
    pt: {
      title1: "Transforme seu negócio com",
      title2: "Inteligência Artificial",
      name: "Nome completo",
      email: "Email profissional",
      company: "Empresa",
      phone: "Telefone",
      subject: "Assunto",
      subjectOptions: {
        general: "Consulta geral",
        demo: "Solicitar demonstração",
        partnership: "Parceria",
        support: "Suporte técnico"
      },
      message: "Mensagem",
      messagePlaceholder: "Descreva como podemos ajudar seu negócio...",
      sendButton: "Enviar Mensagem",
      successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      errors: {
        nameRequired: "Preencha este campo.",
        emailRequired: "Preencha este campo.",
        emailInvalid: "Preencha este campo.",
        subjectRequired: "Preencha este campo.",
        messageRequired: "Preencha este campo.",
        messageMinLength: "Preencha este campo."
      }
    },
    en: {
      title1: "Growth starts with one message.",
      title2: "Send yours.",
      name: "Full name",
      email: "Professional email",
      company: "Company",
      phone: "Phone",
      subject: "Subject",
      subjectOptions: {
        general: "General inquiry",
        demo: "Request demo",
        partnership: "Partnership",
        support: "Technical support"
      },
      message: "Message",
      messagePlaceholder: "Describe how we can help your business...",
      sendButton: "Send Message",
      successMessage: "Message sent successfully! We will contact you soon.",
      errors: {
        nameRequired: "Please fill out this field.",
        emailRequired: "Please fill out this field.",
        emailInvalid: "Please fill out this field.",
        subjectRequired: "Please fill out this field.",
        messageRequired: "Please fill out this field.",
        messageMinLength: "Please fill out this field."
      }
    }
  }), []);

  const onSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Create a hidden iframe to submit the form without redirecting
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'hidden_iframe';
      document.body.appendChild(iframe);

      // Create a hidden form and submit it to the iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbzx_sv6GihHhurFlLvuoYRvjLZOC7TrDHWIayCiJIGO5vvBsGgvUd3ATEmFEuWZxZ6I/exec';
      form.target = 'hidden_iframe';
      form.style.display = 'none';

      // Add form fields
      const fields = [
        { name: 'name', value: data.name },
        { name: 'email', value: data.email },
        { name: 'company', value: data.company || '' },
        { name: 'message', value: data.message },
        { name: 'subscription', value: data.subject }
      ];

      fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      // Show success message
      setIsSuccess(true);
      const successMessage = language === 'pt' 
        ? "Mensagem enviada com sucesso! Entraremos em contato em breve."
        : "Message sent successfully! We will contact you soon.";
      
      toast({
        title: successMessage,
        description: "",
      });
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [reset, toast, language]);

  // Automatically uses current language from context - memoized
  const text = useMemo(() => content[language], [language]);

  return (
    <Card className="border-0 shadow-2xl h-full flex flex-col">
      <CardHeader className="p-8">
        <CardTitle className="text-2xl font-bold text-gray-900">
          <div className="space-y-1">
            <div>{text.title1}</div>
            <div>{text.title2}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0 flex-1 flex flex-col">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col">
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.name} *
                </Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", { 
                    required: text.errors.nameRequired 
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.email} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: text.errors.emailRequired,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: text.errors.emailInvalid
                    }
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2 block">
                {text.company}
              </Label>
              <Input
                id="company"
                type="text"
                {...register("company")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                {text.subject} *
              </Label>
              <select
                id="subject"
                {...register("subject", { 
                  required: text.errors.subjectRequired 
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{text.subject}</option>
                <option value="general">{text.subjectOptions.general}</option>
                <option value="demo">{text.subjectOptions.demo}</option>
                <option value="partnership">{text.subjectOptions.partnership}</option>
                <option value="support">{text.subjectOptions.support}</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                {text.message} *
              </Label>
              <Textarea
                id="message"
                rows={6}
                placeholder={text.messagePlaceholder}
                {...register("message", { 
                  required: text.errors.messageRequired,
                  minLength: {
                    value: 10,
                    message: text.errors.messageMinLength
                  }
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
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
            className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-lg py-3 mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : text.sendButton}
            <Send className={`ml-2 w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;

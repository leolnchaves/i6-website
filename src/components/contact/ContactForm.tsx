
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const { language } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  // Static content for PT/EN - automatically responds to language changes
  const content = {
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
      errors: {
        nameRequired: "Please fill out this field.",
        emailRequired: "Please fill out this field.",
        emailInvalid: "Please fill out this field.",
        subjectRequired: "Please fill out this field.",
        messageRequired: "Please fill out this field.",
        messageMinLength: "Please fill out this field."
      }
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  // Automatically uses current language from context
  const text = content[language];

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
        <TooltipProvider>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col">
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                    {text.name} *
                  </Label>
                  <Tooltip open={!!errors.name}>
                    <TooltipTrigger asChild>
                      <div className="relative">
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
                    </TooltipTrigger>
                    {errors.name && (
                      <TooltipContent side="top" className="bg-gray-800 text-white px-3 py-2 rounded shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-orange-400 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span>{errors.name?.message}</span>
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                    {text.email} *
                  </Label>
                  <Tooltip open={!!errors.email}>
                    <TooltipTrigger asChild>
                      <div className="relative">
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
                    </TooltipTrigger>
                    {errors.email && (
                      <TooltipContent side="top" className="bg-gray-800 text-white px-3 py-2 rounded shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-orange-400 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <span>{errors.email?.message}</span>
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                    {text.phone}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.subject} *
                </Label>
                <Tooltip open={!!errors.subject}>
                  <TooltipTrigger asChild>
                    <div className="relative">
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
                  </TooltipTrigger>
                  {errors.subject && (
                    <TooltipContent side="top" className="bg-gray-800 text-white px-3 py-2 rounded shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-orange-400 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <span>{errors.subject?.message}</span>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.message} *
                </Label>
                <Tooltip open={!!errors.message}>
                  <TooltipTrigger asChild>
                    <div className="relative">
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
                  </TooltipTrigger>
                  {errors.message && (
                    <TooltipContent side="top" className="bg-gray-800 text-white px-3 py-2 rounded shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-orange-400 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <span>{errors.message?.message}</span>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-lg py-3 mt-auto"
            >
              {text.sendButton}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default ContactForm;

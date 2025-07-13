
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactForm = () => {
  // Static content for PT/EN - can be easily changed
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
      sendButton: "Enviar Mensagem"
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
      sendButton: "Send Message"
    }
  };

  // You can change this to 'en' for English or 'pt' for Portuguese
  const currentLang = 'pt';
  const text = content[currentLang];

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
        {/* Static form - ready for HTML conversion */}
        <form className="space-y-6 flex-1 flex flex-col">
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.name} *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.email} *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.company}
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                  {text.phone}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                {text.subject} *
              </Label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                name="message"
                required
                rows={6}
                placeholder={text.messagePlaceholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
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
      </CardContent>
    </Card>
  );
};

export default ContactForm;

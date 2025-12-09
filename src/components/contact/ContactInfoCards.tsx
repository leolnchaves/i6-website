import React, { memo, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactInfoCards = memo(() => {
  const { language } = useLanguage();

  // Memoized content for stability
  const content = useMemo(() => ({
    pt: {
      email: {
        title: "Email",
        description: "Envie-nos uma mensagem",
        value: "partner@infinity6.ai"
      },
      phone: {
        title: "Telefone",
        description: "Ligue para nós",
        value: "+55 19 99999-9999"
      },
      address: {
        title: "Endereço",
        description: "Visite nosso escritório",
        value: "Campinas, São Paulo, Brasil"
      },
      hours: {
        title: "Horário",
        description: "Seg - Sex: 9:00 - 18:00",
        value: "GMT-3 (Brasília)"
      }
    },
    en: {
      email: {
        title: "Email",
        description: "Send us a message",
        value: "partner@infinity6.ai"
      },
      phone: {
        title: "Phone",
        description: "Give us a call",
        value: "+55 19 99999-9999"
      },
      address: {
        title: "Address",
        description: "Visit our office",
        value: "Campinas, São Paulo, Brazil"
      },
      hours: {
        title: "Hours",
        description: "Mon - Fri: 9:00 - 18:00",
        value: "GMT-3 (Brasília)"
      }
    }
  }), []);

  const text = useMemo(() => content[language], [content, language]);

  const cards = useMemo(() => [
    {
      icon: Mail,
      ...text.email,
      color: "text-blue-600"
    },
    {
      icon: Phone,
      ...text.phone,
      color: "text-green-600"
    },
    {
      icon: MapPin,
      ...text.address,
      color: "text-orange-600"
    },
    {
      icon: Clock,
      ...text.hours,
      color: "text-purple-600"
    }
  ], [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {card.description}
            </p>
            <p className="text-sm font-medium text-gray-800">
              {card.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

ContactInfoCards.displayName = 'ContactInfoCards';

export default ContactInfoCards;
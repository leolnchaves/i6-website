

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "infinity6@infinity6.ai",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+55 19 998197775",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "Campinas, BR",
      description: "Come say hello at our headquarters"
    }
  ];

  const locations = [
    {
      id: 'campinas',
      name: 'Campinas, BR',
      type: 'Headquarters',
      position: { top: '72%', left: '28%' }, // South America - Brazil
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai'
    },
    {
      id: 'dover',
      name: 'Dover, DE',
      type: 'Branch Office',
      position: { top: '32%', left: '22%' }, // North America - East Coast USA
      address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai'
    },
    {
      id: 'milan',
      name: 'Milan, IT',
      type: 'Branch Office',
      position: { top: '30%', left: '52%' }, // Europe - Northern Italy
      address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItaly',
      phone: '+39 02 1234 5678',
      email: 'italia@infinity6.ai'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Start a
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ready to transform your business with AI? Our experts are here to help you 
              explore the infinite possibilities that await.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center text-blue-600 mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-xl font-bold text-gray-900 mb-1">{info.details}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Moved above contact form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our AI solutions and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does AI implementation take?",
                answer: "Implementation time varies by project complexity, typically ranging from 2-6 months for full deployment."
              },
              {
                question: "What industries do you serve?",
                answer: "We serve all industries including manufacturing, finance, healthcare, retail, and technology companies."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer 24/7 support, maintenance, and continuous optimization services for all our AI solutions."
              },
              {
                question: "What's the typical ROI for AI projects?",
                answer: "Our clients typically see 150% ROI within the first year, with continued improvements over time."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-2xl">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Send Us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="demo">Request Demo</option>
                        <option value="partnership">Partnership</option>
                        <option value="support">Technical Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your project and how we can help..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                    >
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* World Map with Office Locations */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Global Presence
                </h3>
                <p className="text-gray-600 mb-6">
                  Find us across three continents. Click on each location to see detailed contact information.
                </p>
                
                <TooltipProvider>
                  <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden border border-gray-200">
                    {/* World Map SVG */}
                    <svg viewBox="0 0 1000 500" className="w-full h-full">
                      {/* North America */}
                      <path d="M120,120 L160,100 L200,110 L240,120 L280,140 L300,160 L290,180 L270,200 L240,210 L200,200 L160,190 L130,180 L110,160 L105,140 L120,120 Z" 
                            fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      
                      {/* South America */}
                      <path d="M220,280 L260,270 L290,290 L300,320 L290,360 L280,400 L270,430 L250,450 L230,440 L210,420 L200,380 L205,340 L210,310 L220,280 Z" 
                            fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      
                      {/* Europe */}
                      <path d="M480,140 L520,130 L540,140 L550,160 L540,180 L520,190 L500,185 L480,175 L475,160 L480,140 Z" 
                            fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      
                      {/* Africa */}
                      <path d="M480,200 L520,195 L540,210 L550,240 L545,280 L540,320 L530,350 L520,370 L500,375 L480,370 L470,350 L465,320 L470,280 L475,240 L480,200 Z" 
                            fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      
                      {/* Asia */}
                      <path d="M560,120 L620,110 L680,120 L720,140 L760,160 L780,180 L770,200 L750,220 L720,230 L680,225 L640,220 L600,210 L570,190 L560,160 L560,120 Z" 
                            fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      
                      {/* Australia */}
                      <path d="M700,350 L740,345 L760,355 L755,375 L740,385 L720,380 L700,375 L695,365 L700,350 Z" 
                            fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      
                      {/* Greenland */}
                      <path d="M320,60 L350,55 L360,70 L355,85 L340,90 L325,85 L320,70 L320,60 Z" 
                            fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      
                      {/* Grid lines for reference */}
                      <defs>
                        <pattern id="grid" width="50" height="25" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 25" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    
                    {/* Location markers */}
                    {locations.map((location) => (
                      <Tooltip key={location.id}>
                        <TooltipTrigger asChild>
                          <button
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200 z-10"
                            style={{
                              top: location.position.top,
                              left: location.position.left,
                            }}
                          >
                            <div className="relative">
                              <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" />
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="top" 
                          className="max-w-xs p-4 bg-white border shadow-xl"
                        >
                          <div className="space-y-2">
                            <div>
                              <h4 className="font-bold text-gray-900">{location.name}</h4>
                              <p className="text-sm text-blue-600">{location.type}</p>
                            </div>
                            <div className="text-sm text-gray-600">
                              <div className="whitespace-pre-line mb-2">{location.address}</div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  <span>{location.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3 h-3" />
                                  <span>{location.email}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready to Get Started with Calendly */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-lg opacity-90 mb-6">
                  Schedule a free consultation with our AI experts to discuss your project 
                  and explore how we can help transform your business.
                </p>
              </div>
              
              {/* Calendly Embed */}
              <div className="bg-white rounded-lg p-4">
                <iframe
                  src="https://calendly.com/leo-infinity6/30min"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule a meeting"
                  className="rounded-lg"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;


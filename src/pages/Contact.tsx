
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
      position: { top: '65%', left: '25%' },
      address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
      phone: '+55 19 998197775',
      email: 'infinity6@infinity6.ai'
    },
    {
      id: 'dover',
      name: 'Dover, DE',
      type: 'Branch Office',
      position: { top: '35%', left: '45%' },
      address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
      phone: '+1 (302) 555-0123',
      email: 'usa@infinity6.ai'
    },
    {
      id: 'milan',
      name: 'Milan, IT',
      type: 'Branch Office',
      position: { top: '40%', left: '52%' },
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
                  <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                    {/* Simplified world map background */}
                    <div className="absolute inset-0 opacity-30">
                      <svg viewBox="0 0 1000 500" className="w-full h-full">
                        {/* Simplified continents */}
                        <path d="M150,200 L300,180 L350,220 L320,280 L200,300 L150,250 Z" fill="#cbd5e1" />
                        <path d="M400,150 L600,140 L650,200 L600,250 L450,240 L400,200 Z" fill="#cbd5e1" />
                        <path d="M200,320 L400,310 L450,380 L350,420 L200,400 Z" fill="#cbd5e1" />
                        <path d="M100,100 L250,90 L300,150 L200,180 L100,160 Z" fill="#cbd5e1" />
                      </svg>
                    </div>
                    
                    {/* Location markers */}
                    {locations.map((location) => (
                      <Tooltip key={location.id}>
                        <TooltipTrigger asChild>
                          <button
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200"
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
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Calendly Integration</h4>
                    <p className="text-gray-500 mb-4">
                      To complete the Calendly integration, you'll need to:
                    </p>
                    <div className="text-left max-w-md mx-auto space-y-2 text-sm">
                      <p>1. Create a Calendly account at calendly.com</p>
                      <p>2. Get your Calendly embed URL</p>
                      <p>3. Replace this placeholder with the actual embed code</p>
                    </div>
                    <Button 
                      className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => window.open('https://calendly.com', '_blank')}
                    >
                      Visit Calendly
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;

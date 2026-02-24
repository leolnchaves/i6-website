import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/common/SEOHead';
import PrivacyPolicyPT from '@/components/privacy/PrivacyPolicyPT';

const PrivacyPolicy = () => {
  useScrollAnimation();
  const { language } = useLanguage();

  const heroContent = {
    en: {
      title: "Privacy Policy",
      subtitle: "Your privacy is our priority. Learn how we protect and handle your data.",
      lastUpdated: "Last updated: January 2025",
    },
    pt: {
      title: "Política de Privacidade",
      subtitle: "Sua privacidade é nossa prioridade. Saiba como protegemos e gerenciamos seus dados.",
      lastUpdated: "Última atualização: Janeiro 2025",
    },
  };

  const currentHero = heroContent[language];

  // EN content (unchanged)
  const enSections = {
    introduction: {
      title: "1. Introduction",
      text: "At infinity6 (\"we,\" \"our,\" or \"us\"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services."
    },
    information: {
      title: "2. Information We Collect",
      personalTitle: "Personal Information",
      personalText: "We may collect personal information that you voluntarily provide to us, including:",
      personalItems: [
        "Name and contact information (email, phone number)",
        "Company information and job title",
        "Communications with us through contact forms or email",
        "Information provided during consultations or demos"
      ],
      technicalTitle: "Technical Information",
      technicalText: "We automatically collect certain information when you visit our website:",
      technicalItems: [
        "IP address and device information",
        "Browser type and version",
        "Website usage data and analytics",
        "Cookies and similar tracking technologies"
      ]
    },
    usage: {
      title: "3. How We Use Your Information",
      text: "We use the collected information for the following purposes:",
      items: [
        "Provide and improve our AI solutions and services",
        "Respond to your inquiries and provide customer support",
        "Send you relevant information about our products and services",
        "Analyze website usage to improve user experience",
        "Comply with legal obligations and protect our rights"
      ]
    },
    security: {
      title: "4. Data Security",
      text: "We implement appropriate technical and organizational security measures to protect your personal information:",
      items: [
        "Encryption of data in transit and at rest",
        "Regular security assessments and updates",
        "Access controls and employee training",
        "Secure cloud infrastructure with leading providers"
      ]
    },
    sharing: {
      title: "5. Information Sharing",
      text: "We do not sell your personal information. We may share your information in the following circumstances:",
      items: [
        "With trusted service providers who assist in our operations",
        "To comply with legal requirements or protect our rights",
        "In connection with a business transaction (merger, acquisition)",
        "With your explicit consent for specific purposes"
      ]
    },
    rights: {
      title: "6. Your Rights",
      text: "Depending on your location, you may have the following rights regarding your personal information:",
      items: [
        "Access and receive a copy of your personal data",
        "Rectify inaccurate or incomplete information",
        "Request deletion of your personal data",
        "Object to or restrict processing of your data",
        "Data portability rights"
      ]
    },
    transfers: {
      title: "7. International Data Transfers",
      text: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable laws."
    },
    changes: {
      title: "8. Changes to This Policy",
      text: "We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website and updating the \"Last updated\" date."
    },
    contact: {
      title: "9. Contact Us",
      text: "If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:",
      email: "Email:",
      address: "Address:",
      company: "infinity6 AI Solutions",
      dpo: "Data Protection Officer"
    }
  };

  const renderSection = (title: string, text: string, items?: string[]) => (
    <section className="border-b border-white/10 pb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-white/70 mb-4">{text}</p>
      {items && (
        <ul className="list-disc list-inside text-white/70 space-y-1 marker:text-[#F4845F]">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );

  const renderENContent = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      {renderSection(enSections.introduction.title, enSections.introduction.text)}

      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">{enSections.information.title}</h2>
        <h3 className="text-lg font-semibold text-white/80 mb-2">{enSections.information.personalTitle}</h3>
        <p className="text-white/70 mb-4">{enSections.information.personalText}</p>
        <ul className="list-disc list-inside text-white/70 mb-6 space-y-1 marker:text-[#F4845F]">
          {enSections.information.personalItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h3 className="text-lg font-semibold text-white/80 mb-2">{enSections.information.technicalTitle}</h3>
        <p className="text-white/70 mb-4">{enSections.information.technicalText}</p>
        <ul className="list-disc list-inside text-white/70 space-y-1 marker:text-[#F4845F]">
          {enSections.information.technicalItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </section>

      {renderSection(enSections.usage.title, enSections.usage.text, enSections.usage.items)}
      {renderSection(enSections.security.title, enSections.security.text, enSections.security.items)}
      {renderSection(enSections.sharing.title, enSections.sharing.text, enSections.sharing.items)}
      {renderSection(enSections.rights.title, enSections.rights.text, enSections.rights.items)}
      {renderSection(enSections.transfers.title, enSections.transfers.text)}
      {renderSection(enSections.changes.title, enSections.changes.text)}

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">{enSections.contact.title}</h2>
        <p className="text-white/70 mb-4">{enSections.contact.text}</p>
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
          <p className="text-white/70 mb-2"><strong className="text-white">{enSections.contact.email}</strong> privacy@infinity6.ai</p>
          <p className="text-white/70 mb-2"><strong className="text-white">{enSections.contact.address}</strong> {enSections.contact.company}</p>
          <p className="text-white/70"><strong className="text-white">{enSections.contact.dpo}</strong></p>
        </div>
      </section>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      <SEOHead page="privacyPolicy" />
      
      {/* Hero */}
      <section className="w-full flex items-center justify-center pt-28 pb-16 relative bg-gradient-to-b from-[#F4845F]/30 via-[#F4845F]/10 to-[#0B1224]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {currentHero.title}
            </h1>
            <p className="text-base sm:text-lg text-white/60 mb-2 leading-relaxed">
              {currentHero.subtitle}
            </p>
            <p className="text-sm text-white/40">
              {currentHero.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="relative bg-[#0B1224]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {language === 'pt' ? <PrivacyPolicyPT /> : renderENContent()}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

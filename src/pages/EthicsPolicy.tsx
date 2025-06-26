
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EthicsPolicy = () => {
  useScrollAnimation();

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ethics Policy
            </h1>
            <p className="text-xl text-gray-600">
              Our commitment to ethical AI and responsible business practices.
            </p>
          </div>

          <div className="prose prose-lg max-w-none scroll-reveal">
            <h2>Ethical AI Development</h2>
            <p>
              We are committed to developing AI solutions that are fair, transparent, and accountable. 
              Our algorithms are designed to minimize bias and promote equitable outcomes.
            </p>

            <h2>Responsible Data Use</h2>
            <p>
              We handle all data with the utmost care and respect for privacy rights. 
              Data is used only for legitimate business purposes and with appropriate consent.
            </p>

            <h2>Transparency and Accountability</h2>
            <p>
              We believe in being transparent about our AI systems and their decision-making processes. 
              We take responsibility for the outcomes of our technology.
            </p>

            <h2>Continuous Improvement</h2>
            <p>
              We continuously monitor and improve our ethical practices, incorporating feedback 
              from stakeholders and staying current with industry best practices.
            </p>

            <h2>Compliance and Standards</h2>
            <p>
              We adhere to all applicable laws, regulations, and industry standards related to 
              AI development and data protection.
            </p>

            <h2>Contact Us</h2>
            <p>
              For questions about our ethics policy or to report concerns, please contact us at 
              ethics@infinity6.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsPolicy;

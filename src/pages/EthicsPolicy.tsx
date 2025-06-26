
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
            <p className="text-sm text-gray-500 mt-4">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none scroll-reveal space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Our Ethical Foundation</h2>
              <p className="text-gray-700 mb-4">
                At Infinity6, we believe that artificial intelligence should serve humanity's best interests. 
                Our commitment to ethical AI development guides every aspect of our work, from research and 
                development to deployment and ongoing maintenance of our solutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Responsible AI Development</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fairness and Non-Discrimination</h3>
              <p className="text-gray-700 mb-4">
                We are committed to developing AI systems that are fair and unbiased:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Regular bias testing and mitigation in all our AI models</li>
                <li>Diverse training datasets that represent different demographics</li>
                <li>Continuous monitoring for discriminatory outcomes</li>
                <li>Inclusive design practices throughout development</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Transparency and Explainability</h3>
              <p className="text-gray-700 mb-4">
                We believe in making AI decisions understandable:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Clear documentation of AI system capabilities and limitations</li>
                <li>Explainable AI techniques where decision transparency is critical</li>
                <li>Open communication about how our systems work</li>
                <li>Regular reporting on AI system performance and impact</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Ethics and Privacy</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Minimization</h3>
              <p className="text-gray-700 mb-4">
                We collect and use only the data necessary for our services:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Purpose limitation - data used only for stated purposes</li>
                <li>Data retention policies with automatic deletion</li>
                <li>Regular audits of data collection and usage practices</li>
                <li>Strong consent mechanisms for data processing</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Privacy by Design</h3>
              <p className="text-gray-700 mb-4">
                Privacy is built into every system we develop:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>End-to-end encryption for all data transmissions</li>
                <li>Anonymization and pseudonymization techniques</li>
                <li>Secure multi-party computation where applicable</li>
                <li>Regular privacy impact assessments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Human-Centered AI</h2>
              <p className="text-gray-700 mb-4">
                Our AI solutions are designed to augment human capabilities, not replace human judgment:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Human oversight in critical decision-making processes</li>
                <li>Easy opt-out mechanisms for automated systems</li>
                <li>Support for human skill development and adaptation</li>
                <li>Respect for human autonomy and choice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Environmental Responsibility</h2>
              <p className="text-gray-700 mb-4">
                We are committed to sustainable AI development:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Energy-efficient model architectures and training practices</li>
                <li>Green cloud infrastructure and renewable energy usage</li>
                <li>Carbon footprint monitoring and offset programs</li>
                <li>Lifecycle assessment of our AI systems' environmental impact</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Stakeholder Engagement</h2>
              <p className="text-gray-700 mb-4">
                We actively engage with various stakeholders to ensure our ethical standards:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Regular consultation with ethics experts and advisory boards</li>
                <li>Collaboration with academic institutions and research organizations</li>
                <li>Participation in industry standards and best practice initiatives</li>
                <li>Open dialogue with civil society and advocacy groups</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Continuous Improvement</h2>
              <p className="text-gray-700 mb-4">
                Ethics is an ongoing commitment, not a one-time achievement:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Regular ethics training for all team members</li>
                <li>Continuous monitoring and evaluation of ethical practices</li>
                <li>Feedback mechanisms for reporting ethical concerns</li>
                <li>Annual ethics audits and public reporting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Compliance and Governance</h2>
              <p className="text-gray-700 mb-4">
                We adhere to the highest standards of compliance and governance:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
                <li>Adherence to emerging AI governance frameworks</li>
                <li>Regular legal and compliance reviews</li>
                <li>Transparent reporting of compliance metrics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Reporting and Accountability</h2>
              <p className="text-gray-700 mb-4">
                We believe in transparency and accountability in our ethical practices:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>Ethics Hotline:</strong> Report concerns confidentially
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> ethics@infinity6.ai
                </p>
                <p className="text-gray-700">
                  <strong>Annual Ethics Report:</strong> Published annually on our website
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Our Ethics Team</h2>
              <p className="text-gray-700 mb-4">
                For questions about our ethics policy, to report concerns, or to discuss ethical considerations:
              </p>
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Chief Ethics Officer</strong></p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> ethics@infinity6.ai</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567 ext. 101</p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Infinity6 AI Solutions, Ethics Department
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsPolicy;

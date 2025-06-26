
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessStoriesCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Write Your Success Story?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join the ranks of successful companies that have transformed their operations with our AI solutions.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
          Start Your Transformation
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default SuccessStoriesCTA;

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['cta'];
}

const OurAICTA = memo(({ content }: Props) => {
  const localized = useLocalizedPath();
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-[#F4845F] via-[#E8764A] to-[#0B1224] overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
          {content.title}
        </p>
        <Link
          to={localized('/contact')}
          className="group inline-flex items-center gap-2 mt-8 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-white/50 transition-all duration-500 ease-out hover:bg-white hover:text-[#0B1224] hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        >
          {content.button}
          <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
});

OurAICTA.displayName = 'OurAICTA';
export default OurAICTA;

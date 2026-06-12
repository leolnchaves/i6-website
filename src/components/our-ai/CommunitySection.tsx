import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['community'];
}

const CommunitySection = memo(({ content }: Props) => {
  return (
    <section className="relative py-20 md:py-24 bg-[#0B1224]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        {/* Hugging Face mark */}
        <svg
          viewBox="0 0 95 88"
          fill="currentColor"
          width="40"
          height="40"
          aria-hidden="true"
          className="mx-auto mb-5 text-[#F4845F]"
        >
          <path d="M47.5 0C21.3 0 0 19.7 0 44c0 13.8 6.7 26.2 17.2 34.5 1.5 1.2 3.4 1.8 5.3 1.8h50c1.9 0 3.8-.6 5.3-1.8C88.3 70.2 95 57.8 95 44 95 19.7 73.7 0 47.5 0zM25 52c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm45 0c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zM35 65c0-3.3 5.6-6 12.5-6s12.5 2.7 12.5 6-5.6 6-12.5 6S35 68.3 35 65z" />
        </svg>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-sm md:text-base text-white/60 leading-relaxed mb-7 max-w-xl mx-auto">
          {content.description}
        </p>
        <a
          href="https://huggingface.co/infinity6"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white text-sm font-semibold rounded-xl border border-white/30 hover:bg-white hover:text-[#0B1224] hover:border-white transition-all duration-300"
        >
          {content.cta}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
});

CommunitySection.displayName = 'CommunitySection';
export default CommunitySection;

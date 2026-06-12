import { memo } from 'react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['challenges'];
}

const ChallengesAccordion = memo(({ content }: Props) => {
  return (
    <section className="relative py-14 md:py-20 bg-[#0A101F]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-sm md:text-base text-white/55 leading-relaxed max-w-2xl mx-auto">
            {content.lead}
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-lg bg-white/[0.02]">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="w-12 px-3 md:px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold">
                  #
                </th>
                <th className="px-3 md:px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold">
                  {content.headers.challenge}
                </th>
                <th className="px-3 md:px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold">
                  {content.headers.learning}
                </th>
                <th className="px-3 md:px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] text-[#F4845F]/80 font-semibold">
                  {content.headers.resolution}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, idx) => (
                <tr
                  key={row.challenge}
                  className="border-b border-white/10 last:border-b-0 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-3 md:px-4 py-4 align-top text-[#F4845F]/70 font-mono text-xs">
                    {String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className="px-3 md:px-4 py-4 align-top text-white font-semibold text-[13px] md:text-sm leading-snug">
                    {row.challenge}
                  </td>
                  <td className="px-3 md:px-4 py-4 align-top text-white/70 text-[13px] md:text-sm leading-relaxed italic">
                    {row.learning}
                  </td>
                  <td className="px-3 md:px-4 py-4 align-top text-white/80 text-[13px] md:text-sm leading-relaxed">
                    {row.resolution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
});

ChallengesAccordion.displayName = 'ChallengesAccordion';
export default ChallengesAccordion;

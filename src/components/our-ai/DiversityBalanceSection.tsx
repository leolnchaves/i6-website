import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sparkles } from 'lucide-react';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['diversity'];
}

const histogram = [
  { x: '1', y: 460 },
  { x: '2', y: 445 },
  { x: '3', y: 470 },
  { x: '4', y: 490 },
  { x: '5', y: 520 },
  { x: '6', y: 575 },
  { x: '7', y: 600 },
  { x: '8', y: 605 },
  { x: '9', y: 2040 },
];

const DiversityBalanceSection = memo(({ content }: Props) => {
  return (
    <section className="relative py-12 md:py-16 bg-[#0A101F] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-sm md:text-base text-white/55 leading-relaxed">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_2fr] items-center gap-8 md:gap-10">
          <div className="flex flex-col gap-2">
            {content.tasks.map((t) => (
              <span
                key={t}
                className="text-xs text-white/65 px-4 py-2 rounded border border-white/10 bg-white/[0.02] text-center md:text-left whitespace-nowrap"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="text-center">
            <Sparkles size={28} strokeWidth={1.2} className="text-[#F4845F] mx-auto mb-3" />
            <p className="text-sm font-semibold text-white">{content.middle.title}</p>
            <p className="text-xs text-white/45 mt-1">{content.middle.subtitle}</p>
            <svg
              aria-hidden="true"
              className="hidden md:block mx-auto mt-4 text-[#F4845F]/50"
              width="40"
              height="12"
              viewBox="0 0 40 12"
              fill="none"
            >
              <path d="M0 6h36m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
            <div className="h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={histogram} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <XAxis
                    dataKey="x"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(244,132,95,0.05)' }}
                    contentStyle={{
                      background: '#0B1224',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6,
                      fontSize: 12,
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="y" radius={[2, 2, 0, 0]}>
                    {histogram.map((d) => (
                      <Cell
                        key={d.x}
                        fill={d.x === '9' ? '#F4845F' : 'rgba(255,255,255,0.18)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-white/45 mt-3 leading-relaxed">{content.chartNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
});

DiversityBalanceSection.displayName = 'DiversityBalanceSection';
export default DiversityBalanceSection;

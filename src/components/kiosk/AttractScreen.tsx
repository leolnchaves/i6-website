import type { QuizContent } from '@/data/kiosk/config';
import symbolWhite from '@/assets/infinity6-symbol-white.png.asset.json';

interface Props {
  content: QuizContent;
  onStart: () => void;
}

const AttractScreen = ({ content, onStart }: Props) => {
  return (
    <button
      type="button"
      onClick={onStart}
      className="relative flex flex-col justify-between items-center w-full min-h-screen overflow-hidden px-12 pt-[10vmin] pb-[14vmin] text-center focus:outline-none"
    >


      {/* TOP — headline */}
      <div className="relative z-10 flex items-center justify-center flex-1 w-full">
        <h1
          className="text-[6vmin] leading-[1.05] font-bold max-w-none whitespace-nowrap"
          dangerouslySetInnerHTML={{ __html: content.attract.headline }}
        />
      </div>

      {/* MIDDLE — pulsing rings + CTA */}
      <div className="relative flex items-center justify-center flex-1 w-full">
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60vmin] h-[60vmin] rounded-full border border-[#F4845F]/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-[45vmin] h-[45vmin] rounded-full border border-[#F4845F]/30 animate-ping" style={{ animationDuration: '2.4s' }} />
          <div className="absolute w-[30vmin] h-[30vmin] rounded-full border border-[#F4845F]/40 animate-ping" style={{ animationDuration: '1.8s' }} />
        </div>

        <div className="relative z-10 px-[6vmin] py-[3vmin] rounded-full bg-[#F4845F] text-white text-[3vmin] font-semibold shadow-[0_0_60px_rgba(244,132,95,0.5)] animate-pulse">
          {content.attract.tapHint}
        </div>
      </div>

      {/* BOTTOM — symbol + tagline (lifted above the waves) */}
      <div className="relative z-10 flex flex-col items-center gap-[1.2vmin] flex-1 justify-end mb-[8vmin]">
        <img
          src={symbolWhite.url}
          alt={content.attract.brand}
          className="h-[12vmin] w-auto object-contain"
        />
        <p className="text-[2.6vmin] font-semibold tracking-[0.02em] leading-[1.15] text-white/95">
          The Platform for
          <br />
          <span className="font-bold text-[#F4845F]">Decision Advantage</span>
        </p>
      </div>
    </button>
  );
};

export default AttractScreen;

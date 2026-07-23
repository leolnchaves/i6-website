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
      className="relative flex flex-col justify-between items-center w-full min-h-screen px-12 py-[8vmin] text-center focus:outline-none"
    >
      {/* TOP — positioning statement */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-[6vmin] font-bold leading-[1.05] tracking-tight text-white">
          The Platform for
          <br />
          <span className="text-[#F4845F]">Decision Advantage</span>
        </h2>
      </div>

      {/* MIDDLE — pulsing rings + headline + CTA */}
      <div className="relative flex flex-col items-center justify-center">
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60vmin] h-[60vmin] rounded-full border border-[#F4845F]/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-[45vmin] h-[45vmin] rounded-full border border-[#F4845F]/30 animate-ping" style={{ animationDuration: '2.4s' }} />
          <div className="absolute w-[30vmin] h-[30vmin] rounded-full border border-[#F4845F]/40 animate-ping" style={{ animationDuration: '1.8s' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-[3vmin]">
          <h1
            className="text-[7vmin] leading-[1.05] font-bold max-w-[80vw]"
            dangerouslySetInnerHTML={{ __html: content.attract.headline }}
          />
          <div className="mt-[4vmin] px-[6vmin] py-[3vmin] rounded-full bg-[#F4845F] text-white text-[3vmin] font-semibold shadow-[0_0_60px_rgba(244,132,95,0.5)] animate-pulse">
            {content.attract.tapHint}
          </div>
        </div>
      </div>

      {/* BOTTOM — infinity6 symbol signature */}
      <div className="relative z-10">
        <img
          src={symbolWhite.url}
          alt={content.attract.brand}
          className="h-[8vmin] w-auto object-contain opacity-85"
        />
      </div>
    </button>
  );
};

export default AttractScreen;

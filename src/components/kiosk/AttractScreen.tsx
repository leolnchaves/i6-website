import type { QuizContent } from '@/data/kiosk/config';
import logoWhite from '@/assets/infinity6-logo-white.png';

interface Props {
  content: QuizContent;
  onStart: () => void;
}

const AttractScreen = ({ content, onStart }: Props) => {
  return (
    <button
      type="button"
      onClick={onStart}
      className="relative flex flex-col items-center w-full min-h-screen px-12 pt-[12vmin] text-center focus:outline-none"
    >
      {/* Pulsing rings */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60vmin] h-[60vmin] rounded-full border border-[#F4845F]/20 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute w-[45vmin] h-[45vmin] rounded-full border border-[#F4845F]/30 animate-ping" style={{ animationDuration: '2.4s' }} />
        <div className="absolute w-[30vmin] h-[30vmin] rounded-full border border-[#F4845F]/40 animate-ping" style={{ animationDuration: '1.8s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <img
          src={logoWhite}
          alt={content.attract.brand}
          className="h-[16vmin] w-auto object-contain"
        />
        <p className="-mt-[1vmin] text-[1.8vmin] font-medium tracking-wide text-white/75 max-w-[70vw]">
          The Platform for <strong className="font-bold text-white">Decision Advantage</strong>
        </p>
      </div>



      <div className="relative z-10 flex flex-col items-center gap-[3vmin] mt-[14vmin]">
        <h1
          className="text-[7vmin] leading-[1.05] font-bold max-w-[80vw]"
          dangerouslySetInnerHTML={{ __html: content.attract.headline }}
        />
        <div className="mt-[8vmin] px-[6vmin] py-[3vmin] rounded-full bg-[#F4845F] text-white text-[3vmin] font-semibold shadow-[0_0_60px_rgba(244,132,95,0.5)] animate-pulse">
          {content.attract.tapHint}
        </div>
      </div>
    </button>

  );
};

export default AttractScreen;

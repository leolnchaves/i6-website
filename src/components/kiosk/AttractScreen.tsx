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
      {/* Elegant flowing waves — inline SVG anchored to the bottom */}
      <svg
        aria-hidden
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 w-full h-[42vh] z-0 block"
      >
        <defs>
          <linearGradient id="waveFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4845F" stopOpacity="0" />
            <stop offset="60%" stopColor="#F4845F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F4845F" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="waveFadeSoft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4845F" stopOpacity="0" />
            <stop offset="100%" stopColor="#F4845F" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M0,260 C240,180 480,320 720,240 C960,160 1200,300 1440,220 L1440,320 L0,320 Z"
          fill="none"
          stroke="url(#waveFadeSoft)"
          strokeWidth="1"
        />
        <path
          d="M0,240 C220,150 500,280 720,210 C940,140 1220,270 1440,190"
          fill="none"
          stroke="url(#waveFade)"
          strokeWidth="1.2"
          opacity="0.55"
        />
        <path
          d="M0,270 C240,200 480,300 720,250 C960,200 1200,290 1440,230"
          fill="none"
          stroke="url(#waveFade)"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <path
          d="M0,295 C240,240 480,310 720,275 C960,240 1200,300 1440,260"
          fill="none"
          stroke="url(#waveFade)"
          strokeWidth="1.4"
          opacity="0.85"
        />
        <path
          d="M0,315 C240,285 480,315 720,300 C960,285 1200,315 1440,290"
          fill="none"
          stroke="#F4845F"
          strokeWidth="1.4"
          opacity="0.9"
        />
      </svg>


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

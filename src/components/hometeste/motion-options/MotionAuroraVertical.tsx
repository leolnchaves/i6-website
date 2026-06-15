// Option B — Aurora Vertical: a soft column of coral light slowly rising on the left
const MotionAuroraVertical = () => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    style={{
      maskImage:
        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
      WebkitMaskImage:
        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
    }}
    aria-hidden
  >
    <style>{`
      @keyframes aurora-rise-1 {
        0%   { transform: translate3d(-10%, 110%, 0) scale(1); }
        50%  { transform: translate3d(5%, 30%, 0) scale(1.15); }
        100% { transform: translate3d(-10%, -40%, 0) scale(1); }
      }
      @keyframes aurora-rise-2 {
        0%   { transform: translate3d(10%, 130%, 0) scale(0.9); }
        50%  { transform: translate3d(-8%, 50%, 0) scale(1.1); }
        100% { transform: translate3d(10%, -30%, 0) scale(0.9); }
      }
      @keyframes aurora-rise-3 {
        0%   { transform: translate3d(-5%, 150%, 0) scale(1.05); }
        50%  { transform: translate3d(8%, 60%, 0) scale(0.95); }
        100% { transform: translate3d(-5%, -20%, 0) scale(1.05); }
      }
      @keyframes aurora-shimmer {
        0%, 100% { opacity: 0.85; }
        50%      { opacity: 0.55; }
      }
    `}</style>

    {/* Soft vertical glow column anchoring the left edge */}
    <div
      className="absolute top-0 bottom-0 left-0 w-[40%]"
      style={{
        background:
          'linear-gradient(to right, rgba(244,132,95,0.08) 0%, rgba(244,132,95,0.03) 50%, transparent 100%)',
        animation: 'aurora-shimmer 12s ease-in-out infinite',
      }}
    />

    {/* Big diffuse blobs rising */}
    <div
      className="absolute"
      style={{
        left: '-8%',
        top: 0,
        width: '45vw',
        height: '45vw',
        background:
          'radial-gradient(circle at center, rgba(244,132,95,0.55) 0%, rgba(244,132,95,0.18) 35%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'aurora-rise-1 38s ease-in-out infinite',
      }}
    />
    <div
      className="absolute"
      style={{
        left: '-12%',
        top: 0,
        width: '38vw',
        height: '38vw',
        background:
          'radial-gradient(circle at center, rgba(255,170,130,0.45) 0%, rgba(244,132,95,0.15) 40%, transparent 75%)',
        filter: 'blur(70px)',
        animation: 'aurora-rise-2 52s ease-in-out infinite',
        animationDelay: '-12s',
      }}
    />
    <div
      className="absolute"
      style={{
        left: '-4%',
        top: 0,
        width: '32vw',
        height: '32vw',
        background:
          'radial-gradient(circle at center, rgba(244,132,95,0.4) 0%, rgba(244,132,95,0.12) 40%, transparent 75%)',
        filter: 'blur(90px)',
        animation: 'aurora-rise-3 46s ease-in-out infinite',
        animationDelay: '-22s',
      }}
    />
  </div>
);

export default MotionAuroraVertical;

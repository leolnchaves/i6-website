const MotionAuroraDrift = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes aurora-a { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(12vw,-8vh) scale(1.2);} }
      @keyframes aurora-b { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-14vw,6vh) scale(1.15);} }
      @keyframes aurora-c { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(8vw,10vh) scale(0.9);} }
      @keyframes aurora-d { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-6vw,-10vh) scale(1.1);} }
    `}</style>
    <div
      className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,132,95,0.55) 0%, rgba(244,132,95,0.15) 40%, rgba(244,132,95,0) 70%)',
        filter: 'blur(60px)',
        animation: 'aurora-a 24s ease-in-out infinite',
      }}
    />
    <div
      className="absolute bottom-[-20%] right-[-15%] w-[70vw] h-[70vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,132,95,0.45) 0%, rgba(244,132,95,0.12) 45%, rgba(244,132,95,0) 70%)',
        filter: 'blur(70px)',
        animation: 'aurora-b 30s ease-in-out infinite',
      }}
    />
    <div
      className="absolute top-[20%] left-[40%] w-[45vw] h-[45vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,132,95,0.35) 0%, rgba(244,132,95,0) 65%)',
        filter: 'blur(55px)',
        animation: 'aurora-c 36s ease-in-out infinite',
      }}
    />
    <div
      className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,132,95,0.30) 0%, rgba(244,132,95,0) 65%)',
        filter: 'blur(50px)',
        animation: 'aurora-d 32s ease-in-out infinite',
      }}
    />
  </div>
);

export default MotionAuroraDrift;

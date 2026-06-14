const MotionAuroraDrift = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes aurora-a { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(8vw,-6vh) scale(1.15);} }
      @keyframes aurora-b { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-10vw,4vh) scale(1.1);} }
      @keyframes aurora-c { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(4vw,8vh) scale(0.9);} }
    `}</style>
    <div
      className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,132,95,0.18) 0%, rgba(244,132,95,0) 65%)',
        filter: 'blur(40px)',
        animation: 'aurora-a 28s ease-in-out infinite',
      }}
    />
    <div
      className="absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,132,95,0.12) 0%, rgba(244,132,95,0) 60%)',
        filter: 'blur(50px)',
        animation: 'aurora-b 34s ease-in-out infinite',
      }}
    />
    <div
      className="absolute top-[30%] left-[35%] w-[35vw] h-[35vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,132,95,0.10) 0%, rgba(244,132,95,0) 60%)',
        filter: 'blur(40px)',
        animation: 'aurora-c 40s ease-in-out infinite',
      }}
    />
  </div>
);

export default MotionAuroraDrift;

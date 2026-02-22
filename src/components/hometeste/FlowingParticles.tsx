const FlowingParticles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 10}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#F4845F] motion-safe:animate-[particle-float_var(--dur)_ease-in-out_infinite_var(--delay)]"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            opacity: 0.15 + Math.random() * 0.25,
            '--delay': p.delay,
            '--dur': p.duration,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FlowingParticles;

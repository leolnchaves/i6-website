const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute bottom-0 left-0 w-[200%] h-40 md:h-56"
      viewBox="0 0 2880 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,160 C480,280 960,40 1440,160 C1920,280 2400,40 2880,160 L2880,320 L0,320 Z"
        fill="#F4845F"
        fillOpacity="0.08"
        className="motion-safe:animate-[wave-drift_12s_ease-in-out_infinite]"
      />
      <path
        d="M0,200 C480,80 960,280 1440,200 C1920,80 2400,280 2880,200 L2880,320 L0,320 Z"
        fill="#F4845F"
        fillOpacity="0.05"
        className="motion-safe:animate-[wave-drift_16s_ease-in-out_infinite_reverse]"
      />
    </svg>
  </div>
);

export default WaveBackground;

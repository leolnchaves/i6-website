
/**
 * Infinity symbol animation component
 * Creates an animated infinity symbol with light effect behind hero text
 * Separated component for easy removal if needed
 */
const InfinityAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Infinity Symbol with Light Effect */}
      <div className="relative">
        {/* Main Infinity Symbol - Simplified single path */}
        <svg 
          width="1200" 
          height="600" 
          viewBox="0 0 1200 600" 
          className="opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient definitions */}
          <defs>
            {/* Animated light gradient */}
            <linearGradient id="infinityLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-300 0;1500 0;-300 0"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>
            
            {/* Base color gradient */}
            <linearGradient id="infinityBase" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249,115,22,0.4)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.4)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.4)" />
            </linearGradient>
          </defs>
          
          {/* Simplified Infinity Symbol Path - Scaled up */}
          <path
            d="M 240 300 C 240 180, 360 180, 420 240 C 480 180, 600 180, 600 300 C 600 420, 480 420, 420 360 C 360 420, 240 420, 240 300 Z M 600 300 C 600 180, 720 180, 780 240 C 840 180, 960 180, 960 300 C 960 420, 840 420, 780 360 C 720 420, 600 420, 600 300 Z"
            fill="url(#infinityBase)"
            stroke="url(#infinityLight)"
            strokeWidth="8"
            className="animate-pulse"
          />
        </svg>

        {/* Rotating glow effect - Scaled up */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-[900px] h-[450px] bg-gradient-to-r from-orange-400/15 via-blue-400/20 to-orange-400/15 rounded-full blur-3xl animate-spin"
            style={{
              animationDuration: '12s'
            }}
          ></div>
        </div>

        {/* Sliding light effect - Scaled up */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-[750px] h-[375px] bg-gradient-to-r from-transparent via-white/18 to-transparent rounded-full blur-xl animate-slide-curve"
            style={{
              animationDuration: '3s',
              animationDelay: '0.8s'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InfinityAnimation;

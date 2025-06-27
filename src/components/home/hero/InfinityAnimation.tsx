

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
          width="400" 
          height="200" 
          viewBox="0 0 400 200" 
          className="opacity-40"
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
                values="-100 0;500 0;-100 0"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>
            
            {/* Base color gradient */}
            <linearGradient id="infinityBase" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249,115,22,0.3)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.3)" />
            </linearGradient>
          </defs>
          
          {/* Simplified Infinity Symbol Path */}
          <path
            d="M 80 100 C 80 60, 120 60, 140 80 C 160 60, 200 60, 200 100 C 200 140, 160 140, 140 120 C 120 140, 80 140, 80 100 Z M 200 100 C 200 60, 240 60, 260 80 C 280 60, 320 60, 320 100 C 320 140, 280 140, 260 120 C 240 140, 200 140, 200 100 Z"
            fill="url(#infinityBase)"
            stroke="url(#infinityLight)"
            strokeWidth="3"
            className="animate-pulse"
          />
        </svg>

        {/* Rotating glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-72 h-36 bg-gradient-to-r from-orange-400/10 via-blue-400/15 to-orange-400/10 rounded-full blur-2xl animate-spin"
            style={{
              animationDuration: '12s'
            }}
          ></div>
        </div>

        {/* Sliding light effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-60 h-30 bg-gradient-to-r from-transparent via-white/12 to-transparent rounded-full blur-lg animate-slide-curve"
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


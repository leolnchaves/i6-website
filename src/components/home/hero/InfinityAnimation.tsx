
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
        {/* Main Infinity Symbol */}
        <svg 
          width="600" 
          height="300" 
          viewBox="0 0 600 300" 
          className="opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient for light effect */}
          <defs>
            <linearGradient id="infinityLightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-150 0;600 0;-150 0"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>
            
            {/* Base gradient for the symbol */}
            <linearGradient id="infinityBaseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249,115,22,0.2)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.2)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.2)" />
            </linearGradient>
          </defs>
          
          {/* Infinity Symbol Path - Simplified and corrected */}
          <path
            d="M 150 150 C 150 100, 200 100, 225 125 C 250 100, 300 100, 300 125 C 300 150, 250 175, 225 150 C 200 175, 150 175, 150 150 Z
               M 300 150 C 300 125, 350 125, 375 150 C 400 125, 450 125, 450 150 C 450 200, 400 200, 375 175 C 350 200, 300 200, 300 150 Z"
            fill="url(#infinityBaseGradient)"
            stroke="url(#infinityLightGradient)"
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>

        {/* Additional glowing effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-80 h-40 bg-gradient-to-r from-transparent via-white/8 to-transparent rounded-full blur-xl animate-slide-curve"
            style={{
              animationDuration: '3s',
              animationDelay: '0.5s'
            }}
          ></div>
        </div>

        {/* Subtle rotating glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-64 h-32 bg-gradient-to-r from-orange-400/8 via-blue-400/12 to-orange-400/8 rounded-full blur-2xl animate-spin"
            style={{
              animationDuration: '15s'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InfinityAnimation;

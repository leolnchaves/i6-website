
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const GradientBackground = ({ className, children }: GradientBackgroundProps) => {
  return (
    <div className={cn("relative", className)}>
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(220, 38, 38, 0.9) 0%, transparent 50%),
            radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.9) 0%, transparent 50%),
            radial-gradient(circle at top right, rgba(0, 0, 0, 0.9) 0%, transparent 50%),
            radial-gradient(circle at bottom right, rgba(234, 88, 12, 0.9) 0%, transparent 50%),
            linear-gradient(135deg, rgba(185, 28, 28, 0.8) 0%, rgba(29, 78, 216, 0.8) 25%, rgba(0, 0, 0, 0.8) 50%, rgba(194, 65, 12, 0.8) 75%, rgba(124, 45, 18, 0.8) 100%)
          `
        }}
      />
      {children}
    </div>
  );
};

export default GradientBackground;

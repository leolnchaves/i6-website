
import { memo, lazy, Suspense } from 'react';

// Lazy load the AnimatedProcessFlow for better performance
const AnimatedProcessFlow = lazy(() => import('./AnimatedProcessFlow'));

const ProcessFlow = memo(() => {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-96"></div>
      </div>
    }>
      <AnimatedProcessFlow />
    </Suspense>
  );
});

ProcessFlow.displayName = 'ProcessFlow';

export default ProcessFlow;

import { useEffect, useState } from 'react';

function ProgressBar({
  progress = 0,
  height = 2,
  color = 'primary',
  showIndicator = false,
  duration = 5000,
  onComplete,
  isRunning = true,
}) {
  const [internalProgress, setInternalProgress] = useState(0);

  // 自动进度
  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / duration) * 100;

        if (newProgress >= 100) {
          setInternalProgress(100);
          clearInterval(timer);
          onComplete?.();
        } else {
          setInternalProgress(newProgress);
        }
      }, 16); // 约60fps

      return () => clearInterval(timer);
    } else {
      setInternalProgress(0);
    }
  }, [isRunning, duration, onComplete]);

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 背景 */}
      <div
        className="bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        {/* 进度条 */}
        <div
          className={`h-full transition-all duration-300 ${colorClasses[color]}`}
          style={{
            width: `${progress || internalProgress}%`,
            transition: 'width 0.3s linear',
          }}
        />
      </div>

      {/* 指示器 */}
      {showIndicator && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 transform transition-all duration-300 ${isRunning ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ left: `${progress || internalProgress}%` }}
        >
          <div className={`w-3 h-3 rounded-full ${colorClasses[color]} shadow-lg -translate-x-1/2`}>
            <div className="absolute inset-0 rounded-full animate-ping opacity-75" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressBar; 
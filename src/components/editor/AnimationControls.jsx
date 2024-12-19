import { useState } from 'react';
import { ANIMATION_PRESETS } from '../../constants/animations';
import { generateAnimationStyle } from '../../utils/animationUtils';

function AnimationControls({ animation, config, onChange, onConfigChange }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onConfigChange({
      ...config,
      animationPaused: isPlaying,
    });
  };

  const handleSpeedChange = (speed) => {
    onConfigChange({
      ...config,
      duration: config.duration / speed,
    });
  };

  const handleDirectionChange = (direction) => {
    onConfigChange({
      ...config,
      animationDirection: direction,
    });
  };

  return (
    <div className="space-y-6">
      {/* 播放控制 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="material-icons">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">速度</span>
            {[0.5, 1, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-1 rounded text-sm transition-colors ${config.duration === 2 / speed
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100'
                  }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDirectionChange('normal')}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${config.animationDirection === 'normal' && 'text-primary-600'
              }`}
          >
            <span className="material-icons">north</span>
          </button>
          <button
            onClick={() => handleDirectionChange('reverse')}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${config.animationDirection === 'reverse' && 'text-primary-600'
              }`}
          >
            <span className="material-icons">south</span>
          </button>
          <button
            onClick={() => handleDirectionChange('alternate')}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${config.animationDirection === 'alternate' && 'text-primary-600'
              }`}
          >
            <span className="material-icons">sync_alt</span>
          </button>
        </div>
      </div>

      {/* 动画参数 */}
      <div className="space-y-4">
        {/* 持续时间 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            持续时间
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={config.duration}
            onChange={(e) => onConfigChange({
              ...config,
              duration: parseFloat(e.target.value),
            })}
            className="custom-range w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>0.5s</span>
            <span>{config.duration}s</span>
            <span>5s</span>
          </div>
        </div>

        {/* 缓动函数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            缓动函数
          </label>
          <select
            value={config.timing}
            onChange={(e) => onConfigChange({
              ...config,
              timing: e.target.value,
            })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="linear">线性</option>
            <option value="ease">缓动</option>
            <option value="ease-in">缓入</option>
            <option value="ease-out">缓出</option>
            <option value="ease-in-out">缓入缓出</option>
          </select>
        </div>

        {/* 循环次数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            循环次数
          </label>
          <select
            value={config.iterationCount}
            onChange={(e) => onConfigChange({
              ...config,
              iterationCount: e.target.value,
            })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="1">1次</option>
            <option value="2">2次</option>
            <option value="3">3次</option>
            <option value="infinite">无限循环</option>
          </select>
        </div>
      </div>

      {/* 预览 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          效果预览
        </label>
        <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
          <div
            className="w-full h-full flex items-center justify-center"
            style={generateAnimationStyle(animation, {
              ...config,
              animationPlayState: isPlaying ? 'running' : 'paused',
            })}
          >
            <div className="w-16 h-16 bg-primary-500 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationControls; 
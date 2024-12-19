import { useState } from 'react';
import { TIMING_FUNCTIONS } from '../../config/animations';

function AnimationPreview({ animation, onConfigChange }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const generateAnimationStyle = () => {
    const { type, config = {} } = animation;
    if (type === 'none') return {};

    const {
      duration = 2,
      timing = 'ease-in-out',
      delay = 0,
      iterationCount = 'infinite',
    } = config;

    return {
      animation: `${type} ${duration}s ${timing} ${delay}s ${iterationCount}`,
      animationPlayState: isPlaying ? 'running' : 'paused',
    };
  };

  return (
    <div className="space-y-6">
      {/* 预览区域 */}
      <div className="h-40 bg-gray-50 rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-12 h-12 bg-primary-500 rounded-lg"
            style={generateAnimationStyle()}
          />
        </div>
      </div>

      {/* 控制面板 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            动画时长
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={animation.config?.duration || 2}
            onChange={(e) =>
              onConfigChange({
                ...animation.config,
                duration: parseFloat(e.target.value),
              })
            }
            className="w-full custom-range"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>0.5s</span>
            <span>{animation.config?.duration || 2}s</span>
            <span>5s</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            缓动函数
          </label>
          <select
            value={animation.config?.timing || 'ease-in-out'}
            onChange={(e) =>
              onConfigChange({
                ...animation.config,
                timing: e.target.value,
              })
            }
            className="w-full rounded-lg border-gray-300"
          >
            {TIMING_FUNCTIONS.map((timing) => (
              <option key={timing.value} value={timing.value}>
                {timing.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            延迟时间
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={animation.config?.delay || 0}
            onChange={(e) =>
              onConfigChange({
                ...animation.config,
                delay: parseFloat(e.target.value),
              })
            }
            className="w-full custom-range"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>0s</span>
            <span>{animation.config?.delay || 0}s</span>
            <span>2s</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            重复次数
          </label>
          <select
            value={animation.config?.iterationCount || 'infinite'}
            onChange={(e) =>
              onConfigChange({
                ...animation.config,
                iterationCount: e.target.value,
              })
            }
            className="w-full rounded-lg border-gray-300"
          >
            <option value="1">1次</option>
            <option value="2">2次</option>
            <option value="3">3次</option>
            <option value="infinite">无限循环</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <span className="material-icons mr-2">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimationPreview; 
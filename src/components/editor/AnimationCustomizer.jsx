import { useState } from 'react';
import { TIMING_FUNCTIONS } from '../../config/animations';
import useImageStore from '../../store/imageStore';

function AnimationCustomizer() {
  const { background, setBackground } = useImageStore();
  const [customParams, setCustomParams] = useState({
    duration: 2,
    delay: 0,
    timing: 'ease',
    iterationCount: 'infinite',
  });

  const handleParamChange = (param, value) => {
    setCustomParams(prev => {
      const newParams = { ...prev, [param]: value };
      setBackground({
        animationCustom: newParams,
      });
      return newParams;
    });
  };

  if (background.animation === 'none') return null;

  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-4">动画参数设置</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* 动画时长 */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            动画时长
            <span className="ml-2 text-xs text-gray-400">{customParams.duration}秒</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={customParams.duration}
            onChange={(e) => handleParamChange('duration', Number(e.target.value))}
            className="w-full custom-range"
          />
        </div>

        {/* 延迟时间 */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            延迟时间
            <span className="ml-2 text-xs text-gray-400">{customParams.delay}秒</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={customParams.delay}
            onChange={(e) => handleParamChange('delay', Number(e.target.value))}
            className="w-full custom-range"
          />
        </div>

        {/* 缓动函数 */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">缓动函数</label>
          <div className="relative">
            <select
              value={customParams.timing}
              onChange={(e) => handleParamChange('timing', e.target.value)}
              className="w-full rounded border-gray-200 text-sm appearance-none bg-white pr-10 py-2 cursor-pointer hover:border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              {TIMING_FUNCTIONS.map((timing) => (
                <option key={timing.value} value={timing.value}>
                  {timing.label}
                </option>
              ))}
            </select>
            {/* 添加下拉箭头图标 */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <span className="material-icons text-gray-400 text-lg">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* 重复次数 */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">重复次数</label>
          <div className="relative">
            <select
              value={customParams.iterationCount}
              onChange={(e) => handleParamChange('iterationCount', e.target.value)}
              className="w-full rounded border-gray-200 text-sm appearance-none bg-white pr-10 py-2 cursor-pointer hover:border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="infinite">无限循环</option>
              <option value="1">1 次</option>
              <option value="2">2 次</option>
              <option value="3">3 次</option>
              <option value="5">5 次</option>
            </select>
            {/* 添加下拉箭头图标 */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <span className="material-icons text-gray-400 text-lg">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationCustomizer; 
import { useState } from 'react';
import useImageStore from '../../store/imageStore';
import { BLEND_MODES } from '../../config/backgroundPresets';

function BackgroundAdvancedOptions({ type }) {
  const { background, setBackground } = useImageStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleBlurChange = (value) => {
    setBackground({ blur: Math.max(0, Math.min(20, value)) });
  };

  const handleOpacityChange = (value) => {
    setBackground({ opacity: Math.max(0, Math.min(100, value)) / 100 });
  };

  const handleScaleChange = (value) => {
    setBackground({ scale: Math.max(50, Math.min(200, value)) / 100 });
  };

  const handlePositionChange = (x, y) => {
    setBackground({ position: { x, y } });
  };

  if (!['image', 'gradient'].includes(type)) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 hover:text-gray-900 w-full justify-between"
      >
        <span className="text-sm font-medium">高级选项</span>
        <span className="material-icons text-sm">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* 混合模式选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              混合模式
            </label>
            <select
              value={background.blendMode || 'normal'}
              onChange={(e) => setBackground({ blendMode: e.target.value })}
              className="w-full rounded-lg border-gray-300"
            >
              {BLEND_MODES.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          {/* 模糊度控制 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              模糊度
              <span className="ml-2 text-gray-500">
                {background.blur || 0}px
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={background.blur || 0}
              onChange={(e) => handleBlurChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 不透明度控制 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              不透明度
              <span className="ml-2 text-gray-500">
                {Math.round((background.opacity || 1) * 100)}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round((background.opacity || 1) * 100)}
              onChange={(e) => handleOpacityChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {type === 'image' && (
            <>
              {/* 缩放控制 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  缩放
                  <span className="ml-2 text-gray-500">
                    {Math.round((background.scale || 1) * 100)}%
                  </span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={Math.round((background.scale || 1) * 100)}
                  onChange={(e) => handleScaleChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 位置控制 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  位置调整
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={background.position?.x || 0}
                    onChange={(e) =>
                      handlePositionChange(Number(e.target.value), background.position?.y || 0)
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={background.position?.y || 0}
                    onChange={(e) =>
                      handlePositionChange(background.position?.x || 0, Number(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BackgroundAdvancedOptions; 
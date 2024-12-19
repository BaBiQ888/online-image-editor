import { useState } from 'react';
import { ANIMATION_PRESETS } from '../../constants/animations';
import { generateAnimationStyle } from '../../utils/animationUtils';

function AnimationPresets({ value, onChange }) {
  const [hoveredPreset, setHoveredPreset] = useState(null);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">预设动画</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ANIMATION_PRESETS.map((preset) => {
          const isSelected = value === preset.name;
          return (
            <button
              key={preset.name}
              className={`relative p-4 rounded-xl text-left transition-all ${isSelected
                  ? 'bg-primary-50 border-2 border-primary-500'
                  : 'bg-white border-2 border-gray-200 hover:border-primary-200'
                }`}
              onClick={() => onChange(preset.name)}
              onMouseEnter={() => setHoveredPreset(preset.name)}
              onMouseLeave={() => setHoveredPreset(null)}
            >
              {/* 图标和标题 */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                  <span className={`material-icons ${isSelected ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                    {preset.icon}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {preset.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {preset.description}
                  </div>
                </div>
              </div>

              {/* 预览区域 */}
              <div className="relative h-16 bg-gray-50 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={generateAnimationStyle(preset.name, preset.defaultConfig)}
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-lg" />
                </div>
              </div>

              {/* 悬停提示 */}
              {hoveredPreset === preset.name && preset.defaultConfig && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                  {`${preset.defaultConfig.duration}s ${preset.defaultConfig.timing}`}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AnimationPresets; 
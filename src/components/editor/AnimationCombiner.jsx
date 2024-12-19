import { useState } from 'react';
import { ANIMATION_PRESETS } from '../../config/animations';

function AnimationCombiner({ animations = [], onAnimationsChange }) {
  const [selectedPreset, setSelectedPreset] = useState(ANIMATION_PRESETS[0]);

  const handleAdd = () => {
    if (selectedPreset) {
      onAnimationsChange([
        ...animations,
        {
          type: selectedPreset.name,
          config: selectedPreset.defaultConfig || {},
        },
      ]);
    }
  };

  const handleRemove = (index) => {
    const newAnimations = animations.filter((_, i) => i !== index);
    onAnimationsChange(newAnimations);
  };

  return (
    <div className="space-y-6">
      {/* 添加动画 */}
      <div className="flex gap-4">
        <select
          value={selectedPreset.name}
          onChange={(e) =>
            setSelectedPreset(
              ANIMATION_PRESETS.find((p) => p.name === e.target.value)
            )
          }
          className="flex-1 rounded-lg border-gray-300"
        >
          {ANIMATION_PRESETS.filter((p) => p.name !== 'none').map((preset) => (
            <option key={preset.name} value={preset.name}>
              {preset.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="btn bg-primary-500 text-white hover:bg-primary-600"
        >
          添加动画
        </button>
      </div>

      {/* 动画列表 */}
      <div className="space-y-4">
        {animations.map((animation, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <span className="material-icons text-gray-400">
              {
                ANIMATION_PRESETS.find((p) => p.name === animation.type)
                  ?.icon
              }
            </span>
            <div className="flex-1">
              <div className="font-medium">
                {
                  ANIMATION_PRESETS.find((p) => p.name === animation.type)
                    ?.label
                }
              </div>
              <div className="text-sm text-gray-500">
                {animation.config?.duration}s {animation.config?.timing}
              </div>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-600"
            >
              <span className="material-icons">delete</span>
            </button>
          </div>
        ))}

        {animations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            还没有添加任何动画
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimationCombiner; 
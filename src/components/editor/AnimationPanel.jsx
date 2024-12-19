import { useState } from 'react';
import { ANIMATION_PRESETS } from '../../config/animations';
import AnimationPreview from './AnimationPreview';
import AnimationCombiner from './AnimationCombiner';

function AnimationPanel({ animation, onAnimationChange }) {
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'custom' | 'combine'

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">动画效果</h3>
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'presets'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('presets')}
          >
            预设
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'custom'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('custom')}
          >
            自定义
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'combine'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('combine')}
          >
            组合
          </button>
        </div>
      </div>

      {activeTab === 'presets' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {ANIMATION_PRESETS.map((preset) => (
            <button
              key={preset.name}
              className={`p-4 rounded-lg text-left transition-all ${animation.type === preset.name
                  ? 'bg-primary-50 border-2 border-primary-500'
                  : 'bg-white border-2 border-gray-200 hover:border-primary-200'
                }`}
              onClick={() => onAnimationChange({ type: preset.name })}
            >
              <span className={`material-icons text-2xl mb-2 ${animation.type === preset.name ? 'text-primary-500' : 'text-gray-400'
                }`}>
                {preset.icon}
              </span>
              <div className="font-medium text-gray-900">{preset.label}</div>
              <div className="text-sm text-gray-500">{preset.description}</div>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="space-y-6">
          <AnimationPreview
            animation={animation}
            onConfigChange={(config) =>
              onAnimationChange({ ...animation, config })
            }
          />
        </div>
      )}

      {activeTab === 'combine' && (
        <AnimationCombiner
          animations={animation.combined || []}
          onAnimationsChange={(combined) =>
            onAnimationChange({ ...animation, combined })
          }
        />
      )}
    </div>
  );
}

export default AnimationPanel; 
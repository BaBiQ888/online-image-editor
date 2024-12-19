import { useState } from 'react';
import { BACKGROUND_TYPES, GRADIENT_PRESETS, COLOR_PRESETS } from '../../constants/backgrounds';
import ColorPicker from '../common/ColorPicker';
import { generateGradientStyle } from '../../utils/gradientUtils';
import AnimationPanel from './AnimationPanel';

function BackgroundEditor({ background = {}, onChange = () => { } }) {
  const [activeTab, setActiveTab] = useState('type'); // 'type' | 'settings' | 'animation'

  // 确保有默认值
  const currentBackground = {
    type: 'transparent',
    color: '#ffffff',
    opacity: 1,
    gradient: {
      from: '#FF512F',
      to: '#F09819',
      direction: '45deg',
    },
    animation: {
      type: 'none',
      config: {},
      combined: [],
    },
    ...background,
  };

  const handleTypeChange = (type) => {
    const newBackground = {
      ...currentBackground,
      type,
      ...(type === 'gradient' && {
        from: GRADIENT_PRESETS[0].from,
        to: GRADIENT_PRESETS[0].to,
        direction: GRADIENT_PRESETS[0].direction,
      }),
      ...(type === 'color' && {
        color: COLOR_PRESETS[0],
      }),
    };
    onChange(newBackground);

    // 如果选择了非透明背景，自动切换到设置标签
    if (type !== 'transparent') {
      setActiveTab('settings');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">背景设置</h3>
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'type'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('type')}
          >
            类型
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'settings'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('settings')}
            disabled={currentBackground.type === 'transparent'}
          >
            设置
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'animation'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('animation')}
            disabled={currentBackground.type === 'transparent'}
          >
            动画
          </button>
        </div>
      </div>

      {activeTab === 'type' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BACKGROUND_TYPES.map((type) => (
            <button
              key={type.type}
              className={`p-4 rounded-lg text-left transition-all ${currentBackground.type === type.type
                ? 'bg-primary-50 border-2 border-primary-500'
                : 'bg-white border-2 border-gray-200 hover:border-primary-200'
                }`}
              onClick={() => handleTypeChange(type.type)}
            >
              <span className={`material-icons text-2xl mb-2 ${currentBackground.type === type.type ? 'text-primary-500' : 'text-gray-400'
                }`}>
                {type.icon}
              </span>
              <div className="font-medium text-gray-900">{type.label}</div>
              <div className="text-sm text-gray-500">{type.description}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {currentBackground.type === 'color' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  颜色选择
                </label>
                <ColorPicker
                  color={currentBackground.color}
                  onChange={(color) => onChange({ ...currentBackground, color })}
                  presets={COLOR_PRESETS}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  不透明度
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentBackground.opacity * 100}
                  onChange={(e) => onChange({
                    ...currentBackground,
                    opacity: parseInt(e.target.value) / 100,
                  })}
                  className="custom-range w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{Math.round(currentBackground.opacity * 100)}%</span>
                  <span>100%</span>
                </div>
              </div>
            </>
          )}

          {currentBackground.type === 'gradient' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  渐变预设
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      className={`relative p-4 rounded-lg text-left transition-all ${currentBackground.gradient.from === preset.from &&
                        currentBackground.gradient.to === preset.to
                        ? 'ring-2 ring-primary-500'
                        : 'hover:ring-2 hover:ring-primary-200'
                        }`}
                      onClick={() => onChange({
                        ...currentBackground,
                        gradient: {
                          ...currentBackground.gradient,
                          ...preset,
                        },
                      })}
                      style={{
                        background: generateGradientStyle(preset),
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg" />
                      <span className="relative text-white font-medium text-shadow">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  渐变方向
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={parseInt(currentBackground.gradient.direction)}
                    onChange={(e) => onChange({
                      ...currentBackground,
                      gradient: {
                        ...currentBackground.gradient,
                        direction: `${e.target.value}deg`,
                      },
                    })}
                    className="flex-1 custom-range"
                  />
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <div
                      className="w-4 h-4 border-2 border-gray-400"
                      style={{
                        transform: `rotate(${currentBackground.gradient.direction})`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  不透明度
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentBackground.opacity * 100}
                  onChange={(e) => onChange({
                    ...currentBackground,
                    opacity: parseInt(e.target.value) / 100,
                  })}
                  className="w-full custom-range"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{Math.round(currentBackground.opacity * 100)}%</span>
                  <span>100%</span>
                </div>
              </div>
            </>
          )}

          {currentBackground.type === 'image' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上传背景图
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        onChange({
                          ...currentBackground,
                          url: e.target?.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="bg-image-upload"
                />
                <label
                  htmlFor="bg-image-upload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                >
                  {currentBackground.url ? (
                    <img
                      src={currentBackground.url}
                      alt="Background"
                      className="h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="material-icons text-gray-400 text-3xl mb-2">
                        cloud_upload
                      </span>
                      <div className="text-sm text-gray-500">
                        点击或拖拽上传图片
                      </div>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  缩放比例
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={(currentBackground.scale || 1) * 100}
                  onChange={(e) => onChange({
                    ...currentBackground,
                    scale: parseInt(e.target.value) / 100,
                  })}
                  className="w-full custom-range"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>50%</span>
                  <span>{Math.round((currentBackground.scale || 1) * 100)}%</span>
                  <span>200%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  虚化比例
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={currentBackground.blur || 0}
                  onChange={(e) => onChange({
                    ...currentBackground,
                    blur: parseInt(e.target.value),
                  })}
                  className="w-full custom-range"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0px</span>
                  <span>{currentBackground.blur || 0}px</span>
                  <span>20px</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  不透明度
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentBackground.opacity * 100}
                  onChange={(e) => onChange({
                    ...currentBackground,
                    opacity: parseInt(e.target.value) / 100,
                  })}
                  className="w-full custom-range"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{Math.round(currentBackground.opacity * 100)}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'animation' && currentBackground.type !== 'transparent' && (
        <AnimationPanel
          animation={currentBackground.animation}
          onAnimationChange={(animation) =>
            onChange({
              ...currentBackground,
              animation,
            })
          }
        />
      )}
    </div>
  );
}

export default BackgroundEditor; 
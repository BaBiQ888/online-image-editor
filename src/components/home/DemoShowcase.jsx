import { useState } from 'react';

const DEMO_ITEMS = [
  {
    title: '智能抠图',
    description: '一键去除背景，效果自然精准',
    icon: 'auto_fix_high',
    color: 'blue',
  },
  {
    title: '背景替换',
    description: '支持纯色、渐变、图片背景',
    icon: 'style',
    color: 'purple',
  },
  {
    title: '细节优化',
    description: '智能优化边缘细节',
    icon: 'tune',
    color: 'green',
  },
  {
    title: '图片编辑',
    description: '支持裁剪、旋转等基础编辑',
    icon: 'crop_rotate',
    color: 'orange',
  },
  {
    title: '动画效果',
    description: '丰富的动画预设和自定义选项',
    icon: 'animation',
    color: 'pink',
  },
];

function DemoShowcase() {
  const [activeDemo, setActiveDemo] = useState(0);

  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          看看效果
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          快速、精准、专业的图片处理效果
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：功能展示 */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {DEMO_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all ${activeDemo === index
                  ? 'bg-primary-50 border-l-4 border-primary-500'
                  : 'hover:bg-gray-50'
                  }`}
                onClick={() => setActiveDemo(index)}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeDemo === index
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  <span className="material-icons text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 右侧：功能说明 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${activeDemo === 0
                  ? 'bg-blue-100 text-blue-600'
                  : activeDemo === 1
                    ? 'bg-purple-100 text-purple-600'
                    : activeDemo === 2
                      ? 'bg-green-100 text-green-600'
                      : activeDemo === 3
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-pink-100 text-pink-600'
                  }`}
              >
                <span className="material-icons text-3xl">
                  {DEMO_ITEMS[activeDemo].icon}
                </span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {DEMO_ITEMS[activeDemo].title}
              </h3>
              <p className="text-gray-500">
                {DEMO_ITEMS[activeDemo].description}
              </p>
            </div>

            <div className="space-y-4">
              {/* 功能特点 */}
              {activeDemo === 0 && (
                <>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>智能识别主体对象</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>精准分离前景背景</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>保留细节不失真</span>
                  </div>
                </>
              )}
              {activeDemo === 1 && (
                <>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>多种背景类型选择</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>自定义渐变方向</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>背景透明度调节</span>
                  </div>
                </>
              )}
              {activeDemo === 2 && (
                <>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>智能边缘优化</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>去除杂点和噪声</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>保持边缘平滑</span>
                  </div>
                </>
              )}
              {activeDemo === 3 && (
                <>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>自由裁剪尺寸</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>任意角度旋转</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>镜像翻转调整</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>保持图片质量</span>
                  </div>
                </>
              )}
              {activeDemo === 4 && (
                <>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>多种动画预设</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>自定义动画参数</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>组合动画效果</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="material-icons text-green-500">check_circle</span>
                    <span>导出动态GIF</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoShowcase; 
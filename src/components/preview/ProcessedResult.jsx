import { useState } from 'react';

function ProcessedResult({ processedImage, maskImage, background }) {
  const [activeView, setActiveView] = useState('processed'); // 'processed' | 'mask' | 'compare'

  const views = [
    {
      id: 'processed',
      label: '处理结果',
      icon: 'auto_fix_high',
      image: processedImage,
    },
    {
      id: 'mask',
      label: '遮罩预览',
      icon: 'brush',
      image: maskImage,
    },
    {
      id: 'compare',
      label: '对比视图',
      icon: 'compare',
    },
  ];

  // 生成背景样式
  const getBackgroundStyle = () => {
    switch (background.type) {
      case 'color':
        return {
          backgroundColor: background.color,
          opacity: background.opacity,
        };
      case 'gradient':
        return {
          background: `linear-gradient(${background.gradient.direction}, ${background.gradient.from}, ${background.gradient.to})`,
          opacity: background.opacity,
        };
      default:
        return {
          background: 'transparent',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">处理结果</h2>
        {/* 视图切换 */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          {views.map((view) => (
            <button
              key={view.id}
              className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${activeView === view.id
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-600 hover:text-gray-900'
                }`}
              onClick={() => setActiveView(view.id)}
            >
              <span className="material-icons text-sm">{view.icon}</span>
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* 预览区域 */}
      <div className="aspect-video bg-checkerboard rounded-lg overflow-hidden relative">
        {/* 背景层 */}
        <div
          className="absolute inset-0"
          style={getBackgroundStyle()}
        />

        {/* 图片层 */}
        <img
          src={processedImage}
          alt="Processed"
          className="relative w-full h-full object-contain"
        />
      </div>

      {/* 提示信息 */}
      <div className="mt-4 text-sm text-gray-500">
        {activeView === 'processed' && (
          <div className="flex items-center gap-2">
            <span className="material-icons text-sm">info</span>
            已成功去除背景，可以继续添加背景和动画效果
          </div>
        )}
        {activeView === 'mask' && (
          <div className="flex items-center gap-2">
            <span className="material-icons text-sm">brush</span>
            白色区域表示保留的主体部分，黑色区域表示去除的背景
          </div>
        )}
        {activeView === 'compare' && (
          <div className="flex items-center gap-2">
            <span className="material-icons text-sm">compare</span>
            左侧为处理结果，右侧为遮罩预览
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="mt-4 flex justify-end gap-3">
        <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
          <span className="material-icons mr-2">download</span>
          下载结果
        </button>
        <button className="btn bg-primary-500 text-white hover:bg-primary-600">
          <span className="material-icons mr-2">edit</span>
          继续编辑
        </button>
      </div>
    </div>
  );
}

export default ProcessedResult; 
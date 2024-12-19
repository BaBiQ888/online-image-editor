import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/dateUtils';

function HistoryPreview({ item, onClose, onNext, onPrev }) {
  const [activeView, setActiveView] = useState('after');
  const [isLoading, setIsLoading] = useState(true);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          onPrev?.();
          break;
        case 'ArrowRight':
          onNext?.();
          break;
        case 'Escape':
          onClose();
          break;
        case '1':
          setActiveView('before');
          break;
        case '2':
          setActiveView('after');
          break;
        case '3':
          setActiveView('mask');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const views = [
    { id: 'before', label: '原图 (1)', image: item.originalImage },
    { id: 'after', label: '效果图 (2)', image: item.processedImage },
    { id: 'mask', label: '遮罩图 (3)', image: item.maskImage },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-auto overflow-hidden">
        {/* 预览图 */}
        <div className="relative aspect-video bg-checkerboard">
          {/* 加载指示器 */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            </div>
          )}

          {views.map((view) => (
            <div
              key={view.id}
              className={`absolute inset-0 transition-opacity duration-300 ${activeView === view.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              <img
                src={view.image}
                alt={view.label}
                className="w-full h-full object-contain"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          ))}

          {/* 导航按钮 */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
              <span className="material-icons">chevron_left</span>
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
              <span className="material-icons">chevron_right</span>
            </button>
          )}
        </div>

        {/* 底部控制栏 */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              {/* 视图切换 */}
              <div className="flex rounded-lg bg-black/30 p-1">
                {views.map((view) => (
                  <button
                    key={view.id}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${activeView === view.id
                        ? 'bg-white text-black'
                        : 'hover:bg-white/10'
                      }`}
                    onClick={() => setActiveView(view.id)}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
              {/* 时间信息 */}
              <div className="text-sm opacity-75">
                {formatDate(item.timestamp)}
              </div>
            </div>

            {/* 背景信息 */}
            <div className="flex items-center gap-2">
              {item.background?.animation !== 'none' && (
                <span className="flex items-center gap-1 text-sm bg-black/30 px-2 py-1 rounded">
                  <span className="material-icons text-sm">animation</span>
                  动画效果
                </span>
              )}
              {item.background?.type === 'gradient' && (
                <span className="flex items-center gap-1 text-sm bg-black/30 px-2 py-1 rounded">
                  <span className="material-icons text-sm">gradient</span>
                  渐变背景
                </span>
              )}
              {item.isSample && (
                <span className="flex items-center gap-1 text-sm bg-primary-500 px-2 py-1 rounded">
                  示例
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors group"
        >
          <span className="material-icons">close</span>
          <span className="absolute right-full mr-2 px-2 py-1 text-sm bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ESC 关闭
          </span>
        </button>

        {/* 快捷键提示 */}
        <div className="absolute top-4 left-4 text-white text-sm">
          <div className="flex items-center gap-2 opacity-50">
            <span>← →</span>
            <span>切换记录</span>
            <span className="mx-2">|</span>
            <span>1 2 3</span>
            <span>切换视图</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPreview; 
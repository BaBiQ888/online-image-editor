import { useEffect } from 'react';

function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  // 按ESC关闭
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className={`relative bg-white rounded-xl shadow-xl w-full ${maxWidth}`}>
          {/* 标题栏 */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">{title}</h2>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <span className="material-icons">close</span>
                </button>
              )}
            </div>
          )}

          {/* 内容区域 */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal; 
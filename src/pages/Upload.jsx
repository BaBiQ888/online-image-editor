import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUpload from '../hooks/useUpload';
import HistoryModal from '../components/history/HistoryModal';
import DropZone from '../components/upload/DropZone';

function Upload() {
  const navigate = useNavigate();
  const { uploadAndProcess, isLoading, progress, error } = useUpload();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleUpload = useCallback(async (file) => {
    try {
      await uploadAndProcess(file);
      navigate('/preview');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [uploadAndProcess, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <span className="material-icons mr-2">arrow_back</span>
            返回首页
          </button>
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <span className="material-icons mr-2">history</span>
            历史记录
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              上传图片开始处理
            </h1>
            <p className="text-gray-500">
              支持 JPG、PNG、WEBP 等常见图片格式，最大 10MB
            </p>
          </div>

          {/* 上传区域 */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <DropZone
              onDrop={handleUpload}
              isLoading={isLoading}
              progress={progress}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* 功能提示 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-500 mb-4 transition-transform group-hover:scale-110">
                <span className="material-icons">photo_size_select_large</span>
              </div>
              <p className="text-sm text-gray-500">支持各种尺寸的图片</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-500 mb-4 transition-transform group-hover:scale-110">
                <span className="material-icons">lock</span>
              </div>
              <p className="text-sm text-gray-500">安全加密传输</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-500 mb-4 transition-transform group-hover:scale-110">
                <span className="material-icons">speed</span>
              </div>
              <p className="text-sm text-gray-500">快速处理</p>
            </div>
          </div>
        </div>
      </div>

      {/* 历史记录弹窗 */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}

export default Upload; 
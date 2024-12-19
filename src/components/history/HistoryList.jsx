import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageStore from '../../store/imageStore';

function HistoryList() {
  const navigate = useNavigate();
  const { history, loadFromHistory, deleteFromHistory } = useImageStore();

  const handleLoad = useCallback((record) => {
    loadFromHistory(record);
    navigate('/preview');
  }, [loadFromHistory, navigate]);

  if (history.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        暂无历史记录
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {history.map((record) => (
        <div
          key={record.id}
          className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden mb-4">
            <img
              src={record.originalImage}
              alt="Original"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {new Date(record.timestamp).toLocaleString()}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleLoad(record)}
                className="text-primary-600 hover:text-primary-700"
                title="加载"
              >
                <span className="material-icons">refresh</span>
              </button>
              <button
                onClick={() => deleteFromHistory(record.id)}
                className="text-red-600 hover:text-red-700"
                title="删除"
              >
                <span className="material-icons">delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryList; 
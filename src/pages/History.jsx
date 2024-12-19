import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageStore from '../store/imageStore';

function History() {
  const navigate = useNavigate();
  const { history, loadFromHistory, deleteFromHistory, clearHistory } = useImageStore();
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleLoad = (record) => {
    loadFromHistory(record);
    navigate('/preview');
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
  };

  const closeDetails = () => {
    setSelectedRecord(null);
  };

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
            onClick={clearHistory}
            className="text-red-600 hover:text-red-700 flex items-center"
          >
            <span className="material-icons mr-2">delete_sweep</span>
            清空历史
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">处理历史</h2>

        {history.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            暂无历史记录
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div
                  className="aspect-video bg-gray-50 rounded-lg overflow-hidden mb-4 cursor-pointer"
                  onClick={() => handleViewDetails(record)}
                >
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
                      onClick={() => handleViewDetails(record)}
                      className="text-primary-600 hover:text-primary-700"
                      title="查看详情"
                    >
                      <span className="material-icons">visibility</span>
                    </button>
                    <button
                      onClick={() => handleLoad(record)}
                      className="text-primary-600 hover:text-primary-700"
                      title="重新加载"
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
        )}

        {/* 详情弹窗 */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">处理详情</h3>
                <button
                  onClick={closeDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 原图 */}
                <div>
                  <h4 className="text-lg font-medium mb-2">原始图片</h4>
                  <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={selectedRecord.originalImage}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* 处理结果 */}
                <div>
                  <h4 className="text-lg font-medium mb-2">处理结果</h4>
                  <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={selectedRecord.processedImage}
                      alt="Processed"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* 遮罩图 */}
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium mb-2">遮罩预览</h4>
                  <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={selectedRecord.maskImage}
                      alt="Mask"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-4">
                <button
                  onClick={closeDetails}
                  className="btn border border-gray-300 hover:bg-gray-50"
                >
                  关闭
                </button>
                <button
                  onClick={() => {
                    handleLoad(selectedRecord);
                    closeDetails();
                  }}
                  className="btn btn-primary"
                >
                  重新加载
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default History; 
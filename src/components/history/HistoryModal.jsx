import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageStore from '../../store/imageStore';
import { formatDate } from '../../utils/dateUtils';
import HistoryPreview from './HistoryPreview';
import ConfirmDialog from '../common/ConfirmDialog';

function HistoryModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { history, loadFromHistory, deleteFromHistory, clearHistory } = useImageStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [previewItem, setPreviewItem] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 过滤和排序历史记录
  const filteredHistory = history
    .filter(item =>
      item.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return (new Date(b.timestamp) - new Date(a.timestamp)) * order;
    });

  // 使用选中项
  const handleUseSelected = () => {
    if (selectedItem) {
      loadFromHistory(selectedItem);
      onClose();
      navigate('/preview');
    }
  };

  // 双击项目直接使用
  const handleDoubleClick = (item) => {
    loadFromHistory(item);
    onClose();
    navigate('/preview');
  };

  // 按ESC关闭
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">历史记录</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* 工具栏 */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between gap-4">
              {/* 搜索框 */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="搜索历史记录..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    search
                  </span>
                </div>
              </div>

              {/* 排序控制 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 rounded hover:bg-gray-200"
                >
                  <span className="material-icons">
                    {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 历史记录列表 */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {filteredHistory.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredHistory.map((item) => (
                  <div
                    key={`${item.id}-${item.timestamp}`}
                    className={`relative rounded-lg border-2 cursor-pointer transition-all ${selectedItem?.id === item.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                      }`}
                    onClick={() => setSelectedItem(item)}
                    onDoubleClick={() => handleDoubleClick(item)}
                  >
                    <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={item.processedImage}
                        alt="Processed"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm text-gray-500">
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFromHistory(item.id);
                        if (selectedItem?.id === item.id) {
                          setSelectedItem(null);
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
                    >
                      <span className="material-icons text-sm">close</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="material-icons text-gray-400 text-4xl mb-2">
                  history
                </span>
                <p className="text-gray-500">暂无历史记录</p>
              </div>
            )}
          </div>

          {/* 底部操作栏 */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="text-gray-600 hover:text-gray-900"
              disabled={filteredHistory.length === 0}
            >
              <span className="material-icons mr-1">delete</span>
              清空历史
            </button>
            <button
              onClick={handleUseSelected}
              disabled={!selectedItem}
              className={`px-4 py-2 rounded-lg transition-colors ${selectedItem
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              使用选中项
            </button>
          </div>
        </div>
      </div>

      {/* 预览模式 */}
      {previewItem && (
        <HistoryPreview
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}

      {/* 确认弹窗 */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          clearHistory();
          setSelectedItem(null);
          setIsConfirmOpen(false);
        }}
        title="确认清空历史记录"
        message="确定要清空所有历史记录吗？此操作不可恢复。"
      />
    </div>
  );
}

export default HistoryModal; 
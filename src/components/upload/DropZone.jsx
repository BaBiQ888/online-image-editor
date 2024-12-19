import { useState, useRef, useCallback } from 'react';

function DropZone({ onDrop, isLoading, progress }) {
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);
  const dragCounter = useRef(0);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onDrop]);

  return (
    <div
      ref={dropRef}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-12 transition-all ${isDragging
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-300 hover:border-primary-500'
        }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && onDrop(e.target.files[0])}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center cursor-pointer"
      >
        <span className="material-icons text-4xl text-gray-400 mb-4">
          {isLoading ? 'hourglass_empty' : 'cloud_upload'}
        </span>
        <span className="text-lg font-medium text-gray-900 mb-2">
          {isLoading ? '处理中...' : '点击或拖拽上传图片'}
        </span>
        <span className="text-sm text-gray-500">
          支持 JPG、PNG、WEBP 格式，最大 10MB
        </span>
      </label>

      {/* 进度条 */}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DropZone; 
import { useState, useCallback } from 'react';
import useImageStore from '../../store/imageStore';

function ActionButtons({ onBack }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { processedImage, background } = useImageStore();

  const handleDownload = useCallback(async () => {
    if (!processedImage) return;

    setIsDownloading(true);
    try {
      // 创建一个临时 canvas 来合成图片
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 加载处理后的图片
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = processedImage;
      });

      // 设置画布尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 绘制背景
      if (background.type === 'solid') {
        ctx.fillStyle = background.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (background.type === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, background.from);
        gradient.addColorStop(1, background.to);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (background.type === 'image' && background.url) {
        const bgImg = new Image();
        bgImg.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          bgImg.onload = resolve;
          bgImg.onerror = reject;
          bgImg.src = background.url;
        });
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      }

      // 绘制处理后的图片
      ctx.drawImage(img, 0, 0);

      // 下载图片
      const link = document.createElement('a');
      link.download = 'processed-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [processedImage, background]);

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        className="btn flex items-center text-gray-600 hover:text-gray-900"
      >
        <span className="material-icons mr-2">arrow_back</span>
        返回
      </button>
      <button
        onClick={handleDownload}
        disabled={!processedImage || isDownloading}
        className={`btn btn-primary flex items-center ${!processedImage || isDownloading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        <span className="material-icons mr-2">
          {isDownloading ? 'hourglass_empty' : 'download'}
        </span>
        {isDownloading ? '处理中...' : '下载结果'}
      </button>
    </div>
  );
}

export default ActionButtons;

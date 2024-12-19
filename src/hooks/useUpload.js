import { useState } from 'react';
import useImageStore from '../store/imageStore';
import { api } from '../services/api';

export default function useUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const { setOriginalImage, setProcessedImage, setMaskImage, setProcessingStatus, addToHistory } =
    useImageStore();

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error('不支持的文件格式，请上传 JPG、PNG 或 WEBP 格式的图片');
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('文件大小不能超过 10MB');
    }
  };

  const uploadAndProcess = async (file) => {
    try {
      setIsLoading(true);
      setError(null);
      setProgress(0);
      validateFile(file);

      setProcessingStatus({ isProcessing: true, progress: 0 });

      // 模拟进度
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // 调用 API 处理图片
      const result = await api.removeBackground(file);

      // 设置图片和状态
      setOriginalImage(result.originalImage);
      setProcessedImage(result.processedImage);
      setMaskImage(result.maskImage);
      setProcessingStatus({ isProcessing: false, progress: 100 });

      // 只在处理完成后添加一次历史记录
      addToHistory({
        id: result.id,
        originalImage: result.originalImage,
        processedImage: result.processedImage,
        maskImage: result.maskImage,
        background: result.background,
        timestamp: result.timestamp,
      });

      clearInterval(progressTimer);
      setProgress(100);

      return { success: true };
    } catch (error) {
      setError(error.message);
      setProcessingStatus({ isProcessing: false, error: error.message });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadAndProcess,
    isLoading,
    progress,
    error,
  };
}

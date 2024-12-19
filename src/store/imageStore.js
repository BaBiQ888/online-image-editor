import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAnimatedGif } from '../utils/gifExport';

// 加载跨域图片
const loadCrossOriginImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Image load error:', error);
      reject(error);
    };
    img.src = src;
  });
};

const useImageStore = create(
  persist(
    (set) => ({
      // 图片状态
      originalImage: null,
      processedImage: null,
      maskImage: null,

      // 背景设置
      background: {
        type: 'transparent',
        color: '#ffffff',
        opacity: 1,
        gradient: {
          from: '#FF512F',
          to: '#F09819',
          direction: '45deg',
        },
        animation: {
          type: 'none',
          config: {},
          combined: [],
        },
      },

      // 处理状态
      processingStatus: {
        isProcessing: false,
        progress: 0,
        error: null,
      },

      // 历史���录
      history: [],

      // Actions
      setOriginalImage: (image) => set({ originalImage: image }),
      setProcessedImage: (image) => set({ processedImage: image }),
      setMaskImage: (image) => set({ maskImage: image }),
      setBackground: (updates) =>
        set((state) => ({
          background: {
            ...state.background,
            ...updates,
          },
        })),

      // 历史记录相关
      addToHistory: (record) =>
        set((state) => {
          const existingIndex = state.history.findIndex(
            (item) => item.originalImage === record.originalImage
          );

          let newHistory;
          if (existingIndex !== -1) {
            newHistory = [...state.history];
            newHistory[existingIndex] = {
              ...newHistory[existingIndex],
              ...record,
              timestamp: new Date().toISOString(),
            };
          } else {
            newHistory = [
              {
                ...record,
                id: Date.now(),
                timestamp: new Date().toISOString(),
              },
              ...state.history,
            ];
          }

          return { history: newHistory.slice(0, 20) };
        }),

      deleteFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((record) => record.id !== id),
        })),

      clearHistory: () => set({ history: [] }),

      setProcessingStatus: (status) =>
        set((state) => ({
          processingStatus: { ...state.processingStatus, ...status },
        })),

      loadFromHistory: (record) => {
        set({
          originalImage: record.originalImage,
          processedImage: record.processedImage,
          maskImage: record.maskImage,
          background: record.background || {
            type: 'transparent',
            color: '#ffffff',
            opacity: 1,
            gradient: {
              from: '#FF512F',
              to: '#F09819',
              direction: '45deg',
            },
            animation: {
              type: 'none',
              config: {},
              combined: [],
            },
          },
        });
      },

      // 导出功能
      exportWithBackground: async (processedImage, background, imageSettings) => {
        try {
          // 加载原图以获取尺寸
          const img = await loadCrossOriginImage(processedImage);
          const { width, height } = img;

          // 计算适配尺寸（保持宽高比，限制最大尺寸）
          const maxSize = 1200;
          let targetWidth = width;
          let targetHeight = height;

          if (width > maxSize || height > maxSize) {
            const ratio = Math.min(maxSize / width, maxSize / height);
            targetWidth = Math.round(width * ratio);
            targetHeight = Math.round(height * ratio);
          }

          // 如果有动画，导出 GIF
          if (background.animation && background.animation.type !== 'none') {
            try {
              // 构建动画配置
              const animationConfig = {
                type: background.animation.type,
                config: {
                  duration: background.animation.config?.duration || 2,
                  amplitude: background.animation.config?.amplitude || 20,
                  frequency: background.animation.config?.frequency || 1,
                  ...background.animation.config,
                },
              };

              const result = await createAnimatedGif(processedImage, animationConfig, {
                width: targetWidth,
                height: targetHeight,
                duration: animationConfig.config.duration,
                background,
                imageSettings,
              });
              return {
                url: result,
                filename: `animated_${Date.now()}.gif`,
              };
            } catch (animationError) {
              console.error('Animation export failed:', animationError);
              throw animationError;
            }
          }

          // 创建画布
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');

          // 绘制背景
          if (background.type === 'color') {
            ctx.fillStyle = background.color;
            ctx.globalAlpha = background.opacity;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          } else if (background.type === 'gradient') {
            const angle = parseInt(background.gradient.direction) || 0;
            const radian = (angle * Math.PI) / 180;

            const x1 = canvas.width / 2 - (Math.cos(radian) * canvas.width) / 2;
            const y1 = canvas.height / 2 - (Math.sin(radian) * canvas.height) / 2;
            const x2 = canvas.width / 2 + (Math.cos(radian) * canvas.width) / 2;
            const y2 = canvas.height / 2 + (Math.sin(radian) * canvas.height) / 2;

            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, background.gradient.from);
            gradient.addColorStop(1, background.gradient.to);
            ctx.fillStyle = gradient;
            ctx.globalAlpha = background.opacity;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          // 在中心位置绘制图片
          ctx.globalAlpha = 1;

          // 应用缩放和位置偏移
          const { scale = 1, position = { x: 0, y: 0 } } = imageSettings || {};
          const scaledWidth = targetWidth * scale;
          const scaledHeight = targetHeight * scale;

          // 计算位置偏移
          const xOffset = (position.x / 100) * targetWidth;
          const yOffset = (position.y / 100) * targetHeight;

          const x = (canvas.width - scaledWidth) / 2 + xOffset;
          const y = (canvas.height - scaledHeight) / 2 + yOffset;

          ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

          // 导出图片
          return new Promise((resolve) => {
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve({
                    url: URL.createObjectURL(blob),
                    filename: `result_${Date.now()}.png`,
                  });
                }
              },
              'image/png',
              1.0
            );
          });
        } catch (error) {
          console.error('Export failed:', error);
          throw error;
        }
      },
    }),
    {
      name: 'image-store',
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
);

export default useImageStore;

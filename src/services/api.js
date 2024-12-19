import { Client } from '@gradio/client';

// API 配置
const config = {
  imgbb: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    apiKey: import.meta.env.VITE_IMGBB_API_KEY,
  },
  gradio: {
    modelPath: 'ECCV2022/dis-background-removal',
  },
};

// API 请求封装
export const api = {
  async removeBackground(file) {
    try {
      // 先上传原图到 ImgBB
      const originalImageUrl = await this.uploadImage(file);

      // 连接到 Gradio 模型
      const client = await Client.connect(config.gradio.modelPath);

      // 直接调用模型预测
      const result = await client.predict('/predict', [file]);

      if (!result || result.error) {
        throw new Error(result?.error || '处理失败');
      }

      // 返回处理结果
      return {
        id: Date.now(),
        originalImage: originalImageUrl,
        processedImage: result.data[0].url,
        maskImage: result.data[1].url,
        timestamp: new Date().toISOString(),
        background: {
          type: 'transparent',
          color: '#ffffff',
          opacity: 1,
          gradient: {
            from: '#FF512F',
            to: '#F09819',
            direction: '45deg',
          },
        },
      };
    } catch (error) {
      console.error('Remove background failed:', error);
      throw new Error('图片处理失败，请重试');
    }
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', config.imgbb.apiKey);

    try {
      const response = await fetch(`${config.imgbb.baseUrl}1/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error?.message || '上传失败');
      }

      return data.data.url;
    } catch (error) {
      console.error('ImgBB upload failed:', error);
      throw new Error('图片上传失败，请重试');
    }
  },
};

export default api;

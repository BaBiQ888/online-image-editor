import GIF from 'gif.js';

// 加载图片并处理跨域问题
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 添加跨域支持
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 创建动画帧
const createAnimationFrames = async (img, animation, customParams) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;

  const frames = [];
  const frameCount = 30; // 每秒30帧
  const duration = customParams?.duration || 2;

  for (let i = 0; i < frameCount * duration; i++) {
    const progress = (i / frameCount) % 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // 根据动画类型应用变换
    switch (animation) {
      case 'pulse':
        const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.05;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        break;
      case 'rotate':
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(progress * Math.PI * 2);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        break;
      // ... 添加其他动画类型
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    frames.push(canvas.toDataURL());
  }

  return frames;
};

// 导出动图
export const exportAnimatedImage = async (imageUrl, animation, customParams) => {
  try {
    // 处理跨域URL
    const corsUrl = imageUrl.replace('https://', 'https://cors-anywhere.herokuapp.com/');
    const img = await loadImage(corsUrl);

    // 创建离屏 canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    // 绘制原始图片
    ctx.drawImage(img, 0, 0);

    // 生成动画帧
    const frames = await createAnimationFrames(img, animation, customParams);

    return new Promise((resolve, reject) => {
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: img.width,
        height: img.height,
        workerScript: '/gif.worker.js',
      });

      frames.forEach((frame) => {
        const frameImg = new Image();
        frameImg.src = frame;
        gif.addFrame(frameImg, { delay: 1000 / 30 });
      });

      gif.on('finished', (blob) => {
        resolve(URL.createObjectURL(blob));
      });

      gif.on('error', reject);
      gif.render();
    });
  } catch (error) {
    console.error('Failed to create animated image:', error);
    throw error;
  }
};

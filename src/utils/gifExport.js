import GIF from 'gif.js';

export const createAnimatedGif = async (processedImage, animation, options = {}) => {
  const {
    width = 800,
    height = 600,
    quality = 10,
    fps = 30,
    duration = 2,
    background,
    filename = 'animated.gif',
  } = options;

  return new Promise((resolve, reject) => {
    const gif = new GIF({
      workers: 2,
      quality,
      width,
      height,
      workerScript: '/gif.worker.js',
      transparent: background?.type === 'transparent' ? 0x00ffffff : null,
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 计算帧数
      const frameCount = fps * duration;

      // 生成每一帧
      for (let i = 0; i < frameCount; i++) {
        const progress = i / frameCount;
        ctx.clearRect(0, 0, width, height);

        // 绘制背景
        if (background) {
          if (background.type === 'color') {
            ctx.fillStyle = background.color;
            ctx.globalAlpha = background.opacity;
            ctx.fillRect(0, 0, width, height);
          } else if (background.type === 'gradient') {
            const angle = parseInt(background.gradient.direction) || 0;
            const radian = (angle * Math.PI) / 180;

            const x1 = width / 2 - (Math.cos(radian) * width) / 2;
            const y1 = height / 2 - (Math.sin(radian) * height) / 2;
            const x2 = width / 2 + (Math.cos(radian) * width) / 2;
            const y2 = height / 2 + (Math.sin(radian) * height) / 2;

            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, background.gradient.from);
            gradient.addColorStop(1, background.gradient.to);

            ctx.fillStyle = gradient;
            ctx.globalAlpha = background.opacity;
            ctx.fillRect(0, 0, width, height);
          }
        }

        // 应用动画变换
        ctx.save();
        ctx.globalAlpha = 1; // 重置透明度
        const centerX = width / 2;
        const centerY = height / 2;
        ctx.translate(centerX, centerY);

        // 根据动画类型应用不同的变换
        switch (animation.type) {
          case 'bounce':
            const bounceOffset = Math.sin(progress * Math.PI * 2) * 30;
            ctx.translate(0, bounceOffset);
            break;
          case 'pulse':
            const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.1;
            ctx.scale(scale, scale);
            break;
          case 'shake':
            const shakeOffset = Math.sin(progress * Math.PI * 8) * 10;
            ctx.translate(shakeOffset, 0);
            break;
          // ... 其他动画类型
        }

        ctx.translate(-centerX, -centerY);
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();

        // 添加帧到 GIF
        gif.addFrame(canvas, { delay: 1000 / fps, copy: true });
      }

      // 完成 GIF 生成
      gif.on('finished', (blob) => {
        resolve(URL.createObjectURL(blob));
      });

      gif.on('error', reject);
      gif.render();
    };

    img.onerror = reject;
    img.src = processedImage;
  });
};

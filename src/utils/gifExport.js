import GIF from 'gif.js';

export const createAnimatedGif = async (
  processedImage,
  animation,
  { width, height, duration = 2, background, imageSettings }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 调试信息：输出动画配置
      console.log('Animation Config:', {
        type: animation.type,
        config: animation.config,
        imageSettings,
        dimensions: { width, height },
      });

      const gif = new GIF({
        workers: 4,
        quality: 5,
        width,
        height,
        dither: 'FloydSteinberg',
        workerScript: '/gif.worker.js',
      });

      const img = await loadImage(processedImage);

      // 获取动画配置
      const { type, config = {} } = animation;
      const { scale = 1, position = { x: 0, y: 0 } } = imageSettings || {};

      // 调整动画参数
      const fps = 30;
      const framesCount = Math.floor(duration * fps);
      const frameDelay = 1000 / fps;

      // 动画参数
      const { amplitude = 20, frequency = 1 } = config;

      // 调试信息：输出帧信息
      console.log('Frame Info:', {
        totalFrames: framesCount,
        frameDelay,
        fps,
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', {
        alpha: true,
        willReadFrequently: true,
      });
      canvas.width = width;
      canvas.height = height;

      // 为每一帧生成图像
      for (let i = 0; i < framesCount; i++) {
        const progress = i / framesCount;
        const time = progress * Math.PI * 2;

        // 调试每10帧的变换信息
        if (i % 10 === 0) {
          console.log(`Frame ${i}/${framesCount}:`, {
            progress,
            time,
            type,
          });
        }

        // 清除画布
        ctx.clearRect(0, 0, width, height);
        drawBackground(ctx, background, width, height);

        // 计算动画变换
        let transform = {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          scaleX: scale,
          scaleY: scale,
          opacity: 1,
        };

        // 根据动画类型计算变换
        switch (type) {
          case 'bounce':
            // 弹跳效果增加缓动
            const bounceHeight = Math.sin(time) * amplitude;
            const gravity = Math.pow(Math.sin(time), 2); // 添加重力感
            transform.translateY = bounceHeight * gravity;
            break;

          case 'rotate':
            // 平滑的旋转效果
            transform.rotate = time * 2; // 两圈旋转
            // 添加缓动
            transform.scaleX = transform.scaleY = 0.9 + Math.sin(time) * 0.1;
            break;

          case 'fade':
            // 更平滑的淡入淡出
            transform.opacity = 0.4 + (Math.sin(time) + 1) * 0.3;
            break;

          case 'scale':
            // 呼吸效果
            const breathe = 0.85 + Math.sin(time) * 0.15;
            transform.scaleX *= breathe;
            transform.scaleY *= breathe;
            break;

          case 'shake':
            // 更自然的抖动
            const shakeX = Math.sin(time * 3) * amplitude * 0.2;
            const shakeY = Math.cos(time * 2) * amplitude * 0.1;
            transform.translateX = shakeX;
            transform.translateY = shakeY;
            transform.rotate = shakeX * 0.02; // 添加轻微旋转
            break;

          case 'swing':
            // 钟摆效果
            const swingAngle = Math.sin(time) * 0.3;
            transform.rotate = swingAngle;
            // 添加轻微位移
            transform.translateY = Math.abs(Math.sin(time)) * 5;
            break;

          case 'tada':
            // 更生动的 tada 效果
            const tadaProgress = time / (Math.PI * 2);
            const tadaScale = 1 + Math.sin(time * 3) * 0.1;
            const tadaRotate = Math.sin(time * 4) * 0.15;
            transform.scaleX *= tadaScale;
            transform.scaleY *= tadaScale;
            transform.rotate = tadaRotate;
            break;

          case 'pulse':
            // 心跳效果
            const t = time % (Math.PI * 2);
            const pulseScale = 1 + Math.pow(Math.sin(t * 2), 3) * 0.15;
            transform.scaleX *= pulseScale;
            transform.scaleY *= pulseScale;
            break;

          case 'wobble':
            // 摇摆效果
            const wobbleX = Math.sin(time * 2) * width * 0.1;
            const wobbleRotate = Math.sin(time * 2) * 0.15;
            transform.translateX += wobbleX;
            transform.rotate = wobbleRotate;
            // 添加垂直方向的轻微移动
            transform.translateY += Math.sin(time * 4) * 5;
            break;

          case 'flash':
            // 闪光效果
            const flashPhase = (Math.sin(time * 4) + 1) / 2;
            transform.opacity = 0.6 + flashPhase * 0.4;
            // 添加轻微缩放
            transform.scaleX *= 1 + flashPhase * 0.1;
            transform.scaleY *= 1 + flashPhase * 0.1;
            break;

          case 'rubberBand':
            // 橡皮筋效果
            const phase = time % (Math.PI * 2);
            const stretchX = 1 + Math.sin(phase * 2) * 0.2;
            const stretchY = 1 + Math.cos(phase * 2) * 0.1;
            transform.scaleX *= stretchX;
            transform.scaleY *= stretchY;
            // 添加轻微旋转
            transform.rotate = Math.sin(phase * 3) * 0.05;
            break;

          case 'float':
            // 漂浮效果
            transform.translateY = Math.sin(time) * 15;
            transform.translateX = Math.sin(time * 0.5) * 10;
            transform.rotate = Math.sin(time * 0.7) * 0.05;
            break;

          case 'jello':
            // 果冻效果
            const jelloT = time % (Math.PI * 2);
            transform.scaleX *= 1 + Math.sin(jelloT * 2) * 0.15;
            transform.scaleY *= 1 + Math.cos(jelloT * 3) * 0.15;
            transform.rotate = Math.sin(jelloT) * 0.05;
            break;

          case 'flip':
            // 翻转效果
            const flipProgress = (Math.sin(time) + 1) / 2;
            transform.scaleX *= Math.abs(Math.cos(time * Math.PI));
            transform.rotate = flipProgress * Math.PI;
            break;

          case 'spiral':
            // 螺旋效果
            const spiralRadius = 20 * Math.sin(time);
            transform.translateX += Math.cos(time * 2) * spiralRadius;
            transform.translateY += Math.sin(time * 2) * spiralRadius;
            transform.rotate = time * 2;
            break;

          default:
            console.warn(`Unknown animation type: ${type}`);
            // 默认动画改进
            const defaultScale = 1 + Math.sin(time) * 0.1;
            transform.scaleX *= defaultScale;
            transform.scaleY *= defaultScale;
            transform.rotate = Math.sin(time) * 0.05;
        }

        // 优化频率控制
        if (frequency !== 1) {
          const freqTime = time * frequency;
          transform.translateX *= Math.sin(freqTime);
          transform.translateY *= Math.sin(freqTime);
          transform.rotate *= Math.sin(freqTime);
          transform.scaleX = 1 + (transform.scaleX - 1) * Math.sin(freqTime);
          transform.scaleY = 1 + (transform.scaleY - 1) * Math.sin(freqTime);
        }

        // 调试变换信息
        if (i % 10 === 0) {
          console.log(`Transform for frame ${i}:`, transform);
        }

        // 应用变换
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.globalAlpha = transform.opacity;
        ctx.rotate(transform.rotate);
        ctx.scale(transform.scaleX, transform.scaleY);
        ctx.translate(
          transform.translateX + (position.x / 100) * width,
          transform.translateY + (position.y / 100) * height
        );

        // 绘制图片
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();

        // 添加帧
        gif.addFrame(ctx, {
          copy: true,
          delay: frameDelay,
          disposal: 2,
        });
      }

      // 监听进度
      gif.on('progress', (p) => {
        console.log(`Encoding progress: ${Math.round(p * 100)}%`);
      });

      gif.on('finished', (blob) => {
        console.log('GIF generation completed');
        resolve(URL.createObjectURL(blob));
      });

      gif.on('error', (error) => {
        console.error('GIF generation error:', error);
        reject(error);
      });

      gif.render();
    } catch (error) {
      console.error('Animation creation error:', error);
      reject(error);
    }
  });
};

// 优化图片加载
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    // 添加加载超时
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 30000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };

    img.onerror = (error) => {
      clearTimeout(timeout);
      console.error('Image load error:', error);
      reject(error);
    };

    img.src = src;
  });
};

// 辅助函数：绘制背景
const drawBackground = (ctx, background, width, height) => {
  if (background.type === 'color') {
    ctx.fillStyle = background.color;
    ctx.globalAlpha = background.opacity;
    ctx.fillRect(0, 0, width, height);
  } else if (background.type === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, background.gradient.from);
    gradient.addColorStop(1, background.gradient.to);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = background.opacity;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.globalAlpha = 1;
};

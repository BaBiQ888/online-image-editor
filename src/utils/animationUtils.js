// 动画预设配置
export const ANIMATION_PRESETS = [
  {
    name: 'bounce',
    label: '弹跳',
    icon: 'height',
    defaultConfig: {
      duration: 2,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'pulse',
    label: '脉冲',
    icon: 'radio_button_checked',
    defaultConfig: {
      duration: 1.5,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'shake',
    label: '抖动',
    icon: 'vibration',
    defaultConfig: {
      duration: 1,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'swing',
    label: '摆动',
    icon: 'switch_access_shortcut',
    defaultConfig: {
      duration: 2,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
];

// 加载图片
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 生成关键帧动画
const generateKeyframes = (animationName) => {
  switch (animationName) {
    case 'pulse':
      return `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `;
    case 'shake':
      return `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `;
    case 'bounce':
      return `
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }
      `;
    case 'swing':
      return `
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
      `;
    default:
      return '';
  }
};

// 注入关键帧样式
const injectKeyframes = (animationName) => {
  const styleId = `animation-${animationName}`;
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = generateKeyframes(animationName);
    document.head.appendChild(style);
  }
};

// 生成动画样式对象
export const generateAnimationStyle = (background) => {
  if (!background.animationEnabled || background.animation === 'none') {
    return {};
  }

  // 注入关键帧
  injectKeyframes(background.animation);

  const { duration, timing, delay, iterationCount } = background.animationConfig;

  return {
    animation: `${background.animation} ${duration}s ${timing} ${delay}s ${iterationCount}`,
    animationPlayState: background.animationPaused ? 'paused' : 'running',
  };
};

// 获取动画预设配置
export const getPresetConfig = (animationName) => {
  const preset = ANIMATION_PRESETS.find((p) => p.name === animationName);
  return (
    preset?.defaultConfig || {
      duration: 2,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    }
  );
};

// 合并自定义配置
export const mergeAnimationConfig = (preset, custom) => {
  return {
    ...getPresetConfig(preset),
    ...custom,
  };
};

// 生成动画帧
export const generateAnimationFrames = async (image, background) => {
  const img = await loadImage(image);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;

  // 生成帧数据
  const frames = [];
  const frameCount = 60; // 每秒60帧
  const duration = background.animationConfig.duration;
  const totalFrames = frameCount * duration;

  for (let i = 0; i < totalFrames; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // 根据动画类型应用变换
    const progress = i / totalFrames;
    applyAnimation(ctx, background.animation, progress, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);
    ctx.restore();

    frames.push(canvas.toDataURL());
  }

  return frames;
};

// 应用动画变换
const applyAnimation = (ctx, animation, progress, width, height) => {
  const centerX = width / 2;
  const centerY = height / 2;
  ctx.translate(centerX, centerY);

  switch (animation) {
    case 'bounce':
      const bounceOffset = Math.sin(progress * Math.PI * 2) * 30;
      ctx.translate(0, -bounceOffset);
      break;
    case 'pulse':
      const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.1;
      ctx.scale(scale, scale);
      break;
    case 'shake':
      const shakeOffset = Math.sin(progress * Math.PI * 8) * 5;
      ctx.translate(shakeOffset, 0);
      break;
    case 'swing':
      const angle = Math.sin(progress * Math.PI * 2) * 15;
      ctx.rotate((angle * Math.PI) / 180);
      break;
  }

  ctx.translate(-centerX, -centerY);
};

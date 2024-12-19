// 渐变预设
export const GRADIENT_PRESETS = [
  {
    name: 'sunset',
    label: '日落',
    from: '#FF512F',
    to: '#F09819',
    direction: '45deg',
  },
  {
    name: 'ocean',
    label: '海洋',
    from: '#2193b0',
    to: '#6dd5ed',
    direction: '135deg',
  },
  {
    name: 'purple',
    label: '紫色',
    from: '#8E2DE2',
    to: '#4A00E0',
    direction: '90deg',
  },
  {
    name: 'forest',
    label: '森林',
    from: '#11998e',
    to: '#38ef7d',
    direction: '45deg',
  },
];

// 生成渐变样式
export const generateGradientStyle = (gradient) => {
  const { from, to, direction } = gradient;
  return `linear-gradient(${direction}, ${from}, ${to})`;
};

// 计算渐变方向角度
export const calculateGradientAngle = (direction) => {
  return parseInt(direction.replace('deg', ''));
};

// 调整渐变透明度
export const adjustGradientOpacity = (gradient, opacity) => {
  const { from, to } = gradient;
  return {
    ...gradient,
    from: adjustColorOpacity(from, opacity),
    to: adjustColorOpacity(to, opacity),
  };
};

// 调整颜色透明度
const adjustColorOpacity = (color, opacity) => {
  // 如果已经是 rgba 格式
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/, `${opacity})`);
  }

  // 如果是 hex 格式
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

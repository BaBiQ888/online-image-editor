export const BACKGROUND_TYPES = [
  {
    type: 'transparent',
    label: '透明背景',
    description: '保持背景透明',
    icon: 'visibility_off',
  },
  {
    type: 'color',
    label: '纯色背景',
    description: '使用单一颜色作为背景',
    icon: 'format_color_fill',
  },
  {
    type: 'gradient',
    label: '渐变背景',
    description: '使用渐变色作为背景',
    icon: 'gradient',
  },
  {
    type: 'image',
    label: '图片背景',
    description: '使用自定义图片作为背景',
    icon: 'image',
  },
];

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

export const COLOR_PRESETS = [
  '#ffffff', // 白色
  '#000000', // 黑色
  '#f3f4f6', // 浅灰
  '#1f2937', // 深灰
  '#ef4444', // 红色
  '#3b82f6', // 蓝色
  '#10b981', // 绿色
  '#f59e0b', // 黄色
  '#8b5cf6', // 紫色
  '#ec4899', // 粉色
];

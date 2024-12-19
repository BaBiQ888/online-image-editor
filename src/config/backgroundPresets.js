export const GRADIENT_PRESETS = [
  {
    name: '日落',
    from: '#ff512f',
    to: '#f09819',
    direction: '45deg',
  },
  {
    name: '海洋',
    from: '#2193b0',
    to: '#6dd5ed',
    direction: '135deg',
  },
  {
    name: '紫罗兰',
    from: '#834d9b',
    to: '#d04ed6',
    direction: '90deg',
  },
  {
    name: '森林',
    from: '#134e5e',
    to: '#71b280',
    direction: '180deg',
  },
  {
    name: '极光',
    from: '#00c3ff',
    to: '#ffff1c',
    direction: '120deg',
  },
  {
    name: '夕阳',
    from: '#fc6076',
    to: '#ff9a44',
    direction: '160deg',
  },
  {
    name: '薰衣草',
    from: '#ddd6f3',
    to: '#faaca8',
    direction: '45deg',
  },
  {
    name: '青柠',
    from: '#96fbc4',
    to: '#f9f586',
    direction: '90deg',
  },
];

export const SOLID_PRESETS = [
  { name: '纯白', color: '#ffffff' },
  { name: '纯黑', color: '#000000' },
  { name: '浅灰', color: '#f5f5f5' },
  { name: '深灰', color: '#333333' },
  { name: '天蓝', color: '#87ceeb' },
  { name: '薄荷', color: '#98ff98' },
  { name: '粉红', color: '#ffb6c1' },
  { name: '米色', color: '#f5f5dc' },
  { name: '珊瑚红', color: '#ff7f50' },
  { name: '薰衣草', color: '#e6e6fa' },
  { name: '橄榄绿', color: '#556b2f' },
  { name: '金色', color: '#ffd700' },
];

export const GRADIENT_TYPES = {
  LINEAR: 'linear',
  RADIAL: 'radial',
  CONIC: 'conic',
};

export const GRADIENT_SHAPES = {
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
};

export const BLEND_MODES = [
  { value: 'normal', label: '正常' },
  { value: 'multiply', label: '正片叠底' },
  { value: 'screen', label: '滤色' },
  { value: 'overlay', label: '叠加' },
  { value: 'darken', label: '变暗' },
  { value: 'lighten', label: '变亮' },
  { value: 'color-dodge', label: '颜色减淡' },
  { value: 'color-burn', label: '颜色加深' },
  { value: 'hard-light', label: '强光' },
  { value: 'soft-light', label: '柔光' },
  { value: 'difference', label: '差值' },
  { value: 'exclusion', label: '排除' },
  { value: 'hue', label: '色相' },
  { value: 'saturation', label: '饱和度' },
  { value: 'color', label: '颜色' },
  { value: 'luminosity', label: '明度' },
];

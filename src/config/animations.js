export const BACKGROUND_ANIMATIONS = {
  NONE: 'none',
  PULSE: 'pulse',
  BREATHE: 'breathe',
  SLIDE: 'slide',
  ROTATE: 'rotate',
  ZOOM: 'zoom',
  WAVE: 'wave',
  FLOAT: 'float',
  SHAKE: 'shake',
};

export const ANIMATION_DIRECTIONS = {
  NORMAL: 'normal',
  REVERSE: 'reverse',
  ALTERNATE: 'alternate',
  ALTERNATE_REVERSE: 'alternate-reverse',
};

export const TIMING_FUNCTIONS = [
  { value: 'linear', label: '线性' },
  { value: 'ease', label: '平滑' },
  { value: 'ease-in', label: '渐入' },
  { value: 'ease-out', label: '渐出' },
  { value: 'ease-in-out', label: '渐入渐出' },
];

export const ANIMATION_PRESETS = [
  {
    name: 'none',
    label: '无动画',
    description: '不添加任何动画效果',
    icon: 'block',
  },
  {
    name: 'bounce',
    label: '弹跳',
    description: '有弹性的上下跳动',
    icon: 'height',
    defaultConfig: {
      duration: 1.5,
      timing: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'pulse',
    label: '脉冲',
    description: '缓慢的放大缩小效果',
    icon: 'radio_button_checked',
    defaultConfig: {
      duration: 2,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'shake',
    label: '抖动',
    description: '快速的左右抖动效果',
    icon: 'vibration',
    defaultConfig: {
      duration: 0.8,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'rotate',
    label: '旋转',
    description: '平滑的旋转动画',
    icon: 'rotate_right',
    defaultConfig: {
      duration: 3,
      timing: 'linear',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'float',
    label: '漂浮',
    description: '轻柔的上下漂浮',
    icon: 'waves',
    defaultConfig: {
      duration: 3,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'swing',
    label: '摆动',
    description: '钟摆式的左右摆动',
    icon: 'sync_alt',
    defaultConfig: {
      duration: 2,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'tada',
    label: '强调',
    description: '注意力吸引效果',
    icon: 'center_focus_strong',
    defaultConfig: {
      duration: 1,
      timing: 'ease-out',
      delay: 0,
      iterationCount: 1,
    },
  },
  {
    name: 'jello',
    label: '果冻',
    description: '有趣的扭曲效果',
    icon: 'blur_on',
    defaultConfig: {
      duration: 1.5,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
  {
    name: 'flip',
    label: '翻转',
    description: '3D翻转效果',
    icon: 'flip',
    defaultConfig: {
      duration: 1.5,
      timing: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
    },
  },
];

export const DIRECTION_OPTIONS = [
  { value: ANIMATION_DIRECTIONS.NORMAL, label: '正向' },
  { value: ANIMATION_DIRECTIONS.REVERSE, label: '反向' },
  { value: ANIMATION_DIRECTIONS.ALTERNATE, label: '交替' },
  { value: ANIMATION_DIRECTIONS.ALTERNATE_REVERSE, label: '反向交替' },
];

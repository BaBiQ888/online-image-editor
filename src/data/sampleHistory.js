export const SAMPLE_HISTORY = [
  {
    id: 'sample-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5分钟前
    originalImage: '/demos/demo1-before.jpg',
    processedImage: '/demos/demo1-after.gif',
    maskImage: '/demos/demo1-mask.png',
    background: {
      type: 'transparent',
      animation: 'pulse',
      animationEnabled: true,
      animationCustom: {
        duration: 2,
        timing: 'ease-in-out',
      },
    },
    isSample: true,
  },
  {
    id: 'sample-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30分钟前
    originalImage: '/demos/demo2-before.jpg',
    processedImage: '/demos/demo2-after.jpg',
    maskImage: '/demos/demo2-mask.png',
    background: {
      type: 'gradient',
      from: '#4F46E5',
      to: '#9333EA',
      gradientType: 'linear',
      direction: '45deg',
      animation: 'none',
    },
    isSample: true,
  },
  {
    id: 'sample-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1小时前
    originalImage: '/demos/demo3-before.jpg',
    processedImage: '/demos/demo3-after.jpg',
    maskImage: '/demos/demo3-mask.png',
    background: {
      type: 'transparent',
      animation: 'none',
    },
    isSample: true,
  },
];

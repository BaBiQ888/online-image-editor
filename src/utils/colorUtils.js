// 检查颜色是否有效
export const isValidColor = (color) => {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
};

// RGB转HEX
export const rgbToHex = (r, g, b) => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

// HEX转RGB
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// 计算颜色亮度
export const getLuminance = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
};

// 获取对比色
export const getContrastColor = (hex) => {
  return getLuminance(hex) > 0.5 ? '#000000' : '#FFFFFF';
};

// 调整颜色透明度
export const adjustAlpha = (hex, alpha) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

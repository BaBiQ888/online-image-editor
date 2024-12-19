// 加载图片
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 压缩图片
export const compressImage = async (file, maxSize = 1024 * 1024) => {
  if (file.size <= maxSize) return file;

  const img = await loadImage(URL.createObjectURL(file));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 计算压缩比例
  let ratio = Math.sqrt(maxSize / file.size);
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;

  // 绘制压缩后的图片
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 转换为 Blob
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(new File([blob], file.name, { type: file.type })),
      file.type,
      0.8
    );
  });
};

// 获取图片尺寸
export const getImageDimensions = async (file) => {
  const img = await loadImage(URL.createObjectURL(file));
  return {
    width: img.width,
    height: img.height,
    aspectRatio: img.width / img.height,
  };
};

// 检查图片是否透明
export const hasTransparency = async (file) => {
  const img = await loadImage(URL.createObjectURL(file));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
};

// 清理图片 URL
export const cleanupImageUrl = (url) => {
  if (url?.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

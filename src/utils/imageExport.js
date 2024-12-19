const MAX_IMAGE_SIZE = 5000; // Maximum dimension size in pixels

export const generateHighQualityImage = (imageData, background) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
          const ratio = Math.min(MAX_IMAGE_SIZE / width, MAX_IMAGE_SIZE / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Enable high quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Apply background
        if (background.type === 'color') {
          ctx.fillStyle = background.value;
          ctx.fillRect(0, 0, width, height);
        } else if (background.type === 'image') {
          const bgImg = new Image();
          bgImg.onload = () => {
            try {
              ctx.drawImage(bgImg, 0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/png', 1.0));
            } catch (error) {
              reject(new Error('Failed to process background image'));
            }
          };
          bgImg.onerror = () => reject(new Error('Failed to load background image'));
          bgImg.src = background.value;
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png', 1.0));
      } catch (error) {
        reject(new Error('Failed to process image'));
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageData;
  });
};

export const downloadImage = async (imageData, background, filename = 'processed-image.png') => {
  try {
    const highQualityImage = await generateHighQualityImage(imageData, background);

    const link = document.createElement('a');
    link.href = highQualityImage;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

export const validateImage = (imageData) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        reject(new Error('Invalid image dimensions'));
      } else {
        resolve(true);
      }
    };
    img.onerror = () => reject(new Error('Invalid image data'));
    img.src = imageData;
  });
};

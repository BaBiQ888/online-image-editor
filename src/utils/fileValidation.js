export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const validateFile = (file) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (!ACCEPTED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'File type not supported. Please upload JPEG, PNG or WebP images only',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size too large. Maximum size is 10MB',
    };
  }

  return { isValid: true, error: null };
};

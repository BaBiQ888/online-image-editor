export const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
};

export const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        throw new Error('API key is invalid or expired');
      case 413:
        throw new Error('Image file is too large');
      case 429:
        throw new Error('Too many requests. Please try again later');
      default:
        throw new Error('An error occurred while processing the image');
    }
  }
  throw error;
};

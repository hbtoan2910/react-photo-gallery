const setCachedImage = (url: string) => {
  const cacheKey = `img:${btoa(url)}`;
  localStorage.setItem(
    cacheKey,
    JSON.stringify({ loaded: true, timestamp: Date.now() })
  );
};

const getCachedImage = (url: string) => {
  const cacheKey = `img:${btoa(url)}`;
  const cached = localStorage.getItem(cacheKey);
  return cached ? JSON.parse(cached) : null;
};

export { setCachedImage, getCachedImage };

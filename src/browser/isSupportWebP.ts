/**
 * @func isSupportWebP
 * @desc Check whether the browser supports WebP image format (returns false under SSR)
 * @returns {boolean}
 * @example if (isSupportWebP()) { img.src = 'a.webp' }
 */
export const isSupportWebP = (): boolean => {
  if (typeof document === 'undefined') return false;
  try {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch {
    return false;
  }
};

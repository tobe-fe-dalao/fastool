/**
 * @func getClientWidth
 * @desc Get the viewport width (returns 0 under SSR)
 * @returns {number} viewport width
 * @example getClientWidth() // 1440
 */
export const getClientWidth = (): number => {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
};

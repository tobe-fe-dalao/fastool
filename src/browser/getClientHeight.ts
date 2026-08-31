/**
 * @func getClientHeight
 * @desc Get the viewport height (returns 0 under SSR)
 * @returns {number} viewport height
 * @example getClientHeight() // 900
 */
export const getClientHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
};

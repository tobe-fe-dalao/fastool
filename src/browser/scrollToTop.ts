/** Read the current vertical scrollbar position */
function getScrollTop(): number {
  if (typeof window === 'undefined') return 0;
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

/**
 * @func scrollToTop
 * @desc Smoothly scroll to the top of the page
 * @returns {void}
 * @example scrollToTop();
 */
export const scrollToTop = (): void => {
  if (typeof window === 'undefined') return;
  const c = getScrollTop();
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

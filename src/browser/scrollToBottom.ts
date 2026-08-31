/** Read the current vertical scrollbar position */
function getScrollTop(): number {
  if (typeof window === 'undefined') return 0;
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

/** Read the total document height */
function getScrollHeight(): number {
  if (typeof document === 'undefined') return 0;
  return Math.max(
    document.documentElement.scrollHeight || 0,
    document.body.scrollHeight || 0
  );
}

/**
 * @func scrollToBottom
 * @desc Smoothly scroll to the bottom of the page
 * @returns {void}
 * @example scrollToBottom();
 */
export const scrollToBottom = (): void => {
  if (typeof window === 'undefined') return;
  const c = getScrollTop();
  const d = getScrollHeight() - (window.innerHeight || 0);
  if (c < d) {
    window.requestAnimationFrame(scrollToBottom);
    // when c is 0, start at +8 to avoid being stuck at the very top
    window.scrollTo(0, c + (c / 8 || 8));
  }
};

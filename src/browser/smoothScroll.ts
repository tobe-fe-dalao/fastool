/**
 * @func smoothScroll
 * @desc Smoothly scroll to a given page position within a duration (with easing)
 * @param {number} to target scroll position (px)
 * @param {number} duration animation duration in ms, default 300
 * @returns {void}
 * @example smoothScroll(0, 500); // scroll back to top within 0.5s
 */
export const smoothScroll = (to: number, duration: number = 300): void => {
  if (typeof window === 'undefined') return;
  const start = window.pageYOffset || document.documentElement.scrollTop || 0;
  const change = to - start;
  if (change === 0) return;
  const startDate = Date.now();

  const tick = (): void => {
    const elapsed = Date.now() - startDate;
    const progress = Math.min(1, duration <= 0 ? 1 : elapsed / duration);
    // easeInOutQuad easing
    const easing =
      progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    window.scrollTo(0, start + change * easing);
    if (progress < 1) window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
};

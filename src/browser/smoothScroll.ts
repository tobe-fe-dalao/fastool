/**
 * @func smoothScroll
 * @param {number} top 滚动到的位置
 * @param {number} duration 滚动的时间
 * @returns {void}
 * @desc 📝 平滑滚动到指定位置
 * @example smoothScroll(0, 1000);
*/
export const smoothScroll = (to: number, duration: number = 300): void => {
  const start = document?.documentElement?.scrollTop ?? document?.body?.scrollTop;
  const change = to - start;
  const startDate = +new Date();
  const tick = (): void => {
    const now = +new Date();
    const val = Math.min(1, (now - startDate) / duration);
    window.scrollTo(0, start + change * val);
    if (val < 1) {
      window.requestAnimationFrame(tick);
    }
  }
  window.requestAnimationFrame(tick);
}
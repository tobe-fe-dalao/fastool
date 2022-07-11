/**
* @func scrollToTop
* @returns {void}
* @desc 📝 平滑滚动到顶部
* @example scrollToTop();
*/
export const scrollToTop = (): void => {
  const c = document?.documentElement?.scrollTop ?? document?.body?.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
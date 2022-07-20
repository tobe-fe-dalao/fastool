/** 
 * @func scrollToBottom 
 * @returns {void}
 * @desc 📝 平滑滚动到底部
 * @example scrollToBottom();
 */
export const scrollToBottom = (): void => {
  const c = document?.documentElement?.scrollTop ?? document?.body?.scrollTop;
  const d = document?.documentElement?.scrollHeight ?? document?.body?.scrollHeight;
  if (c < d) {
    window.requestAnimationFrame(scrollToBottom);
    window.scrollTo(0, c + c / 8);
  }
}
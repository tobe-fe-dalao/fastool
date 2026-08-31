/**
 * @func toFullScreen
 * @desc Enter fullscreen (compatible with vendor prefixes; silently skipped under SSR)
 * @param {HTMLElement} element the element to display fullscreen, defaults to document.body
 * @returns {void}
 * @example toFullScreen();
 * @example toFullScreen(document.querySelector('.video'));
 */
export const toFullScreen = (element?: HTMLElement): void => {
  if (typeof document === 'undefined') return;
  const el: any = element || document.body;
  if (!el) return;
  const request =
    el.requestFullscreen ||
    el.mozRequestFullScreen ||
    el.webkitRequestFullscreen ||
    el.msRequestFullscreen;
  if (request) request.call(el);
};

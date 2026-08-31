/**
 * @func exitFullScreen
 * @desc Exit fullscreen (compatible with vendor prefixes; silently skipped under SSR)
 * @returns {void}
 * @example exitFullScreen();
 */
export const exitFullScreen = (): void => {
  if (typeof document === 'undefined') return;
  const doc: any = document;
  const exit =
    doc.exitFullscreen ||
    doc.msExitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen;
  if (exit) exit.call(document);
};

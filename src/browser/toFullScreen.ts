/**
 * @func toFullScreen
 * @returns {void}
 * @desc đ ćšć±
 * @example toFullScreen();
 */
export const toFullScreen = (): void => {
  let element: any = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}
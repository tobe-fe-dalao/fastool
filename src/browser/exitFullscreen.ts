/**
 * @func exitFullScreen
 * @returns {void}
 * @desc 📝 退出全屏
 * @example exitFullScreen();
 */
export const exitFullScreen = (): void => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen()
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen()
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen()
  }
}
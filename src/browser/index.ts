/**
 * @func isBrowser
 * @return {boolean}
 * 检测代码是否运行在浏览器环境
 */

export const isBrowser: boolean = typeof window === 'object' && typeof document === 'object';

/**
 * @fnc isSupportWebP
 * @desc 判断浏览器是否支持webP格式图片
 * @return {boolean} 
 */
export const isSupportWebP = (): boolean => {
  return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}

/**
 * @func scrollToTop
 * @return {void}
 * @desc 📝 平滑滚动到顶部
 */
export const scrollToTop = (): void => {
  const c = document?.documentElement?.scrollTop ?? document?.body?.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
/**
 * @func getBrowserInfo
 * @return {String} 浏览器类型和版本
 * @desc 📝 获取浏览器类型和版本
 */
export const getBrowserInfo = (): object => {
  let t = navigator.userAgent.toLowerCase() as any;
  return 0 <= t.indexOf("msie") ? { //ie < 11
    type: "IE",
    version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
    type: "IE",
    version: 11
  } : 0 <= t.indexOf("edge") ? {
    type: "Edge",
    version: Number(t!.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
    type: "Firefox",
    version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
    type: "Chrome",
    version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
    type: "Opera",
    version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
    type: "Safari",
    version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
    type: t,
    version: -1
  }
}

/** 
 * @func scrollToBottom 
 * @return {void}
 * @desc 📝 平滑滚动到底部
 */
export const scrollToBottom = (): void => {
  const c = document?.documentElement?.scrollTop ?? document?.body?.scrollTop;
  const d = document?.documentElement?.scrollHeight ?? document?.body?.scrollHeight;
  if (c < d) {
    window.requestAnimationFrame(scrollToBottom);
    window.scrollTo(0, c + c / 8);
  }
}

/**
 * @func smoothScroll
 * @param {number} top 滚动到的位置
 * @param {number} duration 滚动的时间
 * @return {void}
 * @desc 📝 平滑滚动到指定位置
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
/**
 * @func getClientHeight
 * @return {number}
 * @desc 📝 获取可视窗口的高度
 */
export const getClientHeight = (): number => {
  // return document?.documentElement?.clientHeight ?? document?.body?.clientHeight ?? 0;
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
}
/**
 * @func getClientWidth
 * @return {number}
 * @desc 📝 获取可视窗口的高度
 */
export const getClientWidth = (): number => {
  return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}
/**
 * @func toFullScreen
 * @return {void}
 * @desc 📝 全屏
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
/**
 * @func exitFullscreen
 * @return {void}
 * @desc 📝 退出全屏
 */
export const exitFullscreen = (): void => {
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

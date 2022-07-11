/**
 * @func isSupportWebP
 * @desc 判断浏览器是否支持webP格式图片
 * @returns {boolean}
 * @example if (isSupportWebP()) {...}
 */
export const isSupportWebP = (): boolean => {
  return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}
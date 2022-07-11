
/**
 * @func getClientWidth
 * @returns {number}
 * @desc 📝 获取可视窗口的高度
 * @example const clientW = getClientWidth();
 */
export const getClientWidth = (): number => {
  return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}
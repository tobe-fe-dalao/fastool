/**
 * @func getClientHeight
 * @returns {number}
 * @desc 📝 获取可视窗口的高度
 * @example getClientHeight();
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

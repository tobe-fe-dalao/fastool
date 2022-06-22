/**
 * @func getFromClipboard
 * @desc 📝 获取剪贴板内容
 * @returns {Promise<string>}
 * @example getFromClipboard().then(res => {...}
 */
export const getFromClipboard = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    navigator.clipboard.readText()
      .then(text => {
        resolve(text);
      })
      .catch(err => {
        reject(err);
      });
  });
};
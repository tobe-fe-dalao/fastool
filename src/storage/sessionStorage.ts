/**
 * @func setSessionStorage
 * @param {string} key
 * @param {string} value
 * @returns {any}
 * @desc  设置sessionStorage
 * @example setSessionStorage('key', 'value');
 */
export const setSessionStorage = (key: string, value: string) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, value)
};

/**
 * @func getSessionStorage
 * @param {string} key
 * @returns {any}
 * @desc  获取sessionStorage
 * @example getSessionStorage('key');
 */
export const getSessionStorage = (key: string): any => {
  if (!key) return;
  return window.sessionStorage.getItem(key)
};


/**
 * @func delSessionStorage
 * @param {string} key
 * @returns {any}
 * @desc  删除sessionStorage
 * @example delSessionStorage('key');
 */
export const delSessionStorage = (key: string) => {
  if (!key) return;
  window.sessionStorage.removeItem(key)
};

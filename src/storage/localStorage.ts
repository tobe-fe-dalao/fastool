/**
 * @func setLocalStorage
 * @param {string} key
 * @param {string} value
 * @returns {void}
 * @desc  设置localStorage
 * @example setLocalStorage('key', 'value');
 */
export const setLocalStorage = (key: string, value: string): void => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

/**
 * @func getLocalStorage
 * @param {string} key
 * @returns {string}
 * @desc  获取localStorage
 * @example getLocalStorage('key');
 */
export const getLocalStorage = (key: string): any => {
  if (!key) return;
  return window.localStorage.getItem(key);
}

/**
 * @func delLocalStorage
 * @param {string} key
 * @returns {any}
 * @desc  获取localStorage
 * @example delLocalStorage('key');
 */
export const delLocalStorage = (key: string): any => {
  if (!key) return;
  window.localStorage.removeItem(key);
};



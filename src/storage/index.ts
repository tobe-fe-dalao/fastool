/**
 * @func setLocalStorage
 * @param {string} key
 * @param {string} value
 * @returns {void}
 * @desc  设置localStorage
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
 */
export const delLocalStorage = (key: string): any => {
  if (!key) return;
  window.localStorage.removeItem(key);
};


/**
 * @func setSessionStorage
 * @param {string} key
 * @param {string} value
 * @returns {any}
 * @desc  设置sessionStorage
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
 */
export const delSessionStorage = (key: string) => {
  if (!key) return;
  window.sessionStorage.removeItem(key)
};

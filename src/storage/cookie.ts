/**
 * 获取 cookie 值
 * @param {string} key cookie 名称
 * @returns {string} cookie 值
 */
export const getCookie = (key: string): string => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${key}=`)) {
      return cookie.substring(key.length + 1);
    }
  }
  return '';
};

/**
 * 设置 cookie
 * @param {string} key cookie 名称
 * @param {string} value cookie 值
 * @param {number} expire 过期时间（单位：毫秒，默认 1 天）
 */
export const setCookie = (key = '', value = '', expire = 86400000): void => {
  if (typeof key !== 'string' || typeof value !== 'string' || typeof expire !== 'number') {
    throw new TypeError('Invalid arguments');
  }
  const d = new Date();
  d.setTime(d.getTime() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};

/**
 * 删除 cookie
 * @param {string} key cookie 名称
 */
export const deleteCookie = (key: string): void => {
  setCookie(key, '', -1);
};
import { isBrowser } from '../browser/isBrowser';

/**
 * @func setCookie
 * @param {key}[可选] cookie名称
 * @param {value}[可选] cookie名称
 * @returns {void}
 * @dec 📝 设置cookie
 * @example setCookie('key', 'value');
 */
export const setCookie = (key: string, value: string, expire: any): void => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};


/**
 * @func getCookie
 * @param key[可选] cookie名称
 * @returns {Array | string | undefined}
 * @dec 📝 获取cookie
 * @example getCookie('key');
 */
export const getCookie = (key?: string): Array<string> | string | undefined => {
  // Environmental Test
  if (!isBrowser) throw new Error("Non-browser environment, unavailable 'getCookie'");

  if (!document.cookie) throw new Error('No Cookie Found');

  if (key) {
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    return arr ? arr[2] : undefined;
  }
  // Get Cookies && String => Array
  return document.cookie.split(';');
};

/** 
 * @func clearCookie
 * @param key[可选] cookie名称
 * @returns {void}
 * @desc 📝 清除cookie
 * @example clearCookie('key');
 */
export const clearCookie = (key?: string): void => {
  let cookie = getCookie();
  // Environmental Test
  if (!isBrowser) throw new Error("Non-browser environment, unavailable 'cleanCookies'");
  if (!document.cookie) throw new Error('No Cookie Found');
  if (key) {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
  } else {
    for (let i = 0; i < cookie!.length; i++) {
      const element = cookie![i];
      document.cookie = element.replace(/^ +/, '').replace((element as any).match(/=(\S*)/)[1], ``);
    }
  }
}

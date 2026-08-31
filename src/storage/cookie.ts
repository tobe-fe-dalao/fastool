/**
 * Cookie options
 */
export interface CookieOptions {
  /** Validity period in milliseconds; omit for a session-level cookie */
  expire?: number;
  /** Path, defaults to / */
  path?: string;
  /** Domain */
  domain?: string;
  /** Only transmitted over HTTPS */
  secure?: boolean;
  /** SameSite policy */
  sameSite?: 'Lax' | 'Strict' | 'None';
}

/**
 * @func setCookie
 * @desc Set a cookie; when the third argument is a number it means expiration in ms, when an object it means full options
 * @param {string} key cookie name
 * @param {string} value cookie value
 * @param {number | CookieOptions} options expiration in ms or options object
 * @returns {void}
 * @example setCookie('token', 'abc');
 * @example setCookie('token', 'abc', 86400000); // 1 day
 * @example setCookie('token', 'abc', { expire: 86400000, path: '/', secure: true });
 */
export const setCookie = (
  key: string,
  value: string,
  options: number | CookieOptions = {}
): void => {
  if (typeof document === 'undefined' || !key) return;
  const opts: CookieOptions = typeof options === 'number' ? { expire: options } : options;

  let str = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  if (opts.expire) {
    str += `;expires=${new Date(Date.now() + opts.expire).toUTCString()}`;
  }
  str += `;path=${opts.path || '/'}`;
  if (opts.domain) str += `;domain=${opts.domain}`;
  if (opts.secure) str += ';secure';
  if (opts.sameSite) str += `;samesite=${opts.sameSite}`;

  document.cookie = str;
};

/**
 * @func getCookie
 * @desc Get the value of the cookie with the given name; returns an empty string when missing
 * @param {string} key cookie name
 * @returns {string} cookie value
 * @example getCookie('token') // 'abc'
 */
export const getCookie = (key: string): string => {
  if (typeof document === 'undefined' || !key) return '';
  const target = `${encodeURIComponent(key)}=`;
  const cookies = document.cookie ? document.cookie.split(';') : [];
  for (const cookie of cookies) {
    const item = cookie.trim();
    if (item.startsWith(target)) {
      return decodeURIComponent(item.slice(target.length));
    }
  }
  return '';
};

/**
 * @func getAllCookies
 * @desc Get all cookies, returned as an object
 * @returns {Record<string, string>} cookie key-value pairs
 * @example getAllCookies() // { token: 'abc', theme: 'dark' }
 */
export const getAllCookies = (): Record<string, string> => {
  const result: Record<string, string> = {};
  if (typeof document === 'undefined' || !document.cookie) return result;
  document.cookie.split(';').forEach((cookie) => {
    const item = cookie.trim();
    if (!item) return;
    const idx = item.indexOf('=');
    if (idx === -1) return;
    const key = decodeURIComponent(item.slice(0, idx).trim());
    result[key] = decodeURIComponent(item.slice(idx + 1));
  });
  return result;
};

/**
 * @func hasCookie
 * @desc Check whether a cookie with the given name exists
 * @param {string} key cookie name
 * @returns {boolean}
 * @example hasCookie('token') // true
 */
export const hasCookie = (key: string): boolean => {
  return getCookie(key) !== '';
};

/**
 * @func deleteCookie
 * @desc Delete the specified cookie (by setting its expiration to the past)
 * @param {string} key cookie name
 * @param {string} path cookie path, must match the one used when writing, defaults to /
 * @returns {void}
 * @example deleteCookie('token');
 */
export const deleteCookie = (key: string, path = '/'): void => {
  setCookie(key, '', { expire: -1, path });
};

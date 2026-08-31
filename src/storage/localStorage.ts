import { createStorage } from './base';

const driver = createStorage(() => window.localStorage);

/**
 * @func setLocalStorage
 * @desc Write a value into localStorage; supports any JSON-serializable data and an expiration time
 * @param {string} key key name
 * @param {any} value value
 * @param {number} expire expiration time in milliseconds; omit to never expire
 * @returns {void}
 * @example setLocalStorage('user', { name: 'Tom' });
 * @example setLocalStorage('token', 'abc', 7 * 24 * 60 * 60 * 1000); // expires after 7 days
 */
export const setLocalStorage = (key: string, value: any, expire?: number): void =>
  driver.set(key, value, expire);

/**
 * @func getLocalStorage
 * @desc Read from localStorage; returns the default value when the key is missing or expired
 * @param {string} key key name
 * @param {any} defaultValue default value, defaults to null
 * @returns {any} the stored value
 * @example getLocalStorage('user'); // { name: 'Tom' }
 * @example getLocalStorage('missing', 'none'); // 'none'
 */
export const getLocalStorage = <T = any>(key: string, defaultValue: T | null = null): T | null =>
  driver.get<T>(key, defaultValue);

/**
 * @func delLocalStorage
 * @desc Remove the specified key from localStorage
 * @param {string} key key name
 * @returns {void}
 * @example delLocalStorage('user');
 */
export const delLocalStorage = (key: string): void => driver.remove(key);

/**
 * @func clearLocalStorage
 * @desc Clear all localStorage entries under the current domain
 * @returns {void}
 * @example clearLocalStorage();
 */
export const clearLocalStorage = (): void => driver.clear();

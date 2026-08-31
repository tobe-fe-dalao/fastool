import { createStorage } from './base';

const driver = createStorage(() => window.sessionStorage);

/**
 * @func setSessionStorage
 * @desc Write a value into sessionStorage; supports any JSON-serializable data and an expiration time
 * @param {string} key key name
 * @param {any} value value
 * @param {number} expire expiration time in milliseconds; omit to never expire
 * @returns {void}
 * @example setSessionStorage('step', 2);
 */
export const setSessionStorage = (key: string, value: any, expire?: number): void =>
  driver.set(key, value, expire);

/**
 * @func getSessionStorage
 * @desc Read from sessionStorage; returns the default value when the key is missing or expired
 * @param {string} key key name
 * @param {any} defaultValue default value, defaults to null
 * @returns {any} the stored value
 * @example getSessionStorage('step', 1); // 2
 */
export const getSessionStorage = <T = any>(key: string, defaultValue: T | null = null): T | null =>
  driver.get<T>(key, defaultValue);

/**
 * @func delSessionStorage
 * @desc Remove the specified key from sessionStorage
 * @param {string} key key name
 * @returns {void}
 * @example delSessionStorage('step');
 */
export const delSessionStorage = (key: string): void => driver.remove(key);

/**
 * @func clearSessionStorage
 * @desc Clear all sessionStorage entries under the current domain
 * @returns {void}
 * @example clearSessionStorage();
 */
export const clearSessionStorage = (): void => driver.clear();

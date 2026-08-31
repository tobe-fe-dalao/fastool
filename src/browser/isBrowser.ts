/**
 * @const isBrowser
 * @desc Detect whether code runs in a browser environment (a boolean constant, not a function)
 * @example if (isBrowser) { document.title = 'x' }
 */
export const isBrowser: boolean =
  typeof window === 'object' && typeof document === 'object' && typeof navigator === 'object';

/**
 * @func isServer
 * @desc Detect whether code runs in a server (Node / SSR) environment
 * @returns {boolean}
 * @example if (isServer()) { return null }
 */
export const isServer = (): boolean => !isBrowser;

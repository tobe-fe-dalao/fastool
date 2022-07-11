/**
 * @func isBrowser
 * @returns {boolean}
 * @desc 检测代码是否运行在浏览器环境
 * @example if (isBrowser()) {...}
 */

export const isBrowser: boolean = typeof window === 'object' && typeof document === 'object';

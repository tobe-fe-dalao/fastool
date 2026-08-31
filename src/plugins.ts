/**
 * fastool CDN plugin entry point
 *
 * ⚠️ These plugins dynamically load third-party libraries (dayjs / clipboard.js / tinykeys)
 * from a CDN at runtime, so they are not included in the main bundle by default. They only
 * take effect when you explicitly import them via `import { dayJs } from 'fastool/plugins'`.
 * If you want to keep zero external dependencies, do not reference this entry point.
 */

export { default as importPlugin } from './plugins/importPlugin';
export { importPluginByUrl } from './plugins/loadPlugin';
export { default as dayJs } from './plugins/dayjs';
export { default as copyJs } from './plugins/copy';
export { default as keyCode } from './plugins/keycode';

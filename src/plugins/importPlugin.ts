/**
 * @func importPlugin
 * @desc Dynamically load a third-party module from a CDN
 *
 * In browser environments, dynamically `import()` is preferred to load ESM; in non-browser
 * (SSR) environments it returns a rejected Promise to avoid referencing a non-existent `document`.
 *
 * Note: this function makes a network request and belongs to the `fastool/plugins` sub-entry;
 * the main bundle does not include it.
 *
 * @param {string} moduleName global name the module is mounted as on window; used by the non-ESM fallback path
 * @param {string} cdnUrl CDN URL of the module
 * @returns {Promise<any>} the loaded module
 * @example
 * const dayjs = await importPlugin('dayjs', 'https://unpkg.com/dayjs@1.11.3/dayjs.min.js');
 * dayjs().format('YYYY-MM-DD');
 */
export default function importPlugin(moduleName: string, cdnUrl: string): Promise<any> {
  if (typeof window === 'undefined') {
    // SSR scenario: no document available, so fail directly instead of throwing a ReferenceError
    return Promise.reject(new Error('[fastool] importPlugin 只能在浏览器环境中使用'));
  }

  // prefer native dynamic import (@vite-ignore keeps the bundler from statically analyzing the external URL)
  return import(/* @vite-ignore */ cdnUrl).catch(() => {
    // fallback: inject a script tag and read the global variable from window
    return new Promise<any>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = cdnUrl;
      script.async = true;
      script.onload = () => resolve((window as any)[moduleName]);
      script.onerror = () => reject(new Error(`[fastool] 加载失败：${cdnUrl}`));
      document.head.appendChild(script);
    });
  });
}

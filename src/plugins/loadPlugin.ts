/**
 * @func importPluginByUrl
 * @desc Dynamically import a plugin module by URL and mount it on window
 * @param {string} cdnUrl CDN URL of the plugin
 * @param {string} pluginName global variable name of the plugin on window
 * @param {string} newName variable name to re-mount on window
 * @param {boolean} isEsm whether it is an ESM module, default true; when false, load via a script tag
 * @returns {Promise<T> | void} plugin module
 * @example await importPluginByUrl('https://unpkg.com/dayjs@1.11.3/dayjs.min.js', 'dayjs', 'myDayjs', false);
 */
export function importPluginByUrl<T = any>(
  cdnUrl: string,
  pluginName: string,
  newName: string,
  isEsm: boolean = true
): Promise<T> | void {
  if (typeof window === 'undefined') return;

  if (isEsm) {
    return import(/* @vite-ignore */ cdnUrl).then((module) => {
      (window as any)[newName] = module;
      return module as T;
    });
  }

  return new Promise<T>((resolve, reject) => {
    const scriptList = Array.from(document.getElementsByTagName('script'));
    const hasInject =
      (window as any)[pluginName] &&
      scriptList.some((script) => script.getAttribute('src') === cdnUrl);

    if (hasInject) {
      (window as any)[newName] = (window as any)[pluginName];
      resolve((window as any)[pluginName]?.default ?? (window as any)[pluginName]);
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('src', cdnUrl);
    script.onload = () => {
      (window as any)[newName] = (window as any)[pluginName];
      resolve((window as any)[pluginName]?.default ?? (window as any)[pluginName]);
    };
    script.onerror = () => reject(new Error(`加载 ${pluginName} 失败`));
    document.head.appendChild(script);
  });
}

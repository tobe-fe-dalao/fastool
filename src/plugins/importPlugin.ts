/**
 * @func importPlugin
 * @desc 根据url引入插件模块
 * @param {string} url
 * @param {string} moduleName  该插件对应的名称
 * @returns {Promise}
 * @example  await importPlugin(cdnUrl, pluginName)
 */
// export default async function importPlugin(url: string, moduleName?: string): Promise<any> {
//   // Check if ES6 modules are supported
//   const supportsES6Modules = (() => {
//     try {
//       new Function('import("")');
//       return true;
//     } catch {
//       return false;
//     }
//   })();
//   console.log(supportsES6Modules, '检测是否支持ESM')
//   if (supportsES6Modules) {
//     // Use import() to load the module

//     const module = await import(url);
//     if (moduleName) {
//       if (module[moduleName]) {
//         return module[moduleName];
//       } else {
//         throw new Error(`Module "${moduleName}" not found in ${url}`);
//       }
//     } else {
//       return module;
//     }
//   } else {
//     // Use script tag to load the script
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = url;

//       script.onload = () => {
//         if (moduleName) {
//           if (typeof window[moduleName] === 'undefined') {
//             reject(new Error(`Global variable "${moduleName}" not found`));
//           } else {
//             resolve(window[moduleName]);
//           }
//         } else {
//           resolve(moduleName);
//         }
//       };

//       script.onerror = () => {
//         reject(new Error(`Failed to load script from ${url}`));
//       };

//       document.head.appendChild(script);
//     });
//   }
// }
export default function importPluginBycdn(moduleName: string, cdnUrl: string): Promise<any> {
  if (typeof window !== 'undefined') {
    // 浏览器支持ES Modules
    return import(cdnUrl)
  } else {
    // 浏览器不支持ES Modules
    return new Promise((resolve, reject) => {
      const script = document.createElement("script")
      script.src = cdnUrl
      script.async = true
      script.onload = () => {
        resolve((window as any)[moduleName])
      }
      script.onerror = () => {
        reject(new Error(`Failed to load ${cdnUrl}`))
      }
      document.head.appendChild(script)
    })
  }
}
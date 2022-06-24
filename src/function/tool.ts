/**
 * @func throttle
 * @desc 函数节流，每隔一段时间执行一次，防止函数过于频繁调用，导致性能问题
 * @param {Function} fn 将要处理的函数
 * @param {number} wait 时间, 单位为毫秒
 * @returns 节流函数
 * @example throttle(fn, wait)
 */
export const throttle = (fn: Function, wait: number = 300): Function => {
  let isRunning = false;
  return (...args: any[]) => {
    if (isRunning) return;
    isRunning = true;
    setTimeout(() => {
      fn(...args);
      isRunning = false;
    }, wait);
  }
}

/**
 * @func debounce
 * @desc 防抖函数 
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @param {function} fn 将要处理的函数
 * @param {number} wait 时间, 单位为毫秒
 * @param immediate 是否在触发事件后 在时间段n开始，立即执行，否则是时间段n结束，才执行
 * @returns 包装好的节流函数
 * @example debounce(fn, wait)
 * 
 */
export function debounce(fn: Function, wait: number, immediate: boolean = false) {
  let timer: any = null;
  return function (this: unknown, ...args: any) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (immediate) {
      if (!timer) fn.apply(this, args);
      timer = setTimeout(function () {//n 秒内 多次触发事件,重新计算.timeer 
        timer = null;//n 秒内没有触发事件 timeer 设置为null，保证了n 秒后能重新触发事件 flag = true = !timmer  
      }, wait)
    } else {
      timer = setTimeout(() => { fn.apply(this, args) }, wait);
    }
  };
}

/**
 * @func deepClone 
 * @param {object} obj 将要复制的对象
 * @param {string} hash  哈希值
 * @returns {object} 复制后的对象
 * @desc  深度复制对象
 */

export const deepClone = (obj: object, hash: any = new WeakMap()): object => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //正则对象直接返回一个新的正则对象     
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      cloneObj[key] = deepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}

/**
 * @func fetchUtil
 * @desc 封装fetch函数，用Promise做回调
 * @returns {Promise}
 * @type {{get: (function(*=)), post: (function(*=, *=))}}
 * @example fetchUtil.get(url)
 */
export const fetchUtil = {
  get: (url: string) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then((response) => response.json()).then(response => {
        resolve(response);
      }).catch(err => {
        reject(new Error(err));
      });
    });
  },
  post: (url: string, params: any) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
      }).then((response) => response.json()).then(response => {
        resolve(response);
      }).catch(err => {
        reject(new Error(err));
      });
    });
  }
};

/**
 * @func getTypeOf
 * @param {unknown} param
 * @returns {string}
 * @desc 获取参数类型
 * @example getTypeOf(...)
 * String, Number, Boolean, Symbol, Null, Undefined, Object
 * Array, RegExp, Date, Error, Function, AsyncFunction, HTMLDocument
 */
export const getTypeOf = (param: unknown): string => {
  const type = Object.prototype.toString.call(param).slice(8, -1);
  return type.toLowerCase();
};

/**
 * @func sleep
 * @param {number} wait
 * @returns {Promise}
 * @desc 睡眠函数
 */
export const sleep = async (wait: number) => new Promise(resolve => setTimeout(resolve, wait));

/**
 * @func importPluginByUrl
 * @desc 根据url引入插件模块
 * @param {String} cdnUrl
 * @param {String} pluginName  该插件对应的名称
 * @param {String} newName  重新定义的名称
 * @returns {Promise}
 * @example importPluginByUrl(cdnUrl, pluginName)
 */
export function importPluginByUrl<T = any>(cdnUrl: string, pluginName: string, newName: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const scriptList = Array.from(document.getElementsByTagName('script'))
    const hasInject = window[pluginName] && scriptList.some(script => script.getAttribute('src') === cdnUrl)
    if (hasInject) {
      window[newName] = window[pluginName];
      return resolve(window[pluginName]?.default ?? window[pluginName]);
    }
    const script = document.createElement('script')
    script.setAttribute('src', cdnUrl)
    script.setAttribute('async', 'async')
    script.setAttribute('type', 'module')
    document.head.appendChild(script)
    script.onload = () => {
      window[newName] = window[pluginName];
      resolve(window[pluginName]?.default ?? window[pluginName]);
    }
    script.onerror = () => {
      reject(`加载${pluginName}失败`)
    }
    //若不支持ESM   或者polyfill方案：https://github.com/systemjs/systemjs
    // import('https://unpkg.com/tinykeys@latest/dist/tinykeys.module.js' as any)
    //   .then((module) => {
    //     window[newName] = module
    //     console.log(module)
    //     resolve(module)
    //   });
  })
}

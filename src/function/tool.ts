/**
 * Type of a wrapped function with a cancel method
 */
export interface ControlledFunction<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): void;
  /** Cancel a pending invocation */
  cancel(): void;
}

/**
 * @func throttle
 * @desc Throttle a function: execute at most once within wait ms, for high-frequency events like scroll and resize
 * @param {Function} fn function to throttle
 * @param {number} wait time interval in ms, default 300
 * @param {object} options leading: whether to invoke the first call immediately (default true); trailing: whether to fire once more after the end (default true)
 * @returns {ControlledFunction} throttled function, with a cancel method
 * @example
 * const onScroll = throttle(() => console.log('scroll'), 200);
 * window.addEventListener('scroll', onScroll);
 * onScroll.cancel(); // cancel
 */
export function throttle<F extends (...args: any[]) => any>(
  fn: F,
  wait = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): ControlledFunction<F> {
  const { leading = true, trailing = true } = options;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;
  let lastArgs: Parameters<F> | null = null;
  let lastThis: unknown = null;

  const invoke = () => {
    lastExecTime = Date.now();
    timer = null;
    if (lastArgs) {
      fn.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
  };

  const throttled = function (this: unknown, ...args: Parameters<F>) {
    const now = Date.now();
    // when leading is false, the first call is not executed immediately but deferred until after wait
    if (!lastExecTime && !leading) lastExecTime = now;

    const remaining = wait - (now - lastExecTime);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastExecTime = now;
      fn.apply(this, args);
    } else if (!timer && trailing) {
      lastArgs = args;
      lastThis = this;
      timer = setTimeout(invoke, remaining);
    }
  };

  return Object.assign(throttled, {
    cancel() {
      if (timer) clearTimeout(timer);
      timer = null;
      lastExecTime = 0;
      lastArgs = null;
      lastThis = null;
    },
  });
}

/**
 * @func debounce
 * @desc Debounce a function: execute wait ms after the last trigger, for input search, form validation, etc.
 * @param {Function} fn function to debounce
 * @param {number} wait delay in ms, default 300
 * @param {boolean} immediate whether to invoke the first call immediately, default false
 * @returns {ControlledFunction} debounced function, with a cancel method
 * @example
 * const search = debounce((kw) => request(kw), 500);
 * input.addEventListener('input', (e) => search(e.target.value));
 */
export function debounce<F extends (...args: any[]) => any>(
  fn: F,
  wait = 300,
  immediate = false
): ControlledFunction<F> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: unknown, ...args: Parameters<F>) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (immediate) {
      const shouldCall = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (shouldCall) fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, wait);
    }
  };

  return Object.assign(debounced, {
    cancel() {
      if (timer) clearTimeout(timer);
      timer = null;
    },
  });
}

/**
 * @func deepClone
 * @desc Deep-clone an object, supporting circular references, Date, RegExp, Map, Set, arrays, and Symbol keys
 * @param {T} obj value to clone
 * @param {WeakMap} hash internal cache; no need to pass manually
 * @returns {T} cloned value
 * @example const copy = deepClone({ a: { b: 1 } });
 */
export function deepClone<T>(obj: T, hash: WeakMap<object, any> = new WeakMap()): T {
  // Primitives and functions are returned directly
  if (obj === null || typeof obj !== 'object') return obj;

  // Date object
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  // RegExp object
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as unknown as T;

  // Handle circular references
  if (hash.has(obj as unknown as object)) return hash.get(obj as unknown as object);

  // Map
  if (obj instanceof Map) {
    const mapClone = new Map();
    hash.set(obj as unknown as object, mapClone);
    obj.forEach((value, key) => {
      mapClone.set(deepClone(key, hash), deepClone(value, hash));
    });
    return mapClone as unknown as T;
  }

  // Set
  if (obj instanceof Set) {
    const setClone = new Set();
    hash.set(obj as unknown as object, setClone);
    obj.forEach((value) => {
      setClone.add(deepClone(value, hash));
    });
    return setClone as unknown as T;
  }

  // Array: must construct a real array; Object.create would only yield an array-like object
  if (Array.isArray(obj)) {
    const arrClone: any[] = new Array(obj.length);
    hash.set(obj as unknown as object, arrClone);
    for (let i = 0; i < obj.length; i++) {
      arrClone[i] = deepClone(obj[i], hash);
    }
    // Copy non-index properties attached to the array
    for (const key of Reflect.ownKeys(obj)) {
      if (key === 'length' || /^\d+$/.test(String(key))) continue;
      (arrClone as any)[key] = deepClone((obj as any)[key], hash);
    }
    return arrClone as unknown as T;
  }

  // Plain object: preserve the prototype chain and property descriptors
  const cloneObj = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );
  hash.set(obj as unknown as object, cloneObj);

  for (const key of Reflect.ownKeys(obj as object)) {
    const value = (obj as any)[key];
    cloneObj[key] = typeof value === 'object' && value !== null ? deepClone(value, hash) : value;
  }
  return cloneObj as T;
}

/**
 * @func getTypeOf
 * @desc Get the precise type of a value (lowercase)
 * @param {unknown} param value to check
 * @returns {string} e.g. 'string' | 'number' | 'array' | 'date' | 'regexp' | 'null', etc.
 * @example getTypeOf([]) // 'array'
 * @example getTypeOf(null) // 'null'
 */
export const getTypeOf = (param: unknown): string => {
  return Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
};

/**
 * @func sleep
 * @desc Sleep for a given number of milliseconds (async)
 * @param {number} wait milliseconds
 * @returns {Promise<void>}
 * @example await sleep(1000);
 */
export const sleep = async (wait: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, wait));

/**
 * @func fetchUtil
 * @desc A minimal fetch-based request wrapper; serializes params to JSON automatically when it is an object
 * @example fetchUtil.get('/api/list')
 * @example fetchUtil.post('/api/add', { name: 'Tom' })
 */
export const fetchUtil = {
  /**
   * @desc Issue a GET request
   * @param {string} url request URL
   * @param {RequestInit} options extra fetch options
   * @returns {Promise<any>} response data
   */
  get: (url: string, options: RequestInit = {}): Promise<any> =>
    fetch(url, { method: 'GET', ...options }).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
      return response.json();
    }),

  /**
   * @desc Issue a POST request
   * @param {string} url request URL
   * @param {any} params request body; objects are auto-converted to JSON strings
   * @param {RequestInit} options extra fetch options
   * @returns {Promise<any>} response data
   */
  post: (url: string, params?: any, options: RequestInit = {}): Promise<any> => {
    const isPlainBody =
      typeof params === 'string' ||
      params instanceof FormData ||
      params instanceof Blob ||
      params instanceof URLSearchParams;
    return fetch(url, {
      method: 'POST',
      headers: isPlainBody ? {} : { 'Content-Type': 'application/json' },
      body: isPlainBody ? params : JSON.stringify(params),
      ...options,
    }).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
      return response.json();
    });
  },
};

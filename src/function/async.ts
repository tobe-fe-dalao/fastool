/**
 * @func retry
 * @desc Retry an async function on failure, throwing the last error after all attempts fail
 * @param {Function} fn function returning a Promise
 * @param {number} times maximum number of attempts (including the first), default 3
 * @param {number} delay delay in ms before each retry, default 0
 * @returns {Promise<T>} result of the first success
 * @example
 * const data = await retry(() => fetch('/api').then((r) => r.json()), 3, 1000);
 */
export async function retry<T>(
  fn: () => Promise<T>,
  times = 3,
  delay = 0
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < Math.max(1, times); i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < Math.max(1, times) - 1 && delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

/**
 * @func withTimeout
 * @desc Set a timeout for a Promise, rejecting with the given error on timeout
 * @param {Promise<T>} promise target Promise
 * @param {number} ms timeout in milliseconds
 * @param {string} message timeout error message, default 'timeout'
 * @returns {Promise<T>} Promise with timeout control
 * @example await withTimeout(fetch('/api'), 5000, '请求超时');
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, message = 'timeout'): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

/**
 * @func defer
 * @desc Defer a function to the next microtask (similar to process.nextTick)
 * @param {Function} fn function to defer
 * @returns {Promise<void>} Promise resolved in the microtask
 * @example defer(() => console.log('later'));
 */
export function defer(fn: () => void): Promise<void> {
  return Promise.resolve().then(fn);
}

/**
 * @func rafThrottle
 * @desc Throttle with requestAnimationFrame, ensuring the callback runs at most once per frame (browser only)
 * @param {Function} fn target function
 * @returns {Function} throttled function
 * @example window.addEventListener('scroll', rafThrottle(onScroll));
 */
export function rafThrottle<F extends (...args: any[]) => any>(fn: F): (...args: Parameters<F>) => void {
  let locked = false;
  return function (this: unknown, ...args: Parameters<F>) {
    if (locked) return;
    locked = true;
    const raf =
      typeof requestAnimationFrame !== 'undefined'
        ? requestAnimationFrame
        : (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 16);
    raf(() => {
      fn.apply(this, args);
      locked = false;
    });
  };
}

/**
 * @func isAsyncFunction
 * @desc Check whether a function is an async function
 * @param {unknown} fn value to check
 * @returns {boolean}
 * @example isAsyncFunction(async () => {}) // true
 */
export function isAsyncFunction(fn: unknown): boolean {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
}

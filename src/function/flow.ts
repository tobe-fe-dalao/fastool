/**
 * @func pipe
 * @desc Compose functions left to right; the return value of each becomes the input of the next
 * @param {...Function[]} fns function sequence
 * @returns {Function} composed function
 * @example
 * const fn = pipe((x: number) => x + 1, (x: number) => x * 2);
 * fn(3) // 8
 */
export function pipe(...fns: Function[]): Function {
  if (!fns.length) return (value: unknown) => value;
  return fns.reduce((prev, next) => (...args: any[]) => next(prev(...args)));
}

/**
 * @func compose
 * @desc Compose functions right to left (the reverse of pipe)
 * @param {...Function[]} fns function sequence
 * @returns {Function} composed function
 * @example
 * const fn = compose((x: number) => x * 2, (x: number) => x + 1);
 * fn(3) // 8
 */
export function compose(...fns: Function[]): Function {
  return pipe(...fns.reverse());
}

/**
 * @func curry
 * @desc Curry a function: only execute when enough args are given, otherwise return a function for the rest
 * @param {Function} fn target function
 * @param {number} arity arity; defaults to fn.length
 * @returns {Function} curried function
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c;
 * curry(add)(1)(2)(3) // 6
 * curry(add)(1, 2)(3) // 6
 */
export function curry(fn: Function, arity: number = fn.length): Function {
  return function curried(...args: any[]): any {
    return args.length >= arity ? fn(...args) : (...next: any[]) => curried(...args, ...next);
  };
}

/**
 * @func partial
 * @desc Fix some arguments of a function, returning a new function with fewer parameters
 * @param {Function} fn target function
 * @param {...any[]} presetArgs preset leading arguments
 * @returns {Function} new function
 * @example
 * const add = (a: number, b: number) => a + b;
 * const add10 = partial(add, 10);
 * add10(5) // 15
 */
export function partial(fn: Function, ...presetArgs: any[]): Function {
  return function (this: unknown, ...restArgs: any[]) {
    return fn.apply(this, [...presetArgs, ...restArgs]);
  };
}

/**
 * @func once
 * @desc Make a function run only once; later calls return the first result
 * @param {Function} fn target function
 * @returns {Function} wrapped function
 * @example
 * const init = once(() => { console.log('init'); return 1; });
 * init(); // prints init, returns 1
 * init(); // no longer prints, returns 1
 */
export function once<F extends (...args: any[]) => any>(fn: F): F {
  let called = false;
  let result: ReturnType<F>;
  return function (this: unknown, ...args: Parameters<F>) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  } as F;
}

/**
 * @func memoize
 * @desc Cache a function's results; identical inputs are computed once; accessible via .cache
 * @param {Function} fn target function
 * @param {Function} resolver custom cache-key generator; defaults to JSON.stringify of the arguments
 * @returns {Function} function with cache
 * @example
 * const calc = memoize((n: number) => n * n);
 * calc(4) // 16 (first calculation)
 * calc(4) // 16 (from cache)
 * calc.cache.clear();
 */
export function memoize<F extends (...args: any[]) => any>(
  fn: F,
  resolver?: (...args: Parameters<F>) => string
): F & { cache: Map<string, ReturnType<F>> } {
  const cache = new Map<string, ReturnType<F>>();
  const memoized = function (this: unknown, ...args: Parameters<F>) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key) as ReturnType<F>;
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  } as F & { cache: Map<string, ReturnType<F>> };
  memoized.cache = cache;
  return memoized;
}

/**
 * @func times
 * @desc Run a function n times and collect the return values
 * @param {number} n number of runs
 * @param {Function} fn function run each time, receiving the current index
 * @returns {any[]} array of return values
 * @example times(3, (i) => i * 2) // [0, 2, 4]
 */
export function times(n: number, fn: (index: number) => any = (i) => i): any[] {
  const count = Math.max(0, Math.trunc(n));
  const result: any[] = [];
  for (let i = 0; i < count; i++) {
    result.push(fn(i));
  }
  return result;
}

/**
 * @func noop
 * @desc no-op function, often used as a default callback
 * @example const cb = options.callback ?? noop;
 */
export function noop(): void {
  // Do nothing
}

/**
 * @func identity
 * @desc Return the value passed in
 * @param {T} value any value
 * @returns {T} the same value
 * @example identity(5) // 5
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * @func negate
 * @desc Negate the result of a predicate function
 * @param {Function} predicate predicate function
 * @returns {Function} negated function
 * @example const notEmpty = negate(isEmpty);
 */
export function negate<F extends (...args: any[]) => boolean>(predicate: F): F {
  return function (this: unknown, ...args: Parameters<F>) {
    return !predicate.apply(this, args);
  } as F;
}

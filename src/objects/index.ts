import { isObject } from '../is';

/**
 * @func pick
 * @desc Pick the specified properties from an object into a new object
 * @param {T} obj source object
 * @param {K[]} keys property names to keep
 * @returns {Pick<T, K>} new object
 * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  if (!isObject(obj)) return result;
  keys.forEach((key) => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
}

/**
 * @func omit
 * @desc Omit the specified properties from an object into a new object
 * @param {T} obj source object
 * @param {K[]} keys property names to omit
 * @returns {Omit<T, K>} new object
 * @example omit({ a: 1, b: 2 }, ['b']) // { a: 1 }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = {} as Omit<T, K>;
  if (!isObject(obj)) return result;
  const exclude = new Set<unknown>(keys);
  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    if (!exclude.has(key)) (result as any)[key] = obj[key];
  });
  return result;
}

/**
 * @func pickBy
 * @desc Pick object properties by a given criterion
 * @param {T} obj source object
 * @param {Function} predicate predicate function (value, key) => boolean
 * @returns {Partial<T>} new object
 * @example pickBy({ a: 1, b: 2 }, (v) => v > 1) // { b: 2 }
 */
export function pickBy<T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  if (!isObject(obj)) return result;
  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    if (predicate(obj[key], key)) result[key] = obj[key];
  });
  return result;
}

/**
 * @func omitBy
 * @desc Omit object properties by a given criterion
 * @param {T} obj source object
 * @param {Function} predicate predicate function (value, key) => boolean
 * @returns {Partial<T>} new object
 * @example omitBy({ a: 1, b: 2 }, (v) => v > 1) // { a: 1 }
 */
export function omitBy<T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  return pickBy(obj, (value, key) => !predicate(value, key));
}

/**
 * @func deepEqual
 * @desc Deeply compare two values for equality (supports arrays, objects, Date, RegExp, Map, Set; NaN is treated as equal)
 * @param {unknown} a value A
 * @param {unknown} b value B
 * @returns {boolean} whether the values are deeply equal
 * @example deepEqual({ a: [1, 2] }, { a: [1, 2] }) // true
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  // NaN values are considered equal
  if (typeof a === 'number' && typeof b === 'number') {
    return Number.isNaN(a) && Number.isNaN(b);
  }

  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp && b instanceof RegExp) return String(a) === String(b);

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, value] of a) {
      if (!b.has(key) || !deepEqual(value, b.get(key))) return false;
    }
    return true;
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const value of a) {
      if (!b.has(value)) return false;
    }
    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      deepEqual((a as any)[key], (b as any)[key])
  );
}

/** Parse a path in the form 'a.b[0].c' into an array of keys */
function parsePath(path: string): string[] {
  return path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter((item) => item !== '');
}

/**
 * @func get
 * @desc Safely get a value from an object by path, returning a default value when the path does not exist
 * @param {unknown} obj source object
 * @param {string} path property path, supports the 'a.b[0].c' form
 * @param {any} defaultValue default value returned when not found
 * @returns {any} the value found or the default
 * @example get({ a: { b: [1, 2] } }, 'a.b[1]') // 2
 * @example get({ a: 1 }, 'x.y', 'none') // 'none'
 */
export function get(obj: unknown, path: string, defaultValue?: any): any {
  if (obj === null || obj === undefined || !path) return defaultValue;
  const keys = parsePath(path);
  let result: any = obj;
  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue;
    result = result[key];
  }
  return result === undefined ? defaultValue : result;
}

/**
 * @func set
 * @desc Set a value on an object by path; intermediate objects along the path are created automatically
 * @param {T} obj source object
 * @param {string} path property path, supports the 'a.b[0].c' form
 * @param {unknown} value value to set
 * @returns {T} the original object (mutated in place)
 * @example set({}, 'a.b', 1) // { a: { b: 1 } }
 * @example set({}, 'a.list[0]', 'x') // { a: { list: ['x'] } }
 */
export function set<T extends Record<string, any>>(obj: T, path: string, value: unknown): T {
  if (!isObject(obj) || !path) return obj;
  const keys = parsePath(path);
  let current: any = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    if (!isObject(current[key]) && !Array.isArray(current[key])) {
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}

/**
 * @func has
 * @desc Check whether an object has a property at the given path (including properties whose value is undefined)
 * @param {unknown} obj source object
 * @param {string} path property path
 * @returns {boolean}
 * @example has({ a: { b: 1 } }, 'a.b') // true
 */
export function has(obj: unknown, path: string): boolean {
  if (obj === null || obj === undefined || !path) return false;
  const keys = parsePath(path);
  let current: any = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return false;
    if (!Object.prototype.hasOwnProperty.call(current, key)) return false;
    current = current[key];
  }
  return true;
}

/**
 * @func invert
 * @desc Invert an object's keys and values (values become keys, keys become values)
 * @param {Record<string, any>} obj source object
 * @returns {Record<string, string>} inverted object
 * @example invert({ a: '1', b: '2' }) // { '1': 'a', '2': 'b' }
 */
export function invert(obj: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {};
  if (!isObject(obj)) return result;
  Object.keys(obj).forEach((key) => {
    result[String(obj[key])] = key;
  });
  return result;
}

/**
 * @func mapKeys
 * @desc Iterate over an object and transform its keys
 * @param {Record<string, V>} obj source object
 * @param {Function} iteratee key transform function (value, key) => string
 * @returns {Record<string, V>} new object
 * @example mapKeys({ a: 1 }, (v, k) => k.toUpperCase()) // { A: 1 }
 */
export function mapKeys<V>(
  obj: Record<string, V>,
  iteratee: (value: V, key: string) => string
): Record<string, V> {
  const result: Record<string, V> = {};
  if (!isObject(obj)) return result;
  Object.keys(obj).forEach((key) => {
    result[iteratee(obj[key], key)] = obj[key];
  });
  return result;
}

/**
 * @func mapValues
 * @desc Iterate over an object and transform its values
 * @param {Record<string, V>} obj source object
 * @param {Function} iteratee value transform function (value, key) => R
 * @returns {Record<string, R>} new object
 * @example mapValues({ a: 1, b: 2 }, (v) => v * 2) // { a: 2, b: 4 }
 */
export function mapValues<V, R>(
  obj: Record<string, V>,
  iteratee: (value: V, key: string) => R
): Record<string, R> {
  const result: Record<string, R> = {};
  if (!isObject(obj)) return result;
  Object.keys(obj).forEach((key) => {
    result[key] = iteratee(obj[key], key);
  });
  return result;
}

/**
 * @func toPairs
 * @desc Convert an object into an array of [key, value] pairs
 * @param {Record<string, V>} obj source object
 * @returns {Array} array of key-value pairs
 * @example toPairs({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 */
export function toPairs<V>(obj: Record<string, V>): [string, V][] {
  if (!isObject(obj)) return [];
  return Object.keys(obj).map((key) => [key, obj[key]] as [string, V]);
}

/**
 * @func fromPairs
 * @desc Convert an array of [key, value] pairs into an object
 * @param {Array} pairs array of key-value pairs
 * @returns {Record<string, V>} object
 * @example fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
 */
export function fromPairs<V>(pairs: [string, V][]): Record<string, V> {
  const result: Record<string, V> = {};
  pairs.forEach(([key, value]) => {
    result[key] = value;
  });
  return result;
}

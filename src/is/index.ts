/**
 * Type-checking utilities.
 * All functions return a boolean (type guards) and are safe for null / undefined.
 */

/**
 * @func isArray
 * @desc Check whether the value is an array
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isArray([1, 2]) // true
 */
export function isArray(value: unknown): value is any[] {
  return Array.isArray(value);
}

/**
 * @func isString
 * @desc Check whether the value is a string
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isString('abc') // true
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * @func isNumber
 * @desc Check whether the value is of type number (excludes numeric strings, but includes NaN itself)
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isNumber(1) // true
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * @func isBoolean
 * @desc Check whether the value is a boolean
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isBoolean(false) // true
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * @func isFunction
 * @desc Check whether the value is a function
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isFunction(() => {}) // true
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * @func isSymbol
 * @desc Check whether the value is a Symbol
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isSymbol(Symbol('a')) // true
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * @func isDate
 * @desc Check whether the value is a valid Date object
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isDate(new Date()) // true
 * @example isDate(new Date('x')) // false (invalid date)
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/**
 * @func isRegExp
 * @desc Check whether the value is a RegExp
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isRegExp(/a/) // true
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/**
 * @func isError
 * @desc Check whether the value is an Error object
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isError(new Error('x')) // true
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * @func isMap
 * @desc Check whether the value is a Map
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isMap(new Map()) // true
 */
export function isMap(value: unknown): value is Map<any, any> {
  return value instanceof Map;
}

/**
 * @func isSet
 * @desc Check whether the value is a Set
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isSet(new Set()) // true
 */
export function isSet(value: unknown): value is Set<any> {
  return value instanceof Set;
}

/**
 * @func isPromise
 * @desc Check whether the value is a Promise (includes thenable objects)
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isPromise(Promise.resolve()) // true
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return value instanceof Promise || (!!value && typeof (value as any).then === 'function');
}

/**
 * @func isObject
 * @desc Check whether the value is an object (excludes null and arrays)
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isObject({}) // true
 * @example isObject([]) // false
 */
export function isObject(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @func isPlainObject
 * @desc Check whether the value is a plain object (created by {} or new Object())
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isPlainObject({ a: 1 }) // true
 * @example isPlainObject(new Date()) // false
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
  if (!isObject(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * @func isNil
 * @desc Check whether the value is null or undefined
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isNil(null) // true
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * @func isDef
 * @desc Check whether the value is defined (not undefined)
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isDef(0) // true
 */
export function isDef<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

/**
 * @func isEmpty
 * @desc Check whether the value is empty: null/undefined/empty string/empty array/empty object/empty Map/empty Set are all considered empty
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isEmpty({}) // true
 * @example isEmpty([1]) // false
 * @example isEmpty('  ') // false (whitespace is not considered empty; trim first)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (isObject(value)) return Object.keys(value as object).length === 0;
  return false;
}

/**
 * @func isEmptyObject
 * @desc Check whether the value is an empty object
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isEmptyObject({ a: 1 }) // false
 */
export function isEmptyObject(value: unknown): boolean {
  return isPlainObject(value) && Object.keys(value).length === 0;
}

/**
 * @func isInteger
 * @desc Check whether the value is an integer
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isInteger(1.5) // false
 */
export function isInteger(value: unknown): boolean {
  return Number.isInteger(value);
}

/**
 * @func isNumeric
 * @desc Check whether the value is a usable number (a number type or a string convertible to a finite number)
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isNumeric('12.5') // true
 * @example isNumeric('12a') // false
 */
export function isNumeric(value: unknown): boolean {
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'string' || value.trim() === '') return false;
  return Number.isFinite(Number(value));
}

/**
 * @func isJSON
 * @desc Check whether a string is valid JSON
 * @param {string} str string to check
 * @returns {boolean}
 * @example isJSON('{"a":1}') // true
 * @example isJSON('{a:1}') // false
 */
export function isJSON(str: string): boolean {
  if (typeof str !== 'string') return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * @func isElement
 * @desc Check whether the value is a DOM element (SSR-safe)
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isElement(document.body) // true
 */
export function isElement(value: unknown): boolean {
  return typeof Element !== 'undefined' && value instanceof Element;
}

/**
 * @func isPrimitive
 * @desc Check whether the value is a primitive type (string / number / boolean / symbol / bigint / null / undefined)
 * @param {unknown} value value to check
 * @returns {boolean}
 * @example isPrimitive(1) // true
 */
export function isPrimitive(value: unknown): boolean {
  return (
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  );
}

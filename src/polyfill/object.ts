/**
 * Object static method polyfills
 *
 * Polyfills are only applied when the native method is missing, so supported
 * browsers have no side effects.
 */

/**
 * @func polyfillObjectAssign
 * @desc Polyfill Object.assign (shallow-merge, consistent with native behavior; only enumerable own properties are processed)
 * @returns {void}
 * @example polyfillObjectAssign(); Object.assign({}, { a: 1 }); // { a: 1 }
 */
export function polyfillObjectAssign(): void {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target: any): any {
        'use strict';
        if (target == null) throw new TypeError('Cannot convert undefined or null to object');
        // Iterate over arguments to avoid conflict between rest params and 'use strict'
        const sources: any[] = Array.prototype.slice.call(arguments, 1);
        const to = Object(target);
        for (const source of sources) {
          if (source == null) continue;
          for (const key of Object.keys(source)) {
            to[key] = source[key];
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }
}

/**
 * @func polyfillObjectEntries
 * @desc Polyfill Object.entries
 * @returns {void}
 * @example polyfillObjectEntries(); Object.entries({ a: 1 }); // [['a', 1]]
 */
export function polyfillObjectEntries(): void {
  if (!Object.entries) {
    Object.defineProperty(Object, 'entries', {
      value: function entries(obj: any): [string, any][] {
        const result: [string, any][] = [];
        for (const key of Object.keys(obj)) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) result.push([key, obj[key]]);
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}

/**
 * @func polyfillObjectValues
 * @desc Polyfill Object.values
 * @returns {void}
 * @example polyfillObjectValues(); Object.values({ a: 1 }); // [1]
 */
export function polyfillObjectValues(): void {
  if (!Object.values) {
    Object.defineProperty(Object, 'values', {
      value: function values(obj: any): any[] {
        const result: any[] = [];
        for (const key of Object.keys(obj)) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) result.push(obj[key]);
        }
        return result;
      },
      writable: true,
      configurable: true,
    });
  }
}

/**
 * @func polyfillObjectIs
 * @desc Polyfill Object.is (distinguishes +0/-0, and NaN equals itself)
 * @returns {void}
 * @example polyfillObjectIs(); Object.is(NaN, NaN); // true
 */
export function polyfillObjectIs(): void {
  if (!Object.is) {
    Object.defineProperty(Object, 'is', {
      value: function is(x: any, y: any): boolean {
        if (x === y) {
          // +0 !== -0
          return x !== 0 || 1 / x === 1 / y;
        }
        // NaN === NaN
        return x !== x && y !== y;
      },
      writable: true,
      configurable: true,
    });
  }
}

/**
 * @func polyfillArrayIsArray
 * @desc Polyfill Array.isArray (fails in some legacy iframe contexts)
 * @returns {void}
 * @example polyfillArrayIsArray(); Array.isArray([]); // true
 */
export function polyfillArrayIsArray(): void {
  if (!Array.isArray) {
    (Array as any).isArray = function (arg: any): boolean {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
}

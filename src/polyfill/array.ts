/**
 * Array prototype polyfills
 *
 * Polyfills are only applied when the native method is missing, so supported
 * browsers have no side effects.
 * Intended for legacy environments such as IE11; modern browsers need not call these.
 */

/**
 * @func polyfillArrayEvery
 * @desc Polyfill Array.prototype.every
 * @returns {void}
 * @example polyfillArrayEvery(); [1, 2, 3].every((n) => n > 0); // true
 */
export function polyfillArrayEvery(): void {
  if (!Array.prototype.every) {
    // The prototype polyfill does not exactly match the TS built-in every overload signature, so we cast here to skip type checking
    (Array.prototype as any).every = function (callbackfn: Function, thisArg: any): boolean {
      'use strict';
      let T;
      let k = 0;
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof callbackfn !== 'function') {
        throw new TypeError();
      }
      if (arguments.length > 1) {
        T = thisArg;
      }
      while (k < len) {
        if (k in O) {
          if (!callbackfn.call(T, O[k], k, O)) return false;
        }
        k++;
      }
      return true;
    };
  }
}

/**
 * @func polyfillArraySome
 * @desc Polyfill Array.prototype.some
 * @returns {void}
 * @example polyfillArraySome(); [1, 2, 3].some((n) => n > 2); // true
 */
export function polyfillArraySome(): void {
  if (!Array.prototype.some) {
    (Array.prototype as any).some = function (callbackfn: Function, thisArg: any): boolean {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof callbackfn !== 'function') throw new TypeError();
      const T = arguments.length > 1 ? thisArg : undefined;
      for (let k = 0; k < len; k++) {
        if (k in O && callbackfn.call(T, O[k], k, O)) return true;
      }
      return false;
    };
  }
}

/**
 * @func polyfillArrayForEach
 * @desc Polyfill Array.prototype.forEach
 * @returns {void}
 * @example polyfillArrayForEach(); [1, 2].forEach((n) => console.log(n));
 */
export function polyfillArrayForEach(): void {
  if (!Array.prototype.forEach) {
    (Array.prototype as any).forEach = function (callbackfn: Function, thisArg: any): void {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof callbackfn !== 'function') throw new TypeError();
      const T = arguments.length > 1 ? thisArg : undefined;
      for (let k = 0; k < len; k++) {
        if (k in O) callbackfn.call(T, O[k], k, O);
      }
    };
  }
}

/**
 * @func polyfillArrayMap
 * @desc Polyfill Array.prototype.map
 * @returns {void}
 * @example polyfillArrayMap(); [1, 2].map((n) => n * 2); // [2, 4]
 */
export function polyfillArrayMap(): void {
  if (!Array.prototype.map) {
    (Array.prototype as any).map = function (callbackfn: Function, thisArg: any): any[] {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof callbackfn !== 'function') throw new TypeError();
      const T = arguments.length > 1 ? thisArg : undefined;
      const A = new Array(len);
      for (let k = 0; k < len; k++) {
        if (k in O) A[k] = callbackfn.call(T, O[k], k, O);
      }
      return A;
    };
  }
}

/**
 * @func polyfillArrayFilter
 * @desc Polyfill Array.prototype.filter
 * @returns {void}
 * @example polyfillArrayFilter(); [1, 2, 3].filter((n) => n > 1); // [2, 3]
 */
export function polyfillArrayFilter(): void {
  if (!Array.prototype.filter) {
    (Array.prototype as any).filter = function (callbackfn: Function, thisArg: any): any[] {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof callbackfn !== 'function') throw new TypeError();
      const T = arguments.length > 1 ? thisArg : undefined;
      const A: any[] = [];
      for (let k = 0; k < len; k++) {
        if (k in O && callbackfn.call(T, O[k], k, O)) A.push(O[k]);
      }
      return A;
    };
  }
}

/**
 * @func polyfillArrayIndexOf
 * @desc Polyfill Array.prototype.indexOf
 * @returns {void}
 * @example polyfillArrayIndexOf(); [1, 2].indexOf(2); // 1
 */
export function polyfillArrayIndexOf(): void {
  if (!Array.prototype.indexOf) {
    (Array.prototype as any).indexOf = function (searchElement: any, fromIndex?: number): number {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (len === 0) return -1;
      let n = Number(fromIndex) || 0;
      if (n >= len) return -1;
      if (n < 0) n = Math.max(len + n, 0);
      for (; n < len; n++) {
        if (n in O && O[n] === searchElement) return n;
      }
      return -1;
    };
  }
}

/**
 * @func polyfillArrayFind
 * @desc Polyfill Array.prototype.find
 * @returns {void}
 * @example polyfillArrayFind(); [1, 2, 3].find((n) => n > 1); // 2
 */
export function polyfillArrayFind(): void {
  if (!Array.prototype.find) {
    (Array.prototype as any).find = function (predicate: Function, thisArg?: any): any {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof predicate !== 'function') throw new TypeError();
      const T = arguments.length > 1 ? thisArg : undefined;
      for (let k = 0; k < len; k++) {
        const value = O[k];
        if (predicate.call(T, value, k, O)) return value;
      }
      return undefined;
    };
  }
}

/**
 * @func polyfillArrayFindIndex
 * @desc Polyfill Array.prototype.findIndex
 * @returns {void}
 * @example polyfillArrayFindIndex(); [1, 2, 3].findIndex((n) => n > 1); // 1
 */
export function polyfillArrayFindIndex(): void {
  if (!Array.prototype.findIndex) {
    (Array.prototype as any).findIndex = function (predicate: Function, thisArg?: any): number {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof predicate !== 'function') throw new TypeError();
      const T = arguments.length > 1 ? thisArg : undefined;
      for (let k = 0; k < len; k++) {
        if (predicate.call(T, O[k], k, O)) return k;
      }
      return -1;
    };
  }
}

/**
 * @func polyfillArrayIncludes
 * @desc Polyfill Array.prototype.includes
 * @returns {void}
 * @example polyfillArrayIncludes(); [1, 2].includes(2); // true
 */
export function polyfillArrayIncludes(): void {
  if (!(Array.prototype as any).includes) {
    (Array.prototype as any).includes = function (searchElement: any, fromIndex?: number): boolean {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (len === 0) return false;
      let n = Number(fromIndex) || 0;
      if (n < 0) n = Math.max(len + n, 0);
      for (; n < len; n++) {
        const value = O[n];
        // Handle NaN to match native behavior
        if (value === searchElement || (value !== value && searchElement !== searchElement)) {
          return true;
        }
      }
      return false;
    };
  }
}

/**
 * @func polyfillArrayReduce
 * @desc Polyfill Array.prototype.reduce
 * @returns {void}
 * @example polyfillArrayReduce(); [1, 2, 3].reduce((a, b) => a + b, 0); // 6
 */
export function polyfillArrayReduce(): void {
  if (!Array.prototype.reduce) {
    (Array.prototype as any).reduce = function (callbackfn: Function, initialValue?: any): any {
      'use strict';
      if (this == null) throw new TypeError('this is null or not defined');
      const O = Object(this);
      const len = O.length >>> 0;
      if (typeof callbackfn !== 'function') throw new TypeError();

      let k = 0;
      let accumulator: any;
      if (arguments.length > 1) {
        accumulator = initialValue;
      } else {
        // Empty array and no initial value
        if (len === 0) throw new TypeError('Reduce of empty array with no initial value');
        let found = false;
        while (k < len && !found) {
          if (k in O) {
            accumulator = O[k];
            found = true;
          }
          k++;
        }
        if (!found) throw new TypeError('Reduce of empty array with no initial value');
      }

      for (; k < len; k++) {
        if (k in O) accumulator = callbackfn(accumulator, O[k], k, O);
      }
      return accumulator;
    };
  }
}

/**
 * @func polyfillArrayFrom
 * @desc Polyfill Array.from, converting array-like or iterable objects into real arrays
 * @returns {void}
 * @example polyfillArrayFrom(); Array.from({ length: 2 }, (_, i) => i); // [0, 1]
 */
export function polyfillArrayFrom(): void {
  if (!Array.from) {
    (Array as any).from = function (source: any, mapFn?: Function, thisArg?: any): any[] {
      'use strict';
      // Iterable object
      if (source != null && typeof source[Symbol.iterator] === 'function') {
        const result: any[] = [];
        for (const item of source) result.push(item);
        return mapFn ? result.map((v, i) => mapFn.call(thisArg, v, i)) : result;
      }
      // Array-like object
      const len = source == null ? 0 : source.length >>> 0;
      const out = new Array(len);
      for (let i = 0; i < len; i++) {
        out[i] = mapFn ? mapFn.call(thisArg, source[i], i) : source[i];
      }
      return out;
    };
  }
}

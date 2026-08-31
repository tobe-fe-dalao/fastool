import {
  polyfillArrayEvery,
  polyfillArrayFilter,
  polyfillArrayFind,
  polyfillArrayFindIndex,
  polyfillArrayForEach,
  polyfillArrayFrom,
  polyfillArrayIncludes,
  polyfillArrayIndexOf,
  polyfillArrayMap,
  polyfillArrayReduce,
  polyfillArraySome,
} from './array';
import {
  polyfillArrayIsArray,
  polyfillObjectAssign,
  polyfillObjectEntries,
  polyfillObjectIs,
  polyfillObjectValues,
} from './object';
import {
  polyfillStringEndsWith,
  polyfillStringIncludes,
  polyfillStringPadEnd,
  polyfillStringPadStart,
  polyfillStringRepeat,
  polyfillStringStartsWith,
  polyfillStringTrim,
} from './string';

export * from './array';
export * from './string';
export * from './object';

/**
 * @func polyfillAll
 * @desc Apply all polyfills at once
 *
 * It is recommended to call this only when you explicitly need to support legacy
 * browsers (e.g. IE11), and it should run first thing at your app entry point.
 * Each polyfill only takes effect when the native method is missing, so the overhead
 * on modern browsers is negligible.
 *
 * @returns {void}
 * @example
 * import { polyfillAll } from 'fastool/polyfill';
 * polyfillAll();
 */
export function polyfillAll(): void {
  // Array
  polyfillArrayFrom();
  polyfillArrayIsArray();
  polyfillArrayEvery();
  polyfillArraySome();
  polyfillArrayForEach();
  polyfillArrayMap();
  polyfillArrayFilter();
  polyfillArrayIndexOf();
  polyfillArrayFind();
  polyfillArrayFindIndex();
  polyfillArrayIncludes();
  polyfillArrayReduce();

  // String
  polyfillStringIncludes();
  polyfillStringStartsWith();
  polyfillStringEndsWith();
  polyfillStringTrim();
  polyfillStringRepeat();
  polyfillStringPadStart();
  polyfillStringPadEnd();

  // Object
  polyfillObjectAssign();
  polyfillObjectEntries();
  polyfillObjectValues();
  polyfillObjectIs();
}

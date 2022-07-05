
/**
 * @func polyfillArrayEvery
 * @dec 允许在那些没有原生支持 every 的实现环境中使用它。
 * @returns {Boolean}
 */
export function polyfillArrayEvery() {
  if (!Array.prototype.every) {
    Array.prototype.every = function (callbackfn: Function, thisArg: any) {
      'use strict';
      let T, k = 0;
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }
      let O = Object(this);
      let len = O.length >>> 0;
      if (typeof callbackfn !== 'function') {
        throw new TypeError();
      }
      if (arguments.length > 1) {
        T = thisArg;
      }
      while (k < len) {

        var kValue;
        if (k in O) {
          kValue = O[k];
          var testResult = callbackfn.call(T, kValue, k, O);
          if (!testResult) {
            return false;
          }
        }
        k++;
      }
      return true;
    };
  }
}
/**
 * @func polyfillStringIncludes
 * @dec 判断一个字符串是否包含在另一个字符串中
 * @returns {Boolean}
 */
export function polyfillStringIncludes() {
  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
}

/**
 * @func polyfillStringEndsWith
 * @dec 判断当前字符串是否是以另外一个给定的子字符串“结尾”的
 * @returns {Boolean}
 */
export function polyfillStringEndsWith() {
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, this_len) {
      if (this_len === undefined || this_len > this.length) {
        this_len = this.length;
      }
      return this.substring(this_len - search.length, this_len) === search;
    };
  }
}

/**
 * @func polyfillStringTrim
 * @dec 从一个字符串的两端删除空白字符
 * @returns {void}
 */
export function polyfillStringTrim() {
  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
}
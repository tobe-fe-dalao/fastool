/**
 * String prototype polyfills
 *
 * Polyfills are only applied when the native method is missing, so supported
 * browsers have no side effects.
 */

/**
 * @func polyfillStringIncludes
 * @desc Polyfill String.prototype.includes
 * @returns {void}
 * @example polyfillStringIncludes(); 'abc'.includes('b'); // true
 */
export function polyfillStringIncludes(): void {
  if (!String.prototype.includes) {
    String.prototype.includes = function (search: string, start?: number): boolean {
      'use strict';
      if (typeof start !== 'number') start = 0;
      if (start + search.length > this.length) return false;
      return this.indexOf(search, start) !== -1;
    };
  }
}

/**
 * @func polyfillStringStartsWith
 * @desc Polyfill String.prototype.startsWith
 * @returns {void}
 * @example polyfillStringStartsWith(); 'abc'.startsWith('ab'); // true
 */
export function polyfillStringStartsWith(): void {
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (search: string, position?: number): boolean {
      'use strict';
      const start = Math.max(typeof position === 'number' ? position : 0, 0);
      return this.substring(start, start + search.length) === search;
    };
  }
}

/**
 * @func polyfillStringEndsWith
 * @desc Polyfill String.prototype.endsWith
 * @returns {void}
 * @example polyfillStringEndsWith(); 'abc'.endsWith('bc'); // true
 */
export function polyfillStringEndsWith(): void {
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search: string, this_len?: number): boolean {
      'use strict';
      let len = this_len;
      if (len === undefined || len > this.length) len = this.length;
      return this.substring(len - search.length, len) === search;
    };
  }
}

/**
 * @func polyfillStringTrim
 * @desc Polyfill String.prototype.trim, also cleaning BOM and non-breaking spaces
 * @returns {void}
 * @example polyfillStringTrim(); '  a  '.trim(); // 'a'
 */
export function polyfillStringTrim(): void {
  if (!String.prototype.trim) {
    String.prototype.trim = function (): string {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
}

/**
 * @func polyfillStringRepeat
 * @desc Polyfill String.prototype.repeat
 * @returns {void}
 * @example polyfillStringRepeat(); 'ab'.repeat(2); // 'abab'
 */
export function polyfillStringRepeat(): void {
  if (!String.prototype.repeat) {
    String.prototype.repeat = function (count: number): string {
      'use strict';
      let n = Number(count);
      if (!Number.isFinite(n) || n < 0) throw new RangeError('Invalid count value');
      n = Math.floor(n);
      let result = '';
      let str = String(this);
      // Binary concatenation to avoid O(n) string concatenations
      while (n > 0) {
        if (n % 2 === 1) result += str;
        if (n > 1) str += str;
        n = Math.floor(n / 2);
      }
      return result;
    };
  }
}

/**
 * @func polyfillStringPadStart
 * @desc Polyfill String.prototype.padStart
 * @returns {void}
 * @example polyfillStringPadStart(); '5'.padStart(2, '0'); // '05'
 */
export function polyfillStringPadStart(): void {
  if (!String.prototype.padStart) {
    String.prototype.padStart = function (targetLength: number, padString?: string): string {
      'use strict';
      const target = Math.floor(Number(targetLength));
      const str = String(this);
      if (!Number.isFinite(target) || str.length >= target) return str;
      const pad = padString === undefined ? ' ' : String(padString);
      if (pad === '') return str;
      const need = target - str.length;
      const filler = pad.repeat(Math.ceil(need / pad.length)).slice(0, need);
      return filler + str;
    };
  }
}

/**
 * @func polyfillStringPadEnd
 * @desc Polyfill String.prototype.padEnd
 * @returns {void}
 * @example polyfillStringPadEnd(); '5'.padEnd(2, '0'); // '50'
 */
export function polyfillStringPadEnd(): void {
  if (!String.prototype.padEnd) {
    String.prototype.padEnd = function (targetLength: number, padString?: string): string {
      'use strict';
      const target = Math.floor(Number(targetLength));
      const str = String(this);
      if (!Number.isFinite(target) || str.length >= target) return str;
      const pad = padString === undefined ? ' ' : String(padString);
      if (pad === '') return str;
      const need = target - str.length;
      const filler = pad.repeat(Math.ceil(need / pad.length)).slice(0, need);
      return str + filler;
    };
  }
}

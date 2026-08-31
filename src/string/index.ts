export { nanoid } from './nanoid';

/**
 * @func randomString
 * @desc Generate a random string of a given length (confusing characters like 0/o/O/l/I are excluded)
 * @param {number} len length
 * @returns {string} random string
 * @example randomString(6) // 'aB3dEf'
 */
export const randomString = (len: number): string => {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomStr;
};

/**
 * @func firstUpperCase
 * @desc Capitalize the first letter (other characters unchanged)
 * @param {string} str source string
 * @returns {string}
 * @example firstUpperCase('hello') // 'Hello'
 */
export const firstUpperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @func capitalize
 * @desc Capitalize the first letter, lowercase the rest
 * @param {string} str source string
 * @returns {string}
 * @example capitalize('hELLO') // 'Hello'
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * @func camelCase
 * @desc Convert to camelCase, handling -, _, spaces, and existing camelCase
 * @param {string} str source string
 * @returns {string}
 * @example camelCase('get-user-info') // 'getUserInfo'
 * @example camelCase('GetUserInfo') // 'getUserInfo'
 */
export const camelCase = (str: string): string => {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

/**
 * @func kebabCase
 * @desc Convert to kebab-case naming
 * @param {string} str source string
 * @returns {string}
 * @example kebabCase('getUserInfo') // 'get-user-info'
 * @example kebabCase('get_user_info') // 'get-user-info'
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * @func snakeCase
 * @desc Convert to snake_case naming
 * @param {string} str source string
 * @returns {string}
 * @example snakeCase('getUserInfo') // 'get_user_info'
 */
export const snakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

/**
 * @func pascalCase
 * @desc Convert to PascalCase naming
 * @param {string} str source string
 * @returns {string}
 * @example pascalCase('get-user-info') // 'GetUserInfo'
 */
export const pascalCase = (str: string): string => {
  const camel = camelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

/**
 * @func getCamelCase
 * @desc Convert to camelCase (alias of camelCase, kept for backward compatibility)
 * @deprecated prefer using camelCase directly
 * @param {string} str source string
 * @returns {string}
 */
export const getCamelCase = (str: string): string => camelCase(str);

/**
 * @func getKebabCase
 * @desc Convert to kebab-case (alias of kebabCase, kept for backward compatibility)
 * @deprecated prefer using kebabCase directly
 * @param {string} str source string
 * @returns {string}
 */
export const getKebabCase = (str: string): string => kebabCase(str);

/**
 * @func telEncrypt
 * @desc Mask the middle four digits of a phone number
 * @param {string | number} tel phone number
 * @returns {string} masked phone number
 * @example telEncrypt(13812345678) // '138****5678'
 */
export const telEncrypt = (tel: string | number): string => {
  return String(tel).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

/**
 * @func mask
 * @desc Generic string masking: keep the head and tail, fill the middle with a given character
 * @param {string} str source string
 * @param {number} start leading characters to keep, default 0
 * @param {number} end trailing characters to keep, default 0
 * @param {string} char padding char, default '*'
 * @returns {string} masked string
 * @example mask('13812345678', 3, 4) // '138****5678'
 * @example mask('张三丰', 1, 0) // '张**'
 */
export const mask = (str: string, start = 0, end = 0, char = '*'): string => {
  const s = String(str);
  const head = s.slice(0, start);
  const tail = end > 0 ? s.slice(-end) : '';
  const len = s.length - start - (end > 0 ? end : 0);
  return len > 0 ? head + char.repeat(len) + tail : s;
};

/**
 * @func truncate
 * @desc Truncate a string by length, replacing overflow with an omission symbol
 * @param {string} str source string
 * @param {number} length max length (including omission)
 * @param {string} omission omission string, default '...'
 * @returns {string}
 * @example truncate('hello world', 8) // 'hello...'
 */
export const truncate = (str: string, length: number, omission = '...'): string => {
  if (str.length <= length) return str;
  return str.slice(0, Math.max(0, length - omission.length)) + omission;
};

/**
 * @func reverse
 * @desc Reverse a string (correctly handles surrogate-pair characters like emoji)
 * @param {string} str source string
 * @returns {string}
 * @example reverse('hello') // 'olleh'
 */
export const reverse = (str: string): string => {
  return Array.from(str).reverse().join('');
};

/**
 * @func trim
 * @desc Remove specified characters from both ends of a string, default to whitespace
 * @param {string} str source string
 * @param {string} chars chars to strip, default '\\s'
 * @returns {string}
 * @example trim('  hi  ') // 'hi'
 * @example trim('--hi--', '-') // 'hi'
 */
export const trim = (str: string, chars = '\\s'): string => {
  return str.replace(new RegExp(`^[${chars}]+|[${chars}]+$`, 'g'), '');
};

/**
 * @func byteLength
 * @desc Calculate the UTF-8 byte length of a string (Chinese chars count as 3 bytes, emoji as 4 bytes)
 * @param {string} str source string
 * @returns {number} byte count
 * @example byteLength('你好') // 6
 */
export const byteLength = (str: string): number => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x7f) {
      len += 1;
    } else if (code <= 0x7ff) {
      len += 2;
    } else if (code >= 0xd800 && code <= 0xdfff) {
      len += 4; // surrogate pair, 4 bytes
      i++;
    } else {
      len += 3;
    }
  }
  return len;
};

/**
 * @func template
 * @desc Simple string template replacement, parsing {{key}} placeholders by default
 * @param {string} str template string
 * @param {Record<string, unknown>} data data object
 * @param {RegExp} pattern placeholder regex, default /\{\{(\w+)\}\}/g
 * @returns {string} interpolated string
 * @example template('hi {{name}}', { name: 'Tom' }) // 'hi Tom'
 */
export const template = (
  str: string,
  data: Record<string, unknown>,
  pattern: RegExp = /\{\{(\w+)\}\}/g
): string => {
  return str.replace(pattern, (match, key) =>
    Object.prototype.hasOwnProperty.call(data, key) ? String(data[key]) : match
  );
};

/**
 * @func escapeRegExp
 * @desc Escape regex special characters in a string so it can be safely used in new RegExp()
 * @param {string} str source string
 * @returns {string} escaped string
 * @example escapeRegExp('a.b') // 'a\\.b'
 */
export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * @func count
 * @desc Count occurrences of a substring (non-overlapping)
 * @param {string} str source string
 * @param {string} sub substring
 * @returns {number} occurrence count
 * @example count('abcabc', 'a') // 2
 */
export const count = (str: string, sub: string): number => {
  if (!sub) return 0;
  return str.split(sub).length - 1;
};

/**
 * @func getEscapeString
 * @desc Escape a string, converting `&` `<` `>` `"` `'` into HTML entities
 * @param {string} str source string
 * @returns {string} escaped string
 * @example getEscapeString('<p>') // '&lt;p&gt;'
 */
export const getEscapeString = (str: string): string => {
  const ESCAPE: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  const ESCAPE_EXPR = /(&|<|>|"|')/g;
  return String(str).replace(ESCAPE_EXPR, (match) => ESCAPE[match]);
};

/**
 * @func getUnEscapeString
 * @desc Unescape a string, converting HTML entities back to original characters
 * @param {string} str source string
 * @returns {string} unescaped string
 * @example getUnEscapeString('&lt;p&gt;') // '<p>'
 */
export const getUnEscapeString = (str: string): string => {
  const UN_ESCAPE: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
  };
  const UN_ESCAPE_EXPR = /(&amp;|&lt;|&gt;|&quot;|&#x27;)/g;
  return String(str).replace(UN_ESCAPE_EXPR, (match) => UN_ESCAPE[match]);
};

/**
 * @func digitUppercase
 * @desc Convert a monetary amount to Chinese capital numerals
 * @param {number} n amount
 * @returns {string} amount in Chinese capital numerals
 * @example digitUppercase(123456789.123) // '壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元壹角贰分'
 */
export const digitUppercase = (n: number): string => {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  const head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
};

/**
 * @func intToChinese
 * @desc Convert a number to Chinese numerals (simplified)
 * @param {number | string} value number
 * @returns {string} Chinese numeral
 * @example intToChinese(123456789) // '一亿二千三百四十五万六千七百八十九'
 */
export const intToChinese = (value: number | string): string => {
  const str = String(value);
  const len = str.length - 1;
  const idxs = [
    '', '十', '百', '千', '万', '十', '百', '千', '亿',
    '十', '百', '千', '万', '十', '百', '千', '亿',
  ];
  const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return str.replace(/([1-9]|0+)/g, ($, $1, idx: number, full: string) => {
    let pos = 0;
    if ($1[0] !== '0') {
      pos = len - idx;
      if (idx === 0 && $1[0] === '1' && idxs[len - idx] === '十') {
        return idxs[len - idx];
      }
      return num[$1[0]] + idxs[len - idx];
    }
    const left = len - idx;
    const right = len - idx + $1.length;
    if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
      pos = left - (left % 4);
    }
    if (pos) {
      return idxs[pos] + num[$1[0]];
    }
    if (idx + $1.length >= full.length) {
      return '';
    }
    return num[$1[0]];
  });
};

/**
 * @func sumAverage
 * @desc Calculate the average of a numeric array
 * @param {number[]} numberArr numeric array
 * @returns {number} average
 * @example sumAverage([1, 2, 3, 4, 5]) // 3
 */
export const sumAverage = (numberArr: number[]): number => {
  if (!numberArr.length) return 0;
  return numberArr.reduce((acc, curr) => acc + curr, 0) / numberArr.length;
};

/**
 * @func getDistance
 * @desc Calculate the distance between two coordinate points in a plane
 * @param {Point} point1 start point
 * @param {Point} point2 end point
 * @returns {number} distance
 * @example getDistance({ x: 1, y: 2 }, { x: 3, y: 4 }) // 2.8284271247461903
 */
export interface Point {
  x: number;
  y: number;
}
export const getDistance = (point1: Point, point2: Point): number => {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * @func clamp
 * @desc Clamp a value within the [min, max] range
 * @param {number} value value to clamp
 * @param {number} min lower bound
 * @param {number} max upper bound
 * @returns {number} clamped value
 * @example clamp(15, 0, 10) // 10
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * @func inRange
 * @desc Check whether a value falls within a range (exclusive of end)
 * @param {number} value value to check
 * @param {number} start range start
 * @param {number} end range end (exclusive); if omitted, treated as [0, start)
 * @returns {boolean}
 * @example inRange(3, 2, 5) // true
 * @example inRange(3, 5) // true
 */
export const inRange = (value: number, start: number, end?: number): boolean => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return value >= Math.min(start, end) && value < Math.max(start, end);
};

/**
 * @func round
 * @desc Round to a given precision, avoiding floating-point errors
 * @param {number} value value to process
 * @param {number} precision number of decimal places to keep, default 0
 * @returns {number} rounded value
 * @example round(1.005, 2) // 1.01 (native toFixed would give 1.00)
 */
export const round = (value: number, precision = 0): number => {
  const p = Math.trunc(precision);
  if (!Number.isFinite(value)) return value;
  if (p === 0) return Math.round(value);
  // shift using exponential notation to avoid floating-point error from value * 10 ** p
  const [base, exp = '0'] = String(value).split('e');
  const shifted = Math.round(Number(`${base}e${Number(exp) + p}`));
  const [base2, exp2 = '0'] = String(shifted).split('e');
  return Number(`${base2}e${Number(exp2) - p}`);
};

/**
 * @func toThousands
 * @desc Format a number with thousands separators
 * @param {number | string} value number
 * @param {string} separator separator, default ','
 * @returns {string} formatted string
 * @example toThousands(1234567.89) // '1,234,567.89'
 */
export const toThousands = (value: number | string, separator = ','): string => {
  const [intPart, decimalPart] = String(value).split('.');
  const sign = intPart.startsWith('-') ? '-' : '';
  const digits = sign ? intPart.slice(1) : intPart;
  const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return sign + formatted + (decimalPart ? `.${decimalPart}` : '');
};

/**
 * @func bytesToSize
 * @desc Convert a byte count to a human-readable file size (base 1024)
 * @param {number} bytes byte count
 * @param {number} decimals number of decimal places, default 2
 * @returns {string} formatted size
 * @example bytesToSize(1024) // '1 KB'
 * @example bytesToSize(1536) // '1.5 KB'
 */
export const bytesToSize = (bytes: number, decimals = 2): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${round(bytes / Math.pow(1024, i), decimals)} ${units[i]}`;
};

/**
 * @func percentage
 * @desc Calculate a percentage (returns 0 when total is 0)
 * @param {number} value partial value
 * @param {number} total total value
 * @param {number} digits number of decimal places, default 2
 * @returns {number} percentage value, e.g. 33.33 means 33.33%
 * @example percentage(1, 3) // 33.33
 */
export const percentage = (value: number, total: number, digits = 2): number => {
  if (!total) return 0;
  return round((value / total) * 100, digits);
};

/**
 * @func gcd
 * @desc Compute the greatest common divisor of two integers (Euclidean algorithm)
 * @param {number} a integer A
 * @param {number} b integer B
 * @returns {number} greatest common divisor
 * @example gcd(12, 18) // 6
 */
export const gcd = (a: number, b: number): number => {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y) {
    [x, y] = [y, x % y];
  }
  return x;
};

/**
 * @func lcm
 * @desc Compute the least common multiple of two integers
 * @param {number} a integer A
 * @param {number} b integer B
 * @returns {number} least common multiple
 * @example lcm(4, 6) // 12
 */
export const lcm = (a: number, b: number): number => {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
};

/**
 * @func lerp
 * @desc Linear interpolation: pick a value between start and end by t (0~1), commonly used in animations
 * @param {number} start start value
 * @param {number} end end value
 * @param {number} t interpolation ratio; 0 returns start, 1 returns end
 * @returns {number} interpolated value
 * @example lerp(0, 100, 0.5) // 50
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

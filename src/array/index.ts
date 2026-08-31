/**
 * Array utility functions.
 * All functions are pure and never mutate the input array.
 */

/** Iteratee: either an object key or a value-extracting function */
type KeyIteratee<T, R = any> = ((item: T, index: number) => R) | keyof T;

/** Normalizes an iteratee into a function */
function toGetter<T, R = any>(iteratee: KeyIteratee<T, R>): (item: T, index: number) => R {
  return typeof iteratee === 'function'
    ? (iteratee as (item: T, index: number) => R)
    : (item: T) => (item as any)[iteratee as keyof T];
}

/**
 * @func chunk
 * @desc Split an array into chunks of a given size
 * @param {T[]} arr source array
 * @param {number} size chunk size, default 1
 * @returns {T[][]} array of chunks
 * @example chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
 */
export function chunk<T>(arr: T[], size = 1): T[][] {
  const len = Math.floor(size);
  // If size is less than 1, splitting is impossible; return an empty array (matches lodash behavior)
  if (len < 1) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += len) {
    result.push(arr.slice(i, i + len));
  }
  return result;
}

/**
 * @func compact
 * @desc Remove falsy values (false / null / 0 / '' / undefined / NaN) from the array
 * @param {T[]} arr source array
 * @returns {T[]} new array with falsy values removed
 * @example compact([0, 1, false, 2, '', 3]) // [1, 2, 3]
 */
export function compact<T>(arr: T[]): T[] {
  return arr.filter((item) => !!item);
}

/**
 * @func uniq
 * @desc Remove duplicate values from an array (uses SameValueZero comparison, correctly handles NaN)
 * @param {T[]} arr source array
 * @returns {T[]} array with duplicates removed
 * @example uniq([1, 1, 2, NaN, NaN]) // [1, 2, NaN]
 */
export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * @func uniqBy
 * @desc Deduplicate by a given criterion, keeping the first occurrence
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @returns {T[]} array with duplicates removed
 * @example uniqBy([{ id: 1 }, { id: 1 }, { id: 2 }], 'id') // [{ id: 1 }, { id: 2 }]
 */
export function uniqBy<T>(arr: T[], iteratee: KeyIteratee<T>): T[] {
  const get = toGetter<T>(iteratee);
  const seen = new Set<unknown>();
  return arr.filter((item, index) => {
    const key = get(item, index);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * @func flatten
 * @desc Flatten an array one level deep
 * @param {any[]} arr source array
 * @returns {any[]} flattened array
 * @example flatten([1, [2, [3, 4]]]) // [1, 2, [3, 4]]
 */
export function flatten(arr: any[]): any[] {
  const result: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...arr[i]);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * @func flattenDeep
 * @desc Recursively flatten an array to a single level
 * @param {any[]} arr source array
 * @returns {any[]} flattened one-dimensional array
 * @example flattenDeep([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
 */
export function flattenDeep(arr: any[]): any[] {
  const result: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flattenDeep(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * @func difference
 * @desc Return elements present in the first array but not in the second (difference)
 * @param {T[]} arr source array
 * @param {T[]} values values to exclude
 * @returns {T[]} difference array
 * @example difference([1, 2, 3], [2]) // [1, 3]
 */
export function difference<T>(arr: T[], values: T[]): T[] {
  const set = new Set(values);
  return arr.filter((item) => !set.has(item));
}

/**
 * @func intersection
 * @desc Return the intersection of two arrays
 * @param {T[]} arr source array
 * @param {T[]} values array to compare against
 * @returns {T[]} intersection array
 * @example intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function intersection<T>(arr: T[], values: T[]): T[] {
  const set = new Set(values);
  const result: T[] = [];
  arr.forEach((item) => {
    if (set.has(item) && !result.includes(item)) result.push(item);
  });
  return result;
}

/**
 * @func union
 * @desc Merge multiple arrays and remove duplicates (union)
 * @param {...T[][]} arrs any number of arrays
 * @returns {T[]} union array
 * @example union([1, 2], [2, 3]) // [1, 2, 3]
 */
export function union<T>(...arrs: T[][]): T[] {
  const result: T[] = [];
  for (const arr of arrs) {
    for (const item of arr) {
      if (!result.includes(item)) result.push(item);
    }
  }
  return result;
}

/**
 * @func groupBy
 * @desc Group array elements by a given criterion
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @returns {Record<string, T[]>} grouped result
 * @example groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
 * // { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
 */
export function groupBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, T[]> {
  const get = toGetter<T>(iteratee);
  const result: Record<string, T[]> = {};
  arr.forEach((item, index) => {
    const key = String(get(item, index));
    if (!result[key]) result[key] = [];
    result[key].push(item);
  });
  return result;
}

/**
 * @func keyBy
 * @desc Convert an array into an object indexed by a given key
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @returns {Record<string, T>} indexed object
 * @example keyBy([{ id: 'a', v: 1 }, { id: 'b', v: 2 }], 'id')
 * // { a: { id: 'a', v: 1 }, b: { id: 'b', v: 2 } }
 */
export function keyBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, T> {
  const get = toGetter<T>(iteratee);
  const result: Record<string, T> = {};
  arr.forEach((item, index) => {
    result[String(get(item, index))] = item;
  });
  return result;
}

/**
 * @func countBy
 * @desc Count element occurrences by a given criterion
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @returns {Record<string, number>} count result
 * @example countBy(['a', 'b', 'a'], (v) => v) // { a: 2, b: 1 }
 */
export function countBy<T>(arr: T[], iteratee: KeyIteratee<T>): Record<string, number> {
  const get = toGetter<T>(iteratee);
  const result: Record<string, number> = {};
  arr.forEach((item, index) => {
    const key = String(get(item, index));
    result[key] = (result[key] || 0) + 1;
  });
  return result;
}

/**
 * @func partition
 * @desc Split an array into two groups: those that match and those that don't
 * @param {T[]} arr source array
 * @param {(item: T, index: number) => boolean} predicate predicate function
 * @returns {[T[], T[]]} [matched, unmatched]
 * @example partition([1, 2, 3, 4], (n) => n % 2 === 0) // [[2, 4], [1, 3]]
 */
export function partition<T>(arr: T[], predicate: (item: T, index: number) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  arr.forEach((item, index) => {
    (predicate(item, index) ? pass : fail).push(item);
  });
  return [pass, fail];
}

/**
 * @func shuffle
 * @desc Shuffle an array using the Fisher-Yates algorithm (returns a new array, does not mutate the original)
 * @param {T[]} arr source array
 * @returns {T[]} shuffled array
 * @example shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * @func sample
 * @desc Get a random element from an array
 * @param {T[]} arr source array
 * @returns {T | undefined} random element
 * @example sample([1, 2, 3]) // 2
 */
export function sample<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @func sampleSize
 * @desc Get n unique random elements from an array
 * @param {T[]} arr source array
 * @param {number} n sample size
 * @returns {T[]} array of random elements
 * @example sampleSize([1, 2, 3, 4], 2) // [4, 1]
 */
export function sampleSize<T>(arr: T[], n = 1): T[] {
  return shuffle(arr).slice(0, Math.max(0, n));
}

/**
 * @func range
 * @desc Generate an array of integers in a sequence (end is exclusive)
 * @param {number} start start value; when only one argument is passed it is treated as end and start defaults to 0
 * @param {number} end end value (exclusive)
 * @param {number} step step size, default 1, may be negative
 * @returns {number[]} array of integers
 * @example range(4) // [0, 1, 2, 3]
 * @example range(1, 5) // [1, 2, 3, 4]
 * @example range(0, 10, 2) // [0, 2, 4, 6, 8]
 */
export function range(start: number, end?: number, step = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (step === 0) throw new RangeError('range(): step 不能为 0');
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}

/**
 * @func zip
 * @desc Merge multiple arrays into a 2D array by index
 * @param {...any[][]} arrs any number of arrays
 * @returns {any[][]} merged 2D array
 * @example zip(['a', 'b'], [1, 2]) // [['a', 1], ['b', 2]]
 */
export function zip(...arrs: any[][]): any[][] {
  const maxLen = Math.max(...arrs.map((arr) => arr.length), 0);
  const result: any[][] = [];
  for (let i = 0; i < maxLen; i++) {
    result.push(arrs.map((arr) => arr[i]));
  }
  return result;
}

/**
 * @func unzip
 * @desc Inverse of zip: split a 2D array back into multiple arrays
 * @param {any[][]} arr 2D array
 * @returns {any[][]} split array collection
 * @example unzip([['a', 1], ['b', 2]]) // [['a', 'b'], [1, 2]]
 */
export function unzip(arr: any[][]): any[][] {
  const maxLen = Math.max(...arr.map((item) => item.length), 0);
  const result: any[][] = Array.from({ length: maxLen }, () => []);
  for (const row of arr) {
    for (let i = 0; i < maxLen; i++) {
      result[i].push(row[i]);
    }
  }
  return result;
}

/**
 * @func sum
 * @desc Calculate the sum of a numeric array
 * @param {number[]} arr numeric array
 * @returns {number} total sum
 * @example sum([1, 2, 3]) // 6
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

/**
 * @func sumBy
 * @desc Sum values extracted by a given criterion
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @returns {number} total sum
 * @example sumBy([{ n: 1 }, { n: 2 }], 'n') // 3
 */
export function sumBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): number {
  const get = toGetter<T, number>(iteratee);
  return arr.reduce((acc, item, index) => acc + Number(get(item, index)) || 0, 0);
}

/**
 * @func maxBy
 * @desc Return the element with the maximum value by a given criterion
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @returns {T | undefined} element with the maximum value
 * @example maxBy([{ n: 1 }, { n: 3 }, { n: 2 }], 'n') // { n: 3 }
 */
export function maxBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): T | undefined {
  if (!arr.length) return undefined;
  const get = toGetter<T, number>(iteratee);
  let maxItem = arr[0];
  let maxVal = Number(get(arr[0], 0));
  for (let i = 1; i < arr.length; i++) {
    const val = Number(get(arr[i], i));
    if (val > maxVal) {
      maxVal = val;
      maxItem = arr[i];
    }
  }
  return maxItem;
}

/**
 * @func minBy
 * @desc Return the element with the minimum value by a given criterion
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @returns {T | undefined} element with the minimum value
 * @example minBy([{ n: 1 }, { n: 3 }, { n: 2 }], 'n') // { n: 1 }
 */
export function minBy<T>(arr: T[], iteratee: KeyIteratee<T, number>): T | undefined {
  if (!arr.length) return undefined;
  const get = toGetter<T, number>(iteratee);
  let minItem = arr[0];
  let minVal = Number(get(arr[0], 0));
  for (let i = 1; i < arr.length; i++) {
    const val = Number(get(arr[i], i));
    if (val < minVal) {
      minVal = val;
      minItem = arr[i];
    }
  }
  return minItem;
}

/**
 * @func sortBy
 * @desc Sort by a given criterion; stable sort that does not mutate the original array
 * @param {T[]} arr source array
 * @param {KeyIteratee} iteratee object key or value function
 * @param {'asc' | 'desc'} order sort order, default asc
 * @returns {T[]} sorted array
 * @example sortBy([{ n: 3 }, { n: 1 }], 'n', 'desc') // [{ n: 3 }, { n: 1 }]
 */
export function sortBy<T>(
  arr: T[],
  iteratee: KeyIteratee<T>,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const get = toGetter<T>(iteratee);
  const dir = order === 'desc' ? -1 : 1;
  return arr
    .map((item, index) => ({ item, index, value: get(item, index) }))
    .sort((a, b) => {
      if (a.value === b.value) return a.index - b.index;
      return (a.value > b.value ? 1 : -1) * dir;
    })
    .map(({ item }) => item);
}

/**
 * @func head
 * @desc Get the first element of an array
 * @param {T[]} arr source array
 * @returns {T | undefined} first element
 * @example head([1, 2, 3]) // 1
 */
export function head<T>(arr: T[]): T | undefined {
  return arr.length ? arr[0] : undefined;
}

/**
 * @func last
 * @desc Get the last element of an array
 * @param {T[]} arr source array
 * @returns {T | undefined} last element
 * @example last([1, 2, 3]) // 3
 */
export function last<T>(arr: T[]): T | undefined {
  return arr.length ? arr[arr.length - 1] : undefined;
}

/**
 * @func take
 * @desc Take the first n elements of an array
 * @param {T[]} arr source array
 * @param {number} n count, default 1
 * @returns {T[]} new array
 * @example take([1, 2, 3], 2) // [1, 2]
 */
export function take<T>(arr: T[], n = 1): T[] {
  return arr.slice(0, Math.max(0, n));
}

/**
 * @func drop
 * @desc Drop the first n elements and return the rest
 * @param {T[]} arr source array
 * @param {number} n count, default 1
 * @returns {T[]} new array
 * @example drop([1, 2, 3], 2) // [3]
 */
export function drop<T>(arr: T[], n = 1): T[] {
  return arr.slice(Math.max(0, n));
}

/**
 * @func move
 * @desc Move the element at a given index to a target position (useful for drag-and-drop sorting)
 * @param {T[]} arr source array
 * @param {number} from source index
 * @param {number} to target index
 * @returns {T[]} array after moving
 * @example move([1, 2, 3], 0, 2) // [2, 3, 1]
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const result = [...arr];
  if (from < 0 || from >= result.length || to < 0 || to >= result.length) return result;
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

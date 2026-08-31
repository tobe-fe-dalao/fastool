/**
 * @func randomColor
 * @desc Generate a random hex color value
 * @returns {string} color value
 * @example randomColor() // '#a3f2c1'
 */
export function randomColor(): string {
  return `#${`00000${((Math.random() * 0x1000000) << 0).toString(16)}`.slice(-6)}`;
}

/**
 * @func randomInt
 * @desc Generate a random integer in [min, max] (inclusive). Passing one argument is equivalent to [0, max]
 * @param {number} min minimum; when only one argument is passed, this becomes the maximum
 * @param {number} [max] maximum; when omitted, 0 is the lower bound
 * @returns {number} random integer
 * @example randomInt(1, 10) // 7
 * @example randomInt(5) // integer between 0 and 5
 */
export function randomInt(min: number, max?: number): number {
  const upper = max === undefined ? min : max;
  const lower = max === undefined ? 0 : min;
  const low = Math.ceil(Math.min(lower, upper));
  const high = Math.floor(Math.max(lower, upper));
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

/**
 * @func randomFloat
 * @desc Generate a random float in [min, max]
 * @param {number} min minimum
 * @param {number} max maximum
 * @param {number} digits decimal places to keep, default 2
 * @returns {number} random float
 * @example randomFloat(0, 1, 4) // 0.3721
 */
export function randomFloat(min: number, max: number, digits = 2): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(digits));
}

/**
 * @func randomBoolean
 * @desc Generate a boolean at random by probability
 * @param {number} probability probability of returning true (0~1), default 0.5
 * @returns {boolean}
 * @example randomBoolean(0.8) // returns true with 80% probability
 */
export function randomBoolean(probability = 0.5): boolean {
  return Math.random() < probability;
}

/**
 * @func randomPick
 * @desc Pick a random element from an array
 * @param {T[]} arr source array
 * @returns {T | undefined} random element; returns undefined for an empty array
 * @example randomPick([1, 2, 3]) // 2
 */
export function randomPick<T>(arr: T[]): T | undefined {
  if (!arr || !arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @func uuid
 * @desc Generate a UUID v4; prefers the native crypto.randomUUID, falling back to a random implementation when unavailable
 * @returns {string} UUID string
 * @example uuid() // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 */
export function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * @func randomIP
 * @desc Generate a random IP address
 * @param {number} type 0 for IPv4, 1 for IPv6, default 0
 * @returns {string} IP address
 * @example randomIP() // '192.168.1.1'
 */
export const randomIP = (type: number = 0): string => {
  if (type) {
    return Array.from({ length: 8 }, () => randomInt(0, 65535).toString(16)).join(':');
  }
  return [randomInt(0, 255), randomInt(0, 255), randomInt(0, 255), randomInt(0, 255)].join('.');
};

/**
 * 判断是否为对象
 * @param {any} data 要判断的值
 * @returns {boolean} 是否为对象
 */
export function isObject(data: any): boolean {
  return Object.prototype.toString.call(data) === '[object Object]';
}
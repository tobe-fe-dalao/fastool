/**
 * @func randomColor
 * @desc 随机生成颜色
 * @return {String} 
 * @example randomColor() // '#000000'
 */
export function randomColor(): string {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 * @func randomInt
 * @desc 生成指定范围[min, max]的随机数
 * @param  {Number} min 
 * @param  {Number} max 
 * @return {Number} 
 */
export function randomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @func randomIP
 * @param {number} type - 0: ipv4, 1: ipv6
 * @returns {string} - random ip address
 * @desc 生成一个随机的IP地址，可以是IPv4或者IPv6
 * @example randomIP(1)
 */

export const randomIP = (type: number = 0): string => {
  const ipv4 = randomInt(0, 255) + '.' + randomInt(0, 255) + '.' + randomInt(0, 255) + '.' + randomInt(0, 255);
  const ipv6 =
    randomInt(0, 65535) +
    ':' +
    randomInt(0, 65535) +
    ':' +
    randomInt(0, 65535) +
    ':' +
    randomInt(0, 65535) +
    ':' +
    randomInt(0, 65535) +
    ':' +
    randomInt(0, 65535) +
    ':' +
    randomInt(0, 65535) +
    ':' +
    randomInt(0, 65535);
  return type ? ipv6 : ipv4;
};

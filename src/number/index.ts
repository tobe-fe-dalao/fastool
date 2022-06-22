/**
 * @func digitUppercase
 * @param  {number} n 
 * @return {string}
 * @desc   现金额转大写
 * @example digitUppercase(123456789.123) // 壹佰贰拾叁万肆仟伍佰陆拾柒元叁角肆分
 */

export const digitUppercase = (n: number): String => {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
};
/**
 * @func intToChinese 
 * @param  {number} value
 * @return {string}
 * @example intToChinese(123456789) // 一亿二千三百四十五万六千七百八十九
 * @desc   数字转中文
 */
export const intToChinese = (value: string) => {
  const str = String(value);
  const len = str.length - 1;
  const idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
  const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
    let pos = 0;
    if ($1[0] !== '0') {
      pos = len - idx;
      if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
        return idxs[len - idx];
      }
      return num[$1[0]] + idxs[len - idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - left % 4;
      }
      if (pos) {
        return idxs[pos] + num[$1[0]];
      } else if (idx + $1.length >= len) {
        return '';
      } else {
        return num[$1[0]]
      }
    }
  });
}
/**
 * @func sumAverage
 * @param {number[]} numberArr
 * @return {number}
 * @desc 计算数组平均值
 * @example sumAverage([1,2,3,4,5]) // 3
 */
export const sumAverage = (numberArr: number[]): number => {
  return numberArr.reduce((acc, curr) => acc + curr, 0) / numberArr.length;
}

/**
 * @func getDistance
 * @param {object} point1
 * @param {object} point2
 * @returns {number} 距离
 * @desc 计算两坐标点之间的距离
 * @example getDistance({x:1,y:2},{x:3,y:4}) // 2.8284271247461903
 */
interface Point {
  x: number,
  y: number
}
export const getDistance = (point1: Point, point2: Point): number => {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}



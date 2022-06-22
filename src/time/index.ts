//异步加载专业dayjs日期库
export const dayjs = () => {
  const _dayjs = import('https://unpkg.com/dayjs@1.8.21/dayjs.min.js' as any).then(dayjs => dayjs().format());
  return _dayjs
}
/**
 * @func diffDays
 * @desc 📝比较两个日期相差的天数
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
export function diffDays(date1: Date, date2: Date): number {
  const time1 = date1.getTime();
  const time2 = date2.getTime();
  const diff = Math.abs(time1 >= time2 ? time1 - time2 : time2 - time1);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * @func nowTime
 * @desc 📝获取当前时间
 * @returns {Date}
 */
export const nowTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
  const hour = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
  const miu = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
  const sec = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
  return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
}


export const formatDate = (format: string, time?: Date) => {
  let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return format.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime  时间戳
 * @return {String}
 */
export const formatPassTime = (startTime?: Date) => {
  let currentTime = Date.parse(new Date().toString()),
    starT = startTime ? Date.parse(new Date(startTime).toString()) : currentTime,
    time = currentTime - starT,
    day = parseInt(String(time / (1000 * 60 * 60 * 24))),
    hour = parseInt(String(time / (1000 * 60 * 60))),
    min = parseInt(String(time / (1000 * 60))),
    sec = parseInt(String(time / 1000)),
    month = parseInt(String(day / 30)),
    year = parseInt(String(month / 12));
  if (year) return year + "年前"
  if (month) return month + "个月前"
  if (day) return day + "天前"
  if (hour) return hour + "小时前"
  if (min) return min + "分钟前"
  if (sec) return sec + "秒前"
  else return '刚刚'
}

/**
 * 
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime  
 * @return {String}
 */
export const formatRemainTime = (endTime: Date) => {
  let startDate = new Date(); //开始时间
  let endDate = new Date(endTime); //结束时间
  let t = endDate.getTime() - startDate.getTime(); //时间差
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }
  return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}
/**
 * 
 * @desc 是否为闰年
 * @param {Number} year
 * @returns {Boolean}
 */

export const isLeapYear = (year: number) => {
  if (0 === year % 4 && (year % 100 !== 0 || year % 400 === 0)) {
    return true
  }
  return false;
}
/** 
 * @desc 获取指定日期月份的总天数
 * @param {Date} time
 * @return {Number}
*/
export const monthDays = (time: Date) => {
  time = new Date(time);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

/**
 * @desc ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
 * @param { Date | String } startTime
 * @param { Date | String } endTime
 * @returns { Object } { d, h, m, s } 天 时 分 秒
 */
export const timeLeft = (startTime: Date | string, endTime: Date | String) => {
  if (!startTime || !endTime) {
    return
  }
  let startDate, endDate;
  if (startTime instanceof Date) {
    startDate = startTime;
  } else {
    startDate = new Date(startTime.replace(/-/g, '/')) //开始时间
  }
  if (endTime instanceof Date) {
    endDate = endTime;
  } else {
    endDate = new Date(endTime.replace(/-/g, '/')) //结束时间
  }
  let t = endDate.getTime() - startDate.getTime()
  let d = 0,
    h = 0,
    m = 0,
    s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return { d, h, m, s }
}
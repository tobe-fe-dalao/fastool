/** Milliseconds in a minute, an hour, and a day */
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Pad with leading zeros */
function pad(value: number, len = 2): string {
  return String(value).padStart(len, '0');
}

/**
 * @func parseDate
 * @desc Parse a date, compatible with the '2024-01-01 12:00:00' format that iOS Safari does not support
 * @param {Date | string | number} value date, date string, or timestamp
 * @returns {Date} Date object
 * @example parseDate('2024-01-01 12:00:00') // Mon Jan 01 2024 12:00:00
 */
export const parseDate = (value: Date | string | number): Date => {
  if (value instanceof Date) return new Date(value.getTime());
  if (typeof value === 'number') return new Date(value);
  return new Date(value.trim().replace(/-/g, '/').replace('T', ' ').replace(/\.\d+/, ''));
};

/**
 * @func diffDays
 * @desc Compute the absolute number of days between two dates
 * @param {Date | string | number} date1 first date
 * @param {Date | string | number} date2 second date
 * @returns {number} difference in days
 * @example diffDays('2024/01/01', '2024/01/11') // 10
 */
export function diffDays(date1: Date | string | number, date2: Date | string | number): number {
  const time1 = parseDate(date1).getTime();
  const time2 = parseDate(date2).getTime();
  return Math.floor(Math.abs(time1 - time2) / DAY);
}

/**
 * @func getNowTime
 * @desc Get the current time, returned in the 'YYYY年M月D日 HH:mm:ss' format
 * @returns {string} current time string
 * @example getNowTime() // '2024年5月1日 09:08:07'
 */
export const getNowTime = (): string => {
  const now = new Date();
  return (
    `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  );
};

/**
 * @func formatDate
 * @desc Format a date by a template
 * @param {string} format template supporting YYYY YY MM M DD D HH H hh h mm m ss s SSS Q W WW
 * @param {Date | string | number} time time, default now
 * @returns {string} formatted date string
 * @example formatDate('YYYY-MM-DD HH:mm:ss') // '2024-05-01 09:08:07'
 * @example formatDate('YYYY年第Q季度 WW') // '2024年第2季度 星期三'
 */
export const formatDate = (format: string, time?: Date | string | number): string => {
  const date = time === undefined ? new Date() : parseDate(time);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const H = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const ms = date.getMilliseconds();
  const week = date.getDay();
  const h12 = H % 12 === 0 ? 12 : H % 12;

  const tokens: Record<string, string> = {
    YYYY: String(Y),
    yyyy: String(Y),
    YY: String(Y).slice(2),
    yy: String(Y).slice(2),
    Q: String(Math.floor((M - 1) / 3) + 1),
    MM: pad(M),
    M: String(M),
    DD: pad(D),
    dd: pad(D),
    D: String(D),
    d: String(D),
    HH: pad(H),
    H: String(H),
    hh: pad(h12),
    h: String(h12),
    mm: pad(m),
    m: String(m),
    ss: pad(s),
    s: String(s),
    SSS: pad(ms, 3),
    W: String(week === 0 ? 7 : week),
    WW: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][week],
  };

  return format.replace(
    /yyyy|YYYY|yy|YY|SSS|MM|M|DD|dd|D|d|HH|H|hh|h|mm|m|ss|s|WW|W|Q/g,
    (token) => tokens[token] ?? token
  );
};

/**
 * @func formatPassTime
 * @desc Format how long ago a given time was from now
 * @param {Date | string | number} startTime start time, default now
 * @returns {string} e.g. '3 days ago', 'just now'
 * @example formatPassTime('2024/01/01') // '5个月前'
 */
export const formatPassTime = (startTime?: Date | string | number): string => {
  const currentTime = Date.now();
  const start = startTime === undefined ? currentTime : parseDate(startTime).getTime();
  const time = currentTime - start;
  if (time < 0) return '';
  const sec = Math.floor(time / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(month / 12);
  if (year) return `${year}年前`;
  if (month) return `${month}个月前`;
  if (day) return `${day}天前`;
  if (hour) return `${hour}小时前`;
  if (min) return `${min}分钟前`;
  if (sec) return `${sec}秒前`;
  return '刚刚';
};

/**
 * @func formatRemainTime
 * @desc Format the remaining time from now until a given time
 * @param {Date | string | number} endTime end time
 * @returns {string} e.g. '1 day 2 hours 3 minutes 4 seconds'
 * @example formatRemainTime('2025/01/01')
 */
export const formatRemainTime = (endTime: Date | string | number): string => {
  const t = parseDate(endTime).getTime() - Date.now();
  return formatDuration(t);
};

/**
 * @func formatDuration
 * @desc Format a millisecond count into a human-readable duration
 * @param {number} ms milliseconds; negative values are treated as 0
 * @returns {string} e.g. '1 day 2 hours 3 minutes 4 seconds'
 * @example formatDuration(93784000) // '1天 2小时 3分钟 4秒'
 */
export const formatDuration = (ms: number): string => {
  const t = Math.max(0, Math.floor(ms));
  const d = Math.floor(t / DAY);
  const h = Math.floor((t % DAY) / HOUR);
  const m = Math.floor((t % HOUR) / MINUTE);
  const s = Math.floor((t % MINUTE) / 1000);
  const parts: string[] = [];
  if (d) parts.push(`${d}天`);
  if (d || h) parts.push(`${h}小时`);
  if (d || h || m) parts.push(`${m}分钟`);
  parts.push(`${s}秒`);
  return parts.join(' ');
};

/**
 * @func isLeapYear
 * @desc Check whether a year is a leap year
 * @param {number} year year
 * @returns {boolean}
 * @example isLeapYear(2024) // true
 */
export const isLeapYear = (year: number): boolean => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 * @func getDaysByMonth
 * @desc Get the total number of days in the month of a given date
 * @param {Date | string | number} time date
 * @returns {number} number of days
 * @example getDaysByMonth('2024/02/01') // 29
 */
export const getDaysByMonth = (time: Date | string | number): number => {
  const date = parseDate(time);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * @func timeLeft
 * @desc Compute the remaining time from startTime to endTime; returns 0 for both when startTime is greater than endTime
 * @param {Date | string} startTime start time
 * @param {Date | string} endTime end time
 * @returns {{ d: number, h: number, m: number, s: number }} days, hours, minutes, seconds
 * @example timeLeft('2024/01/01', '2024/01/02') // { d: 1, h: 0, m: 0, s: 0 }
 */
export const timeLeft = (
  startTime: Date | string,
  endTime: Date | string
): { d: number; h: number; m: number; s: number } => {
  const result = { d: 0, h: 0, m: 0, s: 0 };
  if (!startTime || !endTime) return result;
  const start = parseDate(startTime).getTime();
  const end = parseDate(endTime).getTime();
  const t = end - start;
  if (t >= 0) {
    result.d = Math.floor(t / DAY);
    result.h = Math.floor((t / HOUR) % 24);
    result.m = Math.floor((t / MINUTE) % 60);
    result.s = Math.floor((t / 1000) % 60);
  }
  return result;
};

/**
 * @func isSameDay
 * @desc Check whether two times fall on the same day
 * @param {Date | string | number} a time A
 * @param {Date | string | number} b time B
 * @returns {boolean}
 * @example isSameDay('2024/01/01 08:00', '2024/01/01 23:00') // true
 */
export const isSameDay = (a: Date | string | number, b: Date | string | number): boolean => {
  const d1 = parseDate(a);
  const d2 = parseDate(b);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * @func isToday
 * @desc Check whether a date is today
 * @param {Date | string | number} date date
 * @returns {boolean}
 * @example isToday(new Date()) // true
 */
export const isToday = (date: Date | string | number): boolean => {
  return isSameDay(date, Date.now());
};

/**
 * @func isYesterday
 * @desc Check whether a date is yesterday
 * @param {Date | string | number} date date
 * @returns {boolean}
 * @example isYesterday('2024/05/01')
 */
export const isYesterday = (date: Date | string | number): boolean => {
  return isSameDay(date, Date.now() - DAY);
};

/**
 * @func isTomorrow
 * @desc Check whether a date is tomorrow
 * @param {Date | string | number} date date
 * @returns {boolean}
 * @example isTomorrow('2024/05/01')
 */
export const isTomorrow = (date: Date | string | number): boolean => {
  return isSameDay(date, Date.now() + DAY);
};

/**
 * @func isWeekend
 * @desc Check whether a date is a weekend (Saturday or Sunday)
 * @param {Date | string | number} date date, default today
 * @returns {boolean}
 * @example isWeekend('2024/05/01')
 */
export const isWeekend = (date: Date | string | number = Date.now()): boolean => {
  const day = parseDate(date).getDay();
  return day === 0 || day === 6;
};

/**
 * @func addDays
 * @desc Add/subtract days from a given date
 * @param {Date | string | number} date date
 * @param {number} days number of days to add, may be negative
 * @returns {Date} new Date object
 * @example addDays('2024/01/01', 1) // 2024/01/02
 */
export const addDays = (date: Date | string | number, days: number): Date => {
  const result = parseDate(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * @func startOfDay
 * @desc Get 00:00:00.000 of a given date
 * @param {Date | string | number} date date
 * @returns {Date} start of the day
 * @example startOfDay('2024/01/01 12:30') // 2024/01/01 00:00:00
 */
export const startOfDay = (date: Date | string | number): Date => {
  const result = parseDate(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * @func endOfDay
 * @desc Get 23:59:59.999 of a given date
 * @param {Date | string | number} date date
 * @returns {Date} end of the day
 * @example endOfDay('2024/01/01 12:30') // 2024/01/01 23:59:59
 */
export const endOfDay = (date: Date | string | number): Date => {
  const result = parseDate(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * @func getTimestamp
 * @desc Get a millisecond timestamp
 * @param {Date | string | number} date date, default now
 * @returns {number} millisecond timestamp
 * @example getTimestamp() // 1714540800000
 */
export const getTimestamp = (date: Date | string | number = Date.now()): number => {
  return parseDate(date).getTime();
};

/**
 * @func getWeekday
 * @desc Get the day of the week
 * @param {Date | string | number} date date, default today
 * @param {'cn' | 'num'} type return type; 'cn' returns the Chinese weekday name, 'num' returns 1~7 (Monday = 1)
 * @returns {string | number} weekday
 * @example getWeekday('2024/05/01', 'cn') // '星期三'
 */
export const getWeekday = (
  date: Date | string | number = Date.now(),
  type: 'cn' | 'num' = 'cn'
): string | number => {
  const day = parseDate(date).getDay();
  if (type === 'num') return day === 0 ? 7 : day;
  return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][day];
};

/**
 * @func getAge
 * @desc Calculate age in full years from a birth date
 * @param {Date | string | number} birthday birth date
 * @returns {number} age; returns 0 when the date is invalid
 * @example getAge('1995/06/15') // 31
 */
export const getAge = (birthday: Date | string | number): number => {
  const birth = parseDate(birthday);
  if (Number.isNaN(birth.getTime())) return 0;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return Math.max(0, age);
};

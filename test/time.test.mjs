import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseDate,
  formatDate,
  formatDuration,
  diffDays,
  isLeapYear,
  getDaysByMonth,
  timeLeft,
  isSameDay,
  isToday,
  isYesterday,
  isTomorrow,
  isWeekend,
  addDays,
  startOfDay,
  endOfDay,
  getTimestamp,
  getWeekday,
  getAge,
} from '../dist/index.mjs';

test('parseDate 兼容 iOS 不支持的横杠格式', () => {
  const d = parseDate('2024-01-01 12:00:00');
  assert.equal(d.getFullYear(), 2024);
  assert.equal(d.getMonth(), 0);
  assert.equal(d.getDate(), 1);
  assert.equal(d.getHours(), 12);
  // 标准斜杠格式同样可用
  assert.equal(parseDate('2024/01/01').getDate(), 1);
  // 时间戳
  assert.equal(parseDate(1704067200000).getUTCFullYear(), 2024);
});

test('formatDate 格式化', () => {
  const t = '2024-05-01 09:08:07';
  assert.equal(formatDate('YYYY-MM-DD', t), '2024-05-01');
  assert.equal(formatDate('YYYY-MM-DD HH:mm:ss', t), '2024-05-01 09:08:07');
  assert.equal(formatDate('YYYY/MM/DD', t), '2024/05/01');
  assert.equal(formatDate('YY年M月D日', t), '24年5月1日');
  assert.equal(formatDate('YYYY年第Q季度', t), '2024年第2季度');
  assert.equal(formatDate('WW', t), '星期三');
});

test('formatDuration 时长格式化', () => {
  assert.equal(formatDuration(93784000), '1天 2小时 3分钟 4秒');
  assert.equal(formatDuration(0), '0秒');
});

test('diffDays 日期差（取绝对值）', () => {
  assert.equal(diffDays('2024/01/01', '2024/01/11'), 10);
  assert.equal(diffDays('2024/01/11', '2024/01/01'), 10);
  assert.equal(diffDays('2024/01/01', '2024/01/01'), 0);
});

test('isLeapYear / getDaysByMonth', () => {
  assert.ok(isLeapYear(2024));
  assert.ok(!isLeapYear(2023));
  assert.equal(getDaysByMonth('2024/02/01'), 29);
  assert.equal(getDaysByMonth('2023/02/01'), 28);
});

test('timeLeft 剩余时间', () => {
  assert.deepEqual(timeLeft('2024/01/01', '2024/01/02'), { d: 1, h: 0, m: 0, s: 0 });
});

test('isSameDay / isToday / isYesterday / isTomorrow', () => {
  assert.ok(isSameDay('2024/01/01 08:00', '2024/01/01 23:00'));
  assert.ok(!isSameDay('2024/01/01', '2024/01/02'));

  assert.ok(isToday(new Date()));

  const yesterday = addDays(new Date(), -1);
  const tomorrow = addDays(new Date(), 1);
  assert.ok(isYesterday(yesterday));
  assert.ok(isTomorrow(tomorrow));
  assert.ok(!isYesterday(new Date()));
});

test('isWeekend 周末判断', () => {
  // 2024-05-04 是周六
  assert.ok(isWeekend('2024/05/04'));
  // 2024-05-01 是周三
  assert.ok(!isWeekend('2024/05/01'));
});

test('addDays 日期加减', () => {
  const d = addDays('2024/01/01', 1);
  assert.equal(d.getDate(), 2);
  assert.equal(d.getMonth(), 0);
  const back = addDays('2024/01/01', -1);
  assert.equal(back.getFullYear(), 2023);
  assert.equal(back.getDate(), 31);
});

test('startOfDay / endOfDay', () => {
  const s = startOfDay('2024/01/01 12:30');
  assert.equal(s.getHours(), 0);
  assert.equal(s.getMinutes(), 0);
  assert.equal(s.getSeconds(), 0);

  const e = endOfDay('2024/01/01 12:30');
  assert.equal(e.getHours(), 23);
  assert.equal(e.getMinutes(), 59);
  assert.equal(e.getSeconds(), 59);
});

test('getTimestamp 时间戳', () => {
  assert.equal(getTimestamp('2024/01/01'), new Date('2024/01/01').getTime());
  assert.equal(String(getTimestamp()).length, 13);
});

test('getWeekday 星期', () => {
  assert.equal(getWeekday('2024/05/01', 'cn'), '星期三');
  assert.equal(getWeekday('2024/05/01', 'num'), 3);
});

test('getAge 年龄', () => {
  const age = getAge('1995/06/15');
  assert.ok(age >= 30 && age <= 40);
  // 刚出生的为 0 岁
  const now = new Date();
  assert.equal(getAge(now), 0);
});

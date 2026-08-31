/**
 * 正则校验相关测试（纯函数，无需 DOM）
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isChines,
  isIdCard,
  isPostCode,
  isIPv6,
  isEmail,
  isTelNumber,
  isHasEmoji,
  isUrl,
  isColor,
} from '../dist/index.mjs';

test('isChines 判断中文字符串', () => {
  assert.equal(isChines('你好世界'), true);
  assert.equal(isChines('hello'), false);
  assert.equal(isChines('你好hello'), false);
});

test('isIdCard 一代(15位) / 二代(18位) / 非法', () => {
  // 15 位一代身份证格式
  assert.equal(isIdCard('110105491231002', 1), true);
  assert.equal(isIdCard('123', 1), false);
  // 18 位二代身份证格式（含 X 校验位）
  assert.equal(isIdCard('11010519491231002X', 2), true);
  assert.equal(isIdCard('12345', 2), false);
  // 默认模式：明显非法
  assert.equal(isIdCard('abc'), false);
});

test('isPostCode 中国邮政编码', () => {
  assert.equal(isPostCode(100000), true);
  assert.equal(isPostCode(123456), true);
  assert.equal(isPostCode(12345), false); // 不足 6 位
  assert.equal(isPostCode(0), false);
});

test('isIPv6 返回布尔', () => {
  assert.equal(typeof isIPv6('::1'), 'boolean');
  assert.equal(isIPv6('256.256.256.256'), false);
});

test('isEmail 邮箱校验', () => {
  assert.equal(isEmail('user@example.com'), true);
  assert.equal(isEmail('a.b+c@sub.domain.io'), true);
  assert.equal(isEmail('plaintext'), false);
  assert.equal(isEmail('a@'), false);
});

test('isTelNumber 手机号校验', () => {
  assert.equal(isTelNumber('13800138000'), true);
  assert.equal(isTelNumber('19912345678'), true);
  assert.equal(isTelNumber('12345'), false);
  assert.equal(isTelNumber('abcdefghijk'), false);
});

test('isHasEmoji 包含 emoji', () => {
  assert.equal(isHasEmoji('hello 😀 world'), true);
  assert.equal(isHasEmoji('普通文字'), false);
});

test('isUrl 链接校验', () => {
  assert.equal(isUrl('https://example.com'), true);
  assert.equal(isUrl('http://a.cn/path'), true);
  assert.equal(isUrl('www.example.com'), true); // 协议可选
  assert.equal(isUrl('just some text'), false);
});

test('isColor 十六进制颜色', () => {
  assert.equal(isColor('#fff'), true);
  assert.equal(isColor('#ffffff'), true);
  assert.equal(isColor('red'), false);
  assert.equal(isColor('#gggggg'), false);
});

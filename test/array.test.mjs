import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  chunk,
  compact,
  uniq,
  uniqBy,
  flatten,
  flattenDeep,
  difference,
  intersection,
  union,
  groupBy,
  keyBy,
  countBy,
  partition,
  shuffle,
  sample,
  sampleSize,
  range,
  zip,
  unzip,
  sum,
  sumBy,
  maxBy,
  minBy,
  sortBy,
  head,
  last,
  take,
  drop,
  move,
} from '../dist/index.mjs';

test('chunk 按指定长度切分', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunk([1, 2, 3], 0), []);
});

test('compact 去除假值', () => {
  assert.deepEqual(compact([0, 1, false, 2, '', 3, null, undefined, NaN]), [1, 2, 3]);
});

test('uniq / uniqBy 去重', () => {
  assert.deepEqual(uniq([1, 2, 2, 3, 1]), [1, 2, 3]);
  const users = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
  ];
  assert.deepEqual(
    uniqBy(users, 'id').map((u) => u.id),
    [1, 2]
  );
});

test('flatten / flattenDeep 扁平化', () => {
  assert.deepEqual(flatten([1, [2, [3, [4]]], 5]), [1, 2, [3, [4]], 5]);
  assert.deepEqual(flattenDeep([1, [2, [3, [4]]], 5]), [1, 2, 3, 4, 5]);
});

test('difference / intersection / union 集合运算', () => {
  assert.deepEqual(difference([1, 2, 3, 4], [2, 4]), [1, 3]);
  assert.deepEqual(intersection([1, 2, 3], [2, 3, 4]), [2, 3]);
  assert.deepEqual(union([1, 2], [2, 3], [4]), [1, 2, 3, 4]);
});

test('groupBy / keyBy / countBy 聚合', () => {
  const list = [
    { type: 'a', v: 1 },
    { type: 'b', v: 2 },
    { type: 'a', v: 3 },
  ];
  assert.equal(groupBy(list, 'type').a.length, 2);
  assert.equal(keyBy(list, 'type').b.v, 2);
  assert.deepEqual(countBy(list, 'type'), { a: 2, b: 1 });
});

test('partition 按条件拆分', () => {
  const [even, odd] = partition([1, 2, 3, 4], (n) => n % 2 === 0);
  assert.deepEqual(even, [2, 4]);
  assert.deepEqual(odd, [1, 3]);
});

test('shuffle / sample / sampleSize 随机取值', () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = shuffle(arr);
  assert.equal(shuffled.length, 5);
  assert.deepEqual([...shuffled].sort(), [1, 2, 3, 4, 5]);
  // 原数组不应被修改
  assert.deepEqual(arr, [1, 2, 3, 4, 5]);
  assert.equal(typeof sample(arr), 'number');
  assert.equal(sampleSize(arr, 3).length, 3);
  assert.equal(sample([]), undefined);
});

test('range 生成数列', () => {
  assert.deepEqual(range(4), [0, 1, 2, 3]);
  assert.deepEqual(range(1, 5), [1, 2, 3, 4]);
  assert.deepEqual(range(0, 10, 3), [0, 3, 6, 9]);
  assert.deepEqual(range(3, 0, -1), [3, 2, 1]);
});

test('zip / unzip 配对与还原', () => {
  assert.deepEqual(zip(['a', 'b'], [1, 2]), [['a', 1], ['b', 2]]);
  assert.deepEqual(unzip([['a', 1], ['b', 2]]), [['a', 'b'], [1, 2]]);
});

test('sum / sumBy / maxBy / minBy 数值计算', () => {
  assert.equal(sum([1, 2, 3]), 6);
  assert.equal(sum([]), 0);
  assert.equal(sumBy([{ v: 1 }, { v: 2 }], 'v'), 3);
  assert.deepEqual(maxBy([{ v: 1 }, { v: 9 }, { v: 3 }], 'v'), { v: 9 });
  assert.deepEqual(minBy([{ v: 1 }, { v: 9 }], 'v'), { v: 1 });
});

test('sortBy 排序且稳定', () => {
  const list = [
    { name: 'b', v: 1 },
    { name: 'a', v: 2 },
    { name: 'c', v: 1 },
  ];
  assert.deepEqual(
    sortBy(list, 'v').map((i) => i.name),
    ['b', 'c', 'a']
  );
  assert.deepEqual(
    sortBy(list, 'v', 'desc').map((i) => i.v),
    [2, 1, 1]
  );
});

test('head / last / take / drop / move 取值与变换', () => {
  const arr = [1, 2, 3, 4];
  assert.equal(head(arr), 1);
  assert.equal(last(arr), 4);
  assert.equal(head([]), undefined);
  assert.deepEqual(take(arr, 2), [1, 2]);
  assert.deepEqual(drop(arr, 2), [3, 4]);
  assert.deepEqual(move(arr, 0, 2), [2, 3, 1, 4]);
  // 全部为纯函数，不修改入参
  assert.deepEqual(arr, [1, 2, 3, 4]);
});

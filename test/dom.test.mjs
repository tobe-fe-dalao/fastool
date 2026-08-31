/**
 * dom 工具测试：removeHTMLTag（纯函数）与 class 辅助（使用最小 fake 元素）
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { removeHTMLTag, hasClass, addClass, removeClass } from '../dist/index.mjs';

test('removeHTMLTag 去除标签仅保留文本', () => {
  assert.equal(removeHTMLTag('<p>hello</p>'), 'hello');
  assert.equal(removeHTMLTag('<a href="#">link</a>'), 'link');
  assert.equal(removeHTMLTag('plain text'), 'plain text');
  assert.equal(removeHTMLTag('<div><span>x</span><br/>y</div>'), 'xy');
});

test('hasClass / addClass / removeClass 操作 className', () => {
  const el = { className: 'box' };

  assert.equal(hasClass(el, 'box'), true);
  assert.equal(hasClass(el, 'active'), false);

  addClass(el, 'active');
  assert.equal(hasClass(el, 'active'), true);
  assert.equal(el.className.includes('box'), true);

  // 重复添加不会叠加
  addClass(el, 'active');
  assert.equal((el.className.match(/active/g) || []).length, 1);

  removeClass(el, 'box');
  assert.equal(hasClass(el, 'box'), false);
});

test('removeClass 在 class 不存在时不报错', () => {
  const el = { className: 'only' };
  assert.doesNotThrow(() => removeClass(el, 'missing'));
  assert.equal(el.className, 'only');
});

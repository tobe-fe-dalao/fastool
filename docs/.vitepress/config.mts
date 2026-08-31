import { defineConfig } from 'vitepress';

const REPO = 'https://github.com/tobe-fe-dalao/fastool';

/**
 * 侧边栏分组（按分类）。每种语言给出分组标题与条目标题。
 * link 统一用相对路径，由 buildSidebar 按 locale 拼上前缀。
 */
const groups = [
  {
    en: 'Getting Started',
    zh: '开始',
    ja: 'はじめに',
    items: [
      { link: '/guide/', en: 'Introduction', zh: '介绍', ja: '紹介' },
      { link: '/guide/start', en: 'Getting Started', zh: '快速开始', ja: 'クイックスタート' },
    ],
  },
  {
    en: 'Data Structures',
    zh: '数据结构',
    ja: 'データ構造',
    items: [
      { link: '/guide/Array', en: 'Array', zh: 'Array 数组', ja: 'Array 配列' },
      { link: '/guide/Objects', en: 'Objects', zh: 'Objects 对象', ja: 'Objects オブジェクト' },
      { link: '/guide/Is', en: 'Is — Type Guards', zh: 'Is 类型判断', ja: 'Is 型判定' },
    ],
  },
  {
    en: 'Values & Formatting',
    zh: '值与格式化',
    ja: '値とフォーマット',
    items: [
      { link: '/guide/String', en: 'String', zh: 'String 字符串', ja: 'String 文字列' },
      { link: '/guide/Number', en: 'Number', zh: 'Number 数字', ja: 'Number 数値' },
      { link: '/guide/Time', en: 'Time', zh: 'Time 时间', ja: 'Time 日時' },
      { link: '/guide/Random', en: 'Random', zh: 'Random 随机', ja: 'Random 乱数' },
      { link: '/guide/Regex', en: 'Regex', zh: 'Regex 正则', ja: 'Regex 正規表現' },
    ],
  },
  {
    en: 'Programming Tools',
    zh: '编程工具',
    ja: 'プログラミングツール',
    items: [
      { link: '/guide/Fn', en: 'Function', zh: 'Fn 函数', ja: 'Function 関数' },
      { link: '/guide/URL', en: 'URL', zh: 'URL 地址', ja: 'URL' },
      { link: '/guide/Log', en: 'Log', zh: 'Log 日志', ja: 'Log ログ' },
      { link: '/guide/Tools', en: 'Tools', zh: 'Tools 杂项', ja: 'Tools その他' },
    ],
  },
  {
    en: 'Runtime Environment',
    zh: '运行环境',
    ja: '実行環境',
    items: [
      { link: '/guide/Browser', en: 'Browser', zh: 'Browser 浏览器', ja: 'Browser ブラウザ' },
      { link: '/guide/DOM', en: 'DOM', zh: 'DOM 元素', ja: 'DOM' },
      { link: '/guide/Device', en: 'Device', zh: 'Device 设备', ja: 'Device デバイス' },
      { link: '/guide/Storage', en: 'Storage', zh: 'Storage 存储', ja: 'Storage ストレージ' },
      { link: '/guide/Canvas', en: 'Canvas', zh: 'Canvas 画布', ja: 'Canvas キャンバス' },
      { link: '/guide/Event', en: 'Event', zh: 'Event 事件', ja: 'Event イベント' },
    ],
  },
  {
    en: 'Optional Entries',
    zh: '可选入口',
    ja: 'オプションのエントリ',
    items: [
      { link: '/guide/Polyfill', en: 'Polyfill', zh: 'Polyfill 补丁', ja: 'Polyfill' },
      { link: '/guide/Plugins', en: 'Plugins', zh: 'Plugins 插件', ja: 'Plugins プラグイン' },
    ],
  },
];

function buildSidebar(prefix: string, lang: 'en' | 'zh' | 'ja') {
  return groups.map((g) => ({
    text: g[lang],
    items: g.items.map((it) => ({ text: it[lang], link: `${prefix}${it.link}` })),
  }));
}

function buildNav(prefix: string, lang: 'en' | 'zh' | 'ja') {
  const labels = {
    en: { intro: 'Introduction', start: 'Getting Started' },
    zh: { intro: '介绍', start: '快速开始' },
    ja: { intro: '紹介', start: 'はじめに' },
  }[lang];
  return [
    { text: labels.intro, link: `${prefix}/guide/` },
    { text: labels.start, link: `${prefix}/guide/start` },
    { text: 'GitHub', link: REPO },
  ];
}

function editLink(prefix: string, lang: 'en' | 'zh' | 'ja') {
  const text = {
    en: 'Edit this page on GitHub',
    zh: '在 GitHub 上编辑此页',
    ja: 'GitHub でこのページを編集',
  }[lang];
  return {
    pattern: `${REPO}/tree/main/docs${prefix}/:path`,
    text,
  };
}

const footer = {
  message: 'Released under the Apache-2.0 License.',
  copyright: 'Copyright © 2022-present BlindMonk',
};

export default defineConfig({
  base: '/fastool/',
  title: 'FasTool',
  description: 'A zero-dependency modern JavaScript / TypeScript utility library',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: buildNav('', 'en'),
        sidebar: { '/guide/': buildSidebar('', 'en') },
        editLink: editLink('', 'en'),
        socialLinks: [{ icon: 'github', link: REPO }],
        footer,
        outline: { level: [2, 3] },
        docFooter: { prev: true, next: true },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: buildNav('/zh', 'zh'),
        sidebar: { '/zh/guide/': buildSidebar('/zh', 'zh') },
        editLink: editLink('/zh', 'zh'),
        socialLinks: [{ icon: 'github', link: REPO }],
        footer,
        outline: { level: [2, 3] },
        docFooter: { prev: true, next: true },
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      themeConfig: {
        nav: buildNav('/ja', 'ja'),
        sidebar: { '/ja/guide/': buildSidebar('/ja', 'ja') },
        editLink: editLink('/ja', 'ja'),
        socialLinks: [{ icon: 'github', link: REPO }],
        footer,
        outline: { level: [2, 3] },
        docFooter: { prev: true, next: true },
      },
    },
  },
});

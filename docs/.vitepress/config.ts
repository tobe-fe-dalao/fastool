module.exports = {
  lang: 'zh-CN',
  title: 'FasTool',
  base: '/fastool/',
  description: '一个短小而精悍的现代JavaScript使用工具库',
  lastUpdated: true,
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide(),
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/tobe-fe-dalao/fastool' }],
    editLink: {
      pattern: 'https://github.com/tobe-fe-dalao/fastool/tree/doc/docs/:path',
      text: '在GitHub编辑此页',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present BlindMonk',
    },
    algolia: {
      appId: 'ZZNDXJ2XIU',
      apiKey: 'a6e9af943b8057a410b4059a1bb3306f',
      indexName: 'FasTool',
    },
  },
}

function nav() {
  return [
    { text: '介绍', link: '/guide/' },
    { text: '掘金', link: 'https://juejin.cn/user/3016715636842622' },
    { text: '加入我们', link: 'https://github.com/tobe-fe-dalao/fastool' },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '介绍',
      collapsible: true,
      items: [
        { text: '介绍', link: '/guide/' },
        { text: '快速上手', link: '/guide/start' },
        { text: '参与编辑', link: '/guide/EditMd' },
      ],
    },
    {
      text: 'Browser浏览器',
      items: [
        { text: 'Browser', link: '/guide/Browser' },
        { text: 'Device设备', link: '/guide/Device' }
      ]
    },
    {
      text: '本地储存',
      collapsible: true,
      items: [
        { text: 'Cookie操作', link: '/guide/Cookie' },
        { text: 'Storage操作', link: '/guide/Storage' },
      ],
    },
    {
      text: 'Time操作',
      collapsible: false,
      items: [
        { text: 'Time操作', link: '/guide/Time' }
      ]
    },
    {
      text: 'Random操作',
      collapsible: false,
      items: [
        { text: 'Random操作', link: '/guide/Random' }
      ]
    },
    {
      text: 'Media操作',
      collapsible: false,
      items: [
        { text: 'Media操作', link: '/guide/Media' }
      ]
    },
    {
      text: 'Polyfill兼容',
      collapsible: false,
      items: [
        { text: 'Polyfill兼容', link: '/guide/Polyfill' }
      ]
    },
    {
      text: 'Canvas操作',
      collapsible: false,
      items: [
        { text: 'Canvas操作', link: '/guide/Canvas' }
      ]
    },
    {
      text: 'Event事件',
      collapsible: false,
      items: [
        { text: 'Event事件', link: '/guide/Event' }
      ]
    },
    {
      text: 'Plugins插件库',
      collapsible: false,
      items: [
        { text: 'Plugins插件库', link: '/guide/Plugins' }
      ]
    },
    {
      text: 'Fn函数',
      collapsible: false,
      items: [
        { text: 'Fn函数', link: '/guide/Fn' }
      ]
    },
    {
      text: 'Tools工具库',
      collapsible: false,
      items: [
        { text: 'Tools工具库', link: '/guide/Tools' }
      ]
    },
    {
      text: 'Regex校验',
      collapsible: false,
      items: [
        { text: 'Regex校验', link: '/guide/Regex' }
      ]
    },
    {
      text: 'URL链接操作',
      collapsible: false,
      items: [
        { text: 'URL链接操作', link: '/guide/URL' }
      ]
    },
    {
      text: 'Number操作',
      collapsible: false,
      items: [
        { text: 'Number操作', link: '/guide/Number' }
      ]
    },
    {
      text: 'String操作',
      collapsible: false,
      items: [
        { text: 'String操作', link: '/guide/String' }
      ]
    },
  ]
}

module.exports = {
  lang: 'zh-CN',
  title: 'FasTool',
  base: '/fastool/',
  description: '一个短小而精悍的现代JavaScript使用工具库',
  lastUpdated: true,
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide()
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobe-fe-dalao/fastool' }
    ],
    editLink: {
      pattern: 'https://github.com/tobe-fe-dalao/fastool/tree/doc/docs/:path',
      text: '在GitHub编辑此页'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present BlindMonk'
    },
    algolia: {
      appId: 'ZZNDXJ2XIU',
      apiKey: 'a6e9af943b8057a410b4059a1bb3306f',
      indexName: 'FasTool'
    },
  }

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

      ]
    },
    {
      text: '本地存储',
      collapsible: true,
      items: [
        { text: 'Storage操作', link: '/guide/Storage' },
        { text: 'Cookie操作', link: '/guide/Cookie' },
      ]
    },
    // { text: 'String操作', link: '/guide/String' },
    // { text: 'Time操作', link: '/guide/Time' },
    // { text: 'Fn函数', link: '/guide/Fn' },
    // { text: 'Random操作', link: '/guide/Random' },
    // { text: 'Regex校验', link: '/guide/Regex' },
    // { text: 'URL链接操作', link: '/guide/URL' },
    // { text: 'Device设备', link: '/guide/Device' },
    // { text: 'Browser浏览器', link: '/guide/Browser' },
    // { text: 'Number操作', link: '/guide/Number' },
    // { text: 'Media操作', link: '/guide/Media' },
    // { text: 'Polyfill兼容', link: '/guide/Polyfill' },
    {
      text: 'Polyfill兼容',
      collapsible: true,
      items: [
        { text: 'array相关', link: '/guide/Polyfill/array' },
        { text: 'string相关', link: '/guide/Polyfill/string' },
      ]
    },
    // { text: 'Canvas操作', link: '/guide/Canvas' },
    // { text: 'Event事件', link: '/guide/Event' },
    // { text: 'Plugins插件库', link: '/guide/Plugins' },
    // { text: 'Tools工具库', link: '/guide/Tools' },
  ]
}


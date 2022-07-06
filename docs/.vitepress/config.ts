
module.exports = {
  lang: 'en-US',
  title: 'FasTool',
  base: './',
  description: '一个短小而精悍的现代JavaScript使用工具库',
  lastUpdated: true,
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/': sidebarGuide(),
    },
    smoothScroll: true,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobe-fe-dalao' }
    ],

  }

}

function nav() {
  return [
    { text: '我的个人网站', link: 'http://www.tobe-fe-dalao.cn' },
    { text: '掘金', link: 'https://juejin.cn/user/3016715636842622' },
    { text: '加入我们', link: 'https://github.com/tobe-fe-dalao/fastool' },

  ]
}

function sidebarGuide() {
  return [
    {
      items: [
        { text: 'Storage操作', link: '/guide/Storage' },
        { text: 'String操作', link: '/guide/String' },
        { text: 'Time操作', link: '/guide/Time' },
        { text: 'Fn函数', link: '/guide/Fn' },
        { text: 'Random操作', link: '/guide/Random' },
        { text: 'Regex校验', link: '/guide/Regex' },
        { text: 'URL链接操作', link: '/guide/URL' },
        { text: 'Device设备', link: '/guide/Device' },
        { text: 'Browser浏览器', link: '/guide/Browser' },
        { text: 'Number操作', link: '/guide/Number' },
        { text: 'Cookie操作', link: '/guide/Cookie' },
        { text: 'Media操作', link: '/guide/Media' },
        { text: 'Polyfill兼容', link: '/guide/Polyfill' },
        { text: 'Canvas操作', link: '/guide/Canvas' },
        { text: 'Event事件', link: '/guide/Event' },
        { text: 'Plugins插件库', link: '/guide/Plugins' },
        { text: 'Tools工具库', link: '/guide/Tools' },
      ]
    },
  ]
}


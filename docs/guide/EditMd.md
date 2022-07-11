# 一起写文档
欢迎大家一起写文档，我们总在寻找一种高效的协作方式，尽可能将维护成本降到最低。
## 第一步：注册路由
按照我们约定的类目在`docs/.vitepress/theme/config.ts`文件中`sidebarGuide`下创建一级菜单(如果已存在则直接跳过)
然后关联你所负责的文档文件，即可开始编写文档
```javascript
{
  text: '本地存储', // 一级目录路由
  items: [
    { text: 'Storage操作', link: '/guide/Storage' }, //二级目录路由
    { text: 'Cookie操作', link: '/guide/Cookie' },
  ]
 }

```
## 第二步：编写规范
我们为了减少维护成本，约束代码规范，标题为：`Function`命名，内容为中文解释
代码块紧跟其后，代码块内容必须为`Function`的注释，便于后期直接替换
```typescript
// 这是一个完整规范
## observeProxy   //标题
设计一个对象的观测者-proxy方案  //注释
/**
 * @func observeProxy
 * @desc 设计一个对象的观测者-proxy方案
 * @param { Object } obj 对象
 * @return { cal } 观测对象回调方法
 * @github git链接
 * @example  let obj = observeProxy({name:'alex',age:18},callback)
 * @size 插件大小
*/
```

## 第三步：运行检查
运行文档，检查错别字等问题
```
yarn docs:dev
```
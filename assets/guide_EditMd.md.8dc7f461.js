import{_ as s,c as a,o as n,a as l}from"./app.e33a3af0.js";const f=JSON.parse('{"title":"一起写文档","description":"","frontmatter":{},"headers":[{"level":2,"title":"第一步：注册路由","slug":"第一步-注册路由","link":"#第一步-注册路由","children":[]},{"level":2,"title":"第二步：编写规范","slug":"第二步-编写规范","link":"#第二步-编写规范","children":[]},{"level":2,"title":"第三步：运行检查","slug":"第三步-运行检查","link":"#第三步-运行检查","children":[]}],"relativePath":"guide/EditMd.md","lastUpdated":1677241437000}'),t={name:"guide/EditMd.md"},o=l(`<h1 id="一起写文档" tabindex="-1">一起写文档 <a class="header-anchor" href="#一起写文档" aria-hidden="true">#</a></h1><p>欢迎大家一起写文档，我们总在寻找一种高效的协作方式，尽可能将维护成本降到最低。</p><h2 id="第一步-注册路由" tabindex="-1">第一步：注册路由 <a class="header-anchor" href="#第一步-注册路由" aria-hidden="true">#</a></h2><p>按照我们约定的类目在<code>docs/.vitepress/theme/config.ts</code>文件中<code>sidebarGuide</code>下创建一级菜单(如果已存在则直接跳过) 然后关联你所负责的文档文件，即可开始编写文档</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">本地存储</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 一级目录路由</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">items</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Storage操作</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> link</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/guide/Storage</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">//二级目录路由</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cookie操作</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> link</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/guide/Cookie</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  ]</span></span>
<span class="line"><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="第二步-编写规范" tabindex="-1">第二步：编写规范 <a class="header-anchor" href="#第二步-编写规范" aria-hidden="true">#</a></h2><p>我们为了减少维护成本，约束代码规范，标题为：<code>Function</code>命名，内容为中文解释 代码块紧跟其后，代码块内容必须为<code>Function</code>的注释，便于后期直接替换</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 这是一个完整规范</span></span>
<span class="line"><span style="color:#A6ACCD;">## observeProxy   </span><span style="color:#676E95;font-style:italic;">//标题</span></span>
<span class="line"><span style="color:#A6ACCD;">设计一个对象的观测者</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">proxy方案  </span><span style="color:#676E95;font-style:italic;">//注释</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">func</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#FFCB6B;font-style:italic;">observeProxy</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">desc</span><span style="color:#676E95;font-style:italic;"> 设计一个对象的观测者-proxy方案</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;"> Object </span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#676E95;font-style:italic;"> 对象</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">return</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;"> cal </span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> 观测对象回调方法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">github</span><span style="color:#676E95;font-style:italic;"> git链接</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">example</span><span style="color:#676E95;font-style:italic;">  let obj = observeProxy({name:&#39;alex&#39;,age:18},callback)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">size</span><span style="color:#676E95;font-style:italic;"> 插件大小</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"></span></code></pre></div><h2 id="第三步-运行检查" tabindex="-1">第三步：运行检查 <a class="header-anchor" href="#第三步-运行检查" aria-hidden="true">#</a></h2><p>运行文档，检查错别字等问题</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yarn docs:dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,11),e=[o];function p(c,i,r,y,F,D){return n(),a("div",null,e)}const h=s(t,[["render",p]]);export{f as __pageData,h as default};
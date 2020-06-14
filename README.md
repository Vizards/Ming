<p align="center">
  <img width="600" src="https://tva1.sinaimg.cn/large/00831rSTly1gd93kc06rpj30zk0hs0uo.jpg" alt="ming" />
</p>

---

<p align="center">📦开箱即用的微前端工程方案，基于 umi3.x + qiankun@next</p>
<p align="center">🍳从实际中台项目孵化，精简的 开发→构建→部署 全流程应用方案</p>
<p align="center">🧭Demo Site：<a href="https://microfe.herokuapp.com">microfe.herokuapp.com</a></p>
<br/>

# 快速开始

先分别安装基座应用和子应用的依赖，文件结构如下：

```tree
Ming
|-- account/ ·········· 子应用 account
|-- car/ ·············· 子应用 car
|-- dist/ ············· 生产环境目录
|-- foundation/ ······· 基座应用
|-- home/ ············· 子应用 home
|-- Dockerfile
|-- app.js ············ hapi 驱动的简单后端路由
|-- package.json
```

先启动基座应用：

```shell script
Ming/foundation > $ yarn start
```

再启动对应的子应用

```shell script
Ming/account > $ yarn start
Ming/home > $ yarn start
Ming/car > $ yarn start
```

应用默认运行于 http://localhost:8000

<br/>

# 本地开发

本地开发时，子应用运行在不同的端口，集中配置在基座应用的 `config/config.js` 中。

### 说明文档

- [开发一个子应用](https://github.com/Vizards/Ming/wiki/01.-开发一个子应用)
- [children 级子应用与 brother 级子应用](https://github.com/Vizards/Ming/wiki/02.-children-级子应用和-brother-级子应用)
- [DOM 级权限控制](https://github.com/Vizards/Ming/wiki/03.-DOM-级权限控制)
- [基座声明式路由](https://github.com/Vizards/Ming/wiki/04.-基座声明式路由)
- [微前端下 BrowserHistory Mode 的 404 问题](https://github.com/Vizards/Ming/wiki/05.-微前端下-BrowserHistory-Mode-的-404-问题)

### 开发资源

- [UmiJS](https://umijs.org)
- [@umijs/plugin-qiankun@next](https://github.com/umijs/plugins/blob/master/packages/plugin-qiankun)
- [Umi Hooks](https://hooks.umijs.org)
- [Formily](https://formilyjs.org/)

<br/>

# 生产构建

推荐 OSS 托管静态文件式部署子应用。

### OSS 托管子应用

各个子应用应分别托管到 OSS 后，暴露自己的入口 `index.html` 路径给基座应用，即类似如下的
`foundation/config/config.prod.ts`：

```javascript
const subApps = [
  ...
  {
    name: 'account',
    entry: 'https://oss.myname.cloud.com/micro_subapp/account/index.html',
    base: '/account',
    mountElementId: 'root-account'
  },
  ...
]
```

以上部署方式可以实现子应用单独开发、单独更新、甚至技术栈无关（子应用只需暴露符合 Single-SPA/qiankun 的生命周期方法）。

### 全量打包构建

参考根目录 `package.json` 的 `scripts`，子应用和基座应用都打包进 `/dist` 后，
参考 `app.js` 简单处理静态文件与路由冲突导致的 404 问题即可部署。

### 生产环境运行

#### 不使用 Docker，直接运行 Node 服务：

```shell script
Ming/dist > $ PORT=3000 node app.js
```

Ming 将会运行在 http://localhost:3000

#### 使用 Docker:

先取消注释 `dist/Dockerfile` 文件中的的端口（PORT）字段

```shell script
Ming/dist > $ docker build -t vizards/ming .
Ming/dist > $ docker run -p 12580:3000 -d vizards/ming
```

Ming 将会运行在 http://localhost:12580

<br>

# LICENSE

[The Star And Thank Author License (SATA License)](https://github.com/Vizards/Ming/LICENSE)

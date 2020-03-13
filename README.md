# 基于 umi.js 和 qiankun 的微前端示例中台项目

> umi3.x 下的微前端中台和基础配套组件

## 快速开始

- `foundation/` 是基座 umijs 应用
- 其他是子 umijs 应用
- 请先分别安装基座应用和子应用的依赖

首先启动基座应用：

```shell script
AEMP/foundation > $ yarn start
```

启动对应的子应用，如启动子应用 `home`
```shell script
AEMP/home > $ yarn start
```

应用默认运行于 http://localhost:8000

## 如何新建一个微前端 umi 子应用

##### 在与基座应用平级的目录下新建一个项目文件夹：

```shell script
AEMP > $ mkdir example && cd example 
```

##### 在项目文件夹下新建一个 umi3.x 的应用：

```shell script
AEMP/example > $ yarn create @umijs/umi-app
```

##### 安装依赖，并额外安装 `@umijs/plugin-qiankun@next`：

> ⚠️ @umijs/plugin-qiankun 正式版本未适配 umi3.x 

```shell script
AEMP/example > $ yarn install
AEMP/example > $ yarn add @umijs/plugin-qiankun@next
```

##### 配置 `.umirc.ts` 启用 qiankun：

```diff
import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/index', component: '@/pages/index' },
    { path: '/other', component: '@/pages/other' },
  ],
+ base: '/example',
+ qiankun: {
+   slave: {}
+ }
});
```

> ✅ 按 qiankun 规范，还应该为子应用的 `package.json` 配置一个 name


##### 指定 example 子应用的启动端口，修改 `.env` 或 `.env.local`：

```
PORT=9000
```

##### 配置基座应用（foundation）微前端配置 `foundation/.umirc[.local].ts`，新增 example 子应用：

```diff
const subApps = [
  ...
+ {
+   name: 'example',
+   entry: 'http://localhost:9000',
+   base: '/example',
+   mountElementId: 'root-children'
+ },
  ...
]
```

注意：

1. 按规范，请保证 `base` 和 `name` 字段与子应用一致

2. `mountElementId` 的两种默认配置：
  - 为 `root-chidlren` 时，默认按左侧菜单栏子应用处理
  - 为 `root-example` 时，默认按与主 layout 平级的应用处理（example 对应子应用路由名称）

##### 配置基座应用（foundation）的全局路由 `foundation/src/config/route.ts`，新增 example 子应用：

```diff
export const routes: IRoute[] = [
  {
    path: '/home',
    title: '首页'
  },
  ...
+ { 
+   path: '/example',
+   title: '示例子项目',
+   routes: [
+     { path: '/example/index', title: '页面1' },
+     { path: '/example/other', title: '页面2' }
+   ] 
+ },
  ...
]
```

##### 启动 example 子应用：

```shell script
AEMP > example $ yarn start 
```

##### example 子应用将同时运行在： 

- http://localhost:8000/example/index 
- http://localhost:9000

## 子应用与基座应用交互

- `foundation/rootExports.js` export 出了基座应用的 `history`
- `account/src/login.tsx` 使用了基座应用的 `history`

ref: [父子应用通讯 - UmiJS](https://umijs.org/zh-CN/plugins/plugin-qiankun#%E7%88%B6%E5%AD%90%E5%BA%94%E7%94%A8%E9%80%9A%E8%AE%AF)

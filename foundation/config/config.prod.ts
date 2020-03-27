import { defineConfig } from 'umi'

const subApps = [
  {
    name: 'account',
    entry: '/account/index.html',
    base: '/account',
    mountElementId: 'root-account'
  },
  {
    name: 'home',
    entry: '/home/index.html',
    base: '/home',
    mountElementId: 'root-children'
  },
  {
    name: 'car',
    entry: '/car/index.html',
    base: '/car',
    mountElementId: 'root-children'
  },
]

export default defineConfig({
  qiankun: {
    master: {
      apps: subApps,
      jsSandbox: false, // 是否启用 js 沙箱，默认为 false
      prefetch: true, // 是否启用 prefetch 特性，默认为 true
      defer: false, // 是否异步渲染，默认为 false
    }
  },
  define: {
    'process.env.subApp': subApps,
  },
  antd: {
    dark: false,
  },
  hash: true,
})

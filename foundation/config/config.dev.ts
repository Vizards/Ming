import { defineConfig } from 'umi'

const subApps = [
  {
    name: 'account',
    entry: 'http://localhost:3010',
    base: '/account',
    mountElementId: 'root-account'
  },
  {
    name: 'home',
    entry: 'http://localhost:3000',
    base: '/home',
    mountElementId: 'root-children'
  },
  {
    name: 'car',
    entry: 'http://localhost:3001',
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
})

import { defineConfig } from 'umi';

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
    name: 'sensor',
    entry: 'http://localhost:3001',
    base: '/sensor',
    mountElementId: 'root-children'
  }
]

export default defineConfig({
  qiankun: {
    master: {
      apps: subApps,
    }
  },
  define: {
    'process.env.subApp': subApps,
  },
})

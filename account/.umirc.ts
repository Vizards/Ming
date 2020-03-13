import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/login', component: '@/pages/login' },
    { path: '/reset', component: '@/pages/reset' }
  ],
  base: '/account',
  qiankun: {
    slave: {}
  },
  antd: {
    dark: false,
  },
})

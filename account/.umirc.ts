import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/login',
      component: '@/pages/login',
      wrappers: ['@/wrappers/clear'],
      title: '登录',
    },
  ],
  base: '/account',
  qiankun: {
    slave: {},
  },
  antd: {
    dark: false,
  },
  hash: true,
});

import { defineConfig } from 'umi';

export default defineConfig({
  routes: [{ path: '/', component: '@/pages/index', title: '首页' }],
  base: '/home',
  qiankun: {
    slave: {},
  },
  hash: true,
});

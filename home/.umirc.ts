import { defineConfig } from 'umi';

export default defineConfig({
  routes: [{ path: '/', component: '@/pages/index' }],
  base: '/home',
  qiankun: {
    slave: {},
  },
  hash: true,
});

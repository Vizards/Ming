import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/register/all', component: '@/pages/index' },
  ],
  base: '/sensor',
  // 注意下面这项在 umi3.x 中必须配置
  qiankun: {
    slave: {},
  },
})

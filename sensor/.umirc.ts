import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/register', component: '@/pages/register' },
    { path: '/devices', component: '@/pages/devices' },
    { path: '/data', exact: true, component: '@/pages/data' },
    { path: '/data/:id', component: '@/pages/car' },
  ],
  base: '/sensor',
  // 注意下面这项在 umi3.x 中必须配置
  qiankun: {
    slave: {},
  },
})

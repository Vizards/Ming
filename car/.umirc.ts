import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/all', exact: true, component: '@/pages/all', title: '全部车辆' },
    { path: '/overproof', exact: true, component: '@/pages/overproof', title: '超标车辆' },
    { path: '/detail/:id', exact: true, component: '@/pages/detail', title: '车辆详情' }
  ],
  base: '/car',
  // 注意下面这项在 umi3.x 中必须配置
  qiankun: {
    slave: {},
  },
  antd: {
    dark: false,
  }
})

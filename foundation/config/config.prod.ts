import { defineConfig } from 'umi';
import { MingRoute } from "@/typings/interface";

const subApps: MingRoute[] = [
  {
    path: '/',
    redirect: '/home',
    sidebar: false,
  },
  {
    name: 'account',
    microApp: 'account',
    entry: '/account/index.html',
    path: '/account',
    title: '账户',
    wrappers: ['@/wrappers/brother'],
    routes: [
      {
        path: '/account/login',
        title: '登录',
      },
    ],
  },
  {
    name: 'home',
    microApp: 'home',
    entry: '/home/index.html',
    path: '/home',
    title: '首页',
    wrappers: ['@/wrappers/children'],
  },
  {
    name: 'car',
    microApp: 'car',
    entry: '/car/index.html',
    path: '/car',
    title: '车辆数据',
    privilegeId: '查看车辆数据',
    wrappers: ['@/wrappers/children'],
    routes: [
      { path: '/car/all', title: '全部车辆', privilegeId: '查看全部车辆' },
      {
        path: '/car/overproof',
        title: '超标车辆',
        privilegeId: '查看超标车辆',
      },
      {
        path: '/car/detail/:id',
        title: '车辆详情',
        sidebar: false,
        privilegeId: '查看车辆详情',
      },
      {
        sidebar: false,
        title: '异步按钮',
        privilegeId: '查看异步渲染的按钮',
      },
    ],
  },
  {
    name: 'oss',
    microApp: 'oss',
    entry: 'https://cloud.vizards.cc/ming/oss/index.html',
    path: '/oss',
    title: 'OSS 页面',
    privilegeId: '查看OSS页面',
    wrappers: ['@/wrappers/children'],
  },
];

export default defineConfig({
  qiankun: {
    master: {
      apps: subApps
        .filter(subApp => subApp.microApp !== undefined)
        .map(subApp => ({ name: subApp.name, entry: subApp.entry })),
      jsSandbox: false, // 是否启用 js 沙箱，默认为 false
      prefetch: true, // 是否启用 prefetch 特性，默认为 true
      defer: false, // 是否异步渲染，默认为 false
    },
  },
  define: {
    'process.env.subApps': subApps,
  },
  antd: {
    dark: false,
  },
  routes: subApps
    .concat([{ component: '@/pages/404' }])
    .map(subApp => ({ ...subApp, routes: undefined }))
});

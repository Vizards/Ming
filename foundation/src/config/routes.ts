import { history } from 'umi';
import { pathToRegexp } from 'path-to-regexp';
import { MingRoute } from '@/typings/interface';
import { privileges } from '@/utils/permission';
import { getCurrentTitleList } from '@/utils/helpers';

export const redirectMap: { [key: string]: string } = {
  '/': '/home',
};

export const autoRedirect = () => {
  const pathname = location.pathname;
  if (pathname.charAt(pathname.length - 1) === '/') {
    history.replace(pathname.substr(0, pathname.length - 1));
  }
  Object.keys(redirectMap).forEach((sourcePath) => {
    if (pathname === sourcePath) {
      history.replace(redirectMap[sourcePath]);
    }
  });
};

export const routes: MingRoute[] = [
  {
    path: '/home',
    title: '首页',
  },
  {
    sidebar: false, // 是否展示在左侧菜单栏，默认展示
    title: '账户',
    routes: [
      {
        path: '/account/login',
        title: '登录',
        sidebar: false,
      },
    ],
  },
  {
    path: '/car',
    title: '车辆数据',
    privilegeId: '查看车辆数据',
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
    path: '/oss',
    title: 'OSS 页面',
    privilegeId: '查看OSS页面',
  },
];

export const menu = {
  routes,
  generateDefaultKeys: () => getCurrentTitleList(),
};

export const getApplicationType: () => undefined | string = () => {
  let applicationType: undefined | string = undefined;
  const privilegeDetection = (route: MingRoute) => {
    if (
      route.privilegeId &&
      privileges._banned() &&
      privileges._banned().includes(route.privilegeId)
    ) {
      // 匹配到无权限的路由时
      applicationType = '403';
    }
  };
  const recursiveSidebarMap = (routes: MingRoute[]) => {
    routes.forEach((route) => {
      if (route.routes) {
        // 有子路由直接继续递归
        recursiveSidebarMap(route.routes);
      }
      if (
        route.path &&
        pathToRegexp(route.path).exec(history.location.pathname)
      ) {
        // 路由匹配，根据 sidebar 确定子应用类型
        applicationType = route.sidebar !== false ? 'children' : 'brother';
        privilegeDetection(route);
      }
      // 如果什么都匹配不上，说明没有声明这个路由，直接返回 undefined
    });
  };
  recursiveSidebarMap(routes);
  return applicationType;
};

export const checkLogged = () => {
  if (!localStorage.getItem('profile')) {
    history.replace('/account/login');
  }
};

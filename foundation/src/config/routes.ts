import { history } from 'umi';
import { MingRoute } from '@/typings/interface';
import { privileges } from '@/utils/permission';

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
    privilegeId: null,
  },
  {
    sidebar: false, // 是否展示在左侧菜单栏，默认展示
    path: '/account',
    privilegeId: null,
    title: '账户',
    routes: [
      {
        path: '/account/login',
        title: '登录',
        sidebar: false,
        privilegeId: null,
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
  defaultSelectKeys: ['/'],
  defaultOpenKeys: ['/'],
  generateDefaultOpenKeys: () => {
    const paths = location.pathname
      .split('/')
      .filter((path) => path.length > 0);
    const defaultOpenKeys: string[] = [];
    paths.forEach((path) => {
      defaultOpenKeys.push(
        defaultOpenKeys.length === 0
          ? `/${path}`
          : `${defaultOpenKeys[defaultOpenKeys.length - 1]}/${path}`,
      );
    });
    return defaultOpenKeys;
  },
  generateDefaultSelectKeys: () => {
    let defaultSelectedKey: string = '';
    const recursiveRoutesToSetDefaultSelectKey = (routes: MingRoute[]) => {
      routes.forEach((route) => {
        if (route.routes) {
          recursiveRoutesToSetDefaultSelectKey(route.routes);
        }
        if (
          route.path?.includes(':') &&
          location.pathname.startsWith(route.path?.split(':')[0])
        ) {
          // 动态路由处理
          defaultSelectedKey = route.path?.split('/:')[0];
        }
        if (location.pathname === route.path) {
          // 静态路由直接匹配
          defaultSelectedKey = route.path;
        }
      });
    };
    recursiveRoutesToSetDefaultSelectKey(routes);
    return [defaultSelectedKey];
  },
  generateDefaultKeys: function () {
    const isIndex = location.pathname === '/';
    return {
      defaultSelectKeys: isIndex
        ? this.defaultSelectKeys
        : this.generateDefaultSelectKeys(),
      defaultOpenKeys: isIndex
        ? this.defaultOpenKeys
        : this.generateDefaultOpenKeys(),
    };
  },
};

// 生成面包屑路径
export const generateBreadCrumbPathArr = () => {
  const breadCrumbArr: string[] = [];
  const pathname = location.pathname;
  const recursiveGenerateBreadCrumbArr = (routes: MingRoute[]) => {
    routes.forEach((route) => {
      if (pathname.startsWith(route.path!)) {
        breadCrumbArr.push(route.title!);
      }
      if (
        route.path?.includes(':') &&
        pathname.startsWith(route.path?.split(':')[0])
      ) {
        breadCrumbArr.push(route.title!);
      }
      if (route.routes) {
        recursiveGenerateBreadCrumbArr(route.routes);
      }
    });
  };
  recursiveGenerateBreadCrumbArr(routes);
  return breadCrumbArr;
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
        route.path?.includes(':') &&
        location.pathname.startsWith(route.path?.split(':')[0])
      ) {
        // 动态路由处理
        applicationType = 'children';
        privilegeDetection(route);
      }
      if (location.pathname === route.path) {
        // 静态路由直接匹配
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

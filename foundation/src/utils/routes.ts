import { history } from 'umi';
import { pathToRegexp } from 'path-to-regexp';
import { MingRoute } from '@/typings/interface';
import { privileges } from '@/utils/permission';
import { getCurrentTitleList } from '@/utils/helpers';

export const routes = process.env.subApps! as unknown as MingRoute[];

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
        applicationType = 'normal';
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

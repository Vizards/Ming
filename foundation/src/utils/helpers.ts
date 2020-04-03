import { routes } from '@/config/routes';
import { TreeData, MingRoute } from '@/typings/interface';
import { pathToRegexp } from 'path-to-regexp';
import { history } from '@@/core/history';

export const getArrDifference = (arr1: string[], arr2: any[]) => {
  return arr1.concat(arr2).filter((v, i, arr) => {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
};

export const generatePrivilegesTreeData = () => {
  const recursiveRoutes = (routes: TreeData[]) => {
    routes.forEach((route) => {
      route.title = route.privilegeId ? route.privilegeId : route.title;
      route.key = route.privilegeId
        ? route.privilegeId
        : Math.random().toString();
      route.checkable = !!route.privilegeId;
      if (route.routes) {
        route.children = route.routes;
        delete route.routes;
        recursiveRoutes(route.children);
      }
    });
  };
  const tree = JSON.parse(JSON.stringify(routes));
  recursiveRoutes(tree);
  return tree;
};

export const generatePrivilegesListData = () => {
  const allPrivileges: string[] = [];
  const recursiveRoutes = (routes: TreeData[]) => {
    routes.forEach((route) => {
      if (route.privilegeId) {
        allPrivileges.push(route.privilegeId);
      }
      if (route.routes) {
        recursiveRoutes(route.routes);
      }
    });
  };
  recursiveRoutes(routes);
  return allPrivileges;
};

export const generateRouteTitlePathList = () => {
  const titlePathArr: { path: string; titleArr: string[] }[] = [];
  let tempTitleArr: string[] = [];

  const recursiveRoutes = (
    routes: MingRoute[],
    parentTitles: string[] = [],
  ) => {
    routes.forEach((route) => {
      tempTitleArr = parentTitles;
      if (route.routes) {
        recursiveRoutes(route.routes, parentTitles.concat([route.title!]));
      }
      if (!route.routes) {
        titlePathArr.push({
          path: route.path ? route.path : '',
          titleArr: tempTitleArr.concat([route.title]),
        });
        tempTitleArr = [];
      }
    });
  };
  recursiveRoutes(routes);
  return titlePathArr;
};

export const getCurrentTitleList = () => {
  const titlePathList = generateRouteTitlePathList();
  let currentTitleList: string[] = [];
  titlePathList.forEach((obj) => {
    if (pathToRegexp(obj.path)?.exec(history.location.pathname)) {
      currentTitleList = obj.titleArr;
    }
  });
  return currentTitleList;
};

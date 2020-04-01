import { routes } from '@/config/routes';
import { TreeData } from '@/typings/interface';

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

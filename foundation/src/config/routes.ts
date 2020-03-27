import { IRoute, history } from "umi"

export const redirectMap: { [key: string]: string } = {
  '/': '/home',
}

export const autoRedirect = () => {
  const pathname = location.pathname
  if (pathname.charAt(pathname.length - 1) === '/') {
    history.replace(pathname.substr(0, pathname.length - 1))
  }
  Object.keys(redirectMap).forEach(sourcePath => {
    if (pathname === sourcePath) {
      history.replace(redirectMap[sourcePath])
    }
  })
}

export const routes: IRoute[] = [
  {
    path: '/home',
    title: '首页',
    privilegeId: '查看数据大屏',
  },
  {
    sidebar: false, // 是否展示在左侧菜单栏，默认展示
    path: '/account',
    routes: [
      { path: '/account/login', title: '登录', sidebar: false },
    ],
  },
  {
    path: '/car',
    title: '车辆数据',
    privilegeId: '查看检测数据',
    routes: [
      { path: '/car/all', title: '全部车辆', privilegeId: '查看全部车辆' },
      { path: '/car/overproof', title: '超标车辆', privilegeId: '查看超标车辆' },
      { path: '/car/reviewed', title: '处理历史记录', privilegeId: '查看处理历史记录' },
      { path: '/car/detail/:id', title: '车辆详情', sidebar: false }
    ]
  },
]

export const menu = {
  routes,
  defaultSelectKeys: ['/'],
  defaultOpenKeys: ['/'],
  generateDefaultOpenKeys: () => {
    const paths = location.pathname.split('/').filter(path => path.length > 0)
    const defaultOpenKeys: string[] = []
    paths.forEach(path => {
      defaultOpenKeys.push(defaultOpenKeys.length === 0 ? `/${path}` : `${defaultOpenKeys[defaultOpenKeys.length - 1]}/${path}`)
    })
    return defaultOpenKeys
  },
  generateDefaultSelectKeys: () => {
    let defaultSelectedKey: string = '';
    const recursiveRoutesToSetDefaultSelectKey = (routes: IRoute[]) => {
      routes.forEach(route => {
        if (route.routes) {
          recursiveRoutesToSetDefaultSelectKey(route.routes)
        }
        if (
          route.path?.includes(':')
          && location.pathname.startsWith(route.path?.split(':')[0])
        ) { // 动态路由处理
          defaultSelectedKey = route.path?.split('/:')[0]
        }
        if (location.pathname === route.path) { // 静态路由直接匹配
          defaultSelectedKey = route.path
        }
      })
    }
    recursiveRoutesToSetDefaultSelectKey(routes)
    return [defaultSelectedKey]
  },
  generateDefaultKeys: function () {
    const isIndex = location.pathname === '/'
    return {
      defaultSelectKeys: isIndex ? this.defaultSelectKeys : this.generateDefaultSelectKeys(),
      defaultOpenKeys: isIndex ? this.defaultOpenKeys : this.generateDefaultOpenKeys(),
    }
  }
}

// 生成面包屑路径
export const generateBreadCrumbPathArr = () => {
  const breadCrumbArr: string[] = []
  const pathname = location.pathname
  const recursiveGenerateBreadCrumbArr = (routes: IRoute[]) => {
    routes.forEach(route => {
      if (pathname.startsWith(route.path!)) {
        breadCrumbArr.push(route.title!)
      }
      if (
        route.path?.includes(':')
        && pathname.startsWith(route.path?.split(':')[0])
      ) {
        breadCrumbArr.push(route.title!)
      }
      if (route.routes) {
        recursiveGenerateBreadCrumbArr(route.routes)
      }
    })
  }
  recursiveGenerateBreadCrumbArr(routes)
  return breadCrumbArr
}

export const shouldDisplayInFrame: () => undefined | boolean = () => {
  let shouldDisplayInFrame = undefined
  const recursiveSidebarMap = (routes: IRoute[]) => {
    routes.forEach(route => {
      if (route.routes) { // 有子路由直接继续递归
        recursiveSidebarMap(route.routes)
      }
      if (
        route.path?.includes(':')
        && location.pathname.startsWith(route.path?.split(':')[0])
      ) { // 动态路由处理
        shouldDisplayInFrame = true
      }
      if (location.pathname === route.path) { // 静态路由直接匹配
        shouldDisplayInFrame = route.sidebar !== false
      }
      // 如果什么都匹配不上，说明没有声明这个路由，直接返回 undefined
    })
  }
  recursiveSidebarMap(routes)
  return shouldDisplayInFrame
}

export const checkLogged = () => {
  if (!localStorage.getItem('profile')) {
    history.replace('/account/login')
  }
}

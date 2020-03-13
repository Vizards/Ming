import { IRoute, history } from 'umi'

export const redirectMap: { [key: string]: string } = {
  '/': '/home',
}

export const autoRedirect = () => {
  Object.keys(redirectMap).forEach(sourcePath => {
    if (location.pathname === sourcePath) {
      history.replace(redirectMap[sourcePath])
    }
  })
}

export const routes: IRoute[] = [
  {
    path: '/home',
    title: '首页'
  },
  {
    sidebar: false, // 是否展示在左侧菜单栏，默认展示
    path: '/account',
    routes: [
      { path: '/account/login', title: '登录', sidebar: false },
      { path: '/account/reset', title: '密码重置', sidebar: false }
    ],
  },
  {
    path: '/sensor',
    title: '遥感监测',
    routes: [
      {
        path: '/sensor/register',
        title: '设备注册',
        routes: [
          {
            path: '/sensor/register/all',
            title: '测试三级路径'
          }
        ]
      },
      { path: '/sensor/list', title: '设备列表' },
      { path: '/sensor/data', title: '数据查看' }
    ]
  },
  {
    path: '/cars',
    title: '超标车辆',
    routes: [
      { path: '/cars/handle', title: '超标车辆处理' },
      { path: '/cars/history', title: '历史记录' }
    ]
  },
  {
    path: '/log',
    title: '系统日志'
  }
]

export const menu = {
  routes: routes.filter(route => route.sidebar !== false),
  defaultSelectKeys: ['/'],
  defaultOpenKeys: ['/'],
  generateDefaultKeys: function () {
    if (location.pathname !== '/') {
      const paths = location.pathname.split('/').filter(path => path.length > 0)
      const defaultOpenKeys: string[] = []
      paths.forEach(path => {
        defaultOpenKeys.push(defaultOpenKeys.length === 0 ? `/${path}` : `${defaultOpenKeys[defaultOpenKeys.length - 1]}/${path}`)
      })
      return {
        defaultSelectKeys: [location.pathname],
        defaultOpenKeys,
      }
    }
    return {
      defaultSelectKeys: this.defaultSelectKeys,
      defaultOpenKeys: this.defaultOpenKeys,
    }
  }
}

// 支持无限子目录的面包屑数据结构生成器
export const breadCrumbMap = () => {
  const map: { [key: string]: string[] } = {}

  const recursiveGenerateMap = (routes: IRoute[]) => {
    routes.forEach(route => {
      if (route.sidebar !== false) { // 首先都要确定展示在 sidebar
        const pathArr = route.path?.split('/').filter(path => path.length > 0)
        const lastPath = pathArr?.pop();

        pathArr?.length === 0 // 说明是根菜单
          ? map[`/${lastPath}`] = [route.title!]
          // @ts-ignore
          : map[route.path!] = [].concat(map[`/${pathArr?.join('/')}`], [route.title!])

        if (route.routes) { // 有子路由，就递归
          recursiveGenerateMap(route.routes)
        }
      }
    })
  }

  recursiveGenerateMap(routes)
  return map
}

export const routerSidebarMap = () => {
  const map: { [key: string]: boolean } = {}
  const recursiveSidebarMap = (routes: IRoute[]) => {
    routes.forEach(route => {
      map[route.path!] = route.sidebar !== false
      if (route.routes) {
        recursiveSidebarMap(route.routes)
      }
    })
  }
  recursiveSidebarMap(routes)
  return map
}

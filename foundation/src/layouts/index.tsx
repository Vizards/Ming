import React from "react"
import { IRoute, Link } from "umi"
import { Layout, Menu } from "antd"
import {
  menu,
  shouldDisplayInFrame,
  autoRedirect,
  checkLogged
} from "@/config/routes"

import BreadCrumb from "@/components/BreadCrumb"
import Account from "@/components/Account"
import Exception from "@/components/Exception"

import styles from "./index.less"

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const recursiveRoutes = (routes: IRoute[]) => {
  const generateMenuItem = (route: IRoute) => route.sidebar !== false && (
    <Menu.Item key={route.path}>
      <Link to={route.path!}>{route.title}</Link>
    </Menu.Item>
  )

  return routes.map(route => {
    if (route.routes) { // 如果有子路由
      return route.routes.every(route => route.sidebar === false)
        ? generateMenuItem(route) // 如果子路由全部不展示在 sidebar，自己却展示在 sidebar，那就作为一个 Menu.Item
        : ( // 如果子路由中有展示在 sidebar 的，那么自己作为父级菜单
          <SubMenu key={route.path} title={route.title}>
            {recursiveRoutes(route.routes)}
          </SubMenu>
        )
    }
    return generateMenuItem(route) // 没有子路由只需判断自己展不展示
  })
}

autoRedirect()

export default () => {
  switch (shouldDisplayInFrame()) {
    case true:
      checkLogged()
      return (
        <Layout className={styles.layout}>
          <Sider>
            <div className={styles.logo}>
              这里是标题 Logo
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={menu.generateDefaultKeys().defaultSelectKeys}
              defaultOpenKeys={menu.generateDefaultKeys().defaultOpenKeys}
              theme="dark"
            >
              {recursiveRoutes(menu.routes)}
            </Menu>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <BreadCrumb />
              <Account />
            </Header>
            <Content className={styles.content}>
              <div id="root-children" className={styles.children} />
            </Content>
            <Footer className={styles.footer}>
              Copyright © 2020. Powered by 姜饼科技
            </Footer>
          </Layout>
        </Layout>
      )
    case false:
      return <main id={`root-${location.pathname.split('/').filter(key => key.length > 0)[0]}`} />
    case undefined:
      return <Exception type="404" />
  }
}

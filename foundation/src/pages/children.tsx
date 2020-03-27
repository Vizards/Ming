import React from 'react'
import { IRoute, Link } from "umi"
import { Layout, Menu } from "antd"
import { menu } from "@/config/routes"

import BreadCrumb from "@/components/BreadCrumb"
import Account from "@/components/Account"
import Loading from "@/components/Loading"

import styles from "./index.less"

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const recursiveRoutes = (routes: IRoute[]) => {
  const generateMenuItem = (route: IRoute) => route.sidebar !== false && (
    <Menu.Item key={route.path} id={route.privilegeId}>
      <Link to={route.path!}>{route.title}</Link>
    </Menu.Item>
  )

  return routes.map(route => {
    if (route.routes) { // 如果有子路由
      return route.routes.every(route => route.sidebar === false)
        ? generateMenuItem(route) // 如果子路由全部不展示在 sidebar，自己却展示在 sidebar，那就作为一个 Menu.Item
        : ( // 如果子路由中有展示在 sidebar 的，那么自己作为父级菜单
          // @ts-ignore
          <SubMenu key={route.path} title={route.title} id={route.privilegeId}>
            {recursiveRoutes(route.routes)}
          </SubMenu>
        )
    }
    return generateMenuItem(route) // 没有子路由只需判断自己展不展示
  })
}

export default () => {
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
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
      <Layout className={styles.main}>
        <Header className={styles.header}>
          <BreadCrumb />
          <Account />
        </Header>
        <Content className={styles.content}>
          <div id="root-children" className={styles.children}>
            <Loading />
          </div>
        </Content>
        <Footer className={styles.footer}>
          Copyright © 2020. Powered by 姜饼科技
        </Footer>
      </Layout>
    </Layout>
  )
}

import React from 'react';
import { IRoute, Link, qiankunStart } from 'umi'
import { Layout, Menu } from "antd"
import { menu, routerSidebarMap, autoRedirect } from '@/config/routes'

import BreadCrumb from "@/components/BreadCrumb"
import Account from "@/components/Account"
import Exception from "@/components/Exception"

import styles from './index.less'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const recursiveRoutes = (route: IRoute) => route.routes ? (
  <SubMenu key={route.path} title={route.title}>
    {route.routes.map(_route => recursiveRoutes(_route))}
  </SubMenu>
) : (
  <Menu.Item key={route.path}>
    <Link to={route.path!}>{route.title}</Link>
  </Menu.Item>
)

qiankunStart()
autoRedirect()

console.log(routerSidebarMap())


export default (props: any) => {
  switch (routerSidebarMap()[location.pathname]) {
    case true:
      return (
        <Layout className={styles.layout} style={{ display: routerSidebarMap()[location.pathname] ? 'flex' : 'none' }}>
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
              {menu.routes.map(route => recursiveRoutes(route))}
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
    default:
      return <Exception type="404" />
  }
}

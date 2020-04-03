import React from 'react';
import { IRoute, Link } from 'umi';
import { Layout, Menu } from 'antd';
import { menu } from '@/config/routes';
import { privileges } from '@/utils/permission';

import BreadCrumb from '@/components/BreadCrumb';
import Account from '@/components/Account';
import Loading from '@/components/Loading';

import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const recursiveRoutes = (routes: IRoute[]) => {
  const menuItemDisplay = (route: IRoute) =>
    route.sidebar !== false &&
    !privileges._banned().includes(route.privilegeId);

  const generateMenuItem = (route: IRoute) =>
    menuItemDisplay(route) && (
      <Menu.Item key={route.title}>
        <Link to={route.path!}>{route.title}</Link>
      </Menu.Item>
    );

  return routes.map((route) => {
    if (route.routes) {
      /*
       * 如果子路由要么被 ban ，要么 sidebar:false
       * 那么自己作为父级菜单也不展示
       */
      if (
        route.routes.every(
          (route) =>
            privileges._banned().includes(route.privilegeId) ||
            route.sidebar === false,
        )
      ) {
        return null;
      }
      return (
        /*
         * 如果子路由中有展示在 sidebar 的，那么自己作为父级菜单
         * 根据 Ant Design 设计规范，父级菜单不应当作导航路由使用
         */
        <SubMenu key={route.title} title={route.title}>
          {recursiveRoutes(route.routes)}
        </SubMenu>
      );
    }
    return generateMenuItem(route); // 没有子路由，判断自己展不展示
  });
};

export default () => {
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <div className={styles.logo}>这里是标题 Logo</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={menu.generateDefaultKeys()}
          defaultOpenKeys={menu.generateDefaultKeys()}
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
  );
};

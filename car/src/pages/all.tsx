import React from "react"
import { Descriptions } from 'antd'
import styles from './index.less'

export default () => {
  return (
    <div className={styles.container}>
      <Descriptions title="页面信息" column={1}>
        <Descriptions.Item label="当前子应用">car</Descriptions.Item>
        <Descriptions.Item label="代码运行路径">
          {process.env.NODE_ENV === 'production' ? '/car/index.html' : 'http://localhost:3001'}
        </Descriptions.Item>
        <Descriptions.Item label="当前页面固定路由">/car/all</Descriptions.Item>
        <Descriptions.Item label="当前页面权限 ID（privilegeId）">查看检测数据 > 查看全部车辆</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

import React from "react"
import { history } from "umi"
import { Descriptions, Button, Divider } from "antd"
import styles from "./index.less"

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
      <Divider />
      <h3>下面是一个权限控制的 button</h3>
      <Button
        type="primary"
        onClick={() => history.push('/detail/1')}
        id="查看车辆详情"
      >
        查看车辆1详情
      </Button>
      <p>如果登录时未勾选「查看车辆详情」的权限，将看不到此按钮</p>
      <p>即使直接打开车辆详情的 URL，也会看到 403 错误页面：</p>
      <a href={`//${location.host}/car/detail/1`} target="_blank">
        {location.host + '/car/detail/1'}
      </a>
    </div>
  )
}

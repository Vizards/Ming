import React from 'react'
import { useRootExports } from 'umi'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { ILoginDTO } from "@/typings/interface"

import styles from './index.less'

const allPrivileges = [
  '查看车辆数据',
  '查看全部车辆',
  '查看超标车辆',
  '查看处理历史记录',
  '查看车辆详情'
]

export default () => {
  const { history } = useRootExports().default
  const onFinish = (values: ILoginDTO) => {
    localStorage.setItem('profile', JSON.stringify(values))
    history.push('/home')
  }
  return (
    <main className={styles.account}>
      <h1 className={styles.title}>监控系统 - 登入</h1>
      <Form initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="principal"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名"/>
        </Form.Item>

        <Form.Item
          name="credential"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>

        <Form.Item
          name="privileges"
          rules={[{ required: true, message: '权限必须分配' }]}
          label="权限分配"
        >
          <Checkbox.Group options={allPrivileges.map(privilege => {
            return { label: privilege, value: privilege }
          })}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登 录
          </Button>
        </Form.Item>
      </Form>
    </main>
  )
}

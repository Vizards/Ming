import React from 'react';
import { Form, Input, Button, Alert } from 'antd'
import { LockOutlined } from '@ant-design/icons'

import styles from './index.less';


export default () => {
  return (
    <main className={styles.account}>
      <h1 className={styles.title}>监控系统 - 密码重置</h1>
      <Alert message="密码已被管理员重置，请输入新密码" type="warning" showIcon className={styles.warning} />
      <Form initialValues={{ remember: true }}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="新密码" />
        </Form.Item>

        <Form.Item
          name="confirm"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="确认新密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            确认重置并登录
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}

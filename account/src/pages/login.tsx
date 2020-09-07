import React from 'react';
import { useModel } from 'umi';
import { Form, Input, Button, Tree } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ILoginDTO } from '@/typings/interface';

import styles from './index.less';

export default () => {
  const [form] = Form.useForm();
  const { rootHistory, generatePrivilegesTreeData } = useModel('@@qiankunStateFromMaster')
  const onFinish = (values: ILoginDTO) => {
    let privileges: string[] = [];
    if (values.privileges) {
      // 半选的菜单也要展示在左侧菜单里面嗷
      privileges = values.privileges.checked.concat(
        values.privileges.halfChecked,
      );
    }
    localStorage.setItem(
      'profile',
      JSON.stringify({
        principal: values.principal,
        credential: values.credential,
        privileges,
      }),
    );
    rootHistory.push('/home');
  };
  const privilegesTreeData: any = generatePrivilegesTreeData();
  return (
    <main className={styles.account}>
      <h1 className={styles.title}>监控系统 - 登入</h1>
      <Form initialValues={{ remember: true }} onFinish={onFinish} form={form}>
        <Form.Item
          name="principal"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="credential"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>

        <Form.Item
          name="privileges"
          label="权限分配"
          valuePropName="checkedKeys"
        >
          <Tree
            checkable
            treeData={privilegesTreeData}
            checkedKeys={form.getFieldValue('privileges')}
            onCheck={(checkedKeys, e) => {
              form.setFieldsValue({
                privileges: {
                  checked: checkedKeys,
                  halfChecked: e.halfCheckedKeys,
                },
              });
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登 录
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};
